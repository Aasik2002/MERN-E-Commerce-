import express from "express";
import product from "./routes/productroutes.js";
import user from "./routes/userRout.js";
import orderRoute from "./routes/orderRoute.js";
import errorHanler from "./middleware/error.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", orderRoute);

app.use(errorHanler);

export default app;