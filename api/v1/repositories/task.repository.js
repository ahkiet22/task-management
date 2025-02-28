const Task = require("../models/taks.model");

const getAllTask = async (filter, sort) => {
  return await Task.find(filter).sort(sort);
};

const getTaskDetailById = async (id) => {
  return await Task.findOne({
    _id: id,
    deleted: false,
  });
};

module.exports = { getAllTask, getTaskDetailById };
