import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/useRout.js";
import errorHanler from "./middleware/error.js";

const app = express();

app.use(express.json());


//Routes 
app.use("/api/v1",product);

app.use(errorHanler);

export default app;

