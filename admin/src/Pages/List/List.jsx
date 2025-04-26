import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../Components/SideBar/SideBar';
import {  FaTrash } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa";

const List = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/getCategories')
      .then((res) => setCategories(buildCategoryTree(res.data)))
      .catch((err) => console.error(err));
  }, [categories]);

  const buildCategoryTree = (categories, parentId = null, level = 0) => {
    return categories
      .filter((cat) => (cat.parent ? cat.parent._id : null) === parentId)
      .map((cat) => ({
        ...cat,
        level,
        subcategories: buildCategoryTree(categories, cat._id, level + 1),
      }));
  };

  const flattenCategories = (categories) => {
    let flatList = [];
    categories.forEach((cat) => {
      flatList.push(cat);
      if (cat.subcategories.length > 0) {
        flatList = flatList.concat(flattenCategories(cat.subcategories));
      }
    });
    return flatList;
  };

  const flattenedCategories = flattenCategories(categories);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:4000/deleteCategory/${id}`);
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== id)
        );
      } catch (error) {
        alert('Failed to delete category');
      }
    }
  };

  const token = localStorage.getItem('auth-token');

  return (
    <>
      {token && (
        <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1c2833] text-white">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-[#1e293b]">
              <SideBar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-start justify-center p-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl">
              <h2 className="text-2xl font-bold text-center mb-8">
  <div className="flex items-center justify-center gap-3">
    <FaFolderOpen className="text-6xl text-white/80" />
    <span>List of Categories</span>
  </div>
</h2>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full text-white border-separate border-spacing-y-2 border-spacing-x-3 ">
                    <thead>
                      <tr className="border  border-white-200">
                        <th className="py-3 px-2 text-left">Name</th>
                        <th className="py-3  text-left">Parent Category</th>
                        <th className="py-3  text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flattenedCategories.map((cat) => (
                        <tr key={cat._id} className="border border-white hover:bg-gray-700 transition-all duration-150 ">
                          <td
                            className={`py-2 ${!cat.parent ? 'px-2' : ''}`}
                            style={{ paddingLeft: `${cat.level * 20}px` }}
                          >
                            {cat.category}
                          </td>
                          <td className="py-2">
                            {cat.parent ? cat.parent.category : '—'}
                          </td>
                          <td className="py-2 ">
                          <div className="flex justify-center items-center gap-4">
    <Link to={`/update/${cat._id}`}>
      <MdEdit className="text-indigo-500 hover:text-indigo-700 text-xl cursor-pointer" />
    </Link>
    <button onClick={() => handleDelete(cat._id)}>
      <FaTrash className="text-red-600 hover:text-red-800 text-xl cursor-pointer" />
    </button>
  </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;

// import React from 'react'
// import './List.css'
// import SideBar from '../../Components/SideBar/SideBar'
// import { useState ,useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios'

// const List = () => {
//   const [categories, setCategories] = useState([]);


//   useEffect(() => {
//     axios
//     .get("http://localhost:4000/getCategories")
//     .then((res) => setCategories(buildCategoryTree(res.data)))
//     .catch((err) => console.error(err));
        
// }, [categories]);

// const buildCategoryTree = (categories, parentId = null, level = 0) => {
//   return categories
//     .filter((cat) => (cat.parent ? cat.parent._id : null) === parentId)
//     .map((cat) => ({
//       ...cat,
//       level,
//       subcategories: buildCategoryTree(categories, cat._id, level + 1),
//     }));
// };

// // Function to flatten the tree structure for rendering
// const flattenCategories = (categories) => {
//   let flatList = [];
//   // console.log(categories);
//   categories.forEach((cat) => {
//     flatList.push(cat);
//     if (cat.subcategories.length > 0) {
//       flatList = flatList.concat(flattenCategories(cat.subcategories));
//     }
//   });
//   return flatList;
 
// };

// const flattenedCategories = flattenCategories(categories);


 

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       try {
//         await axios.delete(`http://localhost:4000/deleteCategory/${id}`);
//         setCategories((prevCategories) =>
//           prevCategories.filter((category) => category._id !== id));
//         // setUpdateFlag((prevFlag) => !prevFlag);
//       } catch (error) {
//         alert("Failed to delete category");
//       }
//     }
//   };

//   return (
//     <>
//      {localStorage.getItem('auth-token') && (
//         <div className='myflex-container'>
//           <div className='dum20'><SideBar /></div>
//           <div className='dum80'>
//           <div className="container mt-5 ">
//   <div className="card">
//     <div className="card-header text-center hc">
//      <h4>List Category</h4> 
//     </div>
//     <div className="card-body">
//       <table className="table">
//       <thead>
//                       <tr>
//                         <th>Name</th>
//                         <th>Parent Category</th>
//                         <th className='text-center'>Actions</th>
//                       </tr>
//                     </thead>
//         <tbody>

//       {flattenedCategories.map((cat) => (
//                         <tr key={cat._id}>
//                           <td style={{ paddingLeft: `${cat.level * 20}px` }}>
//                             {cat.category}
//                           </td>
//                           <td>{cat.parent ? cat.parent.category : "—"}</td>
//                           {/* <td className='text-center '> */}
//                           <td className="flex justify-center items-center gap-2">
//                             <Link
//                               to={`/update/${cat._id}`}
//                               className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
//                             >
//                               ✏️
//                             </Link>
//                             <button
//                               onClick={() => handleDelete(cat._id)}
//                               className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                             >
//                               ❌
//                             </button>
//                             </td>
//                           {/* </td> */}
//                         </tr>
//                       ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>
    
//     </div>
//         </div>
//       )}
//   </>
//   )
// }

// export default List