const express = require("express");
const vaultController = require("../controllers/vaultController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.post("/", vaultController.createVault);
router.patch("/:id", vaultController.updateVault);
router.get("/getVaultsAdmin", vaultController.getAllVaultForAdmin);
router.get("/getVaultsUser", vaultController.getAllVaultForUser);
router.get("/:id", vaultController.getOneVault);
router.delete("/:id", vaultController.deleteVault);
router.patch("/approve/:id", vaultController.approveVault);

module.exports = router;
