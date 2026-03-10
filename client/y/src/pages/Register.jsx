import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

    const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn:(data)=>{
        return axios.post("http://localhost:3000/api/user/register",data)
        
    },
    onError:(error)=>{
            alert(error.response.data.message)
        },
        onSuccess:(data)=>{
            // alert(data.data.message)
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
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

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
            {mutation.isPending ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500">
          Already have an account? <span onClick={()=>{navigate("/login")}} className="text-blue-500 cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;