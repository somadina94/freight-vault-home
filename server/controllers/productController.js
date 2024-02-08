const Product = require("../models/productModel");
const axios = require("axios");

exports.createProduct = async (req, res) => {
  try {
    let product;
    if (req.body.name === "Gold") {
      const goldData = await axios.get(
        "https://api.metalpriceapi.com/v1/latest?api_key=2d57c18020eb28a5ccc1277baae0b557&base=XAU&currencies=GBP"
      );
      const goldPricePerOunce = goldData.data.rates.GBP;
      product = await Product.create({
        name: req.body.name,
        price: goldPricePerOunce,
      });
    } else if (req.body.name === "Silver") {
      const silverData = await axios.get(
        "https://api.metalpriceapi.com/v1/latest?api_key=2d57c18020eb28a5ccc1277baae0b557&base=XAG&currencies=GBP"
      );
      const silverPricePerOunce = silverData.data.rates.GBP;
      product = await Product.create({
        name: req.body.name,
        price: silverPricePerOunce,
      });
    } else if (req.body.name === "Platinum") {
      const platinumData = await axios.get(
        "https://api.metalpriceapi.com/v1/latest?api_key=2d57c18020eb28a5ccc1277baae0b557&base=XPT&currencies=GBP"
      );
      const platinumPricePerOunce = platinumData.data.rates.GBP;
      product = await Product.create({
        name: req.body.name,
        price: platinumPricePerOunce,
      });
    }
    res.status(201).json({
      status: "success",
      message: `Product created successfully`,
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

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
