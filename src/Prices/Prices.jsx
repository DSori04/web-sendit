import React, { useLayoutEffect } from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { Link } from "react-router-dom";
import savings from "./assets/savings.svg";
import AppContextProvider from "../GlobalStates";
import { Helmet } from "react-helmet-async"
import axios from "axios";
import { useState, useEffect } from "react";

export function Prices() {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchPrices = async () => {
        await axios(
            {
                method: "get",
                url: 'https://server-sendit.onrender.com/prices',
            }
        )
            .then((res) => {
                let response = [];
                for (let i = 0; i < res.data.length; i++) {
                    response.push({
                        tier: res.data[i].tier_id,
                        distance: res.data[i].max_distance == null ? `> ${res.data[i].min_distance} km` : `${res.data[i].min_distance} - ${res.data[i].max_distance} km`,
                        pricePerKm: res.data[i].price,
                    })
                }
                setPrices(response);
            })
            .catch((err) => {
                console.log(err);
            }
            )
    }

    useEffect(() => {
        return () => {
            fetchPrices()
            setLoading(false)
        }
    }, [])

    return (
        <div className="w-full h-full relative min-h-screen">
            <Helmet>
                <title>Prices</title>
                <meta name="description" content="Prices" />
            </Helmet>
            <AppContextProvider>
                <Navbar />
            </AppContextProvider>
            <main className="flex justify-center w-full min-h-[calc(100vh-3.5rem)]">
                <div className="lg:pt-0 mt-8 bg-white w-3/4 flex flex-col font-main">
                    <h1 className=" font-bold text-purple1 text-5xl lg:pt-14 pt-8">Precios</h1>
                    <p className=" py-10 text-2xl">
                        Con nosotros, estar cerca vale <span className="font-bold text-purple1">menos que nunca</span>
                    </p>
                    <div className="flex flex-row w-full justify-around">
                        <div className="flex flex-col w-full">
                            <table className="text-xl">
                                <thead>
                                    <tr className=" border-b-2">
                                        <th className="py-5">Tier</th>
                                        <th>Distance</th>
                                        <th>Price per Km</th>
                                    </tr>
                                </thead>
                                {prices.map((price) => {
                                    return (
                                        <tbody key={price.tier}>
                                            <tr className=" border-b-2 border-b-gray2">
                                                <td className="text-center py-5">{price.tier}</td>
                                                <td className="text-center">{price.distance}</td>
                                                <td className="text-center">{price.pricePerKm} € / km</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                            <div className=" lg:self-start self-center">
                                <div id="makeOrder" className="bg-purple1 cursor-pointer text-white rounded-full w-52 h-14 mt-14 text-center drop-shadow-lg hover:scale-105 text-xl font-main font-semibold hover:hue-rotate-15">
                                    <span className=" leading-[3.5rem] align-middle">
                                        <Link to="/new">Nuevo pedido</Link>
                                    </span>
                                </div>
                            </div>
                            <div className="py-8 lg:text-left text-center w-full font-light">
                                ¿Eres una pequeña empresa?
                                <Link to="/contact" className=" text-purple1 underline hover:hue-rotate-15"> ¡Utiliza nuestros beneficios!</Link>
                            </div>
                        </div>
                        <div className="flex-row lg:flex w-3/4 hidden h-full justify-center">
                            <img src={savings} alt="Imagen de ahorros" className=" xl:max-h-96 lg:max-h-80 xl:mt-0 lg:mt-10 mt-20" />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}