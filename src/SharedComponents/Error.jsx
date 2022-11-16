import React from "react";

export function Error(props){
    const errors = {
        "signup" : "Ya existe una cuenta con este correo",
        "login" : "La contraseña o el correo electrónico son incorrectos"
    }
    return (
        <div className="absolute w-56 h-28 top-2/3 bg-red1 bg-opacity-70 rounded-xl p-2 pt-3 text-right left-1/3">
            <span className="font-main">{errors[props.type]}</span>
        </div>
    )
}