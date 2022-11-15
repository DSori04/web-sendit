import React from "react";
import { Link } from 'react-router-dom'
import { Navbar } from '../SharedComponents/Navbar'
import { Footer } from '../SharedComponents/Footer'
import HomeImg from './Assets/Image1.svg'

export function Home() {
    return (
        <>
            <Navbar />
            <div className="absolute top-16 sm:bottom-14 bottom-28 bg-white w-full flex flex-col">
                <div id="text-main" className="flex flex-row w-9/12 justify-around ml-48 mt-12 flex-wrap-reverse">
                    <div id="text-content" className="flex flex-col w-5/12 mt-32">
                        <div id="text" className="w-full h-1/2 tracking-wider font-bold text-right text-4xl font-main">Nunca hemos <br></br> estado tan <span className="text-purple1">cerca</span></div>
                        <div id="conocenos" className="w-full mt-5 flex flex-row justify-around">
                            <div className="w-1/2 flex-start"></div>
                            <div className="flex-end w-40 font-main mt-6 lg:m-0 font-semibold text-xl py-2 border-2 text-white bg-purple1 rounded-full text-center cursor-pointer">
                                <Link href="/about-us">¡Conócenos!</Link>
                            </div>
                        </div>
                    </div>
                    <div id="home-img"><img src={HomeImg}></img></div>
                </div>
                <div id="counters"></div>
            </div>
            <Footer />
        </>
    );
}