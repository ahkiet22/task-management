const userRepositoy = require("../repositories/user.repository");

const listUser = async () => {
  const data = await userRepositoy.getListUser();
  return data;
}

module.exports = { listUser }