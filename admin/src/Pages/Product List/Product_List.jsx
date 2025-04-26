import React from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { NotebookTabs } from 'lucide-react';
import axios from 'axios';

const Product_List = () => {

    const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/getProducts')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:4000/deleteProduct/${id}`);
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1c2833] text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-[#1e293b]">
          <SideBar />
        </div>
        <div className="flex-1 p-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 max-w-6xl mx-auto">
        <div className="flex flex-row items-center justify-center mb-8">
         <NotebookTabs className="w-10 h-10 mr-2" />
         <h2 className="text-2xl font-bold text-center mb-8 ">
         List of Products</h2>
            </div>
        <div className="overflow-x-auto">
        <table className="table-auto w-full text-white">
        <thead>
                  <tr className="border-b border-white">
                    <th className="py-3 text-left">Image</th>
                    <th className="py-3 text-left">Name</th>
                    <th className="py-3 text-left">Type</th>
                    <th className="py-3 text-left">Category</th>
                    <th className="py-3 text-left">Description</th>
                    <th className="py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {products.map((prod) => (
                    <tr key={prod._id} className="border-b border-white hover:bg-gray-700">
                      <td className="py-2">
                        <img
                          src={`http://localhost:4000/uploads/${prod.image}`}
                          alt={prod.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="py-2">{prod.name}</td>
                      <td className="py-2 capitalize">{prod.type}</td>
                      <td className="py-2">{prod.category?.category || '—'}</td>
                      <td className="py-2">{prod.description}</td>
                      <td className="py-2">
                        <div className="flex justify-center items-center gap-4">
                          <button onClick={() => handleDelete(prod._id)}>
                            <FaTrash className="text-red-600 hover:text-red-800 text-xl cursor-pointer" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                {products.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-300">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
            </table>
            </div>
        </div>
            </div>
        </div>
        </div>
    );
}

export default Product_List 