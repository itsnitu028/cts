import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
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

const Users = mongoose.model("Users", UserSchema);

export default Users;