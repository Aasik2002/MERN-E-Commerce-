import HandeleError from "./handleError.js";
import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

export const Verifyuser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return next(new HandeleError("Access denied. No token provided.", 401));
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new HandeleError("Invalid or expired token.", 401));
    }
}

//rold based access control
export const roleBasedAccess = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new HandeleError(`Role ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    };
}