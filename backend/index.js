const port=4000;
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const cors=require('cors');

const path=require('path');
const { error } = require('console');

app.use(express.json());
app.use(
    cors({
        origin:'http://localhost:5173',
        methods:['GET','POST','PUT','DELETE']
    })
)

mongoose.connect('mongodb+srv://itsnitu028:itsnitu@cluster0.0f1xe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.get("/",(req,res)=>{
    res.send("Express App is Running");
})

const Users=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
})

app.post('/signup',async(req,res)=>{

    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({
            success:false,
            errors:"existing user with same email"
        })
    }

    const user=new Users({
        email:req.body.email,
        name:req.body.username,
        password:req.body.password
    })

    await user.save();

    const data={
        user:{
            id:user.id
        }
    }

    const token=jwt.sign(data,'secret');
    res.json({success:true,token});

})
app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        const passCompare=req.body.password===user.password;

        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
        
            const token=jwt.sign(data,'secret');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"});
    }

 
})
app.listen(port,(error)=>{
    if(!error){
        console.log('server running at port:'+port);
    }
    else{
       console.log('Error'+error);
    }
})