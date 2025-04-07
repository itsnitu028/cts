import React from 'react'
import './List.css'
import SideBar from '../../Components/SideBar/SideBar'
import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const List = () => {
  const [categories, setCategories] = useState([]);
  // const [updateFlag, setUpdateFlag] = useState(false);

  // const fetchCategories = async () => {
  //   const response = await fetch('http://localhost:4000/list');
  //   const data = await response.json();
  //   setCategories(data);
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  useEffect(() => {
    axios
    .get("http://localhost:4000/getCategories")
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

// Function to flatten the tree structure for rendering
const flattenCategories = (categories) => {
  let flatList = [];
  // console.log(categories);
  categories.forEach((cat) => {
    flatList.push(cat);
    if (cat.subcategories.length > 0) {
      flatList = flatList.concat(flattenCategories(cat.subcategories));
    }
  });
  return flatList;
 
};

const flattenedCategories = flattenCategories(categories);


  // const handleDelete=async(categoryID)=>{
  //    try{
  //       const response = await fetch(`http://localhost:4000/deleteCategory/${categoryID}`,{
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //       const data = await response.json();
  //       if(data.success){
  //            setCategories(categories.filter((category)=>(category._id!==categoryID)));
  //       }
  //       else {
  //         console.error('Error deleting category:', data.message);
  //       }
  //    }catch(err){
  //     console.log('Error:'+err);
  //    }
  // }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:4000/deleteCategory/${id}`);
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== id));
        // setUpdateFlag((prevFlag) => !prevFlag);
      } catch (error) {
        alert("Failed to delete category");
      }
    }
  };

  return (
    <>
     {localStorage.getItem('auth-token') && (
        <div className='myflex-container'>
          <div className='dum20'><SideBar /></div>
          <div className='dum80'>
          <div className="container mt-5 ">
  <div className="card">
    <div className="card-header text-center hc">
     <h4>List Category</h4> 
    </div>
    <div className="card-body">
      <table className="table">
      <thead>
                      <tr>
                        <th>Name</th>
                        <th>Parent Category</th>
                        <th className='text-center'>Actions</th>
                      </tr>
                    </thead>
        <tbody>
{/*       
          {categories.map((c,i) => (
          <tr key={c._id}>
            <td>{c.category}</td>
           <td className='text-end'> <Link to={`/update/${c._id}`} className='text-decoration-none btn btn-sm btn-success'>Update</Link>
            {/* <Link to={`/view/${c.id}`} className='text-decoration-none btn btn-sm btn-primary mx-1'>View</Link> 
           <button onClick={()=>handleDelete(c._id)} className='text-decoration-none btn btn-sm btn-danger mr-1'>Delete</button>
           </td>
            </tr>
        ))}
     */}
      {flattenedCategories.map((cat) => (
                        <tr key={cat._id}>
                          <td style={{ paddingLeft: `${cat.level * 20}px` }}>
                            {cat.category}
                          </td>
                          <td>{cat.parent ? cat.parent.category : "—"}</td>
                          {/* <td className='text-center '> */}
                          <td className="flex justify-center items-center gap-2">
                            <Link
                              to={`/update/${cat._id}`}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                            >
                              ✏️
                            </Link>
                            <button
                              onClick={() => handleDelete(cat._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                            >
                              ❌
                            </button>
                            </td>
                          {/* </td> */}
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
  )
}

export default List