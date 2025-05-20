import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    mobile: {
        type: Number,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
});

const Users = mongoose.model("Users", UserSchema);

export default Users;
