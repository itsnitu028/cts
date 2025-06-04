import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
let apiurl= 'http://localhost:4000';

function Login() {
  const [state,setState]=useState('Login');
  const [formData,setFormData]=useState({
    username:'',
    password:'',
    email:'',
    mobile:'',
    address:''
  })

  const login=async()=>{
       console.log('hi');
       let responseData;

       await fetch(apiurl+'/api/auth/login',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
       }).then((response)=>response.json()).then((data)=>responseData=data)
  
  if (responseData.success) {
  localStorage.setItem('auth-token', responseData.token);
  localStorage.setItem('user', responseData.currUser);

  toast.success(responseData.message, { autoClose: 2000 }); // Show toast for 2 seconds

  setTimeout(() => {
    window.location.replace('/');
  }, 1000); // Redirect after 2 seconds
}

       else{
          toast.error(responseData.message, { autoClose: 2000 }); 
       }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${apiurl}/auth/google`;
  }

  const signup=async()=>{
    console.log('hi');
     let responseData;
     await fetch(apiurl+'/api/auth/register',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
     }).then((response)=>response.json()).then((data)=>responseData=data)

     if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      localStorage.setItem('user',responseData.currUser);
      window.location.replace('/');
     }
     else{
       alert(responseData.errors);
     }
  }

  const changeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  return (
    <div className="min-h-[100vh] bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden ${state === "Sign Up" ? "min-h-[30vh] max-h-[130vh]" : "min-h-[30vh] max-h-[130vh]"}`}>
        <div className="p-4">
          <h1 className="text-medium font-bold text-center mb-8 font-serif">{state}</h1>
          
          <div className="space-y-1">
            {state==="Sign Up" && (
              <div className="space-y-1">
                <label className="block text-sm font-bold text-gray-700">Name</label>
                <input 
                  name="username" 
                  value={formData.username} 
                  onChange={changeHandler} 
                  type='text' 
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 text-base focus:outline-none focus:border-red-500 rounded-lg"
                />
              </div>
            )}
            
            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700">Email</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={changeHandler}  
                type='email' 
                placeholder="Email Address"
                className="w-full px-4 py-2 border border-gray-300 text-base focus:outline-none focus:border-red-500 rounded-lg"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <input 
                name="password" 
                value={formData.password} 
                onChange={changeHandler}  
                type='password' 
                placeholder="Password"
                className="w-full px-4 py-2 mb-3 border border-gray-300 text-base focus:outline-none focus:border-red-500 rounded-lg"
              />
            </div>
       
          </div>

          <button 
            onClick={()=>{state==='Login'?login():signup()}}
            className="w-full py-3 text-white bg-red-500 mt-2 border-none text-base font-medium cursor-pointer rounded-lg hover:bg-red-600 transition-colors"
          >
            Continue
          </button>

          <div className="relative flex items-center justify-center my-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-2 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-white text-gray-700 border border-gray-300 rounded-lg flex items-center justify-center gap-3 mb-2 hover:bg-gray-50 transition-colors "
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-center mt-6 text-gray-600 text-sm">
            {state==='Sign Up' ? (
              <>Already have an Account? <span className="text-red-500 font-semibold cursor-pointer mt-4" onClick={()=>{setState('Login')}}>Login Here</span></>
            ) : (
              <>Create an Account? <span className="text-red-500 font-semibold cursor-pointer mt-4" onClick={()=>{setState('Sign Up')}}>Click Here</span></>
            )}
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
