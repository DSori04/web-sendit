import React from "react";
import Logo from "../SharedComponents/Logo.png"

export function Navbar() {
    /*TODO: 
        Add Icons 
        Add Links  
    */
    return (
        <div className="bg-gray1 w-full h-16 flex justify-between pl-24 select-none fixed">
        <div id="logo" className="flex-start h-14 w-48"><img src={Logo} className="object-contain"></img></div>
        <div id="menu" className="xl:flex hidden flex-row w-5/12 leading-[3.5rem] text-center align-middle justify-around select-none font-main text-gray2">
            <div className="cursor-pointer">Tracking</div>
            <div className="cursor-pointer">Nuevo</div>
            <div className="cursor-pointer">Precios</div>
            <div className="ml-20 cursor-pointer"><p className="text-purple1 font-main font-semibold">Log In</p></div>
            <div className="bg-purple1 cursor-pointer align-middle leading-[2rem] text-white rounded-full mt-4 w-28 h-8 text-center -ml-8 font-semibold">Sign Up</div> 
        </div>
        </div>
    );
}
