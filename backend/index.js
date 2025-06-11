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
// mongoose.connect(process.env.MONGO_DB);
mongoose.connect("mongodb+srv://itsnitu028:itsnitu@cluster0.0f1xe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
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


app.listen(port,(error)=>{
    if(!error){
        console.log('server running at port:'+port);
    }
    else{
       console.log('Error'+error);
    }
})

