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


const App = () => {
  const location = useLocation();
  const noNavbarPaths = ['/login'];

  return (
    <div>
       {!noNavbarPaths.includes(location.pathname) && <Navbar />}
  
      <Routes >
      <Route index path='/' element={<Home /> } />
      <Route path='/login' element={<Login />}/>
      <Route path='/home' element={<Home />} />
      <Route path='/change-password' element={<ChangePassword />} />
      <Route path='/add' element={<Add />} />
      <Route path='/list' element={<List />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/update-details' element={<Update_Details />} />
      <Route path='/update/:id' element={<UpdateCategory />} />
      </Routes>  

    </div>
  )
}

export default App