import config from "./config/index.js";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import logger from "./utils/logger.js";

// ============================================================
// Connect to Database
// ============================================================
connectDB();

// ============================================================
// Start Server
// ============================================================
const server = app.listen(config.port, () => {
  logger.info(`🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`);
  logger.info(`📋 Health check: http://localhost:${config.port}/api/health`);
  logger.info(`🌐 Frontend URL: ${config.frontendUrl}`);
});

// ============================================================
// Graceful Shutdown Handling
// ============================================================

// Handle Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Promise Rejection: ${err.message}`);
  logger.error(err.stack);
  server.close(() => {
    process.exit(1);
  });
});

// Handle Uncaught Exception
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  logger.error(err.stack);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM (e.g., Docker, Heroku)
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    logger.info("Process terminated.");
  });
});

// Handle SIGINT (Ctrl+C)
process.on("SIGINT", () => {
  logger.info("SIGINT received. Shutting down gracefully...");
  server.close(() => {
    logger.info("Process terminated.");
    process.exit(0);
  });
});