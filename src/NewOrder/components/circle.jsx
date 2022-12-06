import React from "react";

export function Circle({active, icon}){
    return(
        <div className={`rounded-full z-40 w-[90px] h-[90px] pt-[20px] ${active ? "bg-purple1" : "bg-gray3"} grid align-middle justify-center self-center`}>
            {typeof icon == "string" && <img src={icon} alt="icon"></img>}
            {typeof icon == "number" && <span>{icon}</span>}
        </div>
    )
}