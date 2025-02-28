const Task = require("../models/taks.model");

const getAllTask = async (filter, sort, objectPagination) => {
  return await Task.find(filter)
    .sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);
};

const countTask = async (filter) => {
  return await Task.countDocuments(filter);
};

const getTaskDetailById = async (id) => {
  return await Task.findOne({
    _id: id,
    deleted: false,
  });
};

const patchChangeStatus = async (id, status) => {
  return await Task.updateOne(
    {
      _id: id,
    },
    {
      status: status,
    }
  );
};

const changeMulti = async (ids, value) => {
  return await Task.updateMany(
    {
      _id: { $in: ids },
    },
    {
      status: value,
    }
  );
};

const createTask = async (taskData) => {
  return await Task.create(taskData);
};

const editTask = async (id, taskData) => {
  return await Task.updateOne(
    {
      _id: id,
    },
    taskData
  );
};

const deleteTask = async (id) => {
  return await Task.updateOne(
    {
      _id: id,
    },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );
};

module.exports = {
  getAllTask,
  countTask,
  getTaskDetailById,
  patchChangeStatus,
  changeMulti,
  createTask,
  editTask,
  deleteTask,
};
