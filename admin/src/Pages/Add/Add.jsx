import React from 'react'
import './Add.css'
import SideBar from '../../Components/SideBar/SideBar'
import { useState ,useEffect,} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
   const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [category,setCategory]=useState('');
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/getCategories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const handleClick=async()=>{
    try{
      const response= await fetch('http://localhost:4000/addCategory',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         category:category,
         parent: parentCategory || null,
        }),
      })

      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
        setTimeout(() => navigate("/list"), 1000); 
      } else {
        setMessage(data.message);
      }
    }
    catch(err){
        setMessage('Failed to add category')
    }
  }
  return (
    <>
      {localStorage.getItem('auth-token') && (
        <div className='myflex-container'>
          <div className='dum20'><SideBar /></div>
          <div className='dum80'>
            <div className='add text-center'>
              <div className='add-bg text-center'>
              Add New Category
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
    <button type='button' className="btn btn_blue w-50 mt-4" onClick={handleClick} >Submit</button>
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

export default Add