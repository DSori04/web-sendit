import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import TrackIcon from "./assets/tracking.svg"
import { TrackingForm } from "./components/TrackingForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AppContextProvider from "../GlobalStates";
import { Helmet } from "react-helmet-async";
// import MapComponent from "./components/MapComponent";
//import Places from "./components/AutoCompleteMap";
import Directions from "./components/MapsPos";
import Completer from "./components/AutoComplete";

export function Tracking() {
    const [inputting, setInput] = useState(false);
    const [orderId, setOrder] = useState();
    let { id } = useParams();
    console.log(id);


    function handleId() {
        if (id != undefined) {
            setInput(false)
            setOrder(id)
        }
    }

    useEffect(() => {
        return () => {
            handleId()
        }
    }, [orderId, inputting])

    return (
        <>
            <Helmet>
                <title>Tracking</title>
                <meta name="description" content="Tracking" />
            </Helmet>
            <AppContextProvider>
                <Navbar />
            </AppContextProvider>
            <div className="flex justify-center w-full">
                <div className="xl:top-[20%] lg:absolute lg:pt-0 pt-16 top-16 sm:bottom-14 bottom-28 bg-white w-3/4  flex flex-col md:px-20 px-6 font-main">
                    
                    {inputting && <><h1 className=" font-bold text-purple1 text-5xl lg:pt-14 pt-8 select-none">Tracking</h1><div className="flex flex-row w-full">
                        <TrackingForm />
                        <div className="text-right text-main sm:flex hidden flex-row justify-center">
                            <img src={TrackIcon} alt="Imagen de About Us" className=" xl:max-h-96 lg:max-h-80 sm:max-h-80 xl:mt-0 lg:mt-10 mt-10 min-h-fit" />
                        </div>
                    </div></>}
                    {!inputting && 
                    <div className="flex flex-col font-main">
                        <div className="flex flex-row w-full justify-between mb-20 flex-wrap">
                            <h1 className=" font-bold text-purple1 text-5xl select-none">Tracking</h1>
                            <div className="flex flex-col justify-center w-1/4">
                            <span className="text-center text-xl">Pedido <span className="font-semibold text-purple1">#{orderId}</span></span>
                                <div className="flex flex-row justify-between w-full mt-2 min-w-fit">
                                    <div className="w-[75px] h-[75px] bg-purple1 rounded-full lg:mx-0 mr-4"></div>
                                    <div className="w-[75px] h-[75px] bg-purple1 rounded-full lg:mx-0 mr-4"></div>
                                    <div className="w-[75px] h-[75px] bg-purple1 rounded-full lg:mx-0 mr-4"></div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="w-full text-right"><span className="font-bold">Fecha pedido:</span> 01/01/1970</div>
                                <div className="w-full text-right"><span className="font-bold text-purple1">Fecha entrega estimada:</span> 01/01/1970</div>
                            </div>
                            
                        </div>
                        <div className="flex flex-row w-full justify-end">
                            <div className="flex flex-col w-1/2">
                                <div id="origin" className="flex flex-col">
                                </div>
                                <div id="destiny"></div>
                            </div>
                            <Directions /> 
                        </div>
                    </div>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}