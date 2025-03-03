const User = require("../models/users.model");

const getListUser = async () => {
  return await User.find({ deleted: false }).select("fullName email");
};

module.exports = { getListUser }
