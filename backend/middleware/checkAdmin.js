import jwt from "jsonwebtoken";
import Users from "../model/Users.js";
import cookieParser from "cookie-parser";

export const checkAdmin = async(req, res, next) => {
  // const user = req.user; // req.user is populated
  try{
const bearerToken = req.headers.authorization?.split(" ")[1];
const token = req.cookies.token || bearerToken;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized:No token provided" });
  }
   const decoded=jwt.verify(token,process.env.JWT);
   const user=await Users.findById(decoded.userId);
  if (!user) {
    return res.status(401).json({ message: "user not found." });
  }
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  req.user=user;
    next();
  }
  catch(error){
    console.log(error);
  }

};