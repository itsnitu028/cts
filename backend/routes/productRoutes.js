import express from "express";
import multer from "multer";
import Product from "../model/Product.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
      cb(null, Date.now() + "-" + file.originalname),
  });
  const upload = multer({ storage });

router.post("/addProduct", upload.single("image"), async (req, res) => {
    try {
      const {
        name,
        description,
        type,
        category,
        simple,
        variable
      } = req.body;

        if (!name || !description || !type || !category) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }
  
      const image = req.file?.filename;
  
      const newProduct = new Product({
        name,
        description,
        image,
        type,
        simple: type === "simple" ? JSON.parse(simple) : undefined,
        variable: type === "variable" ? JSON.parse(variable) : undefined,
        category
      });
  
      await newProduct.save();
      res.json({ success: true, message: "Product added successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to add product." });
    }
  });

  router.get('/getProducts', async (req, res) => {
    try {
      const products = await Product.find().populate('category');
      res.json(products);
      // console.log(products);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });
  router.delete('/deleteProduct/:id', async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  });

export default router;