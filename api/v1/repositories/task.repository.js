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

module.exports = {
  getAllTask,
  countTask,
  getTaskDetailById,
  patchChangeStatus,
};
