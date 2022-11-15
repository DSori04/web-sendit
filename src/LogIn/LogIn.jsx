import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { useState } from "react"
import { LoggingIn } from "./components/LoggingIn"
import { SignUp } from "./components/SignUp";
import { Textinp } from "./components/textinp";
import { FormGenerator } from "./components/FormGenerator";

export function LogIn() {
    const [loggedIn, setLogin] = useState(false);
    const login_inputs = [
        {"Name" : "Correo Electrónico", "type" : "email"},
        {"Name" : "Contraseña", "type" : "password"}
    ]
    // const login_inputs = {
    //     'Correo Electrónico' : "email",
    //     "Contraseña" : "password"
    // }
    // const signup_inputs = {
    //     "Nombre" : "text",
    //     "Apellidos" : "text",
    //     "Correo electrónico" : "email",
    //     "Contraseña" : "password",
    //     "Repetir Contraseña" : "password"

    // }
    return (
        <>
            <Navbar />
            <div className="absolute top-24 left-2">
                <FormGenerator inputs={login_inputs}/>
            </div>
            {loggedIn && <SignUp/>}
            {!loggedIn && <LoggingIn/>}
            <Footer />
        </>
    );
}