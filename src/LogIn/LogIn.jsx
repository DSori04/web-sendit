import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { useState, useEffect, useContext } from "react"
import LoginIcon from "./assets/undraw_world_re_768.svg"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Error } from '../SharedComponents/Error'
import AppContextProvider from '../GlobalStates';
import {UserContext} from '../GlobalStates';

export function LogIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [data, setData] = useState({'email': email, 'password': password});
    const {logged, setLogged} = useContext(UserContext);

    useEffect(() => {
        setData({'email': email, 'password': password})
    }, [email, password])

    function handleSubmitLogin(e){
        e.preventDefault();
        const formdata = new FormData(e.target)
        localStorage.setItem('email', formdata.get('email'))
        localStorage.setItem('logged', true)
        setLogged(true)
        navigate('/')
    }

    return (
        <>
            <Navbar />
            <div className="w-full flex justify-center">
            <div className="w-3/4 lg:absolute lg:pt-20 pt-16 top-16 sm:bottom-14 bottom-28 flex flex-col md:px-20 px-6 font-main lg:min-h-0 min-h-screen">
                <div className="flex lg:flex-row flex-col w-full flex-nowrap">
                    <div className="flex flex-col lg:w-1/2 w-full h-auto">
                        <div className="flex flex-row justify-start pt-3 font-main">
                            <div className={`ml-8 font-bold text-purple1 text-lg cursor-pointer`}>Log In</div>
                            <Link to="/signup"><div className={`ml-8 text-lg cursor-pointer hover:text-purple1 hover:font-semibold`}>Sign Up</div></Link>
                        </div>
                        <div className="lg:w-96 w-[40%] h-1.5 bg-gray2 absolute top-[8rem]">
                            <div className="relative h-full w-28 ml-3 bg-purple2 "></div>
                        </div>
                        <div className="flex flex-col relative mt-12 lg:ml-24">
                            <form onSubmit={(e) => handleSubmitLogin(e)}>
                                <label htmlFor="mail" className="text-main block mt-8">Correo Electrónico</label>
                                <input type="email" id="email" name="email" className="border-b-2 block" required onInvalid={(e) => e.target.setCustomValidity('Introduce un correo electrónico válido')} onInput={(e) => e.target.setCustomValidity('')}></input>
                                <label htmlFor="pw" className="text-main block mt-8">Contraseña</label>
                                <input type="password" className="border-b-2" required onInvalid={(e) => e.target.setCustomValidity('Introduce una contraseña')} onInput={(e) => e.target.setCustomValidity('')}></input>
                                <input type="submit" value="Log In" className="block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl lg:hover:hue-rotate-15"/>
                            </form>
                            {/* <button className="block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl lg:hover:hue-rotate-15 w-32">Log In</button> */}
                        </div>
                    </div>
                    
                    <div className="flex-col lg:flex hidden lg:w-1/2 h-auto lg:mt-10">
                        <img src={LoginIcon} alt="Login page icon" className=" xl:max-h-96 lg:max-h-80 xl:mt-0 lg:mt-10 mt-10 min-w-fit" />
                    </div>
                    
                </div>
            </div>
            </div>
            <Footer />
        </>
    );
}