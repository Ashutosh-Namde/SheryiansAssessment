import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

const Profile = () => {
     const queryClient = useQueryClient();
      const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/profile/data",{withCredentials:true});
      return res.data;
    },
    onError:(error)=>{
            alert(error.response.data.message)
        },
        onSuccess:(data)=>{
            alert(data.data.message)
        }
    
  });
  console.log(data?.user);
  
  return (
    
    <div>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>

          <p>Name: {data?.user?.name}</p>
          <p>Email: {data?.user?.email}</p>
          </div>
          </div>
    </div>
  )
}

export default Profile