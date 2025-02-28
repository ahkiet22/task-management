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

const createTask = async (taskData) => {
  return await taskRepository.createTask(taskData);
};

const editTask = async (id, taskData) => {
  return await taskRepository.editTask(id, taskData);
};

const deleteTask = async (id) => {
  return await taskRepository.deleteTask(id);
};

const deleteMulti = async (ids) => {
  return await taskRepository.deleteMulti(ids);
};

module.exports = {
  getAllTask,
  countTask,
  getTaskDetailById,
  patchChangeStatus,
  changeMultiStatus,
  createTask,
  editTask,
  deleteTask,
  deleteMulti
};
