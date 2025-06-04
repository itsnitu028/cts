import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Login from './Components/Login/Login'
import { Route, Routes ,useLocation} from 'react-router-dom'
import SideBar from './Components/SideBar/SideBar'
import Home from './Components/Home/Home'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
import Update_Details from './Pages/Update_Details/Update_Details'
import UpdateCategory from './Pages/UpdateCategory/UpdateCategory'
import Add_Product from './Pages/Add Product/Add_Product'
import Product_List from './Pages/Product List/Product_List'
import EditProduct from './Pages/EditProduct/EditProduct'
import {Toaster} from "react-hot-toast";


const App = () => {
  const location = useLocation();
  const noNavbarPaths = ['/login'];

  return (
    <div>
       {!noNavbarPaths.includes(location.pathname) && <Navbar />}
       <Toaster />
      <Routes >
      <Route index path='/' element={<Home /> } />
      <Route path='/api/admin/login' element={<Login />}/>
      <Route path='/api/admin/home' element={<Home />} />
      <Route path='/api/admin/change-password' element={<ChangePassword />} />
      <Route path='/api/admin/add' element={<Add />} />
      <Route path='/api/admin/addproduct' element={<Add_Product />} />
      <Route path='/api/admin/list' element={<List />} />
      <Route path='/api/admin/orders' element={<Orders />} />
      <Route path='/api/admin/update-details' element={<Update_Details />} />
      <Route path='/api/admin/update/:id' element={<UpdateCategory />} />
      <Route path='/api/admin/listproduct' element={<Product_List />} />
      <Route path="/api/admin/edit-product/:id" element={<EditProduct />} />
      </Routes>  

    </div>
  )
}

export default App