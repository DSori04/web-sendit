import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { Orderlist } from "./components/Orderlist";
import { useState } from "react";
import neworder1 from "./assets/neworder1.svg"
import neworder2 from "./assets/neworder2.svg"
import neworder3 from "./assets/neworder3.svg"
import AppContextProvider from "../GlobalStates";
import payicon from "./assets/payicon.svg"
import Stripe from "./assets/Stripe.svg";


export function NewOrder() {
    const [step, setstep] = useState(1)
    const handleSubmitOrigin = (e) => {
        const origin = new FormData(e.target);
        e.preventDefault();
        setstep(2)
        console.log(origin);
    }
    const handleSubmitDestination = (e) => {
        const destination = new FormData(e.target);
        e.preventDefault();
        setstep(3);
        console.log(destination);
    }
    const handleSubmitPayment = (e) => {
        const payment = new FormData(e.target);
        e.preventDefault();
        console.log(payment);
    }
    return (
        <>
            <AppContextProvider>
                <Navbar />
            </AppContextProvider>
            <div className="flex flex-row w-full justify-center">
                <div className="xl:w-3/4 lg:absolute lg:pt-0 pt-16 top-16 sm:bottom-14 bottom-28 w-full flex flex-col h-24 md:px-20 px-6 font-main">
                    <h1 className=" font-bold text-purple1 text-5xl lg:pt-14 pt-8 select-none">Nuevo pedido</h1>
                    {step == 1 && <div className="w-full flex flex-row sm:justify-start justify-center">
                        <div className="flex flex-col h-full justify-center">
                            <div id="steps" className="flex flex-col h-2/3 mr-14 w-48 justify-around">
                                <div className="w-full font-main text-sm flex flex-row justify-end">
                                    <div className="flex flex-col justify-center mr-5">
                                        <span className="inline-block text-right font-bold text-xl h-max">
                                            Datos Envio
                                        </span>
                                    </div>
                                    <div className=" w-max">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-white w-16 h-16 bg-purple1 rounded-full inline-block drop-shadow-lg">
                                            1
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full font-main text-sm flex flex-row justify-end">
                                    <div className="flex flex-col justify-center mr-5">
                                        <span className="inline-block text-right h-max">
                                            Datos destinatario
                                        </span>
                                    </div>
                                    <div className="w-max">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-black w-16 h-16 bg-gray3 rounded-full inline-block drop-shadow-lg">
                                            2
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full font-main text-sm flex flex-row justify-end">
                                    <div className="flex flex-col justify-center mr-5">
                                        <span className="inline-block text-right h-max">
                                            Pago
                                        </span>
                                    </div>
                                    <div className="w-max">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-black w-16 h-16 bg-gray3 rounded-full inline-block drop-shadow-lg">
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="newform">
                            <form onSubmit={(e) => handleSubmitOrigin(e)}>
                                <label htmlFor="name" className="text-main block mt-8">Nombre completo <span className="text-main text-red1">*</span></label>
                                <input type="text" name="name" id="name" className="border-b-2 block" required />

                                <label htmlFor="email" className="text-main block mt-8">Correo Electrónico <span className="text-main text-red1">*</span></label>
                                <input type="email" name="email" id="email" className="border-b-2 block" required></input>

                                <label htmlFor="tlf" className="text-main block mt-8">Teléfono</label>
                                <input type="tel" name="tlf" id="tlf" className="border-b-2 block" />

                                <label htmlFor="name" className="text-main block mt-8">Dirección 1 <span className="text-main text-red1">*</span></label>
                                <input type="text" name="name" id="name" className="border-b-2 block" required />

                                <label htmlFor="name" className="text-main block mt-8">Dirección 2 <span className="text-main text-red1">*</span></label>
                                <input type="text" name="name" id="name" className="border-b-2 block" required />

                                <div className="w-full flex flex-row">
                                    <div className="w-1/3">
                                        <label htmlFor="name" className="text-main block mt-8">Ciudad <span className="text-main text-red1">*</span></label>
                                        <input type="text" name="name" id="name" className="border-b-2 block w-3/4" required />
                                    </div>
                                    <div className="w-1/4">
                                        <label htmlFor="name" className="text-main block mt-8">CP <span className="text-main text-red1">*</span></label>
                                        <input type="text" name="name" id="name" className="border-b-2 block w-2/3" required />
                                    </div>
                                </div>
                                <input type="submit" value="Continuar" className="block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl lg:hover:hue-rotate-15" />
                            </form>
                        </div>
                        <div id="image" className="sm:block hidden min-h-fit">
                            <div className="flex flex-col h-full justify-center">
                                <div className="h-max">
                                    {step === 1 && <img src={neworder1}></img>}
                                    {step === 2 && <img src={neworder2}></img>}
                                    {step === 3 && <img src={neworder3}></img>}
                                </div>
                            </div>
                        </div>
                    </div>}
                    {step == 2 && <div className="w-full flex flex-row sm:justify-start justify-center">
                        <div className="flex flex-col h-full justify-center">
                            <div id="steps" className="flex flex-col h-2/3 mr-14 w-48 justify-around">
                                <div className="w-full font-main text-sm flex flex-row justify-end">
                                    <div className="flex flex-col justify-center mr-5">
                                        <span className="inline-block text-right h-max">
                                            Datos Envio
                                        </span>
                                    </div>
                                    <div className=" w-max">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-white w-16 h-16 bg-purple1 rounded-full inline-block drop-shadow-lg">
                                            1
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full font-main text-sm flex flex-row justify-end">
                                    <div className="flex flex-col justify-center mr-5">
                                        <span className="inline-block text-right font-bold text-xl h-max">
                                            Datos destinatario
                                        </span>
                                    </div>
                                    <div className="w-max">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-white w-16 h-16 bg-purple1 rounded-full inline-block drop-shadow-lg">
                                            2
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full font-main text-sm flex flex-row justify-end">
                                    <div className="flex flex-col justify-center mr-5">
                                        <span className="inline-block text-right h-max">
                                            Pago
                                        </span>
                                    </div>
                                    <div className="w-max">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-black w-16 h-16 bg-gray3 rounded-full inline-block drop-shadow-lg">
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="newform">
                            <form onSubmit={(e) => handleSubmitDestination(e)}>
                                <label htmlFor="name" className="text-main block mt-8">Nombre completo <span className="text-main text-red1">*</span></label>
                                <input type="text" name="name" id="name" className="border-b-2 block" required />

                                <label htmlFor="email" className="text-main block mt-8">Correo Electrónico <span className="text-main text-red1">*</span></label>
                                <input type="email" name="email" id="email" className="border-b-2 block" required></input>

                                <label htmlFor="tlf" className="text-main block mt-8">Teléfono</label>
                                <input type="tel" name="tlf" id="tlf" className="border-b-2 block" />

                                <label htmlFor="name" className="text-main block mt-8">Dirección 1 <span className="text-main text-red1">*</span></label>
                                <input type="text" name="name" id="name" className="border-b-2 block" required />

                                <label htmlFor="name" className="text-main block mt-8">Dirección 2 <span className="text-main text-red1">*</span></label>
                                <input type="text" name="name" id="name" className="border-b-2 block" required />

                                <div className="w-full flex flex-row">
                                    <div className="w-1/3">
                                        <label htmlFor="name" className="text-main block mt-8">Ciudad <span className="text-main text-red1">*</span></label>
                                        <input type="text" name="name" id="name" className="border-b-2 block w-3/4" required />
                                    </div>
                                    <div className="w-1/4">
                                        <label htmlFor="name" className="text-main block mt-8">CP <span className="text-main text-red1">*</span></label>
                                        <input type="text" name="name" id="name" className="border-b-2 block w-2/3" required />
                                    </div>
                                </div>
                                <input type="submit" value="Continuar" className="block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl lg:hover:hue-rotate-15" />
                            </form>
                        </div>
                        <div id="image" className="sm:block hidden min-h-fit">
                            <div className="flex flex-col h-full justify-center">
                                <div className="h-max">
                                    {step === 1 && <img src={neworder1}></img>}
                                    {step === 2 && <img src={neworder2}></img>}
                                    {step === 3 && <img src={neworder3}></img>}
                                </div>
                            </div>
                        </div>
                    </div>}
                    {step == 3 && <div className="w-full flex flex-row justify-around">
                        <div className="flex flex-col h-full justify-center">
                            <div id="steps" className="flex flex-col h-2/3 mr-14 w-48 justify-around">
                                <div className="w-full font-main text-sm flex flex-row justify-end">
                                    <div className="flex flex-col justify-center mr-5">
                                        <span className="inline-block text-right h-max">
                                            Datos Envio
                                        </span>
                                    </div>
                                    <div className=" w-max">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-white w-16 h-16 bg-purple1 rounded-full inline-block drop-shadow-lg">
                                            1
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full font-main text-sm flex flex-row justify-end">
                                    <div className="flex flex-col justify-center mr-5">
                                        <span className="inline-block text-right h-max">
                                            Datos destinatario
                                        </span>
                                    </div>
                                    <div className="w-max">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-white w-16 h-16 bg-purple1 rounded-full inline-block drop-shadow-lg">
                                            2
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full font-main text-sm flex flex-row justify-end">
                                    <div className="flex flex-col justify-center mr-5">
                                        <span className="inline-block text-right font-bold text-xl h-max">
                                            Pago
                                        </span>
                                    </div>
                                    <div className="w-max">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-white w-16 h-16 bg-purple1 rounded-full inline-block drop-shadow-lg">
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="newform">
                            <form onSubmit={(e) => handleSubmitPayment(e)}>
                                <label htmlFor="Comentarios" className="text-main block mt-8">Comentarios</label>
                                <textarea name="Comentarios" id="Comentarios" className="border-b-2 block w-64" rows="1"></textarea>
                                <div className="bg-gray1 w-fit h-fit mt-5 rounded-lg font-main px-3 py-3 leading-6">
                                    <span className="text-3xl font-semibold">Total</span><br></br>
                                    <span className="text-3xl text-right w-full block">22.28€</span><br></br>
                                    <span className="font-bold">Tier: </span>Ultra (&gt;20Km)<br></br>
                                    <span className="font-bold">Distancia: </span>27.5Km (x0.81€/Km)
                                </div>
                                <button className="w-40 mt-12 bg-purple1 h-12 rounded-full">
                                    <img src={payicon} className="inline-block h-7"></img>
                                    <span className="text-white text-xl font-semibold ml-3 inline-block">Pagar</span>

                                </button>
                                <img src={Stripe} className="mt-4"></img>
                            </form>
                        </div>
                        <div id="image" className="sm:block hidden min-h-fit">
                            <div className="flex flex-col h-full justify-center">
                                <div className="h-max">
                                    {step === 1 && <img src={neworder1}></img>}
                                    {step === 2 && <img src={neworder2}></img>}
                                    {step === 3 && <img src={neworder3}></img>}
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <Footer />
        </>
    );
}