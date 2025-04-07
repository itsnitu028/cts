import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema( {
    category: {
        type: String,
        required: true,
        unique: true,
      },
    parent :{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category', 
      default: null  // If null, it's a top-level category

    }

});

const Category = mongoose.model("Category", CategorySchema);

export default Category;