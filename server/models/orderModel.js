const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  price: Number,
  ounce: Number,
  status: Boolean,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
