import express from "express";
import { deleteUser, Getuser ,GetHome, updateDetails, changePassword} from "../controller/adminController.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
// import { registerUser, loginUser, getAllUsers } from "../controllers/userController.js";
// import verifyToken from "../middleware/verifyToken.js"
// import checkAdmin from "../middleware/checkAdmin.js"

const adminRoutes = express.Router();

adminRoutes.get('/getuser',checkAdmin,Getuser);
adminRoutes.post('/delete/:id',checkAdmin,deleteUser);
adminRoutes.get('/home',checkAdmin,GetHome);
adminRoutes.patch('/update-details',checkAdmin,updateDetails);
adminRoutes.post('/change-password',checkAdmin,changePassword);
// router.post("/register", verifyToken, checkAdmin, registerUser);
// router.post("/login", loginUser); // login open to all
// router.get("/", verifyToken, checkAdmin, getAllUsers);

export default adminRoutes;