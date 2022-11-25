import React from "react";
import deliveryblack from "../assets/delivery_black.svg";
import delivery from "../assets/delivery_white.svg";
// import tracking from "./assets/tracking.svg";
import sent from "../assets/recibido.svg";
import delivered from "../assets/received_white.svg";
import deliveredblack from "../assets/received_black.svg";


export function StateMarker({ state }) {
    return (
        <div className="flex flex-row justify-center w-full sm:mt-2 mb-4 min-w-fit">
            <div className={`w-[75px] h-[75px] bg-purple1 rounded-full mr-4`}><img src={sent} alt="" className="mx-auto h-[40px] mt-[13.5px]"/></div>
            <div className={`w-[75px] h-[75px] ${state == 1 ? "bg-gray3" : "bg-purple1"} rounded-full mr-4`}><img src={state == 1 ? deliveryblack : delivery} alt="" className="mx-auto h-[40px] mt-[13.5px]" /></div>
            <div className={`w-[75px] h-[75px] ${state == 3 ? "bg-purple1" : "bg-gray3"} rounded-full mr-4`}><img src={state == 3 ? delivered : deliveredblack} alt="" className="mx-auto h-[35px] mt-[20px]" /></div>
        </div>
    )
}