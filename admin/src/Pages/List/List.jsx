import React from 'react'
import './List.css'
import SideBar from '../../Components/SideBar/SideBar'
import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';

const List = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch('http://localhost:4000/list');
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete=async(categoryID)=>{
     try{
        const response = await fetch(`http://localhost:4000/deleteCategory/${categoryID}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json();
        if(data.success){
             setCategories(categories.filter((category)=>(category._id!==categoryID)));
        }
        else {
          console.error('Error deleting category:', data.message);
        }
     }catch(err){
      console.log('Error:'+err);
     }
  }
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
        <tbody>
      
          {categories.map((c,i) => (
          <tr key={c._id}>
            <td>{c.category}</td>
           <td className='text-end'> <Link to={`/update/${c._id}`} className='text-decoration-none btn btn-sm btn-success'>Update</Link>
            <Link to={`/view/${c.id}`} className='text-decoration-none btn btn-sm btn-primary mx-1'>View</Link>
           <button onClick={()=>handleDelete(c._id)} className='text-decoration-none btn btn-sm btn-danger mr-1'>Delete</button>
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
  )
}

export default List