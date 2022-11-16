import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { useState, useEffect } from "react"
import { LoggingIn } from "./components/LoggingIn"
import { SignUp } from "./components/SignUp";
import { Textinp } from "./components/textinp";
import { FormGenerator } from "./components/FormGenerator";
import LoginIcon from "./assets/undraw_world_re_768.svg"

export function LogIn(props) {
    const [loggedIn, setLogin] = useState(props.option);
    useEffect(() => {
      return () => {
        setLogin(props.option)
      }
    }, [props.option])  

    return (
        <>
            <Navbar />
            <div className="lg:absolute lg:pt-20 pt-16 top-16 sm:bottom-14 bottom-28 w-full flex flex-col md:px-20 px-6 font-main lg:min-h-0 min-h-screen">
                <div className="flex lg:flex-row flex-col w-full">
                    <div className="flex flex-col lg:w-1/2 w-full h-auto">
                        <div className="flex flex-row justify-start pt-3 font-main -ml-4">
                            <div className={`ml-12 ${!loggedIn ? "font-bold text-purple1 text-lg" : "text-lg"} cursor-pointer`} onClick={() => setLogin(false)}>Log In</div>
                            <div className={`ml-12 ${loggedIn ? "font-bold text-purple1 text-lg" : "text-lg"} cursor-pointer`} onClick={() => setLogin(true)}>Sign Up</div>
                        </div>
                        <div className="w-1/3 h-1.5 bg-gray2 absolute top-[8rem]"></div>
                        <div className={`${!loggedIn ? "left-24" : "left-52"} w-28 h-1.5 bg-purple2 absolute top-[8rem] transition-transform`}></div>
                        <div className="absolute top-[11rem] w-7/12">
                            {loggedIn && <SignUp />}
                            {!loggedIn && <LoggingIn />}
                        </div>
                    </div>
                    <div className="flex-col lg:flex hidden lg:w-1/2 h-auto lg:mt-10">
                        <img src={LoginIcon} alt="Login page icon" className=" xl:max-h-96 lg:max-h-80 xl:mt-0 lg:mt-10 mt-20" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}