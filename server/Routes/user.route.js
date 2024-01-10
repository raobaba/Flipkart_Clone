const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../Controllers/User.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../Middlewares/auth");

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logoutUser);

userRouter.route("/me").get(isAuthenticatedUser, getUserDetails);
userRouter.route("/password/forgot").post(forgotPassword);
userRouter.route("/password/reset/:id/:token").put(resetPassword);
userRouter.route("/password/update").put(isAuthenticatedUser, updatePassword);

userRouter.route("/me/update").put(isAuthenticatedUser, updateProfile);
userRouter
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

userRouter
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = userRouter;
