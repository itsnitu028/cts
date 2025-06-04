import Users from "../model/Users.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const register=async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        const existUser=await Users.findOne({email});
        if(existUser){
            return res.status(401).json({success:false,message:"User Already Exists"});
        }
       const hashpassword=await bcryptjs.hashSync(password,10);
        const newUser=new Users({
            name,email,password:hashpassword
        })

        await newUser.save();
        res.status(200).json({message:"user register successfully",newUser});

    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log(error);
    }
}
const Login=async(req,res)=>{
    try{
        const {email,password} = req.body;

        const user=await Users.findOne({email});
        if(!user){
            return res.status(404).json({success:false,message:"Invalid Credentials"});
        }
       const isValidPassword=await bcryptjs.compare(password,user.password);
       if(!isValidPassword){
           return res.status(404).json({success:false,message:"Invalid Credentials"});
       }
       const token=jwt.sign({userId:user._id},process.env.JWT);
       res.cookie("token",token,{
          httpOnly: true,
           secure: false, // true in production
           sameSite: 'lax',
           maxAge: 36000000, // 10 hours
           
       })
        res.status(200).json({success:true,message:"Login successfully",user,token});

    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log(error);
    }
}

const Logout=async(req,res)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({message:"User Logout successfully"});
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error"});
        console.log(error);
    }
}

export {register,Login,Logout}