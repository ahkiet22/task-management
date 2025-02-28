const taskService = require("../services/task.service");

const index = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    if (req.query.status) {
      find.status = req.query.status;
    }
    const tasks = await taskService.getAllTask(find);
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const detail = async (req, res) => {
  const id = req.params.id;
  const tasks = await taskService.getTaskDetailById(id);
  res.json(tasks);
};

module.exports = { index, detail };
