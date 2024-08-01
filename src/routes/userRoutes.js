const express = require("express");
const {
  Signup,
  ChangePassword,
  Login,
  Logout,
  UpdateProfile,
} = require("../controller/userController");

const userRoutes = express.Router();

// SIGNUP
// LOGIN
// CHANGE PASSWORD
// LOGOUT
// UPDATE PROFILE

userRoutes.post("/signup", Signup);
userRoutes.post("/login", Login);
userRoutes.put("/change-password/:id", ChangePassword);
userRoutes.post("/logout", Logout);
userRoutes.post("/update", UpdateProfile);

module.exports = userRoutes;
