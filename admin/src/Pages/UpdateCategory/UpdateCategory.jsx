import React from 'react'
import './UpdateCategory.css'
import SideBar from '../../Components/SideBar/SideBar'
import { useParams } from 'react-router-dom'
const UpdateCategory = () => {
    //backend create at /update/id...put request...see there for better clearity
    const {id}=useParams();
  return (
  
    <>
    {localStorage.getItem('auth-token') && (
        <div className='myflex-container'>
          <div className='dum20'><SideBar /></div>
          <div className='dum80'>
            </div>
            </div>
  )}
  </>
  )
}

export default UpdateCategory