const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", productController.getAllProducts);
router.use(authController.protect);
router.post("/", productController.createProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
