const express= require("express");
const userModel= require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req,res,next){
    const token=req.cookies.token || req.headers.authorisation?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.user.Id);

        req.user=user;
        next();

    } catch (error) {
        res.status(401).json({
            message:"Unauthorised access, Invalid token",
        })
    }
    
    
}

module.exports={

    authMiddleware
    
}