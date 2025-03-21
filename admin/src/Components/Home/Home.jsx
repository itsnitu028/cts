import React from 'react';
import './Home.css';
import SideBar from '../SideBar/SideBar';
import { useState,useEffect } from 'react';

const Home = () => {

  const [userDetails, setUserDetails] = useState(null); 
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


// if (!userDetails) {
//     return <p>Loading user details...</p>;
// }
  return (
    <>
      {localStorage.getItem('auth-token') && (
        <div className='myflex-container'>
          <div className='dum20'><SideBar /></div>
          <div className='dum80'>
<div className="container mt-5 ">
  <div className="card">
    <div className="card-header text-center hc">
     <h4>User Details</h4> 
    </div>
    <div className="card-body">
      <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{userDetails?.name||''}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{userDetails?.email||''}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{userDetails?.mobile||''}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{userDetails?.address||''}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
