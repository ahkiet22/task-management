const taskService = require("../services/task.service");

const index = async (req, res) => {
  const tasks = await taskService.getAllTask();
  res.json(tasks);
};

const detail = async (req, res) => {
  const id = req.params.id;
  const tasks = await taskService.getTaskDetailById(id);
  res.json(tasks);
};

module.exports = { index, detail };
