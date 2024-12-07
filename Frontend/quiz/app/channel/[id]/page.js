"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'next/navigation';
import aajadi from "./aajadi.png"
import gov from "./gov.png"
import nta from "./nta.avif"
import user from "./user.jpg"

export default function QuizComponent() {
    const [questionNumber, setQuestionNumber] = useState(0);
    const [questionArray , setQuestionArray] = useState([]);
    const [onchecked , setOnchecked] = useState("")
    const [total,setTotal] = useState(0)

    // it will store question no. with it's option
    const wannaSubmit = [[]]

    // it will also store question no. only
    const wannaReview = []

    const params = useParams(); 
    const { id } = params; 
 

    useEffect(()=>{
        const caller = async()=>{
            try{
                await axios.get(`http://localhost:9000/v1/ai/getmcqsdata/${id}`)
                .then((response)=>{
                    setQuestionArray(response.data.mcqsdata)
                    console.log("Data fetched successfully")
                })
            }
            catch(error){
                console.log("something went wrong while fetching data")
            }
        }

        caller()
       
       
    },[id])


    const increaseProblemNumber = () => {
        if (questionNumber < questionArray.length - 1) {
            setQuestionNumber((value) => value + 1);
        }
    };

    const decreaseProblemNumber = () => {
        if (questionNumber > 0) {
            setQuestionNumber((value) => value - 1);
        }
    };
    
    let arr = [];

        for(let i = 0;i<questionArray.length ; i++){
         arr.push(i+1);
        }

    const changeValue = (e)=>{
        setQuestionNumber(e.target.value-1)
    }
   

    const addToSubmit = (e)=>{
      wannaSubmit.push(...wannaSubmit , [onchecked,questionNumber+1])
      if(onchecked == questionArray[questionNumber+1].answer){
        console.log(questionArray[questionNumber].answer)
        setTotal(total+1)
      }
      console.log(questionArray[questionNumber].answer)
      console.log(total)
      if (questionNumber < questionArray.length - 1) {
        setQuestionNumber((value) => value + 1);
    }

    }

    const addToReview = (e)=>{
      console.log("Question added to review" , questionNumber+1)
      console.log("And the option which is checked is : " + onchecked)
      wannaReview.push(...wannaReview , [questionNumber+1])
      console.log("The array is : ")
      if(wannaReview.length>0){
        for(let i = 0 ; i<wannaReview.length ; i++){
          console.log(wannaReview[i])
        }
      }
    }

    const handleCheck = (e)=>{
      console.log("The option which i selected is : " + e.target.value)
      setOnchecked(e.target.value)
    }


    return (
       <>
       <div className="h-auto w-full flex space-x-36 items-center">
          <Image alt="image" className="h-[120px] w-[400px] ml-6" src={nta}></Image>
          <Image alt="image" className="h-[80px] w-[400px] ml-6" src={gov}></Image>
          <Image alt="image" className="h-[80px] w-[400px] ml-6" src={aajadi}></Image>
       </div>

       <div className="h-[150px] w-full flex items-center bg-slate-200">
         <div className="h-full w-[800px] ml-20 flex justify-between">
          <div className="h-full w-[40%] flex justify-center items-center">
             <Image alt="user" src={user} className="h-[80%] w-[60%] rounded-xl ring-2 ring-black"></Image>
          </div>

          <div className="h-full w-[55%] p-3">
            <p className="font-bold text-[25px]">UserName : <span className="font-medium text-[20px]">Mohit Sati</span></p>
            <p className="font-bold text-[25px]">Email : <span className="font-medium text-[20px]">mohit.eth@gmail.com</span></p>
            <p className="font-bold text-[25px]">Roll No : <span className="font-medium text-[20px]">220180103022</span></p>
          </div>
         </div> 
       </div>

       <div className="w-full h-auto mt-8 flex justify-around items-center">
         <div className="bg-yellow-50 h-[500px] w-[50%]">
         <h1 className="text-[30px] p-5">Question.{questionNumber+1}</h1>
         <p className="p-5 text-[20px] font-bold">{questionArray[questionNumber]?.question || "Loading question..."}</p>
         <div className="flex flex-col items-start p-6 text-[20px] space-y-7 overflow-y-scroll font-medium">
         <input type="radio" value="option1" checked={onchecked==="option1"} onChange={handleCheck}/>
         Option 1) {questionArray[questionNumber]?.option1 || "Loading..."}
         <input type="radio" value="option2" checked={onchecked==="option2"} onChange={handleCheck}/>
          Option 2) {questionArray[questionNumber]?.option2 || "Loading..."}
         <input type="radio" value="option3" checked={onchecked==="option3"} onChange={handleCheck}/>
          Option 3) {questionArray[questionNumber]?.option3 || "Loading..."}
         <input type="radio" value="option4" checked={onchecked==="option4"} onChange={handleCheck}/>
          Option 4) {questionArray[questionNumber]?.option4 || "Loading..."}
         
         </div>
         </div>

        {/* buttons section */}
       <div className="h-[500px] w-[30%] grid grid-cols-3 gap-4 overflow-y-scroll p-3">
      {arr.map((myvalue, index) => {
       return wannaReview.includes(myvalue) ? (
       <button value={myvalue} onClick={changeValue} key={index} className="bg-orange-600 text-white w-[50px] h-[50px] rounded-full">{myvalue}</button>
      ) : (
      <button value={myvalue} onClick={changeValue} key={index} className="bg-black text-white w-[50px] h-[50px] rounded-full"> {myvalue}</button>
    );
  })}
</div>


       </div>

       <div className="w-full h-auto flex justify-around">
         <div className="w-[50%] h-[100px] flex justify-between items-center">
            <div className="w-full flex justify-around items-center space-x-2">
           <div className=" space-x-11">
           <button onClick={decreaseProblemNumber} className="bg-red-700 text-white p-2 text-[20px] font-bold">Previous</button>
           <button onClick={increaseProblemNumber} className="bg-green-600 text-white p-2 w-[100px] text-[20px] font-bold">Next</button>
           <button onClick={addToReview} className="bg-green-600 text-white p-2 text-[15px] font-bold">Mark for review</button>
           <button onClick={addToSubmit} className="bg-green-600 text-white p-2 text-[15px] font-bold">Submit and Next</button>
           </div>
           <div>
           <button className="p-2 font-bold text-[20px] text-white bg-blue-700">Submit</button>
           </div>
           </div>
         </div>
         <div className="w-[30%] h-[300px]">

         </div>
       </div>


       </>
    );
}
