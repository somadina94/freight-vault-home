const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/loginUser", authController.login);
router.post("/loginAdmin", authController.loginAdmin);
router.post("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassowrd);

router.use(authController.protect);
router.patch("/updateMe", userController.updateMe);
router.patch("/updatePassword", authController.updatePassword);
router.get("/me", userController.getMe);
router.get("/", userController.findAllUsers);
router.get("/:id", userController.getOneUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.patch("/block/:id", userController.block);
router.patch("/unblock/:id", userController.unblock);

module.exports = router;
