import './App.css'
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from './context/AuthProvider';
import Home from './home/Home';

function App() {

const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
            path="/tools"
            element={<Tools />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/cart"
            element={authUser ? <Home /> : <Navigate to="/signup" />}
          /> */}
          <Route
            path="/about"
            element={<Home />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
