const User = require("../models/users.model");
const ForgotPassword = require("../models/forgot-password.model");

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

const forgotPassword = async (objectForgotPassword) => {
  const newData = new ForgotPassword(objectForgotPassword);
  await newData.save();
  return newData;
};

module.exports = {
  getUserEmail,
  createUser,
  forgotPassword,
};
