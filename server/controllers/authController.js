const User = require("../models/userModel");
const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Email = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res, message) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    message: message,
    token,
    data: {
      user,
    },
  });
};

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      address: req.body.address,
      phone: req.body.phone,
      dateOfB: req.body.dateOfB,
      status: true,
      country: req.body.country,
    });

    const adminEmail = {
      email: process.env.ADMIN_EMAIL,
      name: "Admin",
    };

    await new Email(newUser).sendWelcome();

    await new Email(adminEmail).sendNewMember();

    const message = "Signed up successfully.";

    createSendToken(newUser, 201, req, res, message);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // 1) Get user entered login details
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: `Please provide your email and password`,
      });
    }

    // 2) Check if user exists
    const user = await User.findOne({ email: email }).select("+password");

    // 3) Check if password is correct.
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: `Incorrect email or password`,
      });
    }

    // 4) Login user and send Token
    const message = "Logged in successfully.";
    createSendToken(user, 200, req, res, message);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    // 1) Get user entered login details
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: `Please provide your email and password`,
      });
    }

    // 2) Check if user exists
    const user = await User.findOne({ email: email }).select("+password");

    if (user.role !== "admin") {
      return res.status(401).json({
        status: "fail",
        message: `This web app is only meant for Admin`,
      });
    }

    // 3) Check if password is correct.
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: `Incorrect email or password`,
      });
    }

    // 4) Login user and send Token
    const message = "Logged in successfully.";
    createSendToken(user, 200, req, res, message);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Check if token exists and get token
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: `Access denied, please login to get access.`,
      });
    }

    // 2) Check if token is valid
    const decodedJWT = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const currentUser = await User.findOne({ _id: decodedJWT.id });

    // 3) Check if user still exists
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: `User no longer exists`,
      });
    }

    // 4) Check if user recently changed password.
    if (currentUser.changedPasswordAfterJWT(decodedJWT.iat)) {
      return res.status(401).json({
        status: `fail`,
        message: `You recently changed password, please login again to be granted access.`,
      });
    }

    // All being set, grant access to protected route.
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.logout = (req, res) => {
  const token = "loggedout";
  res.cookie("jwt", token, {
    expiresIn: 1000,
  });
  res.status(200).json({
    status: "success",
    message: "Signed out successfully",
    token,
  });
};

exports.forgotPassword = async (req, res, next) => {
  // 1) Get user with posted email
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: `Email not registered with us.`,
    });
  }

  // 2) Create random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send resetToken to user's email
  try {
    const url = `${process.env.CLIENT_URL}/${resetToken}`;

    await new Email(user, url).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Password reset url sent to your email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      status: "fail",
      message: `There was an error sending the email, try again later!`,
    });
  }
};

exports.resetPassowrd = async (req, res) => {
  try {
    // 1) Get random reset token from user and get user with it
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired and there is user, set the new pin
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: `Token is invalid or has expired.`,
      });
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    // 3) update changedPasswordAt property for the user with pre-save middleware
    await user.save();

    // 4) Log the user in, send jwt
    const message = "Password changed successfully.";
    createSendToken(user, 200, req, res, message);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    // 1) Get user from collection
    const user = await User.findById(req.user._id).select("+password");
    // 2) Check if posted current pin is correct
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return res.status(401).json({
        status: "fail",
        message: `Your current password is wrong.`,
      });
    }
    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(401).json({
        status: "fail",
        message: `Your new password and confirm new password are not the same`,
      });
    }
    // 3) If correct, update pin
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // 4) log user in, send jwt
    const message = "Password changed successfully.";
    createSendToken(user, 200, req, res, message);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "Access denied",
      });
    }
    next();
  };
};
