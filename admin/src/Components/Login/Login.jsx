import React, { useContext, useEffect, useState } from "react";
import './Login.css'
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

       await fetch(apiurl+'/login',{
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
  const signup=async()=>{
    console.log('hi');
     let responseData;
     await fetch(apiurl+'/signup',{
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
    <div className="loginsignup"  style={{ height: state === "Sign Up" ? "950px" : "700px" }}>
       <div className="loginsignup-container" style={{ height: state === "Sign Up" ? "850px" : "580px" }}>
           <h1>{state}</h1>
           <div className="loginsignup-fields">
           {state==="Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type='text' placeholder="Your Name" />:<></>}
             <input name="email" value={formData.email} onChange={changeHandler}  type='email' placeholder="Email Address" />
             <input name="password" value={formData.password} onChange={changeHandler}  type='password' placeholder="Password" />
             {state==="Sign Up"?<input name="mobile" value={formData.mobile} onChange={changeHandler} type='tel' placeholder="Mobile" />:<></>}
             {state==="Sign Up"?<input name="address" value={formData.address} onChange={changeHandler} type='text' placeholder="Address" />:<></>}
           
           </div>
           <button onClick={()=>{state==='Login'?login():signup()}}>Continue</button>
           {state==='Sign Up'?
           <p className="loginsignup-login">Already have an Account? <span onClick={()=>{setState('Login')}}>Login Here</span></p>:
           <p className="loginsignup-login">Create an Account? <span onClick={()=>{setState('Sign Up')}}>Click Here</span></p>
           }
       
       <div className="loginsignup-agree">
        <input type="checkbox" id="mycheckbox" name=""  />
<label htmlFor="mycheckbox">By Continuing,I Agree to the terms of use and Privacy Policy</label><br></br>
       </div>
       </div>
      </div>
  );
}

export default Login;
