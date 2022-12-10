import React from "react";
import Twitter from "./assets/logo-twitter.svg";
import Facebook from "./assets/logo-facebook.svg";
import Instagram from "./assets/logo-instagram.svg";
import Github from "./assets/logo-github.svg";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        
        <footer className="w-full sticky bottom-0 bg-gray1 h-14 flex flex-row sm:justify-around justify-start flex-wrap">
            <div className="w-1/3 flex flex-row justify-center sm:pt-3 pt-5 min-w-fit sm:mr-0 mr-10">
                <a href="github.com/A1bert04/web-sendit"><img src={Github} alt="Github" className="lg:w-8 lg:h-8 w-6 h-6 mr-2"/></a>
                <a href="twitter.com"><img src={Twitter} alt="Twitter" className="lg:w-8 lg:h-8 w-6 h-6 mr-2"/></a>
                <a href="facebook.com"><img src={Facebook} alt="Facebook" className="lg:w-8 lg:h-8 w-6 h-6 mr-2"/></a>
                <a href="instagram.com"><img src={Instagram} alt="Instagram" className="lg:w-8 lg:h-8 w-6 h-6"/></a>
            </div>
            <div className="w-1/3 flex flex-row leading-[3.5rem] sm:pt-5 font-main sm:text-sm max-[408px]:text-sm text-xs">
                <Link to="/about-us" className="mr-6 min-w-fit hover:font-semibold hover:underline">About Us</Link>
                <Link to="/not-found" className="mr-6 hover:font-semibold hover:underline">LOPD</Link>
                <Link to="/contact" className="hover:font-semibold hover:underline">Contacto</Link>
            </div>
        </footer>

    );
}