import React, { useState, useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import { FaUserCircle } from 'react-icons/fa'; // <-- Icon import

const Home = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('auth-token');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!token) return;

        const response = await fetch('http://localhost:4000/api/admin/home', {
          method: 'GET',
          credentials: 'include',
          headers: {
             'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!data.success) {
          throw new Error('Failed to fetch user details');
        }
        setUserDetails(data.user);
      } catch (error) {
        setError('Failed to fetch user details');
      }
    };
    fetchDetails();
  }, [token]);

  if (error) {
    return <p className="text-red-500 text-center mt-5">{error}</p>;
  }

  return (
    <>
      {token && (
        <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1c2833] text-white">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-[#1e293b] ">
              <SideBar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl transition-all duration-300 hover:scale-[1.01]">
                {/* Title with Icon */}
                <h2 className="text-4xl font-bold text-center mb-10 flex items-center justify-center gap-3">
                  <FaUserCircle className="text-5xl text-white/80" />
                  User Details
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-6 gap-x-12 text-lg">
                  <div>
                    <p className="font-semibold text-white/80">Name</p>
                    <p>{userDetails?.name || '-'}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white/80">Email</p>
                    <p>{userDetails?.email || '-'}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white/80">Phone</p>
                    <p>{userDetails?.mobile || '-'}</p>
                  </div>
                  <div className="sm:col-span-1">
                    <p className="font-semibold text-white/80">Address</p>
                    <p>{userDetails?.address || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;





// import React from 'react';
// import './Home.css';
// import SideBar from '../SideBar/SideBar';
// import { useState,useEffect } from 'react';

// const Home = () => {

//   const [userDetails, setUserDetails] = useState(null); 
//   const [error, setError] = useState(null); 
//   const token=localStorage.getItem('auth-token');
//   console.log(token);
//   useEffect(()=>{
//     const fetchDetails=async()=>{
//        try{
//       if (!token) return;

//            const response=await fetch('http://localhost:4000/home',{
//             method:'GET',
//             headers:{
//               'auth-token':token
//             }
//            });
//            const data=await response.json();
//            if(!data.success){
//             throw  new Error('Failed to fetch user details');
//            }
//            setUserDetails(data.user);
//        }
//        catch (error) {
//         setError('Failed to fetch user details');
//        }
//     }
//     fetchDetails();

//   },[token])

//   if (error) {
//     return <p>{error}</p>; 
// }


// // if (!userDetails) {
// //     return <p>Loading user details...</p>;
// // }
//   return (
//     <>
//       {localStorage.getItem('auth-token') && (
//         <div className='myflex-container'>
//           <div className='dum20'><SideBar /></div>
//           <div className='dum80'>
// <div className="container mt-5 ">
//   <div className="card">
//     <div className="card-header text-center hc">
//      <h4>User Details</h4> 
//     </div>
//     <div className="card-body">
//       <table className="table">
//         <tbody>
//           <tr>
//             <th>Name</th>
//             <td>{userDetails?.name||''}</td>
//           </tr>
//           <tr>
//             <th>Email</th>
//             <td>{userDetails?.email||''}</td>
//           </tr>
//           <tr>
//             <th>Phone</th>
//             <td>{userDetails?.mobile||''}</td>
//           </tr>
//           <tr>
//             <th>Address</th>
//             <td>{userDetails?.address||''}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Home;
