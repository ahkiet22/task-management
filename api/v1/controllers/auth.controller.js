const authService = require("../services/auth.service");

// [POST] /api/v1/auth/register
const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const { accessToken, refreshToken } = await authService.register(
      fullName,
      email,
      password
    );
    const oneDay = 24 * 60 * 60 * 1000;

    res.cookie("token", refreshToken, {
      httpOnly: true,
      maxAge: oneDay,
      secure: true,
      sameSite: "strict",
    });
    res.status(201).json({ message: "Register success", data: accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// [POST] /api/v1/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    if (data?.status == 400) {
      return res.status(400).json({ message: data.message });
    }

    const oneDay = 24 * 60 * 60 * 1000;
    res.cookie("token", data.refreshToken, {
      httpOnly: true,
      maxAge: oneDay,
      secure: true,
      sameSite: "strict",
    });
    res.status(201).json({ message: "Login success", data: data.accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// [POST] /api/v1/auth/forgot-password
const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const data = await authService.forgotPassword(email);
  if (data.status == 200) {
    res.status(200).json({ status: 200, message: "Sent otp code via email!" });
  }
};

// [POST] /api/v1/auth/forgot-password/otp
const otpPassword = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const data = await authService.otpPassword(email, otp);
  res.status(data.status).json({ status: data.status, message: data.message });
};

// [POST] /api/v1/auth/forgot-password/reset-password
const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;
  try {
    const data = await authService.resetPassword(email, otp, password);
    res
      .status(data.status)
      .json({ status: data.status, message: data.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  otpPassword,
  resetPassword,
};
