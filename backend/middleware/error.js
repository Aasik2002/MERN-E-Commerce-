// ============================================================
// Custom Error Class - To handle custom operational errors
// ============================================================
class HandleError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        
        // Capture stack trace for debugging
        Error.captureStackTrace(this, this.constructor);
    }
}

export { HandleError };

// ============================================================
// Global Error Handling Middleware
// ============================================================
export default (err, req, res, next) => {
    console.error("Error Middleware caught error:", err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // 1. Mongoose duplicate key error (MongoDB unique constraint fail)
    if (err.code === 11000) {
        const keyValue = err.keyValue ? JSON.stringify(err.keyValue) : '';
        message = `Duplicate field value entered: ${keyValue}. Please use another value!`;
        statusCode = 400;
    }

    // 2. Mongoose bad ObjectId (CastError)
    if (err.name === "CastError") {
        message = `Resource not found. Invalid: ${err.path}`;
        statusCode = 404;
    }

    // 3. Mongoose Validation Error (Required fields missing)
    if (err.name === "ValidationError") {
        message = Object.values(err.errors).map(val => val.message).join(", ");
        statusCode = 400;
    }

    // 4. Mongoose Duplicate Key Alternative Error name check
    if (err.code === 11001) {
        message = "Duplicate key error encountered.";
        statusCode = 400;
    }

    // 5. JWT Invalid Token Error
    if (err.name === "JsonWebTokenError") {
        message = "Invalid JSON Web Token. Please try again.";
        statusCode = 401;
    }

    // 6. JWT Expired Token Error
    if (err.name === "TokenExpiredError") {
        message = "JSON Web Token has expired. Please log in again.";
        statusCode = 401;
    }

    // Send secure JSON response back to the client
    res.status(statusCode).json({
        success: false,
        message: message,
        // Include stack trace only if the app is running in development mode
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};