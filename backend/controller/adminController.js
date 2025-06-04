// import { use } from "react";
import Users from "../model/Users.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';

const Getuser=async(req,res)=>{
  try{
        const users=await Users.find();
        res.status(200).json({users});
  }
  catch(error){
         res.status(500).json({message:"internal server error"});
         console.log(error);
  }
}
const deleteUser=async(req,res)=>{
  try{
      const userId=req.params.id;

      const checkAdmin=await Users.findById(userId);
      
      if(checkAdmin.role=="admin"){
        return res.status(409).json({message:"You cannot delete yourself"});
      }

      const user=await Users.findByIdAndDelete(userId);
      if(!user){
         return res.status(404).json({message:"user not found"});
      }
        res.status(200).json({message:"user deleted successfully",user});
  }
  catch(error){
         res.status(500).json({message:"internal server error"});
         console.log(error);
  }
}
const GetHome=async(req,res)=>{
  try{
        const user = await Users.findById(req.user._id);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "Admin not found." });
        }
                res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                address: user.address
            }
        });

  }
  catch(error){
         res.status(500).json({message:"internal server error"});
         console.log(error);
  }
}

const updateDetails=async(req,res)=>{
     const { name, mobile, address, email } = req.body;

  try {
    const user = await Users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (address) user.address = address;
    if (email) user.email = email;

    await user.save();

    res.json({ success: true, message: "Profile updated successfully.", user });

  }
   catch(error){
      res.status(500).json({message:"internal server error"});
         console.log(error);
   }
}
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await Users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const isMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Old password is incorrect." });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully." });

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.log(error);
  }
};


export {Getuser,deleteUser,GetHome,updateDetails,changePassword};