import Image from "next/image";
import Navbar from "./Components/Navbar";
import money from "./makepaisa.jpg"
import question from "./questionMark.jpg"
import working from "./working.jpg"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full  h-auto flex flex-wrap justify-around items-center py-12">
        <div className="flex flex-col w-full md:w-[50%] p-6 space-y-6">
          <h1 className="text-[60px] md:text-[80px] font-extrabold leading-tight text-indigo-600">
           AI <span className="text-orange-500">PDF or Photo </span> to JEE Mock Test generator
          </h1>
          <h2 className="text-[25px] md:text-[30px] text-gray-700">
            This site will help you to convert your PDF file to <strong className="text-violet-700 underline">IIT-JEE</strong> Mock test
            Generator - Now score high ranks with a detailed practice session
          </h2>

          <div className="flex space-x-11">
          <button className="w-[40%] px-6 py-3 mt-4 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 transition">
            Get Started
          </button>

          <button className="w-[40%] px-6 py-3 mt-4 font-bold text-[20px] bg-slate-300 text-slate-800 ring-2 ring-slate-600">
            <a href="https://x.com/TSilent_Monk">Follow us!!</a>
          </button>
          </div>
        </div>

      </div>

      <div className="w-full h-[auto] mt-28 flex flex-col items-center space-y-24">
  <h1 className="text-violet-800 mt-9 text-[60px] md:text-[70px] font-bold text-center">
    About the Application
  </h1>

  
  <div className="w-full flex flex-wrap justify-between items-center">
    <Image src={question} alt="Question Mark" className="h-[500px] w-[500px] ml-9 rounded-lg shadow-lg" />
    <div className="flex flex-col space-y-6 h-auto md:h-[400px] w-full md:w-[55%] p-6">
      <h1 className="text-orange-500 text-[50px] md:text-[60px] font-extrabold">
        Why Choose This Application?
      </h1>
      <p className="text-[18px] md:text-[22px] leading-relaxed text-gray-600">
        Ever found yourself needing to practice questions while learning a new topic? 
        This application simplifies the process by helping you create multiple-choice 
        questions (MCQs) from any document, photo, or PDF. Whether you’re studying 
        for an exam or preparing engaging content, this tool ensures you stay ahead. 
        Explore its features to unlock smarter ways of learning!
      </p>
    </div>
  </div>

 
  <div className="w-full flex flex-wrap-reverse justify-between items-center">
    <div className="ml-0 md:ml-9 flex flex-col space-y-6 h-auto md:h-[400px] w-full md:w-[55%] p-6">
      <h1 className="text-orange-500 text-[50px] md:text-[60px] font-extrabold">
        How to Use This Application?
      </h1>
      <p className="text-[18px] md:text-[22px] leading-relaxed text-gray-600">
        Getting started is simple. Navigate to the <strong>Create MCQs</strong> section from the Navbar, 
        upload your photo or PDF, and let our AI model work its magic! 
        Within seconds or minutes, you'll have an interactive MCQ session ready. 
        Please be patient during the process – good things take time!
      </p>
    </div>
    <Image src={working} alt="How It Works" className="h-[500px] w-[500px] object-cover rounded-lg shadow-lg" />
  </div>

  
  <div className="w-full flex flex-wrap justify-between items-center">
    <Image src={money} alt="Is It Free?" className="h-[500px] w-[500px] object-cover rounded-lg shadow-lg" />
    <div className="flex flex-col space-y-6 h-auto md:h-[400px] w-full md:w-[55%] p-6">
      <h1 className="text-orange-500 text-[50px] md:text-[60px] font-extrabold">
        Is This Application Free?
      </h1>
      <p className="text-[18px] md:text-[22px] leading-relaxed text-gray-600">
        Yes, this application is completely free to use for now! In the future, 
        a small fee may be introduced to support operational costs like database 
        maintenance and API usage. Rest assured, any charges will be aimed at 
        enhancing the platform to provide you with an even better learning experience.
      </p>
    </div>
  </div>
</div>

    </>
  );
}
