import express from "express";
import multer from "multer";
import Product from "../model/Product.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { addProduct,getProducts,deleteProduct,getProductId,updateProduct } from "../controller/productController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
      cb(null, Date.now() + "-" + file.originalname),
  });
  const upload = multer({ storage });

router.post("/addProduct", upload.single("image"),checkAdmin, addProduct);
router.get('/getProducts',getProducts );
router.delete('/deleteProduct/:id',checkAdmin,deleteProduct);
router.get("/getProduct/:id",checkAdmin,getProductId );
router.patch('/updateProduct/:id', upload.single('image'), checkAdmin,updateProduct );
  

export default router;