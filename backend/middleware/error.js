// ============================================================
// AppError - Unified Custom Error Class
// Replaces: HandleError, HandeleError, ErrorResponse
// ============================================================
import logger from "../utils/logger.js";

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError };

// For backward compatibility with existing code
export default AppError;

// ============================================================
// Global Error Handling Middleware
// ============================================================
export const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(`${err.message}`, {
    statusCode: err.statusCode || 500,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
    stack: err.stack,
  });

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // 1. Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    message = `Duplicate value for "${field}". Please use another value.`;
    statusCode = 400;
  }

  // 2. Mongoose bad ObjectId (CastError)
  if (err.name === "CastError") {
    message = `Resource not found. Invalid: ${err.path}`;
    statusCode = 404;
  }

  // 3. Mongoose Validation Error
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    statusCode = 400;
  }

  // 4. JWT Invalid Token
  if (err.name === "JsonWebTokenError") {
    message = "Invalid authentication token. Please login again.";
    statusCode = 401;
  }

  // 5. JWT Expired Token
  if (err.name === "TokenExpiredError") {
    message = "Authentication token has expired. Please login again.";
    statusCode = 401;
  }

  // 6. Multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    message = "File too large. Maximum size is 5MB.";
    statusCode = 400;
  }

  // 7. Syntax Error (malformed JSON)
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    message = "Invalid JSON in request body.";
    statusCode = 400;
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      error: err.name,
      stack: err.stack,
    }),
  });
};