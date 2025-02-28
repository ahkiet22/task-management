const taskService = require("../services/task.service");

// [GET] /api/v1/tasks or /tasks?status=""
const index = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    if (req.query.status) {
      find.status = req.query.status;
    }

    // Sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    }
    // End Sort

    const tasks = await taskService.getAllTask(find, sort);
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// [GET] /api/v1/tasks/detail/:id
const detail = async (req, res) => {
  const id = req.params.id;
  const tasks = await taskService.getTaskDetailById(id);
  res.json(tasks);
};

module.exports = { index, detail };
