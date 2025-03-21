import React from 'react'
import './SideBar.css'
import {NavLink} from 'react-router-dom'
import Home from '../Home/Home'
const SideBar = () => {
  return (
    <div className='mysidebar'>
      
     <NavLink to='/home' className='sidebar-option' style={{textDecoration:"none"}} >
        <div className='sidebar-item' >
          <p>Home</p>
        </div>
     </NavLink>
     <NavLink to='/update-details' className='sidebar-option' style={{textDecoration:"none"}} >
        <div className='sidebar-item' >
          <p>Update Profile</p>
        </div>
     </NavLink>
     <NavLink to='/change-password' className='sidebar-option' style={{textDecoration:"none"}} >
        <div className='sidebar-item' >
          <p>Change Password</p>
        </div>
     </NavLink>
     <NavLink to='/add' className='sidebar-option' style={{textDecoration:"none"}} >
        <div className='sidebar-item' >
          <p>Add Category</p>
        </div>
     </NavLink>
     <NavLink to='/list' className='sidebar-option' style={{textDecoration:"none"}} >
        <div className='sidebar-item' >
          <p>List Category</p>
        </div>
     </NavLink>
     <NavLink to='/orders' className='sidebar-option' style={{textDecoration:"none"}} >
        <div className='sidebar-item' >
          <p>Orders</p>
        </div>
     </NavLink>

    </div>
  )
}

export default SideBar