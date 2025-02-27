const express = require("express");
require("dotenv").config();
const database = require("./config/database");
const app = express();
const port = process.env.PORT;

const Task = require("./models/taks.model");

database.connect();

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find({
    deleted: false,
  });
  console.log(tasks);
  res.json(tasks);
});

app.get("/tasks/detail/:id", async (req, res) => {
  const id = req.params.id;
  const tasks = await Task.findOne({
    _id: id,
    deleted: false,
  });
  console.log(tasks);
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
