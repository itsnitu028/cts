import express from "express"
import { register,Login,Logout } from "../controller/Auth.js";
const AuthRoutes= express.Router();

AuthRoutes.post('/register',register)
AuthRoutes.post('/login',Login)
AuthRoutes.post('/logout',Logout)


export default AuthRoutes;