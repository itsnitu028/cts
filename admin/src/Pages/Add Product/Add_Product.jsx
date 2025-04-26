import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../Components/SideBar/SideBar';
import { MdAddShoppingCart } from 'react-icons/md';

const Add_Product = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  const watchType = watch('type');
  const token = localStorage.getItem('auth-token');

  useEffect(() => {
    axios
      .get('http://localhost:4000/getCategories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('type', data.type);
    formData.append('category', data.category);
    formData.append('image', data.image[0]);

    if (data.type === 'simple') {
      formData.append(
        'simple',
        JSON.stringify({
          regularPrice: data.regularPrice,
          sellingPrice: data.sellingPrice,
        })
      );
    } else if (data.type === 'variable') {
      formData.append(
        'variable',
        JSON.stringify({
          color: data.color,
          size: data.size,
        })
      );
    }

    try {
      const response = await axios.post('http://localhost:4000/addProduct', formData);
      if (response.data.success) {
        setMessage('Product added successfully');
        reset();
        setTimeout(() => navigate('/home'), 1000);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to add product');
    }
  };

  return (
    <>
      {token && (
        <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1c2833] text-white">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-[#1e293b]">
              <SideBar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-center mb-10 flex items-center justify-center gap-3">
                  <MdAddShoppingCart className="text-4xl text-white/80" />
                  Add New Product
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <input
                    className="w-full p-3 rounded-lg text-white my-2 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                    placeholder="Product Name"
                    {...register('name', { required: true })}
                  />

                  <textarea
                    className="w-full p-3 rounded-lg text-white my-2 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                    placeholder="Description"
                    {...register('description', { required: true })}
                  />

                  <select
                    className="w-full p-3 rounded-lg my-2 bg-white/10 border border-white/30 text-gray focus:outline-none focus:ring-2 focus:ring-white/40"
                    {...register('category', { required: true })}
                  >
                    <option value="" className='text-white bg-gray-600'>Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id} className='text-white bg-gray-600 ' >
                        {cat.category}
                      </option>
                    ))}
                  </select>

                  <select
                    className="w-full p-3 rounded-lg my-2 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                    {...register('type', { required: true })}
                  >
                    <option value="" className='text-white bg-gray-600'>Select Product Type</option>
                    <option value="simple" className='text-white bg-gray-600'>Simple</option>
                    <option value="variable" className='text-white bg-gray-600'>Variable</option>
                  </select>

                  {watchType === 'simple' && (
                    <>
                      <input
                        className="w-full p-3 rounded-lg my-2 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                        placeholder="Regular Price"
                        {...register('regularPrice')}
                      />
                      <input
                        className="w-full p-3 rounded-lg my-2 bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                        placeholder="Selling Price"
                        {...register('sellingPrice')}
                      />
                    </>
                  )}

                  {watchType === 'variable' && (
                    <>
                      <input
                        className="w-full p-3 rounded-lg bg-white/10 my-2 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                        placeholder="Color"
                        {...register('color')}
                      />
                      <input
                        className="w-full p-3 rounded-lg bg-white/10 my-2 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                        placeholder="Size"
                        {...register('size')}
                      />
                    </>
                  )}

                  <input
                    type="file"
                    className="w-full px-3 py-2 my-2 rounded-lg bg-white/20 text-white border border-white/30 file:bg-gray-600 file:text-white file:rounded-md file:px-4 file:py-2 file:border-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register('image', { required: true })}
                  />

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-blue-600 my-2 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-lg w-1/2"
                    >
                      Submit
                    </button>
                  </div>

                  {message && (
                    <p className="text-center mt-4 text-red-400">{message}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Add_Product;


// import React from 'react'
// import './Add_Product.css'
// import SideBar from '../../Components/SideBar/SideBar'
// import { useState ,useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useForm, Controller } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';



// const Add_Product = () => {
//   const { register, handleSubmit, control, watch, reset } = useForm();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [message, setMessage] = useState('');

//   const watchType = watch("type");

//   useEffect(() => {
//     axios.get("http://localhost:4000/getCategories")
//       .then(res => setCategories(res.data))
//       .catch(err => console.error("Error fetching categories:", err));
//   }, []);

//   const onSubmit = async (data) => {
//     const formData = new FormData();

//     formData.append('name', data.name);
//     formData.append('description', data.description);
//     formData.append('type', data.type);
//     formData.append('category', data.category);
//     formData.append('image', data.image[0]); // only first file

//     if (data.type === "simple") {
//       formData.append('simple', JSON.stringify({
//         regularPrice: data.regularPrice,
//         sellingPrice: data.sellingPrice
//       }));
//     } else if (data.type === "variable") {
//       formData.append('variable', JSON.stringify({
//         color: data.color,
//         size: data.size
//       }));
//     }

//     try {
//       const response = await axios.post("http://localhost:4000/addProduct", formData);
//       if (response.data.success) {
//         setMessage("Product added successfully");
//         reset();
//         setTimeout(() => navigate("/home"), 1000);
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to add product");
//     }
//   };
//   return (
    
//     <>
//     {localStorage.getItem('auth-token') && (
//         <div className='myflex-container'>
//           <div className='dum20'><SideBar /></div>
//           <div className='dum80'>
//             <div className='add text-center'>
//               <div className='add-bg text-center'>Add New Product</div>
//               <form onSubmit={handleSubmit(onSubmit)} className="w-75 m-auto mt-4">

//                 <input className="form-control mb-3" placeholder="Product Name" {...register("name", { required: true })} />

//                 <textarea className="form-control mb-3" placeholder="Description" {...register("description", { required: true })} />

//                 <select className="form-select mb-3" {...register("category", { required: true })}>
//                   <option value="">Select Category</option>
//                   {categories.map(cat => (
//                     <option key={cat._id} value={cat._id}>{cat.category}</option>
//                   ))}
//                 </select>

//                 <select className="form-select mb-3" {...register("type", { required: true })}>
//                   <option value="">Select Product Type</option>
//                   <option value="simple">Simple</option>
//                   <option value="variable">Variable</option>
//                 </select>

//                 {watchType === "simple" && (
//                   <>
//                     <input className="form-control mb-3" placeholder="Regular Price" {...register("regularPrice")} />
//                     <input className="form-control mb-3" placeholder="Selling Price" {...register("sellingPrice")} />
//                   </>
//                 )}

//                 {watchType === "variable" && (
//                   <>
//                     <input className="form-control mb-3" placeholder="Color" {...register("color")} />
//                     <input className="form-control mb-3" placeholder="Size" {...register("size")} />
//                   </>
//                 )}

//                 <input type="file" className="form-control mb-3" {...register("image", { required: true })} />

//                 <button type="submit" className="btn btn_blue w-50">Submit</button>
//                 {message && <p className='add-red mt-3'>{message}</p>}
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//   </>
//   )
// }

// export default Add_Product;