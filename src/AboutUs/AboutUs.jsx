import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import aboutusimage from "./assets/aboutusicon.svg"
import ods from "./assets/ods.png"

export function AboutUs() {
    return (
        <>
            <Navbar />
            <div className="lg:absolute lg:pt-0 pt-16 top-16 sm:bottom-14 bottom-28 w-full flex flex-col md:px-20 px-6 font-main">
                <h1 className=" font-bold text-purple1 text-5xl lg:pt-14 pt-8">¿Quiénes somos?</h1>
                <div className="flex lg:flex-row flex-col w-full">
                    <div className="flex flex-col lg:w-1/2 w-full h-auto">
                        <p className="font-main text-black lg:text-3xl text-2xl lg:mt-28 xl:mt-36 mt-10 tracking-wide lg:leading-[3.5rem] leading-10 lg:text-right">
                            <span className="text-purple1 font-bold">SendIT</span> es una empresa innovadora fundada en 2022 con el objetivo de fomentar el
                            <span className="text-purple1 font-bold"> pequeño comercio</span> y los envíos intraurbanos. Gracias a nuestra presencia online, podemos
                            <span className="text-purple1 font-bold"> ahorrar costos</span> para asegurarnos de tener
                            los precios <span className="text-purple1 font-bold">más bajos</span> y accesibles.
                        </p>
                    </div>
                    <div className="flex-col flex lg:w-1/2 h-auto lg:mt-10">
                        <div className="text-right text-main flex flex-row justify-end">
                            <img src={aboutusimage} alt="Imagen de About Us" className=" xl:max-h-96 lg:max-h-80 sm:max-h-80 xl:mt-0 lg:mt-10 mt-10" />

                        </div>
                        <div className="text-right text-main lg:mt-10 mt-5 flex flex-row justify-end">
                            <div className="w-4/5 pr-4 pt-3 text-md max-h-fit">
                                <p>SendIT es una empresa comprometida con los <span className="text-purple1 font-bold ">Objetivos de Desarrollo Sostenible</span></p>
                            </div>
                            <div className="mt-2 max-h-max">
                                <img src={ods}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}