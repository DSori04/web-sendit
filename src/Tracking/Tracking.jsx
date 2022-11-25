import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import TrackIcon from "./assets/tracking.svg"
import { TrackingForm } from "./components/TrackingForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AppContextProvider from "../GlobalStates";
import { Helmet } from "react-helmet-async";
import Directions from "./components/MapsPos";
import { StateMarker } from "./components/StateMarkers";

// TODO Why the icon doesn't show up in the browser tab?

export function Tracking() {
    const [inputting, setInput] = useState(true);
    const [orderId, setOrder] = useState();
    const [data, setData] = useState();

    const origin = {
        name: "Peccatum",
        Addr1: "Av. 5 de Mayo 123",
        Phone: "1234567890",
        City: "Guadalajara",
        CP: "44100", 
        lat: 41.112543321888104,
        lng: 1.2565044470474362
    }

    const destination = {
        name: "Peccatum",
        Addr1: "Calle Inventada 123",
        Phone: "1234567890",
        City: "City",
        CP: "44100",
        lat: 41.120441227561926,
        lng: 1.2435490857768052
    }

    const order = {
        order_id: orderId,
        state: 1,
        order_date: "2021-08-01",
        delivery_date: "2021-08-02",
    }

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
                        <TrackingForm setInput={setInput} setOrder={setOrder} setData={setData} />
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
                                <StateMarker state={order.state} />
                            </div>
                            <div className="flex flex-col justify-center min-w-fit">
                                <div className="w-full lg:text-right"><span className="font-bold">Fecha pedido:</span> {order.order_date}</div>
                                <div className="w-full lg:text-right"><span className="font-bold text-purple1">Fecha entrega estimada:</span> {order.delivery_date}</div>
                            </div>
                            
                        </div>
                        <div className="flex flex-row w-full h-fit justify-center flex-wrap">
                            <div className="flex flex-col lg:w-1/2 w-full min-w-fit">
                                <div id="origin" className="flex flex-col border-b-2 border-gray2 w-3/4 lg:pb-12 pb-5 sm:leading-9 leading-6">
                                    <span className="font-bold text-purple1 text-xl">Origen</span>
                                    <span>{origin.name} - {origin.Addr1}</span>
                                    <span>{origin.CP} - <b>{origin.City}</b></span>
                                    <span>{origin.Phone.slice(0, 3)} {origin.Phone.slice(3, 5)} {origin.Phone.slice(5, 7)} {origin.Phone.slice(7, 9)}</span>
                                </div>
                                <div id="destiny" className="flex flex-col lg:mt-12 mt-5 sm:leading-9 leading-6 lg:mb-0 mb-4">
                                    <span className="font-bold text-purple1 text-xl">Destino</span>
                                    <span>{destination.name} - {destination.Addr1}</span>
                                    <span>{destination.CP} - <b>{destination.City}</b></span>
                                    <span>{destination.Phone.slice(0, 3)} {destination.Phone.slice(3, 5)} {destination.Phone.slice(5, 7)} {destination.Phone.slice(7, 9)} </span>
                                </div>
                            </div>
                            <Directions origin={origin} destination={destination} /> 
                        </div>
                    </div>
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}