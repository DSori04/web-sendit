import React from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { Orderlist } from "./components/Orderlist";
import { useState } from "react";
import neworder1 from "./assets/neworder1.svg"
import neworder2 from "./assets/neworder2.svg"
import neworder3 from "./assets/neworder3.svg"
import { UserContext } from "../GlobalStates";


export function NewOrder() {
    const [step, setstep] = useState(1)
    return (
        <UserContext.Provider value={{ user_id: null, logged: true }}>
        <>
            <Navbar />
            <div className="flex flex-row w-full justify-center">
                <div className="xl:w-3/4 lg:absolute lg:pt-0 pt-16 top-16 sm:bottom-14 bottom-28 w-full flex flex-col h-24 md:px-20 px-6 font-main">
                    <h1 className=" font-bold text-purple1 text-5xl lg:pt-14 pt-8 select-none">Nuevo pedido</h1>
                    <div className="w-full flex flex-row sm:justify-start justify-center">
                        <div className="flex flex-col h-full justify-center">
                            <div id="steps" className="flex flex-col h-2/3 mr-14 justify-around">
                                <div className="font-main text-3xl text-center leading-[4rem] font-bold align-middle text-white w-16 h-16 bg-purple1 rounded-full">1</div>
                                <div className="font-main text-3xl text-center leading-[4rem] font-semibold align-middle text-black w-16 h-16 bg-gray3 rounded-full">2</div>
                                <div className="font-main text-3xl text-center leading-[4rem] font-semibold align-middle text-black w-16 h-16 bg-gray3 rounded-full">3</div>
                            </div>
                        </div>
                        <div id="newform">
                            <form>
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
                            </form>
                        </div>
                        <div id="image" className="sm:block hidden min-h-fit">
                            {step === 1 && <img src={neworder1}></img>}
                            {step === 2 && <img src={neworder2}></img>}
                            {step === 3 && <img src={neworder3}></img>}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
        </UserContext.Provider>
    );
}