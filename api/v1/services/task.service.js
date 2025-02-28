const taskRepository = require("../repositories/task.repository");

const getAllTask = async (filter, sort, objectPagination) => {
  return await taskRepository.getAllTask(filter, sort, objectPagination);
};

const countTask = async (filter) => {
  return await taskRepository.countTask(filter);
};

const getTaskDetailById = async (id) => {
  return await taskRepository.getTaskDetailById(id);
};

module.exports = { getAllTask, countTask, getTaskDetailById };
