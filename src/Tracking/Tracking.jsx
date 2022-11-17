import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import TrackIcon from "./assets/tracking.svg"
import { TrackingForm } from "./components/TrackingForm";
import { useState } from "react";

export function Tracking() {
    const [step, setStep] = useState(1)
    return (
        <>
            <Navbar />
            <div className="lg:absolute lg:pt-0 pt-16 top-16 sm:bottom-14 bottom-28 bg-white w-full  flex flex-col md:px-20 px-6 font-main">
                <h1 className=" font-bold text-purple1 text-5xl lg:pt-14 pt-8 select-none">Tracking</h1>
                {step === 1 && <div className="flex flex-row w-full">
                    <TrackingForm />
                    <div className="text-right text-main flex flex-row justify-center">
                        <img src={TrackIcon} alt="Imagen de About Us" className=" xl:max-h-96 lg:max-h-80 sm:max-h-80 xl:mt-0 lg:mt-10 mt-10" />
                    </div>
                </div>}

            </div>
            <Footer />
        </>
    );
}