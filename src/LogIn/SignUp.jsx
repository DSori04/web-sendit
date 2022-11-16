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
                    <div className="flex flex-col lg:w-1/2 w-full h-auto ml-24">
                        <div className="flex flex-row justify-start pt-3 font-main -ml-4">
                            <Link to="/login"><div className={`ml-12 text-black text-lg cursor-pointer`}>Log In</div></Link>
                            <div className={`ml-12 font-bold text-purple1 text-lg cursor-pointer`}>Sign Up</div>
                        </div>
                        <div className="w-96 h-1.5 bg-gray2 absolute top-[8rem]">
                            <div className="relative h-full w-28 ml-28 bg-purple2 "></div>
                        </div>
                        <div className="flex flex-col relative mt-12 lg:ml-24">
                            <form>
                                <label htmlFor="name" className="text-main block mt-8">Nombre</label>
                                <input type="text" className="border-b-2 block"></input>
                                <label htmlFor="name" className="text-main block mt-8">Apellidos</label>
                                <input type="text" className="border-b-2 block"></input>
                                <label htmlFor="name" className="text-main block mt-8">Correo Electrónico</label>
                                <input type="email" className="border-b-2 block"></input>
                                <label htmlFor="pw" className="text-main block mt-8">Contraseña</label>
                                <input type="password" className="border-b-2"></input>
                                <label htmlFor="pw" className="text-main block mt-8">Repetir Contraseña</label>
                                <input type="password" className="border-b-2"></input>
                                <input type="submit" value="Sign Up" className="block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl hover:hue-rotate-15"/>
                            </form>
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