import Category from "../model/Category";

export const getAllCategories=async (req, res) => {

    try {
        const categories = await Category.find().populate('parent', 'category');
        res.json(categories);
      } catch (error) {
        res.status(500).json({ success: false, message: "Server error: " + error.message });
      }
}
export const listCategories= async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
  }

export const updateCategory=async(req,res)=>{  
    try{
        
        const { category, parent } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
          req.params.id,
          { category, parent: parent || null }, // Set parent to null if empty
          { new: true } // Return the updated document
        );
        res.json({ success: true, message: "Category updated successfully", updatedCategory });
        if (!updatedCategory) {
          return res.status(404).json({ success: false, message: "Category not found" });
        }

    }catch(err){
        res.status(500).json({ success: false, message: 'Error Updating category' });
    }
}
export const addCategory = async (req, res) => {
    try {
        const { category, parent } = req.body;

        const newCategory = new Category({
            category,
            parent: parent || null,  // Set parent if provided, else it's a top-level category
        });
  
      await newCategory.save();
  
      res.status(201).json({ success: true, message: "Category added successfully" });
    } catch (error) {
      if (error.code === 11000) {
        res.json({ success: false, message: "Category already exists" });
      } else {
        res.status(500).json({ success: false, message: "Server error: " + error.message });
      }
    }
  }
export const getCategoryById=async (req, res) => {
    try {
      const category = await Category.findById(req.params.id).populate("parent", "category");
  
      if (!category) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }
  
      res.json(category);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
  }

export const deleteCategory=async (req, res) => {
    try {
        const { id } = req.params;

        // Check if category exists
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Find all categories that are children of this category (recursively)
        const findAllSubcategories = async (parentId) => {
            const subcategories = await Category.find({ parent: parentId });
            for (let sub of subcategories) {
                await findAllSubcategories(sub._id); // Recursively delete all nested subcategories
                await Category.findByIdAndDelete(sub._id);
            }
        };

        await findAllSubcategories(id); // Delete all subcategories
        await Category.findByIdAndDelete(id); // Delete the main category

        res.json({ message: "Category and all subcategories deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
}