import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';
import { connectDB } from './config/db.js';

// ✅ Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load env variables
dotenv.config({ path: path.join(__dirname, 'config/config.env') });

const PORT = process.env.PORT || 8000;

// ✅ Connect to DB
connectDB();

// ✅ Start server first, then use it in error handlers
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// ✅ Handle Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.error(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});

// ✅ Handle Uncaught Exception (lowercase 'process')
process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    server.close(() => {
        process.exit(1);
    });
});