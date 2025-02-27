const taskRepository = require("../repositories/task.repository");

const getAllTask = async () => {
  return await taskRepository.getAllTask();
};

const getTaskDetailById = async (id) => {
  return await taskRepository.getTaskDetailById(id);
};

module.exports = { getAllTask, getTaskDetailById };
