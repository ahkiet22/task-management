const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const Task = require("../models/taks.model");

// const controller = require("../../controllers/client/task.controller");

router.get("/", taskController.index);

router.get("/detail/:id", taskController.detail);

module.exports = router;
