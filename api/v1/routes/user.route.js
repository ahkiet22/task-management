const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.get("/profile", controller.profile);

router.get("/list-user", controller.listUser);

module.exports = router;
