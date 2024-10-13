const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories")
const AppError=require('../utils/errors/app-error')

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

module.exports={createUser}