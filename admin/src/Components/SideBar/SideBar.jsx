import React from 'react'
import './SideBar.css'
import {Link} from 'react-router-dom'
const SideBar = () => {
  return (
    <div className='sidebar'>
     <Link to={'/home'} style={{textDecoration:"none"}} >
        <div className='sidebar-item' >
            <p>Home</p>
        </div>
     </Link>
    </div>
  )
}

export default SideBar