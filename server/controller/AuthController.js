const User = require("../model/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const googleCallback = (req, res) => {
  const payload = {
    id: req.user._id,
    email: req.user.email,
    role: req.user.role,
    profile: req.user.profile,
  };

  const isProd = process.env.NODE_ENV === "PRODUCTION";
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2d" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    path: "/",
    sameSite: isProd ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.redirect(`${process.env.CLIENT_URL}/home`);
};

const getMe = async (req, res) => {
  try {
    const { email, role, id, profile } = req.user;
    console.log({
      ok: true,
      email: email,
      role: role,
      id: id,
      profile: profile,
    });
    return res.status(200).json({
      ok: true,
      email: email,
      role: role,
      id: id,
      profile: profile,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email } = req.body;
  const exisiting = await User.findOne({ email });
  const payload = {
    id: exisiting.id,
    email: exisiting.email,
    role: exisiting.role,
  };
  const isProd = process.env.NODE_ENV === "PRODUCTION";
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2d" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    path: "/",
    sameSite: isProd ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    ok: true,
    message: "User logged In",
  });
};
const logout = async (req, res) => {
  const isProd = process.env.NODE_ENV === "PRODUCTION";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    path: "/",
    sameSite: isProd ? "None" : "Lax",
  });

  return res.status(200).json({
    ok: true,
    message: "Cookie Cleared",
  });
};

module.exports = { googleCallback, getMe, logout, login };
