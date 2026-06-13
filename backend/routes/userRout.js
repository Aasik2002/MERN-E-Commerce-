import express from "express";
import { 
  registerUser, 
  loginUser, 
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

// routes for user registration and login
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/updateprofile").put(Verifyuser, updateProfile);
router.route("/updatePassword").put(Verifyuser, updatePassword);

// user profile routes
router.route("/me").get(Verifyuser, getUserDetails);
router.route("/password/update").put(Verifyuser, updatePassword);
router.route("/me/update").put(Verifyuser, updateProfile);

// admin routes
router.route("/admin/users").get(Verifyuser, roleBasedAccess("admin"), getAllUsers);
router.route("/admin/user/:id")
  .get(Verifyuser, roleBasedAccess("admin"), getSingleUser)
  .put(Verifyuser, roleBasedAccess("admin"), updateUserRole)
  .delete(Verifyuser, roleBasedAccess("admin"), deleteUser);

export default router;