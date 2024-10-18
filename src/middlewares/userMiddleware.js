const jwt=require('jsonwebtoken');
const { ServerConfig } = require('../config');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');

const validateUser=async(req,res,next)=>{
    try{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        throw new AppError('Auth Header not found',StatusCodes.BAD_REQUEST);
    }
    const token=authHeader.split(" ")[1];

    if(!token){
        throw new AppError('Token not found',StatusCodes.BAD_REQUEST);
    }
    const payload=jwt.verify(token,ServerConfig.SECRET)

    if(!payload||!payload.id || !payload.email){
        throw new AppError('Incorrect token',StatusCodes.BAD_REQUEST);
    }

    req.user=payload.id;
    next();
}catch(err){
    console.log(err)
    if(err instanceof AppError)
    ErrorResponse.error=err;    
    else
    ErrorResponse.error=err.message;
   return  res.json(ErrorResponse).status(err.statusCode?err.statusCode:StatusCodes.BAD_REQUEST);
}
}

module.exports={
validateUser
}