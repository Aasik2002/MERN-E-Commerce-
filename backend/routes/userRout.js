import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";

const router = express.Router();

// routes for user registration and login
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;