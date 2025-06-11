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
import CustomerHome from './CustomerComponents/CustomerHome/CustomerHome'
import {Toaster} from "react-hot-toast";
import bg from "../src/assets/bg.png"


const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/api/admin');

    const isAuthenticated = !!localStorage.getItem('auth-token');

  const isLoginPage = location.pathname === '/api/admin/login';
  const isAdminHome = location.pathname === '/api/admin/home';
  const shouldShowBg = (isLoginPage || isAdminHome) && !isAuthenticated;

   const Wrapper = ({ children }) =>
    shouldShowBg ? (
      <div
        style={{
          background: `url(${bg}) no-repeat center center/cover`,
          minHeight: '100vh',
        }}
      >
        {children}
      </div>
    ) : (
      <>{children}</>
    );

  return (
    <Wrapper>
       {isAdminRoute && <Navbar />}
       <Toaster />
      <Routes >
         {/* Customer routes */}
      <Route index path='/' element={<CustomerHome /> } />

       {/* Admin routes */}
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

    </Wrapper>
  )
}

export default App