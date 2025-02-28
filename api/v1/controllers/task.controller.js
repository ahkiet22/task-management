const taskService = require("../services/task.service");
const paginationHelper = require("../../../helpers/pagination");
const searchHelper = require("../../../helpers/search");

// [GET] /api/v1/tasks or /tasks?status=""
const index = async (req, res) => {
  try {
    let objectSearch = searchHelper(req.query);
    const find = {
      deleted: false,
    };
    if (req.query.status) {
      find.status = req.query.status;
    }

    if (req.query.keyword) {
      find.title = objectSearch.regex;
    }

    // Pagination
    const countTasks = await taskService.countTask(find);

    let objectPagination = paginationHelper(
      {
        currentPage: 1,
        limitItem: 2,
      },
      req.query,
      countTasks
    );
    // End Pagination

    // Sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    }
    // End Sort

    const tasks = await taskService.getAllTask(find, sort, objectPagination);
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
  try {
    const id = req.params.id;
    const tasks = await taskService.getTaskDetailById(id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// [PATCH] /api/v1/tasks/change-status/:id
const changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    await taskService.patchChangeStatus(id, status);
    res.status(200).json({ status: 200, message: "Update status success!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// [PATCH] /api/v1/tasks/change-multi
const changeMulti = async (req, res) => {
  try {
    const { ids, key, value } = req.body;

    switch (key) {
      case "status":
        await taskService.changeMultiStatus(ids, value);
        res.status(200).json({ status: 200, message: "Update multi success!" });
        break;
      default:
        res.status(404).json({ message: "Not found" });
        break;
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// [GET] /api/v1/tasks/create
const create = async (req, res) => {
  try {
    const data = await taskService.createTask(req.body);
    if (data) {
      res
        .status(201)
        .json({ status: 201, message: "Create task success!", data: data });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { index, detail, changeStatus, changeMulti, create };
