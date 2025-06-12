import React, { useEffect } from "react";
import { useState } from "react";
import logo from "../../assets/logo-new.png"
import { IoCartOutline } from "react-icons/io5";
import { FaUserCircle } from 'react-icons/fa'; 
function Navbar() {

    const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
 <div className="bg-gray-50 shadow-sm w-full px-6  flex items-center">
  {/* Logo */}
  <div className="text-xl font-bold text-gray-800">
    <a className="cursor-pointer">
      <img src={logo} alt="Logo" className="h-18 w-30" />
    </a>
  </div>

  {/* Push rest to right */}
  <div className="flex items-center space-x-6 ml-auto">
    {/* Navigation Links */}
    <ul className="flex space-x-6 text-gray-700 items-center">
      <li className="mt-2 hover:bg-gray-200 px-2 cursor-pointer">Home</li>
      <li className="relative">
        <button
          onClick={() => {
            setServicesOpen(!servicesOpen);
            setCartOpen(false);
            setProfileOpen(false);
          }}
          className="mt-2 hover:bg-gray-200 px-2 cursor-pointer"
        >
          Category
        </button>
        {servicesOpen && (
          <ul className="absolute top-8 left-0 w-40 bg-white shadow-md rounded-md py-2 z-20">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">X</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Y</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Z</li>
          </ul>
        )}
      </li>
      <li className="mt-2 hover:bg-gray-200 px-2 cursor-pointer">Products</li>
       <li className="mt-2 hover:bg-gray-200 px-2 cursor-pointer">About</li>
    </ul>

    {/* Cart */}
    <div className="relative">
      <button
        onClick={() => {
          setCartOpen(!cartOpen);
          setProfileOpen(false);
          setServicesOpen(false);
        }}
        className="relative p-2 rounded-full hover:bg-gray-200 transition"
      >
        <IoCartOutline className="h-6 w-6 text-gray-700" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
          8
        </span>
      </button>
      {cartOpen && (
        <div className="absolute right-0 w-56 bg-white shadow-md rounded-md p-4 z-20">
          <p className="font-semibold text-gray-800">8 Items</p>
          <p className="text-sm text-gray-500 mb-3">Subtotal: Rs.999</p>
          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 transition">
            View Cart
          </button>
        </div>
      )}
    </div>

    {/* Avatar */}
    <div className="relative">
      <button
        onClick={() => {
          setProfileOpen(!profileOpen);
          setCartOpen(false);
          setServicesOpen(false);
        }}
        className="rounded-full border-2 border-transparent hover:border-gray-300 transition"
      >
         <FaUserCircle className="text-3xl text-white/80 bg-gray-400 rounded-2xl" />
      </button>
      {profileOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-20 text-sm text-gray-700">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between">
            Profile <span className="text-xs text-blue-600">New</span>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
        </ul>
      )}
    </div>
  </div>
</div>
  );
}

export default Navbar;