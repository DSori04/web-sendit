import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { useState, useEffect } from "react"
import LoginIcon from "./assets/undraw_world_re_768.svg"
import { Link, useNavigate } from 'react-router-dom'
import AppContextProvider from '../GlobalStates';
import { Helmet } from "react-helmet-async";
import axios from "axios";

export function SignUp(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [mail, setMail] = useState("");
    const [pw, setPw] = useState("");
    const [pwrepeat, setPwrepeat] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [valid, setValid] = useState(false);
    const [error, setError] = useState({
        state: false,
        message: ""
    })

    function checkPw(e){
        const val = e.target.value
        if (val.length < e.target.minLength){
            e.target.setCustomValidity("La contraseña es demasiado corta")
        } else{
            e.target.setCustomValidity("Este campo es obligatorio")
        }
    }

    async function addUser(e){
        e.preventDefault();
        const user = Object.fromEntries(new FormData(e.target))
        if (user.password == user.pwrepeat){
            if (user.mail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
                await axios({
                    method: "put",
                    url: "https://server-sendit.onrender.com/user",
                    data: user,
                })
                .then((res) => {
                    sessionStorage.setItem('email', user.mail)
                    sessionStorage.setItem('logged', true)
                    sessionStorage.setItem('expires', Date.now() + 3600000)
                    sessionStorage.setItem('user_id', res.data.user_id)
                    sessionStorage.setItem('name', res.data.name)
                    sessionStorage.setItem('surname', res.data.surname)
                    navigate('/')
                })
                .catch((err) => {
                    setError({state: true, message: err?.response?.data.message})
                })
            } else{
                setError({state: true, message: "Inserte un email válido"})
            }
        }

    }


    return (
        <>
        <Helmet>
            <title>Sign Up</title>
            <meta name="description" content="Sign Up" />
        </Helmet>
            <AppContextProvider>
                <Navbar />
            </AppContextProvider>
            <main className="w-full flex shrink-0 justify-center min-h-[calc(100vh-3.5rem)]">
            <div className="w-3/4 mb-8 lg:pt-20 pt-16 top-16 sm:bottom-14 bottom-28 flex flex-col md:px-20 px-6 font-main select-none">
                <div className="flex lg:flex-row flex-col w-full">
                    <div className="flex flex-col lg:w-1/2 w-full h-auto">
                        <div className="flex flex-row justify-start pt-3 font-main">
                            <Link to="/login"><div className={`ml-8 text-black text-lg cursor-pointer hover:text-purple1 hover:font-semibold`}>Log In</div></Link>
                            <div className={`ml-8 font-bold text-purple1 text-lg cursor-pointer`}>Sign Up</div>
                        </div>
                        <div className="lg:w-96 w-[40%] h-1.5 bg-gray2 absolute top-[8rem]">
                            <div className="relative h-full w-28 ml-28 bg-purple2 "></div>
                        </div>
                        <div className="flex flex-col relative mt-12 lg:ml-24">
                            <form autoComplete="off" onSubmit={e => addUser(e)}>
                                <label htmlFor="name" className="text-main block mt-8">Nombre <span className="text-main text-red1">*</span></label>
                                <input type="text" name="name" className="border-b-2 block" required onChange={(e) => setName(e.target.value)} onInvalid={(e) => e.target.setCustomValidity('Este campo es obligatorio')} onInput={(e) => e.target.setCustomValidity('')}></input>
                                
                                <label htmlFor="surname" className="text-main block mt-8">Apellidos <span className="text-main text-red1">*</span></label>
                                <input type="text" name="surname" className="border-b-2 block" required onChange={(e) => setSurname(e.target.value)} onInvalid={(e) => e.target.setCustomValidity('Este campo es obligatorio')} onInput={(e) => e.target.setCustomValidity('')}></input>
                                
                                <label htmlFor="mail" className="text-main block mt-8">Correo Electrónico <span className="text-main text-red1">*</span></label>
                                <input type="email" name="mail" className="border-b-2 block" required onChange={(e) => setError({state: false, message: ""})} onInvalid={(e) => e.target.setCustomValidity('Introduce un correo electrónico válido')} onInput={(e) => e.target.setCustomValidity('')}></input>
                                {error.state && <span className="font-main text-red1">{error.message}</span>}
                                
                                <label htmlFor="password" className="text-main block mt-8">Contraseña <span className="text-main text-red1">*</span></label>
                                <input type="password" name="password" className="border-b-2" required onChange={(e) => setPw(e.target.value)} minLength={6} onInvalid={(e) => checkPw(e)} onInput={(e) => e.target.setCustomValidity('')}></input>
                                
                                <label htmlFor="pwrepeat" className="text-main block mt-8">Repetir Contraseña <span className="text-main text-red1">*</span></label>
                                <input type="password" name="pwrepeat" className="border-b-2" required minLength={6} onInvalid={(e) => checkPw(e)} onChange={(e) => setPwrepeat(e.target.value)} onInput={(e) => e.target.setCustomValidity('')}></input><br></br>
                                {(pwrepeat != pw && pwrepeat != "") && <><span className="text-red1">Las contraseñas deben ser iguales</span><br></br></>}

                                <input type="checkbox" name="checkTerms" className="inline-block mt-8" required onInvalid={(e) => e.target.setCustomValidity('Este campo es obligatorio')} onInput={(e) => e.target.setCustomValidity('')}></input>                                
                                <label htmlFor="checkTerms"> Acepto los <span className="text-purple1 font-main underline cursor-pointer">términos de servicio</span> <span className="text-main text-red1">*</span></label>
                                
                                <input type="submit" value="Sign Up" className="block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl hover:hue-rotate-15"/>
                            </form>
                        </div>
                    </div>
                    <div className="flex-col lg:flex hidden lg:w-1/2 h-auto lg:mt-10">
                        <img src={LoginIcon} alt="Login page icon" className=" xl:max-h-96 lg:max-h-80 xl:mt-0 lg:mt-10 mt-20 min-w-fit" />
                    </div>
                </div>
            </div>
            </main>
            <Footer />
        </>
    );
}