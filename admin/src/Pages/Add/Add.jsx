import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../Components/SideBar/SideBar';
import { useNavigate } from 'react-router-dom';
import { MdAddBox } from 'react-icons/md';

const Add = () => {
  const token = document.cookie
  .split('; ')
  .find(row => row.startsWith('token='))
  ?.split('=')[1] || localStorage.getItem('auth-token');

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/getCategories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:4000/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: category,
          parent: parentCategory || null,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
        setTimeout(() => navigate('//api/admin/list'), 1000);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Failed to add category');
    }
  };

  return (
    <>
      {localStorage.getItem('auth-token') && (
        <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1c2833] text-white">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-[#1e293b]">
              <SideBar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-start justify-center pt-10 px-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-3">
                  <MdAddBox className="text-4xl text-white/80" />
                  Add New Category
                </h2>

                <form className="space-y-2">
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 my-2 rounded-lg text-white bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40"
                  />

                  <select
                    value={parentCategory}
                    onChange={(e) => setParentCategory(e.target.value)}
                    className="w-full p-3 my-2 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                  >
                    <option value="" className="text-white bg-gray-600">
                      No Parent (Top Level)
                    </option>
                    {categories.map((cat) => (
                      <option
                        key={cat._id}
                        value={cat._id}
                        className="text-white bg-gray-600"
                      >
                        {cat.category}
                      </option>
                    ))}
                  </select>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleClick}
                      className="bg-blue-600 my-2 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-lg w-1/2"
                    >
                      Submit
                    </button>
                  </div>

                  {message && (
                    <p className="text-center mt-4 text-red-400">{message}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Add;


// import React from 'react'
// import './Add.css'
// import SideBar from '../../Components/SideBar/SideBar'
// import { useState ,useEffect,} from 'react'
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Add = () => {
//    const navigate = useNavigate();
//   const [message, setMessage] = useState('');
//   const [category,setCategory]=useState('');
//   const [parentCategory, setParentCategory] = useState("");
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:4000/getCategories")
//       .then(res => setCategories(res.data))
//       .catch(err => console.error("Error fetching categories:", err));
//   }, []);

//   const handleClick=async()=>{
//     try{
//       const response= await fetch('http://localhost:4000/addCategory',{
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//          category:category,
//          parent: parentCategory || null,
//         }),
//       })

//       const data = await response.json();
//       if (data.success) {
//         setMessage(data.message);
//         setTimeout(() => navigate("/list"), 1000); 
//       } else {
//         setMessage(data.message);
//       }
//     }
//     catch(err){
//         setMessage('Failed to add category')
//     }
//   }
//   return (
//     <>
//       {localStorage.getItem('auth-token') && (
//         <div className='myflex-container'>
//           <div className='dum20'><SideBar /></div>
//           <div className='dum80'>
//             <div className='add text-center'>
//               <div className='add-bg text-center'>
//               Add New Category
//               </div>
//               <div>
//               <form >
//   <div className="form-group justify-content-center  ">
//     <input type="text" className="form-control w-75 m-auto mt-4" value={category} 
//      onChange={(e) => setCategory(e.target.value)}
//     placeholder="Add Category" />
//         <select
//         className="form-select w-75 m-auto mt-4 appearance-auto"
//         value={parentCategory}
//         onChange={(e) => setParentCategory(e.target.value)}
//       >
//         <option value="">No Parent (Top Level)</option>
//         {categories.map((cat) => (
//           <option key={cat._id} value={cat._id}>
//             {cat.category}
//           </option>
//         ))}
//       </select>
//     </div>

//     <div className='text-center'>
//     <button type='button' className="btn btn_blue w-50 mt-4" onClick={handleClick} >Submit</button>
//     </div>
// </form>
// {message && <p className='add-red'>{message}</p>} 
// </div>
//             </div>
//           </div>
//         </div>
//       )}
//   </>
//   )
// }

// export default Add