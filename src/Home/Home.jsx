import React from "react";
import { Link } from 'react-router-dom'
import { Navbar } from '../SharedComponents/Navbar'
import { Footer } from '../SharedComponents/Footer'
import HomeImg from './Assets/Image1.svg'

export function Home() {
    return (
        <>
            <Navbar />
            <div className="absolute top-16 bg-white w-full h-9/12 flex flex-col">
                <div id="text-main" className="flex flex-row w-9/12 justify-around sm:ml-32 lg:mt-12 mt-4 flex-wrap-reverse">
                    <div id="text-content" className="flex flex-col w-5/12 mt-32">
                        <div id="text" className="w-full h-1/2 lg:tracking-wider tracking-wide font-bold lg:text-right text-center lg:text-4xl sm:text-3xl text-2xl font-main">Nunca hemos <br></br> estado tan <span className="text-purple1">cerca</span></div>
                        <div id="conocenos" className="w-full mt-5 flex flex-row sm:justify-around justify-center">
                            <div className="w-1/2 flex-start lg:static"></div>
                            <div className="flex-end w-max px-2 font-main mt-4 lg:m-0 drop-shadow-lg border-purple1 hover:scale-105 font-semibold text-xl py-2 border-2 text-white bg-purple1 rounded-full text-center cursor-pointer">
                                <Link to="/about-us">¡Conócenos!</Link>
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