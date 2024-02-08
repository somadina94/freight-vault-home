const Vault = require("../models/vaultModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Email = require("../utils/email");

exports.createVault = async (req, res) => {
  try {
    const metal = await Product.findOne({ name: req.body.name });
    const fee = ((metal.price * req.body.ounce) / 100) * 1;
    const currentDate = new Date(Date.now());
    const today = new Date(Date.now());
    const expiryDate = currentDate.setMonth(currentDate.getMonth() + 1);
    const vault = await Vault.create({
      name: req.body.name,
      depositDate: today,
      startDate: today,
      endDate: expiryDate,
      user: req.user._id,
      status: false,
      fee: fee,
      ounce: req.body.ounce,
    });

    const user = await User.findOne({ _id: req.user._id });

    const adminEmail = {
      email: process.env.ADMIN_EMAIL,
      name: "Admin",
    };

    await new Email(user, vault._id).sendVaultOrder();
    await new Email(adminEmail).sendNewOrder();

    res.status(201).json({
      status: "success",
      message: `Vault order created successfully, we will contact your via email to give you shipping details.`,
      data: {
        vault,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllVaultForUser = async (req, res) => {
  try {
    const vaults = await Vault.find({ user: req.user._id });

    res.status(200).json({
      status: "success",
      data: {
        vaults,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllVaultForAdmin = async (req, res) => {
  try {
    const vaults = await Vault.find();

    res.status(200).json({
      status: "success",
      data: {
        vaults,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getOneVault = async (req, res) => {
  try {
    const vault = await Vault.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        vault,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateVault = async (req, res) => {
  try {
    const updatedVault = await Vault.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Vault updated successfully",
      data: {
        vault: updatedVault,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteVault = async (req, res) => {
  try {
    await Vault.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.approveVault = async (req, res) => {
  try {
    const vault = await Vault.findByIdAndUpdate(
      req.params.id,
      { status: true },
      { new: true }
    );

    const user = await User.findOne({ _id: req.user._id });

    await new Email(user, vault._id).sendVaultApproved();

    res.status(200).json({
      status: "success",
      message: `Vault updated successfully`,
      data: {
        vault,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
