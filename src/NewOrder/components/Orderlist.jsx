import React from "react";
import { Circle } from "./circle"
import recibido from "../../Tracking/assets/recibido.svg"
import delivery_black from "../../Tracking/assets/delivery_black.svg"
import delivery_white from "../../Tracking/assets/delivery_white.svg"
import received_black from "../../Tracking/assets/received_black.svg"
import received_white from "../../Tracking/assets/received_white.svg"


export function Orderlist(){
    return(
        <div className="flex flex-row lg:w-1/2 w-full justify-center">
            <Circle active={true} icon={recibido} />
            <div className="bg-purple1 h-2 w-14 mt-10 -ml-1 -mr-1"></div>
            <Circle active={true} icon={delivery_white}/>
            <div className="bg-gray1 h-2 w-14 mt-10 -ml-1 -mr-1 z-0"></div>
            <Circle active={false} icon={received_black}/>
        </div>
    )
}