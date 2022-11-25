import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'


export function TrackingForm({setInput, setOrder, setData}) {
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
                console.log(res)
                setOrder(res.data.order_id)
                console.log(res.data)
                setData(res.data)
                setInput(false)
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