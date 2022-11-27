import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'


export function TrackingForm({setInput, setOrder, setData, setOrigin, setDestination}) {
    const navigate = useNavigate();

    const [validOrder, setValidOrder] = useState(true)
    const [validMail, setValidmail] = useState(true)
    const [error, setError] = useState("")

    async function handleForm(e){
        e.preventDefault();
        const formdata = Object.fromEntries(new FormData(e.target))
        const validorder = formdata.orderid.match(/([0-9])\d+$/g) == null
        setValidOrder(!validorder)
        setValidmail(formdata.email.split("@").length == 2 && formdata.email.split("@")[1].split(".").length == 2)
        await axios({
            method: "post",
            url: "http://localhost:3170/order",
            data: formdata,
        })
        .then(
            (res) => {
                setOrigin({
                    name: res.data.origin_name,
                    Addr1: res.data.origin_addr1,
                    Phone: String(res.data.origin_phone),
                    City: res.data.origin_city,
                    CP: res.data.origin_cp,
                    lat: res.data.origin_lat,
                    lng: res.data.origin_lng
                })
                setDestination({
                    name: res.data.dest_name,
                    Addr1: res.data.dest_addr1,
                    Phone: String(res.data.dest_phone),
                    City: res.data.dest_city,
                    CP: res.data.dest_cp,
                    lat: res.data.dest_lat,
                    lng: res.data.dest_lng
                })
                setData({
                    order_id: res.data.order_id,
                    state: res.data.order_status,
                    order_date: res.data.date_creation.split("T")[0],
                    delivery_date: res.data.date_arrival.split("T")[0],
                })
                setInput(false);
                setOrder(formdata.orderid)
            }
        )
        .catch(
            (err) => {
                console.log("error")
                console.log(err.response.data.error)
                setError(err.response.data.error)
                //setError(err)
                
            }
        )
    }
    return (
        <div className="flex flex-col lg:w-1/2 w-full ml-24">
            <form onSubmit={(e) => handleForm(e)} target="_self">
                <label htmlFor="orderid" className="text-main block mt-8">Número de pedido <span className="text-main text-red1">*</span></label>
                <input type="text" name="orderid" id="orderid" className="border-b-2 block" required />
                {error && <span className="text-red1 mt-2 block">{error}</span>}
                
                <label htmlFor="email" className="text-main block mt-8">Correo Electrónico <span className="text-main text-red1">*</span></label>
                <input type="email" name="email" id="email" className="border-b-2 block" required/>
                {!validMail && <span className="text-red1 mt-2 block">El correo electrónico no es válido</span>}

                <label htmlFor="cp" className="text-main block mt-8">Código Postal <span className="text-main text-red1">*</span></label>
                <input type="text" name="cp" id="cp" className="border-b-2 block" required></input>

                <input type="submit" value="Consultar" className="block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl hover:hue-rotate-15"/>
            </form>
        </div>
    )
}