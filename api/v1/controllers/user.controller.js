const userService = require("../services/user.service");

// [GET] /api/v1/user/profile
const profile = (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      data: req.user,
      message: "Get information successfully!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// [GET] /api/v1/user/list-user
const listUser = async (req, res) => {
  try {
    const data = await userService.listUser();
    res.status(200).json({
      status: 200,
      data: data,
      message: "Get information all user successfully!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { profile, listUser };
