import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import config from "./config/index.js";
import logger from "./utils/logger.js";
import { errorHandler } from "./middleware/error.js";

// Route imports
import productRoutes from "./routes/productroutes.js";
import userRoutes from "./routes/userRout.js";
import orderRoutes from "./routes/orderRoute.js";

const app = express();

// ============================================================
// Security Middleware
// ============================================================

// Set security HTTP headers
app.use(helmet());

// CORS - Allow frontend origin
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate limiting - prevent brute force attacks
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requests per window
  message: {
    success: false,
    message: "Too many authentication attempts, please try again after 15 minutes.",
  },
});
app.use("/api/v1/login", authLimiter);
app.use("/api/v1/register", authLimiter);

// ============================================================
// Body Parsing & Sanitization
// ============================================================

// Parse JSON request body (limit 10kb to prevent payload attacks)
app.use(express.json({ limit: "10kb" }));

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Parse cookies
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent HTTP parameter pollution
app.use(
  hpp({
    whitelist: [
      "price",
      "ratings",
      "category",
      "stock",
      "numOfReviews",
      "sort",
      "page",
      "limit",
    ],
  })
);

// ============================================================
// HTTP Request Logging
// ============================================================
if (config.isDev) {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined", { stream: logger.stream }));
}

// ============================================================
// Health Check Endpoint
// ============================================================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// ============================================================
// API Routes
// ============================================================
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);

// ============================================================
// 404 Handler - Catch undefined routes
// ============================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ============================================================
// Global Error Handler (must be last middleware)
// ============================================================
app.use(errorHandler);

export default app;