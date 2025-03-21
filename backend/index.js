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
    },
    mobile:{
        type:Number
    },
    address:{
        type:String
    }
})

const Category = mongoose.model('Category', {
    category: {
        type: String,
        required: true,
        unique: true,
      },
});

app.post('/addCategory', async (req, res) => {
    try {
      const category = new Category({
        category: req.body.category,  // Correcting this line
      });
  
      await category.save();
  
      res.status(201).json({ success: true, message: "Category added successfully" });
    } catch (error) {
      if (error.code === 11000) {
        res.json({ success: false, message: "Category already exists" });
      } else {
        res.status(500).json({ success: false, message: "Server error: " + error.message });
      }
    }
  });

  app.get('/list', async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
  });

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
        password:req.body.password,
        mobile:req.body.mobile,
        address:req.body.address
    })

    await user.save();

    const data={
        user:{
            id:user.id
        }
    }
    let currUser=req.body.username;

    const token=jwt.sign(data,'secret');
    res.json({success:true,token,currUser});

})

//JWT middleware
const verifyToken=(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token)
        return res.status(401).json({success:false,message: "Access denied. No token provided."})

    try{
    const verified=jwt.verify(token,'secret');
    req.user=verified.user;
    next();
    }
    catch(err){
        res.status(400).json({ success: false, message: "Invalid token." });
    }
}
// Change Password API
app.post('/change-password',verifyToken,async(req,res)=>{
    const { oldPassword, newPassword } = req.body;

    try{
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        if (user.password !== oldPassword) {
            return res.status(400).json({ success: false, message: "Old password is incorrect." });
        }

        user.password=newPassword;
        await user.save();

        res.json({ success: true, message: "Password changed successfully." });

    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error." });
    }
})
app.put('/update-details',verifyToken,async(req,res)=>{
    const {name,mobile,address} = req.body;
    try{
        const user = await Users.findById(req.user.id);
        if(!user){
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if (name) user.name = name;
        if (mobile) user.mobile = mobile;
        if (address) user.address = address;
        await user.save();

        res.json({ success: true, message: "Profile updated successfully.", user });

    }catch{
        res.status(500).json({ success: false, message: "Server error." });
    }
})
app.get('/home',verifyToken,async(req,res)=>{
    try{
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
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

    }catch(err){
        res.status(500).json({ success: false, message: "Server error." });
    }
})

app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});
 
    if(user){
        let currUser=user.name;
        const passCompare=req.body.password===user.password;

        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
        
            const token=jwt.sign(data,'secret');
            res.json({success:true,token,currUser});
        }
        else{
            res.json({success:false,errors:"Wrong password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"});
    }

 
})
app.put('/update/:id',verifyToken,async(req,res)=>{
    const {updatedCategory}=req.body;
    try{
        const categoryId = req.params.id;
        const findCategory = await Category.findById(categoryId);
        if(!findCategory){
            return res.status(404).json({ success: false, message: "User not found." });
        }
        if(updatedCategory){
            findCategory.category=updatedCategory;
        }
         
        await findCategory.save();

        res.json({ success: true, message: "Category updated successfully.", findCategory });

    }catch(err){
        res.status(500).json({ success: false, message: 'Error Updating category' });
    }
})
app.delete('/deleteCategory/:id',async(req,res)=>{
    try{
        const categoryId = req.params.id;
        await Category.findByIdAndDelete(categoryId);
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    }catch(err){
        res.status(500).json({ success: false, message: 'Error deleting category' });
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