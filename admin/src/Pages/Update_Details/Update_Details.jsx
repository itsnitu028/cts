import React, { useState, useEffect } from 'react'; 
import SideBar from '../../Components/SideBar/SideBar';
import { FaUserEdit } from 'react-icons/fa';

const Update_Details = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    mobile: '',
    address: '',
    email: '',
  });
  const [message, setMessage] = useState(null);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) return;

      const response = await fetch('http://localhost:4000/api/admin/update-details', {
        method: 'PATCH',
          credentials: 'include',
          headers: {
             'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      if (!data.success) throw new Error('Failed to update user details');

      setMessage('Details updated successfully!');
    } catch (err) {
      setError('Failed to update user details');
    }
  };

  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;

  return (
    <>
      {token && (
        <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1c2833] flex text-white">
          {/* Sidebar */}
          <div className="w-64 min-h-screen bg-[#1e293b]">
            <SideBar />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center p-10">
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex flex-col items-center mb-8">
                <FaUserEdit className="text-5xl text-white/80 mb-2" />
                <h2 className="text-3xl font-bold">Update Profile</h2>
              </div>

              {message && (
                <div className="text-center text-green-400 mb-4">{message}</div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block mb-1 font-semibold text-white/80">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userDetails?.name || ''}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-white/80">Email</label>
                  <input
                     type="email"
                      name="email"
                       value={userDetails?.email || ''}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-white/80">Phone</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={userDetails?.mobile || ''}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-white/80">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={userDetails?.address || ''}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                </div>
              </div>

              <div className="text-center mt-8">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-full text-white font-semibold"
                >
                  Update Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Update_Details;





{/* //   const [userDetails, setUserDetails] = useState({
//     name: '',
//     mobile: '',
//     address: '',
//   }); 
//   const [message,setMessage] = useState(null);
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

// const handleChange=(e)=>{
//    const {name,value}=e.target;
//    setUserDetails((prevDetails)=>({
//     ...prevDetails,[name]:value}))
// }
// const handleSubmit=async(e)=>{
//     e.preventDefault();
//     try {
//       if (!token) return;

//       const response = await fetch('http://localhost:4000/update-details', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'auth-token': token,
//         },
//         body: JSON.stringify(userDetails),
//       });
//       const data = await response.json();
//       if (!data.success) {
//         throw new Error('Failed to update user details');
//       }
//       setMessage('Details updated successfully');
//     } catch (error) {
//       setError('Failed to update user details');
//     }
//   };




//   return (
//     <>
//        {localStorage.getItem('auth-token') && (
//         <div className='myflex-container'>
//           <div className='dum20'><SideBar /></div>
//           <div className='dum80'>
//           <form className='dum50 cp ' onSubmit={handleSubmit}>
//   <div className="form-group mb-2">
//   {message && (
//             <div className='text-center mt-3'>
//               <p style={{ color: '#ae432e' }}>{message} !!</p>
//             </div>
//           )}
//     <label htmlFor="exampleInputPassword1">Name</label>
//     <input type="text" className="form-control mt-2" id="exampleInputPassword1" placeholder="" 
//         value={userDetails?.name||''}
//         onChange={handleChange}
//         name='name'
//          />
//   </div>
//   <div className="form-group mb-2">
//     <label htmlFor="exampleInputPassword3">Phone Number</label>
//     <input type="tel" className="form-control mt-2" id="exampleInputPassword3" placeholder=""
//      value={userDetails?.mobile||''}
//      name='mobile'
//      onChange={handleChange}
//     />
//   </div>
//   <div className="form-group mb-2">
//     <label htmlFor="exampleInputPassword3">Address</label>
//     <input type="text" className="form-control mt-2" id="exampleInputPassword3" placeholder=""
//      value={userDetails?.address||''}
//      name='address'
//      onChange={handleChange}
//     />
//   </div>
//   <div className='text-center'>
//   <button type='submit' className="btn btn_blue w-50 mt-4" 
  
//   // onClick={handleChangePassword}
//   >
//     Update Details</button>
//   </div>
// </form>
//           </div>
//         </div>
//       )}
// </>
//   )
// }

// export default Update_Details; */}