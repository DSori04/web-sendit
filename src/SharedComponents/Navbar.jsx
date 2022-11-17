import React from "react";
import Logo from "./assets/logo.png";
import Tracking from "./assets/Tracking.svg"
import Box from "./assets/Box.svg"
import Prices from "./assets/Prices.svg"
import { Link } from "react-router-dom";
import { useState } from 'react';
import MenuIcon from './assets/menu-outline.svg'
import LogIcon from './assets/logIcon.svg'

export function Navbar() {
    const [tracking, setTracking] = useState(false)
    const [newMenu, setNew] = useState(false);
    const [price, setPrice] = useState(false);
    const [sideMenu, setVis] = useState(false);

    return (
        <>
            <nav className="bg-gray1 w-full h-16 flex lg:justify-between z-40 justify-between lg:pl-24 select-none fixed">
                <div id="logo" className="flex-start h-14 w-48"><Link to="/"><img src={Logo} className="object-contain"></img></Link></div>
                <div id="menu" className="lg:flex hidden flex-row w-9/12 text-center align-middle justify-around pl-16 select-none font-main text-gray2">
                    <div className="flex flex-col justify-around w-1/2">
                        <div id="imgs" className="flex flex-row justify-around"  >
                            <Link to="/tracking" onMouseEnter={() => setTracking(true)} onMouseLeave={() => setTracking(false)}>
                                <img src={Tracking} className="text-center w-16 h-12 pt-2 pl-2 pb-1 hover:scale-110" alt="tracking-icon">
                                </img>
                            </Link>
                            <Link to="/new" onMouseEnter={() => setNew(true)} onMouseLeave={() => setNew(false)}>
                                <img src={Box} className="text-center h-10 pt-2 pl-2 hover:scale-110" alt="box-icon">
                                </img>
                            </Link>
                            <Link to="/prices" onMouseEnter={() => setPrice(true)} onMouseLeave={() => setPrice(false)}>
                                <img src={Prices} className="text-center h-12 w-16 hover:scale-110" alt="prices-icon">
                                </img>
                            </Link>
                        </div>
                        <div id="links" className={`flex flex-row justify-around -mt-2`}>
                            <Link to="/tracking" className={`text-center ${tracking ? 'text-gray2' : 'text-gray1'}`}>
                                Tracking
                            </Link>
                            <Link to="/new" className={`text-center ${newMenu ? 'text-gray2' : 'text-gray1'}`}>
                                Nuevo
                            </Link>
                            <Link to="/prices" className={`text-center ${price ? 'text-gray2' : 'text-gray1'}`}>
                                Precios
                            </Link>
                        </div>

                    </div>
                    <div className="flex justify-around w-96">
                        <Link to="/login"><div id="login" className="ml-28 cursor-pointer align-middle leading-[3.5rem] h-16"><p className="text-purple1 font-main font-semibold pt-1 hover:hue-rotate-15">Log In</p></div></Link>
                        <Link to="/signup"><div id="signup" className="bg-purple1 cursor-pointer align-middle leading-[2rem] text-white rounded-full mt-4 w-28 h-8 text-center -ml-8 font-semibold drop-shadow-lg hover:scale-105 hover:hue-rotate-15">Sign Up</div></Link>
                    </div>
                </div>
                <div className="lg:hidden flex pr-2 w-16" onClick={() => setVis(!sideMenu)}>
                    <img src={MenuIcon}></img>
                </div>
            </nav>
            {sideMenu && <nav className="absolute top-16 w-16 right-0 bg-gray1 h-fit rounded-bl-3xl grid grid-cols-1 items-center px-4 lg:hidden drop-shadow-xl z-40">
                <Link to="/tracking"><img src={Tracking} className="w-full py-4 border-b-2"></img></Link>
                <Link to="/new"><img src={Box} className="w-full py-4 border-b-2"></img></Link>
                <Link to="/prices"><img src={Prices} className="w-full py-4 border-b-2"></img></Link>
                <Link to="/signup"><img src={LogIcon} className="w-full py-4"></img></Link>
            </nav>}
        </>

    );
}
