import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../../Components/SideBar/SideBar";
import { MdEdit } from "react-icons/md";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/getCategory/${id}`)
      .then((res) => {
        setCategory(res.data.category);
        setParentCategory(res.data.parent ? res.data.parent._id : "");
      })
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:4000/getCategories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/update/${id}`,
        {
          category,
          parent: parentCategory || null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      setMessage(response.data.message);
      setTimeout(() => navigate("/list"), 1000);
    } catch (err) {
      setMessage("Failed to update category");
    }
  };

  const token = localStorage.getItem("auth-token");

  return (
    <>
      {token && (
        <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1c2833] text-white">
          <div className="flex">
            <div className="w-64 min-h-screen bg-[#1e293b]">
              <SideBar />
            </div>

            <div className="flex-1 flex items-start justify-center p-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-3">
                  <MdEdit className="text-4xl text-white/80" />
                  Update Category
                </h2>

                <div className="space-y-6">
                  <input
                    type="text"
                    className="w-full p-3 m-2 rounded-lg text-white bg-white/10 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                    placeholder="Category Name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />

                  <select
                    className="w-full p-3 m-2 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                    value={parentCategory}
                    onChange={(e) => setParentCategory(e.target.value)}
                  >
                    <option value="" className="text-white bg-gray-600">No Parent (Top Level)</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id} className="text-white bg-gray-600">
                        {cat.category}
                      </option>
                    ))}
                  </select>

                  <div className="text-center">
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-600 m-2 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-lg w-1/2"
                    >
                      Submit
                    </button>
                  </div>

                  {message && (
                    <p className="text-center mt-4 text-red-400">{message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateCategory;



// import React from 'react'
// import './UpdateCategory.css'
// import SideBar from '../../Components/SideBar/SideBar'
// import { useParams } from 'react-router-dom'
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const UpdateCategory = () => {
//     //backend create at /update/id...put request...see there for better clearity
//     const {id}=useParams();
//     const navigate = useNavigate();
//     const [category, setCategory] = useState("");
//     const [parentCategory, setParentCategory] = useState("");
//     const [categories, setCategories] = useState([]);
//     const [message, setMessage] = useState("");
  
//     useEffect(() => {
//       axios.get(`http://localhost:4000/getCategory/${id}`)
//         .then(res => {
//           setCategory(res.data.category);
//           setParentCategory(res.data.parent ? res.data.parent._id : "");
//         })
//         .catch(err => console.error(err));
  
//       // Fetch all categories for parent dropdown
//       axios.get("http://localhost:4000/getCategories")
//         .then(res => setCategories(res.data))
//         .catch(err => console.error(err));
//     }, [id]);

//     const handleUpdate = async () => {
//       try {
//         const response = await axios.patch(
//           `http://localhost:4000/update/${id}`,
//           {
//             category,
//             parent: parentCategory || null, // If empty, set parent to null
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "auth-token": localStorage.getItem("auth-token"), 
//             },
//           }
//         );
    
//         setMessage(response.data.message);
//         setTimeout(() => navigate("/list"), 1000); // Redirect after success
//       } catch (err) {
//         setMessage("Failed to update category");
//       }
//     };
    
  
//   return (
    
  
//     <>
//     {localStorage.getItem('auth-token') && (
//         <div className='myflex-container'>
//           <div className='dum20'><SideBar /></div>
//           <div className='dum80'>
//           <div className='add text-center'>
//               <div className='add-bg text-center'>
//               Update Category
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
//     <button type='button' className="btn btn_blue w-50 mt-4" onClick={handleUpdate} >Submit</button>
//     </div>
// </form>
// {message && <p className='add-red'>{message}</p>} 
// </div>
//             </div>
//             </div>
//             </div>
//   )}
//   </>
//   )
// }

// export default UpdateCategory