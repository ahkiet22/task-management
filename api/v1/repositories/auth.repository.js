const User = require("../models/users.model");

const getUserEmail = async (email) => {
  return await User.findOne({
    email: email,
  });
};

const createUser = async (dataUser) => {
  const newUser = new User(dataUser);
  await newUser.save();
  return newUser;
};

module.exports = {
  getUserEmail,
  createUser,
};
