"use client"

import Image from "next/image";
import arrow from "./arrow.png";
import axios from "axios";
import { useRef, useState } from "react";
import Navbar from "../Components/Navbar";

export default function Page() {
    const setImage = useRef(null);
    const [loading, setLoading] = useState(false);
    const [myid, setMyid] = useState("");

    const imageSetter = () => {
        setImage.current.click();
        console.log("image got selected");
    };

    const addData = async (e) => {
        let getToken = localStorage.getItem("authorization");

        if (!getToken) return console.log("You need login/register to the application");

        const file = e.target.files[0];
        if (!file) {
            return console.log("No file selected");
        }

        const formData = new FormData();
        formData.append("pdf", file);

        try {
            setLoading(true);
            await axios.post("http://localhost:9000/v1/ai/createmcqs", formData, {
                headers: {
                    Authorization: `${getToken}`,
                },
            })
                .then((response) => {
                    console.log("data sent");
                    console.log("msg is " + response.data.msg);
                    console.log("data is " + response.data.data);
                    setMyid(response.data.yourId);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log("something went wrong" + error);
                });
        } catch (error) {
            console.log("something went wrong in the auth catch");
        }
    };

    return (
        <>
            <Navbar />
            <div className="h-screen bg-black w-full flex flex-col items-center px-6">
                <div className="h-[500px] w-full flex justify-center items-center mt-20">
                    <div className="h-[450px] rounded-lg shadow-xl w-[350px] flex flex-col bg-white/10 backdrop-blur-lg items-center p-6">
                        <input onChange={addData} className="hidden" type="file" ref={setImage}/>
                        <Image onClick={imageSetter} alt="Upload" className="h-[150px] w-[150px] mt-6 cursor-pointer transition-transform hover:scale-110" src={arrow}/>
                        <h1 className="font-semibold text-[24px] text-white mt-8 text-center"> Upload your PDF or Photo</h1>
                        <button className="mt-10 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-500 transition-all shadow-lg" onClick={imageSetter}>Select File</button>
                    </div>
                </div>

                {loading ? (
                    <div className="w-full flex justify-center items-center mt-20">
                        <h1 className="text-[36px] font-semibold text-yellow-300 animate-pulse">
                            Loading...
                        </h1>
                    </div>
                ) : myid && (
                    <div className="mt-16 text-center">
                        <h1 className="text-[24px] font-medium text-white">
                            Your Room ID:{" "}
                            <span className="text-yellow-300 underline break-all">
                                http://localhost:3000/channel/{myid}
                            </span>
                        </h1>
                        <p className="text-[20px] font-semibold text-gray-300 mt-4">
                            Share this link to join the test
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
