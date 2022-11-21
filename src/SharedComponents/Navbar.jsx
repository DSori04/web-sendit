import React from "react";
import Logo from "./assets/logo.png";
import Tracking from "./assets/Tracking.svg"
import New from "./assets/New.svg"
import Prices from "./assets/Prices.svg"
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import MenuIcon from './assets/menu-outline.svg'
import LogIcon from './assets/logIcon.svg'
import {UserContext} from '../GlobalStates';
import randomColor from "randomcolor";

export function Navbar() {
    const [sideMenu, setVis] = useState(false);
    const [logged, setLogged] = useState(localStorage.getItem('logged'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    
    // useEffect(() => {  
    //   return () => {
    //     setLogged(localStorage.getItem('logged'))
    //     setEmail(localStorage.getItem('email'))
    //   }
    // }, [])
    console.log(email)
    const color = randomColor()
    console.log(`bg-[${color}]`)
    
    return (
        <>
            <nav className="bg-gray1 w-full h-16 flex lg:justify-between z-40 justify-between lg:px-24 select-none fixed">
                <div id="logo" className="flex-start h-14 w-48">
                    <Link to="/">
                        <img src={Logo} className="object-contain">
                        </img>
                    </Link>
                </div>
                <div id="menu" className="lg:flex hidden flex-row w-max text-center align-middle justify-around select-none font-main text-gray2">
                    <div className="w-max lg:flex flex-col justify-center">
                        <div className="flex lg:flex-row flex-col justify-end w-max  h-max">
                            <div id="imgs" className="flex flex-row justify-around lg:h-max">
                                <Link to="/tracking" className="lg:mx-5 lg:flex lg:flex-row">
                                    <img src={Tracking} className="text-center fill-black md:w-5 w-11" alt="tracking-icon">
                                    </img>
                                    <div className="lg:flex hidden flex-col justify-center">
                                        <span className="mx-4 hover:underline-offset-4 hover:underline hover:font-semibold">
                                            Tracking
                                        </span>
                                    </div>
                                </Link>
                                <Link to="/new" className="lg:mx-5 lg:flex lg:flex-row">
                                    <img src={New} className="text-center fill-black md:w-5 w-11" alt="box-icon">
                                    </img>
                                    <div className="lg:flex hidden flex-col justify-center">
                                        <span className="mx-4 hover:underline-offset-4 hover:underline hover:font-semibold">
                                            Nuevo pedido
                                        </span>
                                    </div>
                                </Link>
                                <Link to="/prices" className="lg:mx-5 lg:flex lg:flex-row">
                                    <img src={Prices} className="text-center fill-black md:w-5 w-11" alt="prices-icon">
                                    </img>
                                    <div className="lg:flex hidden flex-col justify-center">
                                        <span className="mx-4 hover:underline-offset-4 hover:underline hover:font-semibold">
                                            Precios
                                        </span>
                                    </div>
                                </Link>
                            </div>
                            <div id="links" className="flex flex-row justify-around -mt-2 lg:hidden">
                                <Link to="/tracking" className={`text-center text-gray2`}>
                                    Tracking
                                </Link>
                                <Link to="/new" className={`text-center text-gray2`}>
                                    Nuevo
                                </Link>
                                <Link to="/prices" className={`text-center text-gray2`}>
                                    Precios
                                </Link>
                            </div>

                        </div>
                    </div>
                    {!logged && <div className="flex justify-around w-max">
                        <div className=" w-full flex flex-row justify-end">
                            <Link to="/login" className="w-max px-8">
                                <div id="login" className=" cursor-pointer align-middle leading-[3.5rem] h-16">
                                    <p className="text-purple1 font-main font-semibold pt-1 hover:hue-rotate-15 hover:font-bold">
                                        Log In
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <Link to="/signup">
                            <div id="signup" className="bg-purple1 cursor-pointer align-middle leading-[2rem] text-white rounded-full mt-4 w-28 h-8 text-center font-semibold drop-shadow-lg hover:scale-105 hover:hue-rotate-15 hover:font-bold">
                                Sign Up
                            </div>
                        </Link>
                    </div>}
                    {logged && <div className={`w-11 h-11 mt-3 rounded-full bg-[${color}] ml-2`}>
                        <span className="leading-[2.8rem] align-middle text-2xl font-bold text-main">{email.charAt(0).toUpperCase()}</span>

                    </div>}
                </div>
                <div className="lg:hidden flex pr-2 w-16" onClick={() => setVis(!sideMenu)}>
                    <img src={MenuIcon}></img>
                </div>
            </nav>
            {sideMenu && <nav className="absolute top-16 w-16 right-0 bg-gray1 h-fit rounded-bl-3xl grid grid-cols-1 items-center px-4 lg:hidden drop-shadow-xl z-40" onScroll={() => setVis(false)}>
                <Link to="/tracking"><img src={Tracking} className="w-full py-4 border-b-2"></img></Link>
                <Link to="/new"><img src={New} className="w-full py-4 border-b-2"></img></Link>
                <Link to="/prices"><img src={Prices} className="w-full py-4 border-b-2"></img></Link>
                <Link to="/signup"><img src={LogIcon} className="w-full py-4"></img></Link>
            </nav>}
        </>
    );
}
