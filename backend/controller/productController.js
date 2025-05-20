import Product  from "../model/Product";

export const addProduct = async (req, res) => {
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
  }
export const getProducts= async (req, res) => {
    try {
      const products = await Product.find().populate('category');
      res.json(products);
      // console.log(products);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }
export const deleteProduct =async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
export const getProductId=async (req, res) => {
    try {
      
      const product = await Product.findById(req.params.id).populate("category");
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(product);
    } catch (err) {
      console.error("Error fetching product:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
export const updateProduct = async (req, res) => {
    try {
      const { name, description, type, category } = req.body;
      const product = await Product.findById(req.params.id);
  
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      // Update common fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.type = type || product.type;
      product.category = category || product.category;
  
      // Update image if new image uploaded
      if (req.file) {
        product.image = req.file.filename;
      }
  
      // Update type-specific fields
      if (type === 'simple') {
        product.simple = {
          regularPrice: Number(req.body.simple.regularPrice),
          sellingPrice: Number(req.body.simple.sellingPrice)
        };
        product.variable = []; // Clear variable options if switching type
      } else if (type === 'variable') {
        product.variable = JSON.parse(req.body.variable); // Expects JSON string
        product.simple = {};
      }
  
      await product.save();
      res.status(200).json({ message: 'Product updated successfully', product });
  
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }