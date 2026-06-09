import User from "../Models/UserModel.js";
import { getToken } from "../helper/jwtToken.js";

// Register user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Please enter your name" });

    }
    if (!email) {
      return res.status(400).json({ success: false, message: "Please enter your email" });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: "Please enter your password" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists with this email" });
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: "temp_id", url: "temp_url" },
    });

    user.password = undefined;

    getToken(user, 201, res, "User Registered Successfully");
  } catch (error) {
    next(error);
  }
};

// Login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please enter email and password" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) return res.status(401).json({ success: false, message: "Invalid email or password" });
    
    user.password = undefined;
    getToken(user, 200, res, "Login successful");
  } catch (error) {
    next(error);
  }
};