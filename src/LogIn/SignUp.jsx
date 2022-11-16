import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { useState, useEffect } from "react"
import LoginIcon from "./assets/undraw_world_re_768.svg"
import { Link } from 'react-router-dom'

export function SignUp(){
    return (
        <>
            <Navbar />
            <div className="lg:absolute lg:pt-20 pt-16 top-16 sm:bottom-14 bottom-28 w-full flex flex-col md:px-20 px-6 font-main lg:min-h-0 min-h-screen">
                <div className="flex lg:flex-row flex-col w-full">
                    <div className="flex flex-col lg:w-1/2 w-full h-auto">
                        <div className="flex flex-row justify-start pt-3 font-main -ml-4">
                            <Link to="/login"><div className={`ml-12 text-black text-lg cursor-pointer`}>Log In</div></Link>
                            <div className={`ml-12 font-bold text-purple1 text-lg cursor-pointer`}>Sign Up</div>
                        </div>
                        <div className="w-1/3 h-1.5 bg-gray2 absolute top-[8rem]"></div>
                        <div className={`left-52 w-28 h-1.5 bg-purple2 absolute top-[8rem] transition-transform`}></div>
                        <div className="absolute top-[11rem] w-7/12">
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