import React from "react";
import Logo from "../SharedComponents/Logo.png"

export function Navbar() {
    return (
        <div className="bg-gray1 w-full h-14 flex justify-between pl-24">
        <div id="logo" className="flex-start h-14 w-48"><img src={Logo} className="object-contain"></img></div>
        <div id="menu" className="flex flex-row w-5/12 h-14 justify-around align-middle select-none mt-4 font-main text-gray2">
            <div>Tracking</div>
            <div>Nuevo</div>
            <div>Precios</div>
            <div><p className="text-purple1">Log In</p></div>
            <div className="bg-purple1 text-white rounded-full w-28 -mt-1 pt-1 h-8 text-center">Sign Up</div>
        </div>
        </div>
    );
}
