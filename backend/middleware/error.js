class HandeleError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default (err,req,res,next)=>{
    console.error("Error Middleware caught error:", err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Duplicate KEy error
    if(err.code === 11000){
        err.message = `Duplicate field value entered: ${JSON.stringify(err.keyValue)}. Please use another value!`;
        err = new HandeleError(err.message, 400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
};