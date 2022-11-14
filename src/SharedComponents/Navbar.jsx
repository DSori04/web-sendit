import React from "react";
import Logo from "../SharedComponents/Logo.png"

export function Navbar() {
    return (
        <div className="bg-gray1 w-full h-16 flex justify-between pl-24 select-none fixed">
        <div id="logo" className="flex-start h-14 w-48"><img src={Logo} className="object-contain"></img></div>
        <div id="menu" className="flex flex-row w-5/12 h-14 justify-around align-middle select-none mt-5 font-main text-gray2">
            <div className="cursor-pointer">Tracking</div>
            <div className="cursor-pointer">Nuevo</div>
            <div className="cursor-pointer">Precios</div>
            <div className="ml-20 cursor-pointer"><p className="text-purple1 font-main font-bold">Log In</p></div>
            <div className="bg-purple1 cursor-pointer text-white rounded-full w-28 -mt-1 pt-1 h-8 text-center -ml-8">Sign Up</div>
        </div>
        </div>
    );
}
