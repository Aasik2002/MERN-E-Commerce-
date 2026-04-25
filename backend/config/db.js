import mongoose from "mongoose";

const connectDB =  () => {
    mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
        console.log("DB connection successful",data.connection.host);
    })
    .catch((err) => {
        console.error("DB connection error:", err);
    });
};

export { connectDB };