import React from 'react'
import './UpdateCategory.css'
import SideBar from '../../Components/SideBar/SideBar'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UpdateCategory = () => {
    //backend create at /update/id...put request...see there for better clearity
    const {id}=useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      axios.get(`http://localhost:4000/getCategory/${id}`)
        .then(res => {
          setCategory(res.data.category);
          setParentCategory(res.data.parent ? res.data.parent._id : "");
        })
        .catch(err => console.error(err));
  
      // Fetch all categories for parent dropdown
      axios.get("http://localhost:4000/getCategories")
        .then(res => setCategories(res.data))
        .catch(err => console.error(err));
    }, [id]);

    const handleUpdate = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:4000/update/${id}`,
          {
            category,
            parent: parentCategory || null, // If empty, set parent to null
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"), 
            },
          }
        );
    
        setMessage(response.data.message);
        setTimeout(() => navigate("/list"), 1000); // Redirect after success
      } catch (err) {
        setMessage("Failed to update category");
      }
    };
    
  
  return (
    
  
    <>
    {localStorage.getItem('auth-token') && (
        <div className='myflex-container'>
          <div className='dum20'><SideBar /></div>
          <div className='dum80'>
          <div className='add text-center'>
              <div className='add-bg text-center'>
              Update Category
              </div>
              <div>
              <form >
  <div className="form-group justify-content-center  ">
    <input type="text" className="form-control w-75 m-auto mt-4" value={category} 
     onChange={(e) => setCategory(e.target.value)}
    placeholder="Add Category" />
        <select
        className="form-select w-75 m-auto mt-4 appearance-auto"
        value={parentCategory}
        onChange={(e) => setParentCategory(e.target.value)}
      >
        <option value="">No Parent (Top Level)</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.category}
          </option>
        ))}
      </select>
    </div>

    <div className='text-center'>
    <button type='button' className="btn btn_blue w-50 mt-4" onClick={handleUpdate} >Submit</button>
    </div>
</form>
{message && <p className='add-red'>{message}</p>} 
</div>
            </div>
            </div>
            </div>
  )}
  </>
  )
}

export default UpdateCategory