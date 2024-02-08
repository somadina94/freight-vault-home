const User = require("../models/userModel");

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
};

exports.getMe = async (req, res) => {
  console.log(req.user._id);
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Could not find your account",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(500).json({
        status: "fail",
        message: "No user found with that id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "account updated successfully",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Account not found",
    });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({ _id: req.user._id }, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: `Account details updated successfully!`,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.block = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      { status: false },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: `Account blocked successfully!`,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.unblock = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.id },
      { status: true },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: `Account unblocked successfully!`,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
