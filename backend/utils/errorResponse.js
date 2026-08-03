class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Captures the stack trace while omitting the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorResponse;