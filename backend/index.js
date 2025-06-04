import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';
import { error } from 'console';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

dotenv.config();

const port=process.env.PORT || 4000;



import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
const app = express();
app.use(cookieParser());
app.use(
    cors({
   
        origin:'http://localhost:5173',
        credentials:true,
        methods:['GET','POST','PUT','DELETE','PATCH']
    })
) 

app.use(express.json());


import Users from './model/Users.js';
import Category from './model/Category.js';
import AuthRoutes from './routes/Auth.js';
import adminRoutes from './routes/adminRoutes.js';




app.use("/uploads", express.static("uploads")); // serve uploaded files
try{
mongoose.connect(process.env.MONGO_DB);
console.log("mongodb connected");
}
catch(error){
    console.log(error);
}

app.get("/",(req,res)=>{
    res.send("Express App is Running");
})

app.use("/api/auth",AuthRoutes);    ``
app.use("/api/admin", adminRoutes);
app.use("/customers", customerRoutes);
app.use(productRoutes);
app.use(categoriesRoutes)

// app.post('/addCategory', async (req, res) => {
//     try {
//         const { category, parent } = req.body;

//         const newCategory = new Category({
//             category,
//             parent: parent || null,  // Set parent if provided, else it's a top-level category
//         });
  
//       await newCategory.save();
  
//       res.status(201).json({ success: true, message: "Category added successfully" });
//     } catch (error) {
//       if (error.code === 11000) {
//         res.json({ success: false, message: "Category already exists" });
//       } else {
//         res.status(500).json({ success: false, message: "Server error: " + error.message });
//       }
//     }
//   });

//   app.get('/getCategories', async (req, res) => {
  
//     try {
//         const categories = await Category.find().populate('parent', 'category');
//         res.json(categories);
//       } catch (error) {
//         res.status(500).json({ success: false, message: "Server error: " + error.message });
//       }
// });


//   app.get('/list', async (req, res) => {
//     const categories = await Category.find();
//     res.send(categories);
//   });

// app.post('/signup',async(req,res)=>{

//     let check=await Users.findOne({email:req.body.email});
//     if(check){
//         return res.status(400).json({
//             success:false,
//             errors:"existing user with same email"
//         })
//     }

//     const user=new Users({
//         email:req.body.email,
//         name:req.body.username,
//         password:req.body.password,
//         mobile:req.body.mobile,
//         address:req.body.address
//     })

//     await user.save();

//     const data={
//         user:{
//             id:user.id
//         }
//     }
//     let currUser=req.body.username;

//     const token=jwt.sign(data,'secret');
//     res.json({success:true,token,currUser});

// })

// //JWT middleware
// const verifyToken=(req,res,next)=>{
//     const token = req.header('auth-token');
//     if(!token)
//         return res.status(401).json({success:false,message: "Access denied. No token provided."})

//     try{
//     const verified=jwt.verify(token,'secret');
//     req.user=verified.user;
//     next();
//     }
//     catch(err){
//         res.status(400).json({ success: false, message: "Invalid token." });
//     }
// }
// // Change Password API
// app.post('/change-password',verifyToken,async(req,res)=>{
//     const { oldPassword, newPassword } = req.body;

//     try{
//         const user = await Users.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found." });
//         }
//         if (user.password !== oldPassword) {
//             return res.status(400).json({ success: false, message: "Old password is incorrect." });
//         }

//         user.password=newPassword;
//         await user.save();

//         res.json({ success: true, message: "Password changed successfully." });

//     }
//     catch (err) {
//         res.status(500).json({ success: false, message: "Server error." });
//     }
// })
// app.put('/update-details',verifyToken,async(req,res)=>{
//     const {name,mobile,address} = req.body;
//     try{
//         const user = await Users.findById(req.user.id);
//         if(!user){
//             return res.status(404).json({ success: false, message: "User not found." });
//         }

//         if (name) user.name = name;
//         if (mobile) user.mobile = mobile;
//         if (address) user.address = address;
//         await user.save();

//         res.json({ success: true, message: "Profile updated successfully.", user });

//     }catch{
//         res.status(500).json({ success: false, message: "Server error." });
//     }
// })
// app.get('/home',verifyToken,async(req,res)=>{
//     try{
//         const user = await Users.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found." });
//         }

//         res.json({
//             success: true,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 mobile: user.mobile,
//                 address: user.address
//             }
//         });

//     }catch(err){
//         res.status(500).json({ success: false, message: "Server error." });
//     }
// })

// app.post('/login',async(req,res)=>{
//     let user=await Users.findOne({email:req.body.email});
 
//     if(user){
//         let currUser=user.name;
//         const passCompare=req.body.password===user.password;

//         if(passCompare){
//             const data={
//                 user:{
//                     id:user.id
//                 }
//             }
        
//             const token=jwt.sign(data,'secret');
//             res.json({success:true,token,currUser});
//         }
//         else{
//             res.json({success:false,errors:"Wrong password"});
//         }
//     }
//     else{
//         res.json({success:false,errors:"Wrong Email Id"});
//     }

 
// })
// app.patch('/update/:id',verifyToken,async(req,res)=>{
   
//     try{
        
//         const { category, parent } = req.body;

//         const updatedCategory = await Category.findByIdAndUpdate(
//           req.params.id,
//           { category, parent: parent || null }, // Set parent to null if empty
//           { new: true } // Return the updated document
//         );
//         res.json({ success: true, message: "Category updated successfully", updatedCategory });
//         if (!updatedCategory) {
//           return res.status(404).json({ success: false, message: "Category not found" });
//         }

//     }catch(err){
//         res.status(500).json({ success: false, message: 'Error Updating category' });
//     }
// })
// app.get("/getCategory/:id", async (req, res) => {
//     try {
//       const category = await Category.findById(req.params.id).populate("parent", "category");
  
//       if (!category) {
//         return res.status(404).json({ success: false, message: "Category not found" });
//       }
  
//       res.json(category);
//     } catch (error) {
//       res.status(500).json({ success: false, message: "Server error: " + error.message });
//     }
//   });
//   app.delete("/deleteCategory/:id", async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Check if category exists
//         const category = await Category.findById(id);
//         if (!category) {
//             return res.status(404).json({ message: "Category not found" });
//         }

//         // Find all categories that are children of this category (recursively)
//         const findAllSubcategories = async (parentId) => {
//             const subcategories = await Category.find({ parent: parentId });
//             for (let sub of subcategories) {
//                 await findAllSubcategories(sub._id); // Recursively delete all nested subcategories
//                 await Category.findByIdAndDelete(sub._id);
//             }
//         };

//         await findAllSubcategories(id); // Delete all subcategories
//         await Category.findByIdAndDelete(id); // Delete the main category

//         res.json({ message: "Category and all subcategories deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error: " + error.message });
//     }
// });

app.listen(port,(error)=>{
    if(!error){
        console.log('server running at port:'+port);
    }
    else{
       console.log('Error'+error);
    }
})

// export default verifyToken;