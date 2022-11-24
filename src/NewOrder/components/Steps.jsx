import React from "react";

export function Steps({ step, setStep }) {
    return (
        <>
            {step == 1 && <div className="flex flex-row max-h-fit justify-center lg:py-20 py-10 pb-2 lg:pr-10 min-w-max ">
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
            }
            {step == 2 && <div className="flex flex-row max-h-fit justify-center lg:py-20 py-10 pb-2 lg:pr-10 min-w-max ">
                <div id="steps" className="flex lg:flex-col flex-row w-48 justify-around">
                    <div className="w-full font-main text-sm flex lg:flex-row flex-col-reverse justify-end" onClick={() => setStep(1)}>
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
            </div>}
            {step == 3 && <div className="flex flex-row max-h-fit justify-center lg:py-20 py-10 pb-2 lg:pr-10 min-w-max ">
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
            </div>}
        </>
    );
}