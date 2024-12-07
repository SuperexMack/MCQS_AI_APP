"use client"
import Navbar from "@/app/Components/Navbar";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import axios from "axios";


export default function() {
  const [userName , setUserName] = useState("")
  const [password , setPassword] = useState("")
  const [loading , setLoading] = useState(false)

    const router = useRouter()
    const changeRoute = ()=>{
      router.push('/Auth/Signup')
    }

    const saveData = async()=>{
        setLoading(true)
        await axios.post("http://localhost:9000/v1/getbackuser",{
          username:userName,
          password:password
        })
        .then((response)=>{
          console.log("the value of the user data is : " + response.data.token)
          localStorage.setItem("authorization" , "Bearer " + response.data.token)
          console.log("token saved to the local host successfully")
          setLoading(false)
          alert("Welcome to the site sir")
          setTimeout(()=>router.push("/") , 500)
        })

        .catch((error)=>{
          console.log("something went wrong in auth" + error)
          setLoading(false)
        })

       
      }
      


  return (
    <>
      <Navbar />
     
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
           <h1 className="text-[80px]">Loading......</h1>
        </div>
      ):(
        <div className="h-screen w-full flex justify-center items-center">
        <div className="h-[400px] bg-gray-950 w-[400px] shadow-lg rounded-lg flex flex-col space-y-6 p-6">
          <h1 className="text-2xl font-semibold text-center text-gray-700">
            Sign In
          </h1>
          <input
            onChange={(e)=>setUserName(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-col space-y-4">
            <button onClick={saveData} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition duration-200">
              Sign In
            </button>
            <button onClick={changeRoute} className="text-blue-600 hover:text-blue-700 font-medium py-3 rounded-md transition duration-200 underline">
              Don’t have an account? Sign Up
            </button>
          </div>
        </div>
      </div>
      )}

    </>
  );
}
