import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import Login from './Components/Login/Login'
import { Route, Routes ,useLocation} from 'react-router-dom'


const App = () => {
  const location = useLocation();
  const noNavbarPaths = ['/login'];

  return (
    <div>
       {!noNavbarPaths.includes(location.pathname) && <Navbar />}
  
      <Routes >
      <Route path='/login' element={<Login />}/>
      {/* <Route path='/' element={ <Navbar />} /> */}
      </Routes>

     {localStorage.getItem('auth-token')? <Admin/>:<></>}


    </div>
  )
}

export default App