import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, Lock, PlusCircle, List, Package, ShoppingCart,ClipboardList } from 'lucide-react';


const SideBar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center space-x-3 p-2 rounded transition 
     ${isActive ? 'bg-[#374151]' : 'hover:bg-[#374151]'} 
     text-white no-underline`;

  return (
    <div className="w-64 h-full bg-[#1f293b] text-white flex flex-col py-4 px-4 space-y-2 shadow-lg">

      <NavLink to="/api/admin/home" className={linkClasses} style={{ textDecoration: 'none' }}>
        <Home className="w-5 h-5" />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/api/admin/update-details" className={linkClasses} style={{ textDecoration: 'none' }}>
        <User className="w-5 h-5" />
        <span>Update Profile</span>
      </NavLink>

      <NavLink to="/api/admin/change-password" className={linkClasses} style={{ textDecoration: 'none' }}>
        <Lock className="w-5 h-5" />
        <span>Change Password</span>
      </NavLink>

      <NavLink to="/api/admin/add" className={linkClasses} style={{ textDecoration: 'none' }}>
        <PlusCircle className="w-5 h-5" />
        <span>Add Category</span>
      </NavLink>

      <NavLink to="/api/admin/list" className={linkClasses} style={{ textDecoration: 'none' }}>
        <List className="w-5 h-5" />
        <span>List Category</span>
      </NavLink>

      <NavLink to="/api/admin/addproduct" className={linkClasses} style={{ textDecoration: 'none' }}>
        <Package className="w-5 h-5" />
        <span>Add Product</span>
      </NavLink>

      <NavLink to="/api/admin/listproduct" className={linkClasses} style={{ textDecoration: 'none' }}>
        <ClipboardList className="w-5 h-5" />
        <span>Product List</span>
      </NavLink>

      <NavLink to="/api/admin/orders" className={linkClasses} style={{ textDecoration: 'none' }}>
        <ShoppingCart className="w-5 h-5" />
        <span>Orders</span>
      </NavLink>
    </div>
  );
};

export default SideBar;

// import React from 'react'
// import './SideBar.css'
// import {NavLink} from 'react-router-dom'
// import Home from '../Home/Home'
// const SideBar = () => {
//   return (
//     <div className='mysidebar'>
      
//      <NavLink to='/home' className='sidebar-option' style={{textDecoration:"none"}} >
//         <div className='sidebar-item' >
//           <p>Home</p>
//         </div>
//      </NavLink>
//      <NavLink to='/update-details' className='sidebar-option' style={{textDecoration:"none"}} >
//         <div className='sidebar-item' >
//           <p>Update Profile</p>
//         </div>
//      </NavLink>
//      <NavLink to='/change-password' className='sidebar-option' style={{textDecoration:"none"}} >
//         <div className='sidebar-item' >
//           <p>Change Password</p>
//         </div>
//      </NavLink>
//      <NavLink to='/add' className='sidebar-option' style={{textDecoration:"none"}} >
//         <div className='sidebar-item' >
//           <p>Add Category</p>
//         </div>
//      </NavLink>
//      <NavLink to='/list' className='sidebar-option' style={{textDecoration:"none"}} >
//         <div className='sidebar-item' >
//           <p>List Category</p>
//         </div>
//      </NavLink>
//      <NavLink to='/addproduct' className='sidebar-option' style={{textDecoration:"none"}} >
//         <div className='sidebar-item' >
//           <p>Add Product</p>
//         </div>
//      </NavLink>
//      <NavLink to='/orders' className='sidebar-option' style={{textDecoration:"none"}} >
//         <div className='sidebar-item' >
//           <p>Orders</p>
//         </div>
//      </NavLink>

//     </div>
//   )
// }

// export default SideBar