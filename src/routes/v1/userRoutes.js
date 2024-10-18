const { UserController } = require('../../controllers');

const router=require('express').Router();


router.post('/signin',UserController.loginUser);
// api/v1/user/
router.post('/',UserController.createUser);


module.exports=router