const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const { generateAccessToken } = require("../../../helpers/jwtGenerate");

module.exports.authMiddleware = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    const refreshToken = req.cookies?.token;
    if (!refreshToken) {
      return res.status(401).json({ message: "Missing authorization token" });
    }
    try {
      const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY);
      const user = await User.findById(decoded._id);
      const userData = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      };
      const newAccessToken = generateAccessToken(userData);
      req.user = userData;
      res.status(201).json({ data: newAccessToken });
      return next();
    } catch (error) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }
  }
  jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY, (error, decoded) => {
    if (error) {
      return res
        .status(403)
        .json({ message: "Access token expired or invalid" });
    }
    req.user = decoded;
  });
  // console.log(req.cookies?.token);
  next();
};
