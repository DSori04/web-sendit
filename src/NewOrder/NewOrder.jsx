import React, { useState } from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { Orderlist } from "./components/Orderlist";
import neworder1 from "./assets/neworder1.svg"
import neworder2 from "./assets/neworder2.svg"
import neworder3 from "./assets/neworder3.svg"
import AppContextProvider from "../GlobalStates";
import payicon from "./assets/payicon.svg"
import Stripe from "./assets/Stripe.svg";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const SERVER_URL = "http://localhost:3170";

export function NewOrder() {

    const [step, setstep] = useState(1);
    const [orderData, setOrderData] = useState({ cost: 0 });

    const [origin, setOrigin] = useState({});

    const handleSubmitOrigin = async (e) => {
        e.preventDefault();

        // Gets all the data from the form
        const originForm = Object.fromEntries(new FormData(e.target));

        let originData = {
            originAddr1: originForm.originAddr1,
            originAddr2: originForm.originAddr2,
            originCity: originForm.originCity
        }

        // Sets the origin state to the data from the form
        setOrigin({ ...originData });

        console.log(originData);

        // Set step to 2 (destination mail)
        setstep(2);

    }

    const handleSubmitDestination = (e) => {
        e.preventDefault();

        // Gets all the data from the form
        let destinationForm = Object.fromEntries(new FormData(e.target));

        // Send data to the server and get the cost of the order
        axios({
            method: "POST",
            url: `${SERVER_URL}/getOrderCost`,
            contentType: "application/json",
            data: {
                origin: origin,
                destination: {
                    destinationAddr1: destinationForm.destAddr1,
                    destinationAddr2: destinationForm.destAddr2,
                    destinationCity: destinationForm.destCity
                }
            }
        }).then((response) => {
            let res = {
                cost: response.data.cost,
                tier: response.data.tier,
                distance: response.data.distance
            }
            setOrderData({ ...res });
            setstep(3);
        }).catch((error) => {
            console.log(error);
        });

        setstep(3);

    }

    const handleSubmitPayment = (e) => {
        const payment = Object.fromEntries(new FormData(e.target));
        e.preventDefault();
        console.log(payment);
    }

    return (
        <>
            <Helmet>
                <title>New Order</title>
                <meta name="description" content="New Order" />

            </Helmet>
            <AppContextProvider>
                <Navbar />
            </AppContextProvider>
            <div className="flex flex-row w-full justify-center min-h-[90vh]">
                <div className="xl:w-3/4 lg:absolute lg:pt-0 pt-16 pb-10 top-16 sm:bottom-14 bottom-28 w-full flex flex-col h-max lg:px-20 px-6 font-main">
                    <div>
                        <h1 className=" font-bold text-5xl lg:pt-14 pt-8 select-none lg:text-left text-center">
                            <span className="text-purple1">Nuevo </span>
                            <span className=" text-black">pedido</span>
                        </h1>
                    </div>
                    {step == 1 && <div className="w-full h-max flex lg:flex-row flex-col justify-center">
                        <div className="flex flex-row max-h-fit justify-center lg:py-20 py-10 pb-2 lg:pr-10 min-w-max ">
                            <div id="steps" className="flex lg:flex-col flex-row w-48 justify-around">
                                <div className="w-full font-main text-sm flex lg:flex-row flex-col-reverse justify-end">
                                    <div className="flex flex-col justify-center">
                                        <span className="inline-block lg:text-right text-center font-bold text-xl h-max lg:mr-3 lg:mt-0 mt-3">
                                            Datos Orígen
                                        </span>
                                    </div>
                                    <div className="flex lg:w-max w-24 lg:justify-end justify-center">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-white w-16 h-16 bg-purple1 rounded-full inline-block drop-shadow-lg">
                                            1
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full font-main text-sm flex lg:flex-row flex-col-reverse justify-end">
                                    <div className="flex flex-col justify-center">
                                        <span className="inline-block lg:text-right text-center h-max lg:mr-3 lg:mt-0 mt-3">
                                            Datos destinatario
                                        </span>
                                    </div>
                                    <div className="flex lg:w-max w-24 lg:justify-end justify-center">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-black w-16 h-16 bg-gray3 rounded-full inline-block drop-shadow-lg">
                                            2
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full font-main text-sm flex lg:flex-row flex-col-reverse justify-end">
                                    <div className="flex flex-col justify-center">
                                        <span className="inline-block lg:text-right text-center h-max lg:mr-3 lg:mt-0 mt-3">
                                            Pago
                                        </span>
                                    </div>
                                    <div className="flex lg:w-max w-24 lg:justify-end justify-center">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-black w-16 h-16 bg-gray3 rounded-full inline-block drop-shadow-lg">
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-auto w-full flex flex-row justify-center">
                            <div id="originform" className="lg:block flex-row justify-center min-w-min">
                                <form onSubmit={(e) => handleSubmitOrigin(e)} className="lg:block flex flex-col lg:w-full w-64">
                                    <label htmlFor="name" className="text-main block mt-8">Nombre completo <span className="text-main text-red1">*</span></label>
                                    <input type="text" name="originName" id="origin_name" className="border-b-2 inline-block" required />

                                    <label htmlFor="origin_email" className="text-main block mt-8">Correo Electrónico <span className="text-main text-red1">*</span></label>
                                    <input type="email" name="originEmail" id="origin_email" className="border-b-2 inline-block" required></input>

                                    <label htmlFor="origin_tlf" className="text-main block mt-8">Teléfono  <span className="text-main text-red1">*</span></label>
                                    <input type="tel" name="originPhone" id="origin_tlf" className="border-b-2 inline-block" required />

                                    <label htmlFor="origin_addr1name" className="text-main block mt-8">Dirección 1 <span className="text-main text-red1">*</span></label>
                                    <input type="text" name="originAddr1" id="origin_addr1" className="border-b-2 inline-block" required />

                                    <label htmlFor="origin_addr_2" className="text-main block mt-8">Dirección 2</label>
                                    <input type="text" name="originAddr2" id="origin_addr2" className="border-b-2 inline-block" />

                                    <div className="w-full flex flex-row">
                                        <div className="w-1/3">
                                            <label htmlFor="city" className="text-main block mt-8">Ciudad <span className="text-main text-red1">*</span></label>
                                            <input type="text" name="originCity" id="origin_city" className="border-b-2 inline-block w-3/4" required />
                                        </div>
                                        <div className="w-1/4">
                                            <label htmlFor="origin_cp" className="text-main block mt-8">CP <span className="text-main text-red1">*</span></label>
                                            <input type="text" name="originCP" id="origin_cp" className="border-b-2 inline-block w-2/3" required />
                                        </div>
                                    </div>
                                    <div className="flex flex-row lg:justify-start justify-center">
                                        <input type="submit" value="Continuar" className="block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl max-w-fit lg:hover:hue-rotate-15" />

                                    </div>
                                </form>
                            </div>
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
                    {step == 2 && <div className="w-full h-max flex lg:flex-row flex-col justify-center">
                        <div className="flex flex-row max-h-fit justify-center lg:py-20 py-10 pb-2 lg:pr-10 min-w-max ">
                            <div id="steps" className="flex lg:flex-col flex-row w-48 justify-around">
                                <div className="w-full font-main text-sm flex lg:flex-row flex-col-reverse justify-end">
                                    <div className="flex flex-col justify-center">
                                        <span className="inline-block lg:text-right text-center h-max lg:mr-3 lg:mt-0 mt-3">
                                            Datos Orígen
                                        </span>
                                    </div>
                                    <div className="flex lg:w-max w-24 lg:justify-end justify-center">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-black w-16 h-16 bg-purple1 text-white rounded-full inline-block drop-shadow-lg">
                                            1
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full font-main text-sm flex lg:flex-row flex-col-reverse justify-end">
                                    <div className="flex flex-col justify-center">
                                        <span className="inline-block lg:text-right text-center font-bold text-xl h-max lg:mr-3 lg:mt-0 mt-3">
                                            Datos destinatario
                                        </span>
                                    </div>
                                    <div className="flex lg:w-max w-full lg:justify-end justify-center">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-white w-16 h-16 bg-purple1 rounded-full inline-block drop-shadow-lg">
                                            2
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full font-main text-sm flex lg:flex-row flex-col-reverse justify-end">
                                    <div className="flex flex-col justify-center">
                                        <span className="inline-block lg:text-right text-center h-max lg:mr-3 lg:mt-0 mt-3">
                                            Pago
                                        </span>
                                    </div>
                                    <div className="flex lg:w-max w-24 lg:justify-end justify-center">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-black w-16 h-16 bg-gray3 rounded-full inline-block drop-shadow-lg">
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-auto w-full flex flex-row justify-center">
                            <div id="destform" className="lg:block flex-row justify-center min-w-min">
                                <form onSubmit={(e) => handleSubmitDestination(e)} className="lg:block flex flex-col lg:w-full w-64">
                                    <label htmlFor="name" className="text-main block mt-8">Nombre completo <span className="text-main text-red1">*</span></label>
                                    <input type="text" name="destName" id="dest_name" className="border-b-2 inline-block" required />

                                    <label htmlFor="dest_email" className="text-main block mt-8">Correo Electrónico <span className="text-main text-red1">*</span></label>
                                    <input type="email" name="destEmail" id="dest_email" className="border-b-2 inline-block" required></input>

                                    <label htmlFor="dest_tlf" className="text-main block mt-8">Teléfono  <span className="text-main text-red1">*</span></label>
                                    <input type="tel" name="destPhone" id="dest_tlf" className="border-b-2 inline-block" required />

                                    <label htmlFor="dest_addr1name" className="text-main block mt-8">Dirección 1 <span className="text-main text-red1">*</span></label>
                                    <input type="text" name="destAddr1" id="dest_addr1" className="border-b-2 inline-block" required />

                                    <label htmlFor="dest_addr_2" className="text-main block mt-8">Dirección 2</label>
                                    <input type="text" name="destAddr2" id="dest_addr2" className="border-b-2 inline-block" />

                                    <div className="w-full flex flex-row">
                                        <div className="w-1/3">
                                            <label htmlFor="city" className="text-main block mt-8">Ciudad <span className="text-main text-red1">*</span></label>
                                            <input type="text" name="destCity" id="dest_city" className="border-b-2 inline-block w-3/4" required />
                                        </div>
                                        <div className="w-1/4">
                                            <label htmlFor="dest_cp" className="text-main block mt-8">CP <span className="text-main text-red1">*</span></label>
                                            <input type="text" name="destCP" id="dest_cp" className="border-b-2 inline-block w-2/3" required />
                                        </div>
                                    </div>
                                    <div className="flex flex-row lg:justify-start justify-center">
                                        <input type="submit" value="Continuar" className="block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl max-w-fit lg:hover:hue-rotate-15" />

                                    </div>
                                </form>
                            </div>
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
                    {step == 3 && <div className="w-full h-max flex lg:flex-row flex-col justify-center">
                        <div className="flex flex-row max-h-fit justify-center lg:py-20 py-10 pb-2 lg:pr-10 min-w-max ">
                            <div id="steps" className="flex lg:flex-col flex-row w-48 justify-around">
                                <div className="w-full font-main text-sm flex lg:flex-row flex-col-reverse justify-end">
                                    <div className="flex flex-col justify-center">
                                        <span className="inline-block lg:text-right text-center h-max lg:mr-3 lg:mt-0 mt-3">
                                            Datos Orígen
                                        </span>
                                    </div>
                                    <div className="flex lg:w-max w-24 lg:justify-end justify-center">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-black w-16 h-16 bg-purple1 text-white rounded-full inline-block drop-shadow-lg">
                                            1
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full font-main text-sm flex lg:flex-row flex-col-reverse justify-end">
                                    <div className="flex flex-col justify-center">
                                        <span className="inline-block lg:text-right text-center h-max lg:mr-3 lg:mt-0 mt-3">
                                            Datos destinatario
                                        </span>
                                    </div>
                                    <div className="flex lg:w-max w-full lg:justify-end justify-center">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-white w-16 h-16 bg-purple1 rounded-full inline-block drop-shadow-lg">
                                            2
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full font-main text-sm flex lg:flex-row flex-col-reverse justify-end">
                                    <div className="flex flex-col justify-center">
                                        <span className="inline-block lg:text-right text-center font-bold text-xl h-max lg:mr-3 lg:mt-0 mt-3">
                                            Pago
                                        </span>
                                    </div>
                                    <div className="flex lg:w-max w-24 lg:justify-end justify-center">
                                        <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-white w-16 h-16 bg-purple1 rounded-full inline-block drop-shadow-lg">
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-auto w-full flex flex-row justify-center">

                            <div id="newform" className="lg:block flex-row justify-center min-w-min">
                                <form onSubmit={(e) => handleSubmitPayment(e)} className="lg:block flex flex-col lg:w-full w-64">
                                    <label htmlFor="Comentarios" className="text-main block mt-8">Comentarios</label>
                                    <textarea name="Comentarios" id="Comentarios" className="border-b-2 block w-64" rows="1"></textarea>
                                    <div className="bg-gray1 w-fit h-fit mt-5 rounded-lg font-main px-3 py-3 leading-6">
                                        <span className="text-3xl font-semibold">Total</span><br></br>
                                        <span className="text-3xl text-right w-full block">
                                            {orderData.cost}€
                                        </span><br></br>
                                        <span className="font-bold">
                                            Tier: {orderData.tier}
                                        </span>
                                        <br></br>
                                        <span className="font-bold">Distancia: </span>
                                        {orderData.distance}Km
                                        ({orderData.pricePerKm}€/Km)
                                    </div>
                                    <div className="w-full flex flex-row justify-center">
                                        <button className="w-40 mt-12 bg-purple1 h-12 rounded-full">
                                            <img src={payicon} className="inline-block h-7"></img>
                                            <span className="text-white text-xl font-semibold ml-3 inline-block">Pagar</span>
                                        </button>
                                    </div>
                                    <div className="flex flex-row w-full justify-center">
                                        <img src={Stripe} className="mt-4"></img>
                                    </div>
                                </form>
                            </div>
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
