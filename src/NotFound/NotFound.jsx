import React from "react";
import imagen404 from "./Assets/Notfound.svg";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import AppContextProvider from "../GlobalStates";
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet-async";

export function NotFound() {

    console.log("NotFound");

    return (
        <AppContextProvider>
            <>
                <Helmet>
                    <title>Not Found</title>
                </Helmet>
                <Navbar />
                <div className="min-h-[calc(100vh-3.5rem)]">

                    <div className="w-full bg-white flex justify-center items-center p-10 lg:pt-32">
                        <img src={imagen404} alt="404" className=" max-h-96 lg:pt-0 pt-32 " />
                    </div>
                    <div className="flex justify-center items-center text-center lg:pt-7 pt-10 ml-8 mr-8">
                        <div className="lg:text-3xl text-4xl leading-[4rem]">
                            <span className=" font-bold">
                                ¡Woops!
                            </span>
                            &nbsp; esta página no existe - &nbsp;
                            <span className=" lg:hidden inline">
                                <br />
                            </span>
                            <Link to="/" className=" text-purple1 underline hover:hue-rotate-15">Volver a inicio</Link>

                        </div>
                    </div>

                </div>
                <Footer />
            </>
        </AppContextProvider>
    );
}