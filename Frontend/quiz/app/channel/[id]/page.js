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
    const [selectedOption , setSelectedOption] = useState({})
    const [total,setTotal] = useState(0)
    const [reviewProblem, setReviewProblem] = useState(new Set()) // used to set the value in it
    const [DoneWithQuestion , setDoneWithQuestion] = useState(new Set()) // used to set the question which had been solved
    let [Second,setSecond] = useState(59)
    let [Minute,setMinute] = useState(59)
    let [hour , setHour] = useState(2)


    // This is the timinig logic

    // second logic
    setTimeout(()=>{
      if(Second<=0){
        Second = 59
        Minute = Minute-1;
      }
      setSecond(Second-1)
    },1000)

    // minute logic
    setTimeout(()=>{
      if(Minute<=0){
        Minute = 59
        hour = hour-1
      }
     setMinute(Minute-1)
    },60000)

    // hour logic
    setTimeout(()=>{
      // if(hour<=0)
      setHour(hour-1)
    },3600000)
 
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
        setOnchecked("")
    };

    const decreaseProblemNumber = () => {
        if (questionNumber > 0) {
            setQuestionNumber((value) => value - 1);
        }
        setOnchecked("")
    };
    
    let arr = [];

        for(let i = 0;i<questionArray.length ; i++){
         arr.push(i+1);
        }

    const changeValue = (e)=>{
        setQuestionNumber(e.target.value-1)
    }
   

    const addToSubmit = (e)=>{
      if(onchecked !== "" || selectedOption[questionNumber]){
        wannaSubmit.push(...wannaSubmit , [onchecked,questionNumber+1])
        if(onchecked == questionArray[questionNumber+1].answer){
          console.log(questionArray[questionNumber].answer)
          setTotal((ans)=>(ans+1))
        }
        console.log("The anwser of the question is : " + questionArray[questionNumber].answer + " " + 
          "and the option which is selected is : " + onchecked + "and the total score is : " + total +
          "and the type of option is : " + typeof onchecked
        )
        console.log(total)
        if (questionNumber < questionArray.length - 1) {
          setQuestionNumber((value) => value + 1);
          setOnchecked("")
      }
  
      if(DoneWithQuestion.has(questionNumber+1)){
        setDoneWithQuestion((prev)=>{
          const newSet = new Set(prev)
          newSet.delete(questionNumber+1)
          return newSet
        })
      }
      else{
        setDoneWithQuestion((prev)=>new Set(prev.add(questionNumber+1)))
      }
  
      }
      else{
        alert("select any of the option to go forward")
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
      if (questionNumber < questionArray.length - 1) {
        setQuestionNumber((value) => value + 1);
        setOnchecked("")

    }
      if(reviewProblem.has(questionNumber+1)){
        setReviewProblem((prev)=>{
          const newSet = new Set(prev)
          newSet.delete(questionNumber+1)
          return newSet
        })
      }
      else{
        console.log("The element is present in the array")
        setReviewProblem((prev)=>new Set(prev.add(questionNumber+1)))
      }
    }

    const handleCheck = (e)=>{
      console.log("The option which i selected is : " + e.target.value)
      let myselectedValue = e.target.value
      setOnchecked(myselectedValue)
      setSelectedOption((prev)=>({
        ...prev,
        [questionNumber] : myselectedValue
      }))
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
         <div className="h-full w-auto flex justify-center items-center">
            <h1 className="text-[20px] bg-slate-600 p-2 rounded-2xl text-white font-bold">Time remaining : {hour}:{Minute}:{Second}</h1>
         </div>
       </div>

       <div className="w-full h-auto mt-8 flex justify-around items-center">
         <div className="bg-yellow-50 h-[500px] w-[50%]">
         <h1 className="text-[30px] p-5">Question.{questionNumber+1}</h1>
         <p className="p-5 text-[20px] font-bold">{questionArray[questionNumber]?.question || "Loading question..."}</p>
         <div className="flex flex-col items-start p-6 text-[20px] space-y-7 overflow-y-scroll font-medium">
         <input type="radio" value="option1" checked={selectedOption[questionNumber]==="option1"} onChange={handleCheck}/>
         Option 1) {questionArray[questionNumber]?.option1 || "Loading..."}
         <input type="radio" value="option2" checked={selectedOption[questionNumber]==="option2"} onChange={handleCheck}/>
          Option 2) {questionArray[questionNumber]?.option2 || "Loading..."}
         <input type="radio" value="option3" checked={selectedOption[questionNumber]==="option3"} onChange={handleCheck}/>
          Option 3) {questionArray[questionNumber]?.option3 || "Loading..."}
         <input type="radio" value="option4" checked={selectedOption[questionNumber]==="option4"} onChange={handleCheck}/>
          Option 4) {questionArray[questionNumber]?.option4 || "Loading..."}
         
         </div>
         </div>

        {/* buttons section */}
       <div className="h-[500px] w-[30%] flex flex-wrap gap-5 overflow-y-scroll p-3">
        <div className="h-[50px] w-full gap-6">
      {arr.map((myvalue, index) => {
        {let Review_check = reviewProblem.has(myvalue)
        let isSubmitCheck = DoneWithQuestion.has(myvalue)
        let buttonColor = "bg-slate-800"
        if(Review_check){
          buttonColor = "bg-violet-500"
        }
        else if(isSubmitCheck){
          buttonColor = "bg-green-500"
        }
           return(
            <button value={myvalue} onClick={changeValue} key={index} className={`${buttonColor} text-white ring-2 ml-3 mt-2 ring-black w-[100px] h-[50px] rounded-xl font-bold`}>{myvalue}</button>
           )
        }
  })}
  </div>
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
