import React from "react";
import Logo from "./logo.png";
import Tracking from "./Tracking.svg"
import Box from "./Box.svg"
import Prices from "./Prices.svg"
import { Link } from "react-router-dom";

export function Navbar() {
    /*TODO: 
        Add Icons 
        Add Links  
    */
    return (
        <div className="bg-gray1 w-full h-16 flex justify-between pl-24 select-none fixed">
            <div id="logo" className="flex-start h-14 w-48"><Link to="/"><img src={Logo} className="object-contain"></img></Link></div>
            <div id="menu" className="lg:flex hidden flex-row w-9/12 text-center align-middle justify-around pl-16 select-none font-main text-gray2">
                {/* <div id='tracking' className="cursor-pointer flex flex-col h-16 justify-center">
                    <Link to="/tracking"><img src={Tracking} className="text-center w-16 h-10" alt="tracking-icon"></img></Link>
                    <Link to="/tracking" className="hover:underline text-center">Tracking</Link>
                </div>
                <div id='new' className="cursor-pointer flex flex-col h-16 justify-center mt-1">
                    <Link to="/new"><img src={Box} className="text-center h-9 w-16" alt="box-icon"></img></Link>
                    <Link to="/new" className="hover:underline text-center pt-1">Nuevo</Link>
                </div>
                <div id='prices' className="cursor-pointer flex flex-col h-16 justify-center pb-1">
                    <Link to="/prices"><img src={Prices} className="text-center h-12 w-16" alt="prices-icon"></img></Link>
                    <Link to="/prices" className="hover:underline text-center">Precios</Link>
                </div> */}
                <div className="flex flex-col justify-around w-1/2">
                <div id="imgs" className="flex flex-row justify-between">
                    <Link to="/tracking"><img src={Tracking} className="text-center w-16 h-10" alt="tracking-icon"></img></Link>
                    <Link to="/new"><img src={Box} className="text-center h-10 pt-2 pl-2" alt="box-icon"></img></Link>
                    <Link to="/prices"><img src={Prices} className="text-center h-12 w-16" alt="prices-icon"></img></Link>
                </div>
                <div id="links" className="flex flex-row justify-between -mt-2">
                    <Link to="/tracking" className="hover:underline text-center">Tracking</Link>
                    <Link to="/new" className="hover:underline text-center pt-1">Nuevo</Link>
                    <Link to="/prices" className="hover:underline text-center">Precios</Link>
                </div>
                </div>
                <div className="flex justify-around w-96">
                    <div id="login" className="ml-28 cursor-pointer mt-4"><p className="text-purple1 font-main font-semibold pt-1">Log In</p></div>
                    <div id="signup" className="bg-purple1 cursor-pointer align-middle leading-[2rem] text-white rounded-full mt-4 w-28 h-8 text-center -ml-8 font-semibold">Sign Up</div>
                </div>
                
            </div>
        </div>
    );
}
