const userModel= require("../models/user.model")
const jwt=require("jsonwebtoken")
const emailService= require ("../services/email.service")

/** 
 * -user register controller 
 * -POST /api/auth/register
 * - Access : public 
*/

async function userRegisterController(req,res){
    const {email , name , password }= req.body;
    
    if(!email ||  !name || !password){
      res.status(400).json({
        message:"All fields are required" 
        });
 }

    const isExists= await userModel.findOne({email} )
    if(isExists){
        return res.status(400).json({
            message:"User already exists with email",
            status:"failed"
        })
    }

    const user= await userModel.create({
        email,password,name
    })
    const token =jwt.sign({ userId:user._id },process.env.JWT_SECRET_KEY,{
        expiresIn:"3d",
    })
    res.cookie("token",token);
    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name,
        },
        token
    })
    
     await emailService.sendRegistrationEmail(user.email,user.name);


}
/**
 * - user login credetials
 * - Get api/auth/login
 * - Access Public
 * 
 */
async function userLoginController(req,res){
    const {email,password,} = req.body;

   const user=await userModel.findOne({email}).select("+password");
   if(!user){
     return res.status(401).json({
        message:'Email or password is invalid'
     })
   }
   const isValidPassword=await user.comparePassword(password);
   if(!isValidPassword){
    return res.status(401).json({
        message:'Email or password is invalid'
     })
   }
     const token =jwt.sign({ userId:user._id },process.env.JWT_SECRET_KEY,{
        expiresIn:"3d",
    })
    res.cookie("token",token);
    res.status(200).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name,
        },
        token
    })
}

module.exports={
    userRegisterController,
    userLoginController
}