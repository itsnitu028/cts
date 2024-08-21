import React from 'react'
import './Navbar.css';
import aplogo from '../../assets/aplogo.png'
import navProfile from '../../assets/nav-profile.svg'
import { Routes,Route } from 'react-router-dom'
import Login from '../Login/Login';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={aplogo} alt='' className='nav-logo' />
      {/* <img src={navProfile} alt='' className='nav-profile' /> */}
     
      {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
      <Link to={'/login'} style={{textDecoration:"none"}} ><button>Login</button>   </Link> }

   
    </div>
   
  )
}

export default Navbar