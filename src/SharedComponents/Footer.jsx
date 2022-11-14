import React from "react";
import Twitter from "./logo-twitter.svg";
import Facebook from "./logo-facebook.svg";
import Instagram from "./logo-instagram.svg";
import Github from "./logo-github.svg";
import { Link } from "react-router-dom";

export function Footer() {
    /*TODO: 
        Add Social Icons
        Add Links
     */
    return (
        <div className="bg-gray1 w-full h-14 flex justify-around absolute bottom-0 self-center flex-nowrap">
            {/* <div className="flex text-center leading-[3.5rem] align-middle">
                <a href="/not-found" className=" hover:underline">Github</a> &nbsp; · &nbsp;
                <a href="/not-found" className=" hover:underline">Twitter</a> &nbsp; · &nbsp;
                <a href="/not-found" className=" hover:underline">Instagram</a> &nbsp; · &nbsp;
                <a href="/not-found" className=" hover:underline">Facebook</a>
            </div> */}
            <div className="flex text-center h-14 leading-[3.5rem] align-middle pt-3 w-40 justify-around">
                {/* TODO Añadir iconitos para cuando el tamaño sea inferior a lg */}
                <a href="https://twitter.com"><img src={Twitter} className="fill-black w-8 h-8"></img></a>
                <a href="https://facebook.com"><img src={Facebook} className="fill-black w-8 h-8"></img></a>
                <a href="https://instagram.com"><img src={Instagram} className="fill-black w-8 h-8"></img></a>
                <a href="https://github.com"><img src={Github} className="fill-black w-8 h-8"></img></a>
            </div>
            <div className=" lg:self-auto self-center lg:w-auto w-full text-center leading-[3.5rem] align-middle h-14">About Us · LOPD · Contacto</div>
        </div>
    );
}