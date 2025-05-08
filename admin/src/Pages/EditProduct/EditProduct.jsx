import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import SideBar from "../../Components/SideBar/SideBar";
import { MdEdit } from "react-icons/md";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      image: "",
      type: "simple",
      simple: {
        regularPrice: "",
        sellingPrice: "",
      },
      variable: [],
      category: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variable",
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/getProduct/${id}`).then((res) => {
      const data = res.data;
      const categoryId = typeof data.category === "object" ? data.category._id : data.category;
      const safeData = {
        ...data,
        category: categoryId,
        simple: data.simple || { regularPrice: "", sellingPrice: "" },
        variable: data.variable || [],
      };
  
      reset(safeData);
      // reset({ ...data, category: categoryId });
    });

    axios.get("http://localhost:4000/getCategories").then((res) => {
      setCategories(res.data);
    });
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("type", data.type);
      formData.append("category", data.category);

      if (data.image instanceof FileList || data.image instanceof File) {
        formData.append("image", data.image[0]);
      }

      if (data.type === "simple") {
        formData.append("simple[regularPrice]", data.simple.regularPrice);
        formData.append("simple[sellingPrice]", data.simple.sellingPrice);
      } else {
        data.variable.forEach((variant, i) => {
          formData.append(`variable[${i}][color]`, variant.color);
          formData.append(`variable[${i}][size]`, variant.size);
        });
      }

      await axios.patch(`http://localhost:4000/updateProduct/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      setMessage("Product updated successfully!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      console.error(error);
      setMessage("Failed to update product.");
    }
  };

  const watchType = watch("type");

  return (
    <>
      {localStorage.getItem("auth-token") && (
        <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1c2833] text-white">
          <div className="flex">
            <div className="w-64 min-h-screen bg-[#1e293b]">
              <SideBar />
            </div>

            <div className="flex-1 flex items-start justify-center p-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-3">
                  <MdEdit className="text-4xl text-white/80" />
                  Update Product
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <input
                    type="text"
                    className="w-full p-3 my-2 rounded-lg text-white bg-white/10 border border-white/30 placeholder-white/60 focus:outline-none"
                    placeholder="Product Name"
                    {...register("name", { required: true })}
                  />

                  <textarea
                    className="w-full p-3 my-4 rounded-lg text-white bg-white/10 border border-white/30 placeholder-white/60 focus:outline-none"
                    placeholder="Description"
                    {...register("description")}
                  />

                  <select
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white "
                    {...register("category", { required: true })}
                  >
                    <option value=""  className="text-white bg-gray-600">Select Category</option>
                    {categories.map((cat) => (
                      <option
                        key={cat._id}
                        value={cat._id}
                        className="text-white bg-gray-600"
                      >
                        {cat.category}
                      </option>
                    ))}
                  </select>

                  <select
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white my-4"
                    {...register("type", { required: true })}
                  >
                    <option value="simple" className="bg-gray-600">Simple</option>
                    <option value="variable" className="bg-gray-600">Variable</option>
                  </select>

                  {watchType === "simple" && (
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Regular Price"
                        className="w-full p-3 rounded-lg text-white bg-white/10 border border-white/30"
                        {...register("simple.regularPrice", { required: true })}
                      />
                      <input
                        type="number"
                        placeholder="Selling Price"
                        className="w-full p-3 rounded-lg text-white bg-white/10 border border-white/30"
                        {...register("simple.sellingPrice", { required: true })}
                      />
                    </div>
                  )}

                  {watchType === "variable" && (
                    <div className="bg-white/5 border border-white/20 rounded-lg p-4 space-y-4">
                      {fields.map((item, index) => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <input
                            type="text"
                            placeholder="Color"
                            className="w-full p-3 rounded-lg text-white bg-white/10 border border-white/30"
                            {...register(`variable.${index}.color`, {
                              required: true,
                            })}
                          />
                          <input
                            type="text"
                            placeholder="Size"
                            className="w-full p-3 rounded-lg text-white bg-white/10 border border-white/30"
                            {...register(`variable.${index}.size`, {
                              required: true,
                            })}
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-400 hover:text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => append({ color: "", size: "" })}
                        className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-4 py-2 rounded-lg"
                      >
                        Add Variant
                      </button>
                    </div>
                  )}

                  <div>
                    <input
                      type="file"
                      {...register("image")}
                      className="text-white w-full px-3 py-2 my-2 rounded-lg bg-white/20 text-white border border-white/30 file:bg-gray-600 file:text-white file:rounded-md file:px-4 file:py-2 file:border-0 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                   {typeof watch("image") === "string" ? (
  <img
    src={`http://localhost:4000/uploads/${watch("image")}`}
    alt="Product Preview"
    className="w-40 h-40 object-cover rounded-lg mt-4"
  />
) : (
  watch("image") &&
  watch("image").length > 0 && (
    <img
      src={URL.createObjectURL(watch("image")[0])}
      alt="Product Preview"
      className="w-40 h-40 object-cover rounded-lg mt-4"
    />
  )
)}
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-lg w-1/2"
                    >
                      Submit
                    </button>
                  </div>

                  {message && (
                    <p className="text-center mt-4 text-green-400">{message}</p>
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

export default EditProduct;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useForm, useFieldArray } from "react-hook-form";
// import SideBar from "../../Components/SideBar/SideBar";
// import { MdEdit } from "react-icons/md";

// const EditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [message, setMessage] = useState("");
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: "",
//       description: "",
//       image: "",
//       type: "simple",
//       simple: {
//         regularPrice: "",
//         sellingPrice: "",
//       },
//       variable: [],
//       category: "",
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "variable",
//   });

//   useEffect(() => {
//     axios.get(`http://localhost:4000/getProduct/${id}`).then((res) => {
//       const data = res.data;
//       reset(data);
//     });

//     axios.get("http://localhost:4000/getCategories").then((res) => {
//       setCategories(res.data);
//     });
//   }, [id, reset]);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("description", data.description);
//       formData.append("type", data.type);
//       formData.append("category", data.category);

//       if (data.image instanceof FileList || data.image instanceof File) {
//         formData.append("image", data.image[0]);
//       }

//       if (data.type === "simple") {
//         formData.append("simple[regularPrice]", data.simple.regularPrice);
//         formData.append("simple[sellingPrice]", data.simple.sellingPrice);
//       } else {
//         data.variable.forEach((variant, i) => {
//           formData.append(`variable[${i}][color]`, variant.color);
//           formData.append(`variable[${i}][size]`, variant.size);
//         });
//       }

//       await axios.patch(`http://localhost:4000/updateProduct/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "auth-token": localStorage.getItem("auth-token"),
//         },
//       });

//       setMessage("Product updated successfully!");
//       setTimeout(() => navigate("/list-product"), 1500);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to update product.");
//     }
//   };

//   const watchType = watch("type");

//   return (
//     <>
//       {localStorage.getItem("auth-token") && (
//         <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1c2833] text-white">
//           <div className="flex">
//             <div className="w-64 min-h-screen bg-[#1e293b]">
//               <SideBar />
//             </div>

//             <div className="flex-1 flex items-start justify-center p-10">
//               <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl">
//                 <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-3">
//                   <MdEdit className="text-4xl text-white/80" />
//                   Update Product
//                 </h2>

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                   <input
//                     type="text"
//                     className="w-full p-3 m-2 rounded-lg text-white bg-white/10 border border-white/30 placeholder-white/60 focus:outline-none"
//                     placeholder="Product Name"
//                     {...register("name", { required: true })}
//                   />

//                   <textarea
//                     className="w-full p-3 m-2 rounded-lg text-white bg-white/10 border border-white/30 placeholder-white/60 focus:outline-none"
//                     placeholder="Description"
//                     {...register("description")}
//                   />

//                   <select
//                     className="w-full p-3 m-2 rounded-lg bg-white/10 border border-white/30 text-white"
//                     {...register("category", { required: true })}
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id} className="text-white bg-gray-600">
//                         {cat.category}
//                       </option>
//                     ))}
//                   </select>

//                   <select
//                     className="w-full p-3 m-2 rounded-lg bg-white/10 border border-white/30 text-white"
//                     {...register("type", { required: true })}
//                   >
//                     <option value="simple">Simple</option>
//                     <option value="variable">Variable</option>
//                   </select>

//                   {watchType === "simple" && (
//                     <div className="flex gap-4">
//                       <input
//                         type="number"
//                         placeholder="Regular Price"
//                         className="w-full p-3 m-2 rounded-lg text-white bg-white/10 border border-white/30"
//                         {...register("simple.regularPrice", { required: true })}
//                       />
//                       <input
//                         type="number"
//                         placeholder="Selling Price"
//                         className="w-full p-3 m-2 rounded-lg text-white bg-white/10 border border-white/30"
//                         {...register("simple.sellingPrice", { required: true })}
//                       />
//                     </div>
//                   )}

//                   {watchType === "variable" && (
//                     <div>
//                       {fields.map((item, index) => (
//                         <div key={item.id} className="flex gap-4 items-center mb-2">
//                           <input
//                             type="text"
//                             placeholder="Color"
//                             className="w-full p-3 rounded-lg text-white bg-white/10 border border-white/30"
//                             {...register(`variable.${index}.color`, { required: true })}
//                           />
//                           <input
//                             type="text"
//                             placeholder="Size"
//                             className="w-full p-3 rounded-lg text-white bg-white/10 border border-white/30"
//                             {...register(`variable.${index}.size`, { required: true })}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => remove(index)}
//                             className="text-red-400 hover:text-red-600"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={() => append({ color: "", size: "" })}
//                         className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-4 py-2 rounded-lg mt-2"
//                       >
//                         Add Variant
//                       </button>
//                     </div>
//                   )}

//                   <div className="mt-4">
//                     <input
//                       type="file"
//                       {...register("image")}
//                       className="text-white"
//                     />
//                     {watch("image") && typeof watch("image") === "string" && (
//                       <img
//                         src={watch("image")}
//                         alt="Product Preview"
//                         className="w-40 h-40 object-cover rounded-lg mt-4"
//                       />
//                     )}
//                   </div>

//                   <div className="text-center">
//                     <button
//                       type="submit"
//                       className="bg-blue-600 m-2 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-lg w-1/2"
//                     >
//                       Submit
//                     </button>
//                   </div>

//                   {message && (
//                     <p className="text-center mt-4 text-green-400">{message}</p>
//                   )}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditProduct;
