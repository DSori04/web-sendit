import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import TrackIcon from "./assets/tracking.svg"
import { TrackingForm } from "./components/TrackingForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppContextProvider from "../GlobalStates";
import { Helmet } from "react-helmet-async";
import Directions from "./components/MapsPos";
import { StateMarker } from "./components/StateMarkers";
import axios from 'axios';
import arrowBack from "./assets/arrow-back.svg"

// TODO Why the icon doesn't show up in the browser tab?

export function Tracking() {
    const {user_id, order_id} = useParams();

    const [inputting, setInput] = useState(true);
    const [orderId, setOrder] = useState();
    const [origin, setOrigin] = useState({});
    const [destination, setDestination] = useState({});
    const [data, setData] = useState({});
    
    useEffect(() => {
        if (user_id && order_id) {
            setOrder(order_id);
            setInput(false);
            axios({
                method: "get",
                url: `https://server-sendit.onrender.com/orders/${user_id}/${order_id}`,
            })
            .then((res) => {
                setOrigin({
                    name: res.data.origin_name,
                    Addr1: res.data.origin_addr1,
                    Phone: String(res.data.origin_phone),
                    City: res.data.origin_city,
                    CP: res.data.origin_cp,
                    lat: res.data.origin_lat,
                    lng: res.data.origin_lng
                })
                setDestination({
                    name: res.data.dest_name,
                    Addr1: res.data.dest_addr1,
                    Phone: String(res.data.dest_phone),
                    City: res.data.dest_city,
                    CP: res.data.dest_cp,
                    lat: res.data.dest_lat,
                    lng: res.data.dest_lng
                })
                setData({
                    order_id: res.data.order_id,
                    state: res.data.order_status,
                    order_date: res.data.date_creation.split("T")[0],
                    delivery_date: res.data.date_arrival.split("T")[0],
                })
                // setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            }
            );
        }
    }, []);

    

    return (
        <div className="w-full h-full relative">
            <Helmet>
                <title>Tracking</title>
                <meta name="description" content="Tracking" />
            </Helmet>
            <AppContextProvider>
                <Navbar />
            </AppContextProvider>
            <div className="flex justify-center w-full min-h-[calc(100vh-3.5rem)]">
                <div className="lg:pt-0 pb-8 bg-white w-3/4 mt-16 flex flex-col md:px-20 px-6 font-main">
                    
                    {inputting && <><h1 className=" font-bold text-purple1 text-5xl lg:pt-14 pt-8 select-none">Tracking</h1><div className="flex flex-row w-full">
                        <TrackingForm setInput={setInput} setOrder={setOrder} setData={setData} setOrigin={setOrigin} setDestination={setDestination} />
                        <div className="text-right text-main sm:flex hidden flex-row justify-center">
                            <img src={TrackIcon} alt="Imagen de About Us" className=" xl:max-h-96 lg:max-h-80 sm:max-h-80 xl:mt-0 lg:mt-10 mt-10 min-h-fit" />
                        </div>
                    </div></>}
                    {!inputting && 
                    <div className="flex flex-col font-main">
                        <div className="flex lg:flex-row flex-col w-full justify-between sm:mb-20 mb-12 flex-wrap">
                            <div>
                                <button className="mt-6 border-2 border-purple1 rounded-full p-2 w-10 h-10 bg-white shadow-xl hover:scale-105 active:scale-95" onClick={() => setInput(true)}>
                                    <img src={arrowBack} alt="back"></img>
                                </button>
                            </div>
                            <h1 className=" font-bold text-purple1 text-5xl select-none pt-4">Tracking</h1>
                            <div className="flex flex-col justify-center w-1/3">
                            <span className="text-center text-xl block min-w-fit sm:m-0 mt-8 pt-4 mb-4 px-2">Pedido <span className="font-semibold text-purple1">#{orderId}</span></span>
                                <StateMarker state={data.state} />
                            </div>
                            <div className="flex flex-col justify-center min-w-fit">
                                <div className="w-full lg:text-right"><span className="font-bold">Fecha pedido:</span> {data.order_date}</div>
                                <div className="w-full lg:text-right"><span className="font-bold text-purple1">Fecha entrega estimada:</span> {data.delivery_date}</div>
                            </div>
                            
                        </div>
                        <div className="flex flex-row w-full h-fit justify-center flex-wrap">
                            <div className="flex flex-col lg:w-1/2 w-full min-w-fit">
                                <div id="origin" className="flex flex-col border-b-2 border-gray2 w-3/4 lg:pb-12 pb-5 sm:leading-9 leading-6">
                                    <span className="font-bold text-purple1 text-xl">Origen</span>
                                    <span>{origin.name} - {origin.Addr1}</span>
                                    <span>{origin.CP} - <b>{origin.City}</b></span>
                                    <span>{origin.Phone?.slice(0, 3)} {origin.Phone?.slice(3, 5)} {origin.Phone?.slice(5, 7)} {origin.Phone?.slice(7, 9)}</span>
                                </div>
                                <div id="destiny" className="flex flex-col lg:mt-12 mt-5 sm:leading-9 leading-6 lg:mb-0 mb-4">
                                    <span className="font-bold text-purple1 text-xl">Destino</span>
                                    <span>{destination.name} - {destination.Addr1}</span>
                                    <span>{destination.CP} - <b>{destination.City}</b></span>
                                    <span>{destination.Phone?.slice(0, 3)} {destination.Phone?.slice(3, 5)} {destination.Phone?.slice(5, 7)} {destination.Phone?.slice(7, 9)} </span>
                                </div>
                            </div>
                            <Directions origin={origin} destination={destination} /> 
                        </div>
                    </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}