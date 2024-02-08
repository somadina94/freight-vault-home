const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Email = require("../utils/email");

exports.createOrder = async (req, res) => {
  try {
    const { product, ounce } = req.body;
    const selectedProduct = await Product.findOne({ name: product });

    const order = await Order.create({
      name: product,
      ounce: ounce,
      product: selectedProduct._id,
      status: false,
      user: req.user._id,
      price: ounce * selectedProduct.price,
    });

    const user = await User.findOne({ _id: req.user._id });

    const adminEmail = {
      email: process.env.ADMIN_EMAIL,
      name: "Admin",
    };

    await new Email(user, order._id).sendBuyOrderRec();
    await new Email(adminEmail).sendNewOrder();

    res.status(201).json({
      status: "success",
      message:
        "Your order has been created successfully, we will contact you via email to get your address and more details to ship your metals",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllUserOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllAdminOrder = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      message: `Order deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

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

exports.approveOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: true },
      { new: true }
    );

    const user = await User.findOne({ _id: order.user });
    await new Email(user, order._id).sendBuyOrderApp();

    res.status(200).json({
      status: "success",
      message: `Order updated successfully`,
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
