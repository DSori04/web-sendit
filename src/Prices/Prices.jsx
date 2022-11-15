import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { Link } from "react-router-dom";
import savings from "./assets/savings.svg";


export function Prices() {

    const prices = [
        {
            tier: "S",
            distance: "0 - 5 Km",
            pricePerKm: 1,
        },
        {
            tier: "M",
            distance: "5 - 10 Km",
            pricePerKm: 0.97
        },
        {
            tier: "L",
            distance: "10 - 15 Km",
            pricePerKm: 0.94
        },
        {
            tier: "XL",
            distance: "15 - 20 Km",
            pricePerKm: 0.89
        },
        {
            tier: "Ultra",
            distance: "> 20 Km",
            pricePerKm: 0.81
        }
    ]

    return (
        <>
            <Navbar />
            <div className="absolute top-16 sm:bottom-14 bottom-28 bg-white w-full  flex flex-col md:px-20 px-6 font-main">
                <h1 className=" font-bold text-purple1 text-5xl lg:pt-14 pt-8">Precios</h1>
                <p className=" py-10 text-2xl">
                    Con nosotros, estar cerca vale <span className="font-bold text-purple1">menos que nunca</span>
                </p>
                <div className="flex flex-row w-full">
                    <div className="flex flex-col lg:w-1/2 w-full">
                        <table className="text-xl">

                            <tr className=" border-b-2">
                                <th className="py-5">Tier</th>
                                <th>Distance</th>
                                <th>Price per Km</th>
                            </tr>
                            {prices.map((price) => {
                                return (
                                    <tr className=" border-b-2 border-b-gray2">
                                        <td className="text-center py-5">{price.tier}</td>
                                        <td className="text-center">{price.distance}</td>
                                        <td className="text-center">{price.pricePerKm} € / km</td>
                                    </tr>
                                )
                            })}
                        </table>
                        <div className=" lg:self-start self-center">
                            <div id="makeOrder" className="bg-purple1 cursor-pointer text-white rounded-full w-52 h-14 mt-14 text-center drop-shadow-lg hover:scale-105 text-xl">
                                <span className=" leading-[3.5rem] align-middle">
                                    <Link to="/new">Nuevo pedido</Link>
                                </span>
                            </div>
                        </div>
                        <div className="py-8 lg:text-left text-center w-full font-extralight">
                                ¿Eres una pequeña empresa?
                                <Link to="/contact" className=" text-purple1 underline"> ¡Utiliza nuestros beneficios!</Link>
                            </div>
                    </div>
                    <div className="flex-col lg:flex hidden lg:w-1/2 h-full`">
                        <img src={savings} alt="Imagen de ahorros" className=" max-h-72 mt-20" />
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}