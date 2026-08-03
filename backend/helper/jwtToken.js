import User from "../Models/userModel.js";

// Create and send token, save refresh token in cookie
export const getToken = async (user, statusCode, res, message) => {
    // Generate Access & Refresh Tokens using model methods
    const token = user.getJwtToken();
    const refreshToken = user.getRefreshToken();

    // Save Refresh Token to database (for token rotation and security)
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Cookie expiration for Access Token
    const options = {
        expires: new Date(
            Date.now() + (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };

    // Specific Cookie options for Refresh Token (longer duration, e.g., 7 days)
    const refreshTokenOptions = {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };

    const responsePayload = { 
        success: true, 
        token, // Access Token for Authorization header / local storage if needed
        user 
    };
    
    if (message) {
        responsePayload.message = message;
    }

    // Send both tokens via httpOnly cookies and response json
    res.status(statusCode)
       .cookie("token", token, options)
       .cookie("refreshToken", refreshToken, refreshTokenOptions)
       .json(responsePayload);
};