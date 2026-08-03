import mongoose from "mongoose";
import config from "./index.js";
import logger from "../utils/logger.js";

const connectDB = () => {
  mongoose
    .connect(config.dbUrl)
    .then((data) => {
      logger.info(`✅ MongoDB connected: ${data.connection.host}`);
    })
    .catch((err) => {
      logger.error(`❌ MongoDB connection error: ${err.message}`);
      process.exit(1);
    });
};

export { connectDB };