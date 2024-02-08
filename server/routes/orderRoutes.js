const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.post("/", orderController.createOrder);
router.get("/getOrdersAdmin", orderController.getAllAdminOrder);
router.get("/getOrdersUser", orderController.getAllUserOrder);
router.delete("/:id", orderController.deleteOrder);
router.patch("/approve/:id", orderController.approveOrder);

module.exports = router;
