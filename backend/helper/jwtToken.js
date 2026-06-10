export const getToken = (user, statusCode, res, message) => {
    const token = user.getJwtToken && user.getJwtToken();
    const Options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    
    const responsePayload = { success: true, token, user };
    if (message) {
        responsePayload.message = message;
    }
    
    res.status(statusCode).cookie("token", token, Options).json(responsePayload);
};

