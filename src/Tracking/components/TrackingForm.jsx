import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function TrackingForm() {
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState()
    const [mail, setMail] = useState()
    const [CP, setCP] = useState()
    const moving = () => {
        navigate(`/tracking/${orderId}`)
    }
    return (
        <div className="flex flex-col lg:w-1/2 w-full ml-24">
            <form onSubmit={() => moving()} target="_self">
                <label htmlFor="orderid" className="text-main block mt-8">Número de pedido <span className="text-main text-red1">*</span></label>
                <input type="text" name="orderid" id="orderid" onChange={e => setOrderId(e.target.value)} className="border-b-2 block" required onSubmit={e => setOrder(e.target.value)} />

                <label htmlFor="email" className="text-main block mt-8">Correo Electrónico <span className="text-main text-red1">*</span></label>
                <input type="email" name="email" id="email" onChange={(e) => setMail(e.target.value)} className="border-b-2 block" required/>

                <label htmlFor="cp" className="text-main block mt-8">Código Postal <span className="text-main text-red1">*</span></label>
                <input type="text" name="cp" id="cp" onChange={(e) => setCP(e.target.value)} className="border-b-2 block" required></input>

                <input type="submit" value="Consultar" className="block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl hover:hue-rotate-15"/>
            </form>
        </div>
    )
}