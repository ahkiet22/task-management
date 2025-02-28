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

const patchChangeStatus = async (id, status) => {
  return await taskRepository.patchChangeStatus(id, status);
};

const changeMultiStatus = async (ids, value) => {
  return await taskRepository.changeMulti(ids, value);
};

module.exports = {
  getAllTask,
  countTask,
  getTaskDetailById,
  patchChangeStatus,
  changeMultiStatus,
};
