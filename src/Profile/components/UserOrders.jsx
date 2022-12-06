import React from "react";
import noorder from '../assets/noorders.svg'
import { useNavigate } from "react-router";
import tracking from "../../SharedComponents/assets/Tracking.svg"
import trackingwhite from "../../SharedComponents/assets/trackingwhite.svg"
import final from "../../Tracking/assets/received_white.svg"
import delivery from "../../Tracking/assets/delivery_black.svg"
import received from "../../Tracking/assets/recibido.svg"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

export function Userorders(){
    const navigate = useNavigate()
    // const orders = []
    const [orders, setOrders] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: `https://server-sendit.onrender.com/orders/user/${sessionStorage.getItem('user_id')}`
        })
        .then(res => {   
            setOrders(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    //TODO: FIX IMAGE
    return(
        <>
        {orders.length == 0 && <div className="w-full lg:w-2/3 h-4/6 mt-16 flex flex-col pt-14 pl-32 mx-auto">
            <img src={noorder} className="lg:w-fit lg:h-fit mx-auto"></img>
            <span className="font-main text-xl text-center mt-4"><b>Woops!</b> Parece que se han llevado tu pedido</span>
            
            <span className="font-main text-xl text-center mt-4 mb-4 font-light italic">No tienes ningún pedido</span>
            <button className="w-1/3 border-2 border-purple1 font-bold text-white bg-purple1 px-6 py-1 mx-auto rounded-full shadow-xl hover:hue-rotate-30" onClick={() => navigate('/new')}>Nuevo Pedido</button>
        </div>}
        {orders.length > 0 && 
            <div className="w-full lg:h-5/6 lg:mt-16 flex flex-col sm:pt-14 lg:pl-16 min-w-fit">
                <div className="w-full h-full flex flex-col lg:justify-start overflow-y-scroll pr-3 overflow-x-hidden pt-2">
                    {orders.map((order)=> {
                        return (<div className={`w-full rounded-full border-2 ${order.order_status == 3 ? "bg-purple1 text-white hover:hue-rotate-15" : "bg-gray3 hover:bg-purple1 hover:bg-opacity-50"} border-gray2 drop-shadow-xl flex flex-row sm:justify-around justify-evenly h-14 mb-3 leading-[3.5rem] align-middle hover:-translate-y-1`}>
                            <img src={order.order_status == 1 ? received : order.order_status == 2 ? delivery : final} className="sm:w-fit w-8"></img>
                            <span className="font-semibold sm:inline hidden">{order.order_status == 1 ? "Enviado" : order.order_status == 2 ? "En Reparto" : "Entregado"}</span>
                            <span className="font-main lg:inline hidden">{order.distance}Km</span>
                            <span className="font-main lg:inline hidden">{order.date_arrival?.split("T")[0]}</span>
                            <img src={order.order_status == 3 ? trackingwhite : tracking} onClick={() => navigate(`/tracking/order_id=${order.order_id}&user_id=${sessionStorage.getItem('user_id')}`)} className="cursor-pointer min-h-fit max-h-fit sm:w-10 w-8 h-10 mt-2"></img>
                        </div>)
                    })}
                </div>
                <button className="w-1/3 min-w-fit mt-4 border-2 border-purple1 font-bold text-white bg-purple1 px-6 py-1 mx-auto rounded-full shadow-xl hover:hue-rotate-30" onClick={() => navigate('/new')}>Nuevo Pedido</button>
            </div>}
        </>
    )
}