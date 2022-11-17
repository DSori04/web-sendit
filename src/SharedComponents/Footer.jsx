import React from "react";
import Twitter from "./assets/logo-twitter.svg";
import Facebook from "./assets/logo-facebook.svg";
import Instagram from "./assets/logo-instagram.svg";
import Github from "./assets/logo-github.svg";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="flex w-full sm:notTall:relative lg:notTall:fixed lg:absolute bottom-0 relative bg-gray1 md:py-0 py-7 md:mt-0 mt-3">
            <div className="w-full md:h-14 h-max flex justify-around bottom-0 self-center lg:flex-wrap flex-wrap-reverse">
                <div className="flex flex-col md:h-full h-max justify-center">
                    <div className="flex text-center lg:w-56 w-full h-max leading-[3.5rem] justify-around md:pt-0 pt-3">
                        <a href="https://github.com/A1bert04/web-sendit" target="_blank"><img src={Github} className="fill-black md:w-8 w-11 h-6"></img></a>
                        <a href="https://twitter.com" target="_blank"><img src={Twitter} className="fill-black md:w-8 w-11 h-6"></img></a>
                        <a href="https://instagram.com" target="_blank"><img src={Instagram} className="fill-black md:w-8 w-11 h-6"></img></a>
                        <a href="https://facebook.com" target="_blank"><img src={Facebook} className="fill-black md:w-8 w-11 h-6"></img></a>
                    </div>
                </div>
                <div className=" lg:self-auto sm:w-auto text-center md:leading-[3.5rem] align-middle md:h-14 h-max w-full">
                    <Link to="/about-us">
                        <span className=" hover:underline cursor-pointer">About Us</span> &nbsp;
                    </Link>
                    · &nbsp;
                    <Link to="/LOPD">
                        <span className=" hover:underline cursor-pointer">LOPD</span> &nbsp;
                    </Link>
                    · &nbsp;
                    <Link to="/contact">
                        <span className=" hover:underline cursor-pointer">Contacto</span>
                    </Link>
                </div>
            </div>
        </footer>

    );
}