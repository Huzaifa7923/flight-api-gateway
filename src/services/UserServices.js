const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories")
const AppError=require('../utils/errors/app-error')
const {Auth}=require('../utils/common')
const userRepository =new UserRepository();

const createUser=async(data)=>{
    try{
        const user=await userRepository.create(data);
        return user;
    }catch(err){
        console.log(err)
        throw new AppError(err.message,StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const loginUser=async(data)=>{
    try{
        const user=await userRepository.findUserByEmail(data.email);
        if(!user){
            throw new AppError('User not found by the corresponding email',StatusCodes.BAD_REQUEST);
        }
        if(!await Auth.matchPassword(data.password,user.password)){
            throw new AppError('Password do not match',StatusCodes.BAD_REQUEST)
        }
        const token=Auth.generateToken({id:user.id,email:user.email});
        return token;
    }catch(err){
        if(err instanceof AppError){
            throw err;
        }
        throw new AppError(err.message,StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports={createUser,loginUser}