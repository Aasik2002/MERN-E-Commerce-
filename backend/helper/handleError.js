class HandeleError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.name = "HandeleError";
        Error.captureStackTrace(this,this.constructor);
    }
}

export default HandeleError;