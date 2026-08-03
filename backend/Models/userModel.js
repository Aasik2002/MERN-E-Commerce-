import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [25, "Name cannot exceed 25 characters"],
        minLength: [3, "Name should have more than 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should have more than 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationOTP: String,
    emailVerificationExpire: Date,
    refreshToken: {
        type: String,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},
{ timestamps: true });

// ✅ Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// ✅ JWT Access Token Generation
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "15m",
    });
};

// ✅ JWT Refresh Token Generation
userSchema.methods.getRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d",
    });
};

// ✅ Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Generate Password Reset Token
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
    
    return resetToken;
};

// ✅ Generate Email Verification OTP
userSchema.methods.createEmailVerificationOTP = function () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

    this.emailVerificationOTP = crypto.createHash("sha256").update(otp).digest("hex");
    this.emailVerificationExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    return otp;
};

export default mongoose.model("User", userSchema);