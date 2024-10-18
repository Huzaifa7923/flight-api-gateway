const { StatusCodes } = require("http-status-codes");
const { UserServices } = require("../services");
const AppError = require("../utils/errors/app-error");
const {SuccessRespone, ErrorResponse}=require('../utils/common')

const createUser=async(req,res)=>{
    
    try{
    const {email,password}=req.body;
    if(!email ||!password){
        throw new AppError('email or password missing',StatusCodes.BAD_REQUEST);
    }
    const user=await UserServices.createUser({email,password});
    SuccessRespone.data=user;
    res.status(StatusCodes.CREATED).json(SuccessRespone)
    }catch(err){
        console.log(err);
        ErrorResponse.error=err;
        res.status(err.statusCode?err.statusCode:StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
    if(!email || !password){
        throw new AppError('Email or Password missing',StatusCodes.BAD_REQUEST);
    }
    const token=await UserServices.loginUser({email,password});
    SuccessRespone.data.token=token;
    res.status(StatusCodes.OK).json(SuccessRespone)
    }catch(err){
        console.log(err);
        ErrorResponse.error=err;
        res.status(err.statusCode?err.statusCode:StatusCodes.BAD_REQUEST).json(ErrorResponse);
}
}

module.exports={createUser,loginUser};