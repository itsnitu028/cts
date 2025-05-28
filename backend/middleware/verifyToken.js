import jwt from "jsonwebtoken";
import Users from "../model/Users.js"

export const verifyToken=async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token)
        return res.status(401).json({success:false,message: "Access denied. No token provided."})

    try{
    const verified=jwt.verify(token,'secret');
    req.user=await Users.findById(verified.id); // populate req.user
    next();
    }
    catch(err){
        res.status(400).json({ success: false, message: "Invalid token." });
    }
}