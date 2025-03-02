const authRepository = require("../repositories/auth.repository");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../helpers/jwtGenerate");
const generateHelper = require("../../../helpers/generate");
const sendMailHelper = require("../../../helpers/sendMail");

const register = async (fullName, email, password) => {
  const existEmail = await authRepository.getUserEmail(email);
  if (existEmail) {
    throw new Error("Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await authRepository.createUser({
    fullName,
    email,
    password: hashPassword,
  });
  const userData = {
    _id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
  };
  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken(userData);

  return { accessToken, refreshToken };
};

const login = async (email, password) => {
  const user = await authRepository.getUserEmail(email);
  if (!user) {
    return {
      status: 400,
      message: "User not found",
    };
  }
  const userData = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
  };
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return {
      status: 400,
      message: "Invalid password",
    };
  }

  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken(userData);

  return { accessToken, refreshToken };
};

const forgotPassword = async (email) => {
  const user = await authRepository.getUserEmail(email);
  if (!user) {
    return {
      status: 400,
      message: "User not found",
    };
  }
  const otp = generateHelper.generateRandomNumber(6);
  const timeExpire = 5;
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expiresAt: Date.now() + timeExpire * 60,
  };

  await authRepository.forgotPassword(objectForgotPassword);
  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  sendMailHelper.sendMail(email, subject, user, otp);
  return { status: 200 };
};

module.exports = { register, login, forgotPassword };
