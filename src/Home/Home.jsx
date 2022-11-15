import React from "react";
import { Link, Route, Routes } from 'react-router-dom'
import { AboutUs } from '../AboutUs/AboutUs'
import { Contact } from '../Contact/Contact'
import { LogIn } from '../LogIn/LogIn'
import { NewOrder } from '../NewOrder/NewOrder'
import { Prices } from '../Prices/Prices'
import { Tracking } from '../Tracking/Tracking'
import { Navbar } from '../SharedComponents/Navbar'
import { Footer } from '../SharedComponents/Footer'

export function Home() {
    return (
        <>
            <Navbar />
            <div className="absolute top-16 sm:bottom-14 bottom-28 bg-white w-full h-full flex flex-col">
                <div id="text-main" className="flex flex-row">
                    <div id="text-button" className="flex flex-col">
                        <div id="text"></div>
                        <div id="conocenos"><button>¡Conócenos!</button></div>
                    </div>
                </div>
                <div id="counters"></div>
            </div>
            <Footer />
        </>
    );
}