const { UserController } = require('../../controllers');

const router=require('express').Router();

// api/v1/user/
router.post('/',UserController.createUser);

module.exports=router