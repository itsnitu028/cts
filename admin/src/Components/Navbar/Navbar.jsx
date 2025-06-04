import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('auth-token');

  toast.success('Logged out successfully!', { autoClose: 500 });

  setTimeout(() => {
    window.location.replace('/');
  }, 2000);
  };

  return (
    <div className="w-full h-32 bg-[#1f2937] text-white flex items-center justify-between px-8 shadow-md">
      {/* Modern Font, Increased Size */}
      <h1 className="text-3xl font-semibold font-sans tracking-wide">Admin Panel</h1>

      {localStorage.getItem('auth-token') ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded"
        >
          Logout
        </button>
      ) : (
        <Link to="/api/admin/login" className="no-underline">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded">
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;



// import React from 'react'
// import './Navbar.css';
// import aplogo from '../../assets/aplogo.png'
// import navProfile from '../../assets/nav-profile.svg'
// import { Routes,Route } from 'react-router-dom'
// import Login from '../Login/Login';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <div className='mynavbar'>
//       <img src={aplogo} alt='' className='mynav-logo' />
//       {/* <img src={navProfile} alt='' className='nav-profile' /> */}
     
//       {localStorage.getItem('auth-token')?<button className='navlogout' onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
//       <Link to={'/login'} style={{textDecoration:"none"}} ><button className='text'>Login</button>   </Link> }

   
//     </div>
   
//   )
// }

// export default Navbar