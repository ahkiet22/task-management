const taskRepository = require("../repositories/task.repository");

const getAllTask = async (filter) => {
  return await taskRepository.getAllTask(filter);
};

const getTaskDetailById = async (id) => {
  return await taskRepository.getTaskDetailById(id);
};

module.exports = { getAllTask, getTaskDetailById };
