const { UserController } = require('../../controllers');
const { UserMiddleware } = require('../../middlewares');

const router=require('express').Router();


router.post('/signin',UserController.loginUser);
router.get('/private',UserMiddleware.validateUser,(req,res)=>{
    res.json({acceess:true})
});
router.post('/',UserController.createUser);


module.exports=router