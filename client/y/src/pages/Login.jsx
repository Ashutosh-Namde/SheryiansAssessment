import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    const navigate = useNavigate();


  const mutation = useMutation({
    mutationFn:(data)=>{
        return axios.post("http://localhost:3000/api/user/login",data,{ withCredentials: true } )
        
        
    },
    
    
    onError:(error)=>{
            alert(error?.response?.data?.message)
        },
        onSuccess:(data)=>{
             <p className="text-green-500 text-sm text-center">
    Login Successful
  </p>
            navigate("/profile")
        }
  })

  


     const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    mutation.mutate(formData);
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
       

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
            {mutation.isPending ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500">
          Don't have an account? <span onClick={()=>{navigate("/")}} className="text-blue-500 cursor-pointer">Register</span>
        </p>
      </div>
    </div>  )
}

export default Login