import React from "react";
import { useState } from 'react' 

export function Error(props){
    const errors = {
        "signup" : "Ya existe una cuenta con este correo",
        "login" : "La contraseña o el correo electrónico son incorrectos"
    }
    const [visible, setvisible] = useState(true)
    return (
        <>
            <div className={`absolute w-56 h-28 top-2/3 bg-red1 bg-opacity-70 rounded-xl p-2 pt-3 text-right left-1/3 shadow-2xl ${visible ? "" : "hidden"}`}>
                <div className="flex flex-row justify-around">
                    <div className="w-3/4">
                        <span className="font-main">{errors[props.type]}</span>
                    </div>
                    <div className="w-1/4 ml-4 -mt-3 leading-[7rem] align-middle border-l-2 text-center pl-2 cursor-pointer font-extrabold" onClick={() => setvisible(false)}>
                        X
                    </div>
                </div>
                
            </div>
        </>
    )
}