const Task = require("../models/taks.model");

const getAllTask = async () => {
  return await Task.find({
    deleted: false,
  });
};

const getTaskDetailById = async (id) => {
  return await Task.findOne({
    _id: id,
    deleted: false,
  });
};
