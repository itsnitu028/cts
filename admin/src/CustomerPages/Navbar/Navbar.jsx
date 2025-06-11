import React, { useEffect } from "react";
import { useState } from "react";
import logo from "../../assets/logo.png"
import { IoCartOutline } from "react-icons/io5";
function Navbar() {

    const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
 <div className="bg-white shadow-sm w-full px-6 py-3 flex items-center">
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
      <li className="hover:bg-gray-100 px-2 rounded-s-md cursor-pointer">Home</li>
      <li className="relative">
        <button
          onClick={() => {
            setServicesOpen(!servicesOpen);
            setCartOpen(false);
            setProfileOpen(false);
          }}
          className="hover:text-blue-600 cursor-pointer"
        >
          Services
        </button>
        {servicesOpen && (
          <ul className="absolute top-8 left-0 w-40 bg-white shadow-md rounded-md py-2 z-20">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Web Development</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">App Development</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">UI/UX Design</li>
          </ul>
        )}
      </li>
      <li className="hover:text-blue-600 cursor-pointer">About</li>
    </ul>

    {/* Cart */}
    <div className="relative">
      <button
        onClick={() => {
          setCartOpen(!cartOpen);
          setProfileOpen(false);
          setServicesOpen(false);
        }}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <IoCartOutline className="h-6 w-6 text-gray-700" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
          8
        </span>
      </button>
      {cartOpen && (
        <div className="absolute right-0 w-56 bg-white shadow-md rounded-md p-4 z-20">
          <p className="font-semibold text-gray-800">8 Items</p>
          <p className="text-sm text-gray-500 mb-3">Subtotal: $999</p>
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
        <img
          className="w-10 h-10 rounded-full"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt="User"
        />
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