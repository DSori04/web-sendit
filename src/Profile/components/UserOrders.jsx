import React from "react";
import noorder from '../assets/noorders.svg'
import { useNavigate } from "react-router";
import tracking from "../../SharedComponents/assets/Tracking.svg"
import trackingwhite from "../../SharedComponents/assets/trackingwhite.svg"
import received from "../../Tracking/assets/received_black.svg"
import delivery from "../../Tracking/assets/delivery_black.svg"
import final from "../../Tracking/assets/recibido.svg"
import { Link } from "react-router-dom"

export function Userorders(){
    const navigate = useNavigate()
    // const orders = []
    const orders = [
        {'state' : 1, 'id' : 1, 'distance' : '14.2Km', 'date' : '01/01/1970'},
    ]
    return(
        <>
        {orders.length == 0 && <div className="w-2/3 h-4/6 mt-16 flex flex-col pt-14 pl-32 min-w-fit">
            <img src={noorder}></img>
            <span className="font-main text-xl text-center mt-4"><b>Woops!</b> Parece que se han llevado tu pedido</span>
            
            <span className="font-main text-xl text-center mt-4 mb-4 font-light italic">No tienes ningún pedido</span>
            <button className="w-1/3 border-2 border-purple1 font-bold text-white bg-purple1 px-6 py-1 mx-auto rounded-full shadow-xl hover:hue-rotate-30" onClick={() => navigate('/new')}>Nuevo Pedido</button>
        </div>}
        {orders.length > 0 && 
            <div className="w-full h-5/6 mt-16 flex flex-col pt-14 pl-32 min-w-fit">
                <div className="w-full h-full flex flex-col justify-start overflow-y-scroll pr-3">
                    {orders.map((order)=> {
                        {console.log(order)}
                        return (<div className={`w-full rounded-full border-2 ${order.state == 3 ? "bg-purple1 text-white" : "bg-gray3"} border-gray2 drop-shadow-xl flex flex-row justify-around h-14 py-3 mb-3`}>
                            <img src={order.state == 1 ? received : order.state == 2 ? delivery : final}></img>
                            <span className="font-semibold">{order.state == 1 ? "Enviado" : order.state == 2 ? "En Reparto" : "Entregado"}</span>
                            <span>{order.distance}</span>
                            <span>{order.date}</span>
                            <img src={order.state == 3 ? trackingwhite : tracking} onClick={() => navigate(`/tracking/${order.id}`)} className="cursor-pointer"></img>
                        </div>)
                    })}
                </div>
                <button className="w-1/3 mt-4 border-2 border-purple1 font-bold text-white bg-purple1 px-6 py-1 mx-auto rounded-full shadow-xl hover:hue-rotate-30" onClick={() => navigate('/new')}>Nuevo Pedido</button>
            </div>}
        </>
    )
}