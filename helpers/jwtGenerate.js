const jwt = require("jsonwebtoken");

const generateAccessToken = (data) => {
  return jwt.sign({data}, process.env.SECRET_ACCESS_KEY, { expiresIn: "30m" });
};

const generateRefreshToken = (data) => {
  return jwt.sign({data}, process.env.SECRET_REFRESH_KEY, { expiresIn: "1d" });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken
}