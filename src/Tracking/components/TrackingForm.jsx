import React from "react";

export function TrackingForm() {
    return (
        <div className="flex flex-col lg:w-1/2 w-full ml-24">
            <form>
                <label htmlFor="orderid" className="text-main block mt-8">Número de pedido <span className="text-main text-red1">*</span></label>
                <input type="text" name="orderid" id="orderid" className="border-b-2 block" required />

                <label htmlFor="tlf" className="text-main block mt-8">Correo Electrónico <span className="text-main text-red1">*</span></label>
                <input type="tel" name="tlf" id="tlf" className="border-b-2 block" required/>

                <label htmlFor="email" className="text-main block mt-8">Código Postal <span className="text-main text-red1">*</span></label>
                <input type="email" name="email" id="email" className="border-b-2 block" required></input>

                <input type="submit" value="Consultar" className="block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl hover:hue-rotate-15"/>
            </form>
        </div>
    )
}