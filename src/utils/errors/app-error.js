const { StatusCodes } = require("http-status-codes");

class AppError extends Error{
    constructor(message,statusCode){
        super(message)
        this.explanation=message;
        this.statusCode=statusCode?statusCode:StatusCodes.INTERNAL_SERVER_ERROR
    }
}

module.exports=AppError