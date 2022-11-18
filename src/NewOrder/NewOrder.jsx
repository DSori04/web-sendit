import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";

export function NewOrder() {
    return (
        <>
            <Navbar />
            <div className="flex flex-row w-full justify-center">
            <div className="xl:w-3/4 lg:absolute lg:pt-0 pt-16 top-16 sm:bottom-14 bottom-28 bg-red1 w-full flex flex-col md:px-20 px-6 font-main">
                <h1>New Order</h1>
            </div>
            </div>
            <Footer />
        </>
    );
}