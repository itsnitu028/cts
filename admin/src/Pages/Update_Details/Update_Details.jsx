import React from 'react'
import './Update_Details.css'
import SideBar from '../../Components/SideBar/SideBar'
import { useState,useEffect } from 'react'

const Update_Details = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    mobile: '',
    address: '',
  }); 
  const [message,setMessage] = useState(null);
  const [error, setError] = useState(null); 
  const token=localStorage.getItem('auth-token');
  console.log(token);
  useEffect(()=>{
    const fetchDetails=async()=>{
       try{
      if (!token) return;

           const response=await fetch('http://localhost:4000/home',{
            method:'GET',
            headers:{
              'auth-token':token
            }
           });
           const data=await response.json();
           if(!data.success){
            throw  new Error('Failed to fetch user details');
           }
           setUserDetails(data.user);
       }
       catch (error) {
        setError('Failed to fetch user details');
       }
    }
    fetchDetails();

  },[token])

  if (error) {
    return <p>{error}</p>; 
}

const handleChange=(e)=>{
   const {name,value}=e.target;
   setUserDetails((prevDetails)=>({
    ...prevDetails,[name]:value}))
}
const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      if (!token) return;

      const response = await fetch('http://localhost:4000/update-details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error('Failed to update user details');
      }
      setMessage('Details updated successfully');
    } catch (error) {
      setError('Failed to update user details');
    }
  };




  return (
    <>
       {localStorage.getItem('auth-token') && (
        <div className='myflex-container'>
          <div className='dum20'><SideBar /></div>
          <div className='dum80'>
          <form className='dum50 cp ' onSubmit={handleSubmit}>
  <div className="form-group mb-2">
  {message && (
            <div className='text-center mt-3'>
              <p style={{ color: '#ae432e' }}>{message} !!</p>
            </div>
          )}
    <label htmlFor="exampleInputPassword1">Name</label>
    <input type="text" className="form-control mt-2" id="exampleInputPassword1" placeholder="" 
        value={userDetails?.name||''}
        onChange={handleChange}
        name='name'
         />
  </div>
  <div className="form-group mb-2">
    <label htmlFor="exampleInputPassword3">Phone Number</label>
    <input type="tel" className="form-control mt-2" id="exampleInputPassword3" placeholder=""
     value={userDetails?.mobile||''}
     name='mobile'
     onChange={handleChange}
    />
  </div>
  <div className="form-group mb-2">
    <label htmlFor="exampleInputPassword3">Address</label>
    <input type="text" className="form-control mt-2" id="exampleInputPassword3" placeholder=""
     value={userDetails?.address||''}
     name='address'
     onChange={handleChange}
    />
  </div>
  <div className='text-center'>
  <button type='submit' className="btn btn_blue w-50 mt-4" 
  
  // onClick={handleChangePassword}
  >
    Update Details</button>
  </div>
</form>
          </div>
        </div>
      )}
</>
  )
}

export default Update_Details;