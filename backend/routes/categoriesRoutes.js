import express from "express"
const router = express.Router();
import { getAllCategories,listCategories,updateCategory,addCategory,getCategoryById,deleteCategory } from "../controller/categoryController.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { verifyToken } from "../middleware/verifyToken.js";

router.post("/addCategory",checkAdmin,verifyToken, addCategory);
router.get("/getCategories", getAllCategories);
router.get("/list", listCategories);
router.get("/getCategory/:id", getCategoryById);
router.patch("/update/:id",checkAdmin,verifyToken, updateCategory);
router.delete("/deleteCategory/:id",checkAdmin,verifyToken, deleteCategory);

export default router;