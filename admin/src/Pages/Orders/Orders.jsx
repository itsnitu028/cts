import React from 'react'
import './Orders.css'
import SideBar from '../../Components/SideBar/SideBar'

const Orders = () => {
  return (
    <>
    {localStorage.getItem('auth-token') && (
        <div className='myflex-container'>
          <div className='dum20'><SideBar /></div>
          <div>Orders</div>
        </div>
      )}
  </>
  )
}

export default Orders