"use client"

import Image from "next/image";
import arrow from "./arrow.png"
import axios from "axios";
import { useRef, useState } from "react";
import Navbar from "../Components/Navbar";
// import { headers } from "next/headers";

export default function Page(){

    const setImage = useRef(null)
    const [loading,setLoading] = useState(false)
    const [myid,setMyid] = useState("")

    const imageSetter = ()=>{
        setImage.current.click()
        console.log("image got selected")
    }

   const addData = async(e)=>{
 
   let getToken = localStorage.getItem("authorization")

   if(!getToken) return console.log("You need login/register to the application")

    const file = e.target.files[0]
    
    if (!file) {
        return console.log("No file selected");
    }

    
    const formData = new FormData()
    formData.append("pdf",file)
    
    try{
        setLoading(true)
        await axios.post("http://localhost:9000/v1/ai/createmcqs" , 
        formData ,
        {
        headers:{
            Authorization:`${getToken}`
        }
        })
        .then((response)=>{
            console.log("data sended")
            console.log("msg is " + response.data.msg)
            console.log("data is" + response.data.data)
            setMyid(response.data.yourId)
            setLoading(false)
        })
        .catch((error)=>{
            console.log("something went wrong" + error)
        })
        
       
    }

    catch(error){
        console.log("something went wrong in the auth catch")
    }
    
   }


    return(
        <>
        <Navbar></Navbar>
        <div className="h-screen bg-[#2c2c54] w-full flex flex-col items-center">
           <div className="h-[400px] w-full flex justify-center mt-24">
               <div className="h-[400px] rounded-xl cursor-pointer w-[400px] flex flex-col bg-[#706fd3] items-center space-y-12">
                   <input onChange={addData} className="hidden" type="file" ref={setImage}></input>
                   <Image onClick={imageSetter} alt="image" className="h-[200px] w-[200px] mt-5 rounded-lg" src={arrow}></Image>
                   <h1 className="font-bold text-[30px] text-yellow-400">Enter the pdf/photo here</h1>
               </div>
           </div>
           {loading && (
             <div className="w-full h-[300px] flex justify-center items-center">
             <h1 className="text-[50px] font-bold text-white">Loading.........</h1>
            </div>
           )}

           {!loading&&(
           <div className="mt-32 space-y-4">
           <h1 className="text-[30px] font-medium text-white">Your Room Id : <span className="text-red-600">http://localhost:3000/channel/{myid}</span></h1>
           <p className="text-[30px] font-bold text-white text-center">Share this to join the test</p>
           </div>
           )}
          
          
        </div>
        </>
    )
}