import React from "react";
import imagen404 from "./Assets/Notfound.svg";

export function NotFound() {

    console.log("NotFound");

    return (
        <div className="h-screen max-h-screen">

            {/* Insertar aqui la NAVBAR */}


            <div className="w-full bg-white flex justify-center items-center p-7">
                <img src={imagen404} alt="404" className=" max-h-fit"/>
            </div>
            <div className="flex justify-center items-center">
                <h1 className="text-3xl">
                    <span className=" font-bold">
                        ¡Woops! 
                    </span>
                    &nbsp; esta página no existe - &nbsp;
                    <a href="/" className=" text-purple1 underline">Volver a inicio</a>

                </h1>
            </div>

        </div>
    );
}