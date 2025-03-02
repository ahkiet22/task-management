const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.post("/register", controller.register);

router.post("/login", controller.login);

router.post("/forgot-password", controller.forgotPassword);

router.post("/forgot-password/otp", controller.otpPassword);

router.post("/forgot-password/reset-password", controller.resetPassword);

module.exports = router;
