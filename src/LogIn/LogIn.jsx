import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { useState } from "react"
import { LoggingIn } from "./components/LoggingIn"
import { SignUp } from "./components/SignUp";
import { Textinp } from "./components/textinp";
import { FormGenerator } from "./components/FormGenerator";
import LoginIcon from "./assets/undraw_world_re_768.svg"

export function LogIn() {
    const [loggedIn, setLogin] = useState(true);
    const login_inputs = [
        {"Name" : "Correo Electrónico", "type" : "email"},
        {"Name" : "Contraseña", "type" : "password"}
    ]
    function changeLogin(){
        setLogin(!loggedIn)
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-row absolute top-24 w-full justify-around select-none">
                <div className="flex flex-col w-1/2">
                    <div className="flex flex-row justify-start pt-3 font-main -ml-4">
                        <div className={`ml-12 ${!loggedIn ? "font-bold text-purple1 text-lg" : "text-lg"} cursor-pointer`} onClick={() => setLogin(!loggedIn)}>Log In</div>
                        <div className={`ml-12 ${loggedIn ? "font-bold text-purple1 text-lg" : "text-lg"} cursor-pointer`} onClick={() => setLogin(!loggedIn)}>Sign Up</div>
                    </div>
                    <div className="w-1/3 h-1.5 bg-gray2 absolute top-12"></div>
                    <div className={`${!loggedIn ? "left-24" : "left-52"} w-28 h-1.5 bg-purple2 absolute top-12 transition-transform`}></div>
                    <div className="absolute top-24 w-7/12">
                        {loggedIn && <SignUp/>}
                        {!loggedIn && <LoggingIn/>}
                    </div>
                    
                </div>
                <div>
                    <img src={LoginIcon}></img>
                </div>
            </div>
            
            <Footer />
        </>
    );
}