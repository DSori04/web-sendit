import React from "react";
import imagen404 from "./Assets/Notfound.svg";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";

export function NotFound() {

    console.log("NotFound");

    return (
        <div className="h-screen max-h-screen">

            <Navbar />

            <div className="w-full bg-white flex justify-center items-center p-10 lg:pt-32">
                <img src={imagen404} alt="404" className=" max-h-96"/>
            </div>
            <div className="flex justify-center items-center lg:pt-7">
                <h1 className="text-3xl">
                    <span className=" font-bold">
                        ¡Woops! 
                    </span>
                    &nbsp; esta página no existe - &nbsp;
                    <a href="/" className=" text-purple1 underline">Voler a inicio</a>

                </h1>
            </div>

            <Footer />

        </div>
    );
}