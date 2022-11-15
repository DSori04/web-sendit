import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import icon from "./assets/aboutusicon.svg"
import ods from "./assets/ods.png"

export function AboutUs() {
    return (
        <>
            <Navbar />
            <div className="md:px-20 px-6 absolute top-16 bg-white w-full h-5/6 flex flex-row justify-around">
                <div className="flex-start w-1/3">
                    <h1 className="font-main text-purple1 text-5xl lg:pt-14 pt-8 font-bold">¿Quiénes somos?</h1>
                    <p className="font-main text-black text-2xl mt-48 tracking-wide leading-10">
                        <span className="text-purple1 font-bold">SendIT</span> es una empresa innovadora fundada en 2022 con el objetivo de fomentar el 
                        <span className="text-purple1 font-bold"> pequeño comercio</span> y los envíos intraurbanos. Gracias a nuestra presencia online, podemos 
                        <span className="text-purple1 font-bold"> ahorrar costos</span> para asegurarnos de tener 
                        los precios <span className="text-purple1 font-bold">más bajos</span> y accesibles
                    </p>
                </div>
                <div className="flex-end mt-24 flex flex-col justify-around">
                    <img src={icon}></img>
                    <div className="text-right text-main flex flex-row justify-end">
                        <div className="w-1/2 pr-4 pt-3 text-lg"><p>SendIT es una empresa comprometida con los <span className="text-purple1 font-bold  ">Objetivos de Desarrollo Sostenible</span></p></div>
                        <div><img src={ods}></img></div>
                    </div>    
                </div>

            </div>
            <Footer />
        </>
    );
}