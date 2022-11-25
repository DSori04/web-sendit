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
import { StateMarker } from "./components/StateMarkers";

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
                        <div className="flex lg:flex-row flex-col w-full justify-between sm:mb-20 mb-12 flex-wrap">
                            <h1 className=" font-bold text-purple1 text-5xl select-none pt-4">Tracking</h1>
                            <div className="flex flex-col justify-center w-1/3">
                            <span className="text-center text-xl block min-w-fit sm:m-0 mt-8 pt-4 mb-4 px-2">Pedido <span className="font-semibold text-purple1">#{orderId}</span></span>
                                <StateMarker state={3} />
                            </div>
                            <div className="flex flex-col justify-center min-w-fit">
                                <div className="w-full lg:text-right"><span className="font-bold">Fecha pedido:</span> 01/01/1970</div>
                                <div className="w-full lg:text-right"><span className="font-bold text-purple1">Fecha entrega estimada:</span> 01/01/1970</div>
                            </div>
                            
                        </div>
                        <div className="flex flex-row w-full h-fit justify-center flex-wrap">
                            <div className="flex flex-col lg:w-1/2 w-full min-w-fit">
                                <div id="origin" className="flex flex-col border-b-2 border-gray2 w-3/4 lg:pb-12 pb-5 sm:leading-9 leading-6">
                                    <span className="font-bold text-purple1 text-xl">Origen</span>
                                    <span>Peccatum - Avda. Rambla Nova, 74</span>
                                    <span>43004 - <b>Tarragona</b></span>
                                    <span>877 06 36 68</span>
                                </div>
                                <div id="destiny" className="flex flex-col lg:mt-12 mt-5 sm:leading-9 leading-6 lg:mb-0 mb-4">
                                    <span className="font-bold text-purple1 text-xl">Destino</span>
                                    <span>Peccatum - Avda. Rambla Nova, 74</span>
                                    <span>43004 - <b>Tarragona</b></span>
                                    <span>877 06 36 68</span>
                                </div>
                            </div>
                            <Directions /> 
                        </div>
                    </div>
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}