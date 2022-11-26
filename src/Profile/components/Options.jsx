import React from "react";
import cube from "../assets/cube.svg"
import person from "../assets/person.svg"
import exit from "../assets/exit.svg"
import { useNavigate } from "react-router";

export function Options({selected ,setSelected}){
    const navigate = useNavigate()
    function disconnect(){
        sessionStorage.setItem('logged', false)
        sessionStorage.removeItem('logged')
        sessionStorage.removeItem('email')
        navigate("/")
    }
    return(
    <div id="options" className="flex flex-col justify-center lg:h-3/4 h-1/6 lg:mt-4 mt-12 w-full">
        <div className="lg:w-1/2 w-full border-b-2 text-right border-b-gray2 mx-auto flex flex-row lg:justify-between cursor-pointer" onClick={() => setSelected(1)}>
            <img src={person} className="w-6 h-6"></img>
            <span className={`${selected == 1 ? "font-bold" : "font-normal"}`}>Datos Personales</span>
        </div>
        <div className="lg:w-1/2 w-full border-b-2 text-right border-b-gray2 mx-auto mt-4 flex flex-row lg:justify-between cursor-pointer" onClick={() => setSelected(2)}>
            <img src={cube} alt="" className="w-6 h-6" />
            <span className={`${selected == 2 ? "font-bold" : "font-normal"}`}>Mis Pedidos</span>
        </div>
        <div className="lg:w-1/2 w-full border-b-2 text-right text-red1 border-b-gray2 mx-auto mt-4 flex flex-row lg:justify-between cursor-pointer" onClick={() => disconnect()}>
            <img src={exit} alt="" className="w-6 h-6 fill-red1" />
            <span>Desconectar</span>
        </div>
    </div>
    )
}