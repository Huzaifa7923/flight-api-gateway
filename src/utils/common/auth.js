const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {ServerConfig}=require('../../config')
const {SECRET}=ServerConfig

const generateToken=(user)=>{
    const token=jwt.sign(user,SECRET,{
        expiresIn:'30d'
    })
    return token;
}

const matchPassword=async(plainPassword,encryptedPassword)=>{
    try{
    const matched=await bcrypt.compare(plainPassword,encryptedPassword)
    console.log(matched);

    if(matched)
        return true;
    return false;
}catch(err){
    throw err;
}
}


// const verfiyToken=(token)=>{

//     const user=jwt.verify(token,SECRET);
// }

module.exports={matchPassword,generateToken}