const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Gold", "Silver", "Platinum"],
    required: [true, "a product must have a name"],
  },
  price: Number,
});

const Product = mongoose.model("Product", productModel);

module.exports = Product;
