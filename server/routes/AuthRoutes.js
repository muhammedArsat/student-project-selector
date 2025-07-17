const express = require("express");
const route = express.Router();
const {
  googleCallback,
  getMe,
  logout,
  login
} = require("../controller/AuthController");
const {
  verifyAdminToken,
  verifyFacultyToken,
  verifyToken,
} = require("../middleware/AuthMiddleware");
const passport = require("../config/Passport");
const dotenv = require('dotenv');
dotenv.config();
route.get("/get-me", verifyToken, getMe);

route.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
  })
);
route.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/un-authorized`,
  }),
  googleCallback
);


route.post('/login', login);
route.get("/logout", logout);

module.exports = route