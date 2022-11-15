import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
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
            <div className="absolute top-16 sm:bottom-14 bottom-28 bg-white w-full h-full flex flex-col md:px-20 px-6">
                <h1 className=" font-bold text-purple1 text-5xl pt-10">Precios</h1>
                <p className=" py-10 text-2xl">
                Con nosotros, estar cerca vale <span className="font-bold ">menos que nunca</span>
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