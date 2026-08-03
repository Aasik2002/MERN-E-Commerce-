import User from "../Models/userModel.js";
import { getToken } from "../helper/jwtToken.js";
import sendEmail from "../helper/sendEmail.js";
import { AppError } from "../middleware/error.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// Register user with Email Verification OTP
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return next(new AppError("Please enter your name", 400));
    }
    if (!email) {
      return next(new AppError("Please enter your email", 400));
    }
    if (!password) {
      return next(new AppError("Please enter your password", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
      return next(new AppError("User already exists with this email", 400));
    }

    user = await User.create({
      name,
      email,
      password,
    });

    // Generate Email Verification OTP
    const otp = user.createEmailVerificationOTP();
    await user.save({ validateBeforeSave: false });

    const message = `Your email verification OTP is: ${otp}. It expires in 10 minutes.`;
    const messageHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Email Verification</h2>
        <p>Hello ${name},</p>
        <p>Your OTP for account verification is:</p>
        <h3 style="background: #2563eb; color: white; padding: 10px 20px; display: inline-block; border-radius: 5px;">${otp}</h3>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Account Verification OTP",
        message,
        messageHTML,
      });

      res.status(201).json({
        success: true,
        message: `OTP sent to ${user.email} successfully. Please verify your email.`,
      });
    } catch (error) {
      user.emailVerificationOTP = undefined;
      user.emailVerificationExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return next(new AppError("Could not send verification email. Try again later.", 500));
    }
  } catch (error) {
    next(error);
  }
};

// Verify Email using OTP
export const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return next(new AppError("Please provide email and OTP", 400));
    }

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      email,
      emailVerificationOTP: hashedOTP,
      emailVerificationExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("Invalid or expired OTP", 400));
    }

    user.emailVerified = true;
    user.emailVerificationOTP = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();

    getToken(user, 200, res, "Email verified successfully");
  } catch (error) {
    next(error);
  }
};

// Login user with Refresh Token Support
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new AppError("Invalid email or password", 401));
    }

    if (!user.emailVerified) {
      return next(new AppError("Please verify your email before logging in", 401));
    }

    getToken(user, 200, res, "Login successful");
  } catch (error) {
    next(error);
  }
};

// Refresh Access Token
export const refreshAccessToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      return next(new AppError("Refresh Token not found. Please log in again.", 401));
    }

    const refreshToken = cookies.refreshToken;

    const decoded = jwt.verify(
      refreshToken, 
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user || user.refreshToken !== refreshToken) {
      return next(new AppError("Invalid Refresh Token", 403));
    }

    // Generate new Access Token
    const accessToken = user.getJwtToken();

    res.status(200).json({
      success: true,
      token: accessToken,
    });
  } catch (error) {
    return next(new AppError("Token is expired or invalid", 403));
  }
};

// Logout user (Clearing both tokens/cookies)
export const logoutUser = (req, res, next) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.status(200)
    .cookie("token", null, { ...options, expires: new Date(Date.now()) })
    .cookie("refreshToken", null, { ...options, expires: new Date(Date.now()) })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

// Get User Details
export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Update User Password
export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new AppError("Old Password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new AppError("Password does not match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    getToken(user, 200, res, "Password Updated Successfully");
  } catch (error) {
    next(error);
  }
};

// Update User Profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const updatedUserData = { name, email };
    
    const user = await User.findByIdAndUpdate(req.user.id, updatedUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Forgot Password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("User does not exist", 400));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordURL = `${req.protocol}://${req.get("host")}/reset/${resetToken}`;

    const message = `Reset your password using the link below:\n${resetPasswordURL}\n\nThe link expires in 30 minutes.`;
    const messageHTML = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"></head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 30px;">
          <h2>Password Reset Request</h2>
          <p>Click the button below to reset your password:</p>
          <a href="${resetPasswordURL}" style="background: #2563eb; color: white; text-decoration: none; padding: 12px 24px; border-radius: 5px; display: inline-block;">Reset Password</a>
          <p>This link expires in 30 minutes.</p>
        </div>
      </body>
      </html>
    `;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
      messageHTML,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
    }
    return next(new AppError("Could not send email, Try again later..", 500));
  }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("Reset Password Token is invalid or has expired", 400));
    }

    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return next(new AppError("Password and Confirm Password do not match", 400));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    getToken(user, 200, res, "Password reset successfully");
  } catch (error) {
    next(error);
  }
};

// Admin Functionalities
// Get all users (Admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// Get single user (Admin)
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError(`User does not exist with Id: ${req.params.id}`, 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Update User Role (Admin)
export const updateUserRole = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!user) {
      return next(new AppError(`User does not exist with Id: ${req.params.id}`, 400));
    }

    res.status(200).json({
      success: true,
      message: "Role Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete User (Admin)
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError(`User does not exist with Id: ${req.params.id}`, 400));
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};