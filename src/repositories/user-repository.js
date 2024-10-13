const {User}=require('../models')
const CrudRepository=require('./crud-repository')

class UserRespository extends CrudRepository{
    constructor(){
        super(User);
    }
}

module.exports=UserRespository

