import React from 'react'
import './Admin.css'
import SideBar from '../../Components/SideBar/SideBar'
import { Routes,Route } from 'react-router-dom'
import Home from '../../Components/Home/Home'
import Navbar from '../../Components/Navbar/Navbar'

const Admin = () => {
  return (
    <div className='admin'>
     {/* {localStorage.getItem('auth-token')?<Navbar />:<></>} */}
     <SideBar ></SideBar>
     <Routes>
      <Route path='/home' element={<Home />} />
     </Routes>
    </div>
  )
}

export default Admin