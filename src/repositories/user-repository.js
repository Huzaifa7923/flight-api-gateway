const { where } = require('sequelize');
const {User}=require('../models')
const CrudRepository=require('./crud-repository')

class UserRespository extends CrudRepository{
    constructor(){
        super(User);
    }

    async findUserByEmail(data){
        const user=await User.findOne({where:{
            email:data
        }});
        return user;
    }
}

module.exports=UserRespository

