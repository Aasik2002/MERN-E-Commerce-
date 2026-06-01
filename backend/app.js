import express from "express";
import product from "./routes/productroutes.js"; 
import user from "./routes/userRout.js";
import errorHanler from "./middleware/error.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);

app.use(errorHanler);

export default app;