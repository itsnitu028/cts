import express from "express"
const router = express.Router();
import { getAllCategories,listCategories,updateCategory,addCategory,getCategoryById,deleteCategory } from "../controller/categoryController";
import { checkAdmin } from "../middleware/checkAdmin";
import { verifyToken } from "../middleware/verifyToken";

router.post("/addCategory",checkAdmin,verifyToken, addCategory);
router.get("/getCategories", getAllCategories);
router.get("/list", listCategories);
router.get("/getCategory/:id", getCategoryById);
router.patch("/update/:id",checkAdmin,verifyToken, updateCategory);
router.delete("/deleteCategory/:id",checkAdmin,verifyToken, deleteCategory);

export default router;