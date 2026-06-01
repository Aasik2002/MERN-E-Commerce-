import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";

const router = express.Router();

// ரூட்கள் சரியாக உள்ளதா என்று பார்
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;