import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  image: {
    type: String,
    // required: true
  },
  type: {
    type: String,
    enum: ['simple', 'variable'],
    required: true
  },
    stock: {
    type: Number,
    default: 0,
  },
  simple: {
    regularPrice: Number,
    sellingPrice: Number,
  },
  variable: [{
    color: String,
    size: String,
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
