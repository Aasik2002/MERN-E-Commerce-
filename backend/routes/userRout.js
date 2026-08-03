import express from "express";
import { 
  registerUser, 
  verifyEmail,
  loginUser, 
  refreshAccessToken,
  logoutUser, 
  getUserDetails, 
  updatePassword, 
  updateProfile, 
  getAllUsers, 
  getSingleUser, 
  updateUserRole, 
  deleteUser,
  forgotPassword,
  resetPassword,
} from "../controller/userController.js";
import { Verifyuser, roleBasedAccess } from "../helper/userAuth.js";

const router = express.Router();

// Routes for user registration, email verification, login & token refresh
router.route("/register").post(registerUser);
router.route("/verify-email").post(verifyEmail);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/logout").get(logoutUser);

// Password management routes
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);

// User profile & settings routes
router.route("/me").get(Verifyuser, getUserDetails);
router.route("/password/update").put(Verifyuser, updatePassword);
router.route("/me/update").put(Verifyuser, updateProfile);

// Admin routes
router.route("/admin/users").get(Verifyuser, roleBasedAccess("admin"), getAllUsers);
router.route("/admin/user/:id")
  .get(Verifyuser, roleBasedAccess("admin"), getSingleUser)
  .put(Verifyuser, roleBasedAccess("admin"), updateUserRole)
  .delete(Verifyuser, roleBasedAccess("admin"), deleteUser);

export default router;