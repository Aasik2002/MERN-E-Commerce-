// ============================================================
// Centralized Configuration - Single source of truth for all config
// ============================================================
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from root .env
dotenv.config({ path: path.join(__dirname, "../../.env") });

const config = {
  // Server
  port: parseInt(process.env.PORT, 10) || 8000,
  nodeEnv: process.env.NODE_ENV || "development",
  isDev: process.env.NODE_ENV !== "production",

  // Database
  dbUrl: process.env.DB_URL || "mongodb://127.0.0.1:27017/ecommerce",

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE || "7d",
    cookieExpire: parseInt(process.env.JWT_COOKIE_EXPIRE, 10) || 7,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpire: process.env.JWT_REFRESH_EXPIRE || "7d",
  },

  // SMTP Email
  smtp: {
    service: process.env.SMTP_SERVICE,
    mail: process.env.SMTP_MAIL,
    password: process.env.SMTP_PASSWORD,
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 465,
  },

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  // Stripe
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },

  // Frontend
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
  },
};

// Validate required config
const requiredVars = ["jwt.secret", "dbUrl"];
for (const key of requiredVars) {
  const value = key.split(".").reduce((obj, k) => obj?.[k], config);
  if (!value) {
    console.error(`❌ Missing required environment variable for: ${key}`);
    process.exit(1);
  }
}

export default config;
