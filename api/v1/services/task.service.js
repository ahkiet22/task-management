const taskRepository = require("../repositories/task.repository");

const getAllTask = async (filter, sort) => {
  return await taskRepository.getAllTask(filter, sort);
};

const getTaskDetailById = async (id) => {
  return await taskRepository.getTaskDetailById(id);
};

module.exports = { getAllTask, getTaskDetailById };
