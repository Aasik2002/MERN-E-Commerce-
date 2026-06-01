export default (err,req,res,next)=>{
    console.error("Error Middleware caught error:", err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
};