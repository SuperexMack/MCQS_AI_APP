import Image from "next/image";
import quizImage from "./iit-jee.webp"
import Link from "next/link";

export default function Navbar(){
    return(
        <>
          <div className="w-full h-[130px] flex items-center bg-slate-100 ">
            <Image alt="icon-image" className="h-[120px] w-[350px] ml-[50px] rounded-xl" src={quizImage}></Image>
            <ul className="flex space-x-10 text-[30px] font-bold absolute right-[50px] text-purple-700">
                <li className="hover:relative hover:top-4 hover:cursor-pointer"><Link href="/">Home</Link></li>
                <li className="hover:relative hover:top-4 hover:cursor-pointer">About</li>
                <li className="hover:relative hover:top-4 hover:cursor-pointer"><Link href="/setmcqs">Create A Mock-Test</Link></li>
                <li className="hover:relative hover:top-4 hover:cursor-pointer"><Link href="/Signin">Login</Link></li>
                <li className="hover:relative hover:top-4 hover:cursor-pointer"><Link href="/Signup">Register</Link></li>
                <li className="hover:relative hover:top-4 hover:cursor-pointer">Contact</li>
                <li className="hover:relative hover:top-4 hover:cursor-pointer">Contribute to project</li>
            </ul>
          </div>
        </>
    )
}