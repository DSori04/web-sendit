import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import imagenContacto from "./assets/contact.svg";

export function Contact() {
    return (
        <>
            <Navbar />
            <div className="lg:absolute lg:pt-0 pt-16 top-16 sm:bottom-14 bottom-28 bg-white w-full  flex flex-col md:px-20 px-6 font-main">
                <h1 className=" font-bold text-purple1 text-5xl lg:pt-14 pt-8">Contacto</h1>
                <div className="flex flex-row w-full">
                    <div className="flex flex-col lg:w-1/2 w-full">
                        Aqui va todo lo del formulario, al terminar avisame y ya pondre los margenes yo xd
                    </div>
                    <div className="flex-col lg:flex hidden lg:w-1/2 h-auto lg:mt-10">
                        <div className="text-right text-main flex flex-row justify-center">
                            <img src={imagenContacto} alt="Imagen de About Us" className=" xl:max-h-96 lg:max-h-80 sm:max-h-80 xl:mt-0 lg:mt-10 mt-10" />
                        </div>
                        <div className="text-center text-main lg:mt-10 mt-5 pr-4 pt-3 text-md leading-10 ">
                            <p>También puedes contactarnos por correo electrónico</p>
                            <p className=" underline text-purple1">
                                <a href="mailto: support@sendit.cat ">support@sendit.cat</a>
                            </p>
                            <p>... o a través de nuestras redes sociales</p>
                        </div>
                    </div>

                </div>

            </div>
            <Footer />
        </>
    );
}