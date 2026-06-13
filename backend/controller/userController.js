import User from "../Models/UserModel.js";
import { getToken } from "../helper/jwtToken.js";
import sendEmail from "../helper/sendEmail.js";
import HandeleError from "../helper/handleError.js";
import crypto from "crypto";

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

// Logout user

export const logoutUser = (req,res,next) => {
  const Options = {
    httpOnly: true,
    secure: true
  };
  res.status(200).cookie("token", null, Options).json({
    success: true,
    message: "Logged out successfully"
  });
}

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
      return res.status(400).json({ success: false, message: "Old Password is incorrect" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({ success: false, message: "Password does not match" });
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
  const { name, email } = req.body;
  const updateteduserdetails = { name, email };
  const user = await User.findByIdAndUpdate(req.user.id, updateteduserdetails, {new: true, runValidators: true, useFindAndModify: false});
  res.status(200).json({
    success: true,
    user,
    message: "Profile Updated Successfully"
  });
}

//Forgot Password
/*
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new HandleError("User does not exists", 400));
  }

  let resetToken;

  try {
    resetToken = user.createPasswordResetToken();

    await user.save();

    console.log(resetToken);

  } catch (error) {
    console.log(error);

    return next(
      new HandleError("Could not save reset token, Try again later..", 500)
    );
  }

  const resetPasswordURL =
    `${req.protocol}://${req.host}/reset/${resetToken}`;

  const message =
    `Reset your password using the link below:\n${resetPasswordURL}\n\nThe link expires in 30 minutes.\n\nIf this was not requested, please ignore this email.`;
    try{
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
    } catch (error) {
      console.log(error);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return next(
        new HandleError("Could not send email, Try again later..", 500)
      );
    }
};
*/

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new HandleError("User does not exists", 400));
  }

  let resetToken;

  try {
    resetToken = user.createPasswordResetToken();

    await user.save();

    console.log(resetToken);

  } catch (error) {
    console.log(error);

    return next(
      new HandleError("Could not save reset token, Try again later..", 500)
    );
  }

  const resetPasswordURL =
    `${req.protocol}://${req.host}/reset/${resetToken}`;

  const message =
    `Reset your password using the link below:\n${resetPasswordURL}\n\nThe link expires in 30 minutes.\n\nIf this was not requested, please ignore this email.`;
  const messageHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          
          <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Password Reset Request</h1>
          </div>

          <div style="padding: 30px;">
            <p>Hello,</p>

            <p>
              We received a request to reset your password. Click the button below to create a new password.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetPasswordURL}"
                style="background: #2563eb; color: white; text-decoration: none; padding: 12px 24px; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>

            <p>
              If the button doesn't work, copy and paste the following link into your browser:
            </p>

            <p style="word-break: break-all;">
              <a href="${resetPasswordURL}">${resetPasswordURL}</a>
            </p>

            <p>
              <strong>Note:</strong> This link will expire in 30 minutes.
            </p>

            <p>
              If you did not request a password reset, you can safely ignore this email.
            </p>

            <p>
              Regards,<br>
              <strong>Your Application Team</strong>
            </p>
          </div>

          <div style="background: #f8f9fa; padding: 15px; text-align: center; color: #666;">
            © ${new Date().getFullYear()} Your Application. All rights reserved.
          </div>

        </div>
      </body>
      </html>
`;
    try{
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
      messageHTML: messageHTML,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
    } catch (error) {
      console.log(error);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({validateBeforeSave: false});

      return next(
        new HandleError("Could not send email, Try again later..", 500)
      );
    }
};


//Reset Password

export const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new HandleError("Reset Password Token is invalid or has expired", 400));
  }
  const {password, confirmPassword} = req.body;
  if(password !== confirmPassword){
    return next(new HandleError("Password and Confirm Password do not match", 400));
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
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
      return res.status(400).json({ success: false, message: `User does not exist with Id: ${req.params.id}` });
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
      return res.status(400).json({ success: false, message: `User does not exist with Id: ${req.params.id}` });
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
      return res.status(400).json({ success: false, message: `User does not exist with Id: ${req.params.id}` });
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





