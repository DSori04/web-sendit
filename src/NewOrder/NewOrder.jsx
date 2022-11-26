import React, {useState} from "react";
import {Navbar} from "../SharedComponents/Navbar";
import {Footer} from "../SharedComponents/Footer";
import neworder1 from "./assets/neworder1.svg"
import neworder2 from "./assets/neworder2.svg"
import neworder3 from "./assets/neworder3.svg"
import payicon from "./assets/payicon.svg"
import Stripe from "./assets/Stripe.svg";
import {Helmet} from "react-helmet-async";
import axios from "axios";
import {getGeolocation, getCity, getCP} from "./components/getGeolocation"; //! getCP is not used
import {TrackingImage} from "./components/NewTrackingImage";
import {Steps} from "./components/Steps";
import getDistance from "../GetDistance.js";

const PORT = 3170;
const SERVER_URL = `http://localhost:${PORT}`;

export function NewOrder() {

    const [step, setStep] = useState(1);
    const [orderData, setOrderData] = useState({}); // Saves the cost, tier and distance
    const [originCity, setOriginCity] = useState("");
    const [destinationCity, setDestinationCity] = useState("");
    const [originPersonal, setOriginPersonal] = useState(false);
    const [destinationPersonal, setDestinationPersonal] = useState(false);


    const [origin, setOrigin] = useState({}); // All info from origin
    const [originCoords, setOriginCoords] = useState({}); // Coordinates from the origin place
    const [originId, setOriginId] = useState(""); // ID of the origin

    const [destination, setDestination] = useState({}) // All info from destination
    const [destinationCoords, setDestinationCoords] = useState({}); // Coordinates from the destination place
    const [destinationId, setDestinationId] = useState(0); // ID of the destination

    const [originInfoId, setOriginInfoId] = useState(0); // ID of the destination info
    const [destinationInfoId, setDestinationInfoId] = useState(0); // ID of the destination info

    const [distance, setDistance] = useState({}) // Distance between origin and destination

    const handleSubmitOrigin = async (e) => {
        e.preventDefault();

        // Gets all the data from the form and saves it to origin object
        const originForm = Object.fromEntries(new FormData(e.target));
        let origin = {
            originCP: originForm.originCP,
            originCity: originForm.originCity,
            originAddr1: originForm.originAddr1,
            originAddr2: originForm.originAddr2,
            originName: originForm.originName,
            originPhone: originForm.originPhone,
            originEmail: originForm.originEmail
        }
        setOrigin({...origin});

        // Coordinates from the origin
        const addr = `${originForm.originAddr1}, ${originForm.originCity}`;
        const geolocation = await getGeolocation(addr);
        setOriginCoords({
            lat: geolocation.lat,
            lng: geolocation.lng
        });

        // Set step to 2 (destination mail)
        setStep(2);
    }

    const handleSubmitDestination = async (e) => {
        e.preventDefault();

        // IDs from steps 1 and 2
        let origin_address_id;
        let destination_address_id;

        // IDs from steps 3 and 4
        let origin_info_id;
        let destination_info_id;

        // Gets all the data from the form and saves it to destination object
        const destinationForm = Object.fromEntries(new FormData(e.target));
        let destination = {
            destCP: destinationForm.destCP,
            destCity: destinationForm.destCity,
            destAddr1: destinationForm.destAddr1,
            destAddr2: destinationForm.destAddr2,
            destName: destinationForm.destName,
            destPhone: destinationForm.destPhone,
            destEmail: destinationForm.destEmail
        }
        setDestination({...destination});

        console.log(destination); // TODO Remove this, this onlyy for testing

        // Coordinates from the destination
        const addr = `${destinationForm.destAddr1}, ${destinationForm.destCity}`;
        const geolocation = await getGeolocation(addr);
        setDestinationCoords({
            lat: geolocation.lat,
            lng: geolocation.lng
        });

        // Step 1: Send to the server the origin address and save the response
        // Sends the data to the server
        await axios.post(
            `${SERVER_URL}/address`,
            {
                CP: origin.originCP,
                city: origin.originCity,
                street: origin.originAddr1,
                other: origin.originAddr2,
                lat: originCoords.lat,
                lng: originCoords.lng
            }).then((res) => {
            origin_address_id = res.data.address_id;
            setOriginId(origin_address_id);
        }).catch((err) => {
            console.log(err);
        });

        // Step 2: Send to the server the destination address and save the response
        // Sends the data to the server
        await axios.post(
            `${SERVER_URL}/address`,
            {
                CP: destination.destCP,
                city: destination.destCity,
                street: destination.destAddr1,
                other: destination.destAddr2,
                lat: destinationCoords.lat,
                lng: destinationCoords.lng
            }).then((res) => {
            destination_address_id = res.data.address_id;
            setDestinationId(destination_address_id);
        }).catch((err) => {
            console.log(err);
        });

        console.log(origin_address_id, destination_address_id); // TODO Delete this after testing

        // Step 3: Send the info from the person who sends the package
        // Sends the data to the server
        await axios.post(
            `${SERVER_URL}/info`,
            {
                name: origin.originName,
                phone: origin.originPhone,
                email: origin.originEmail
            }).then((res) => {
            origin_info_id = res.data.info_id;
            setOriginInfoId(res.data.info_id);
        }).catch((err) => {
            console.log(err);
        });

        console.log(origin_info_id); // TODO Delete this after testing

        // Step 4: Send the info from the person who receives the package
        // Sends the data to the server
        await axios.post(
            `${SERVER_URL}/info`,
            {
                name: destination.destName,
                phone: destination.destPhone,
                email: destination.destEmail
            }).then((res) => {
            destination_info_id = res.data.info_id;
            setDestinationInfoId(res.data.info_id);
        }).catch((err) => {
            console.log(err);
        });

        console.log(destination_info_id);

        // Step 5: Calculate the distance
        let distance = getDistance(
            {
                lat: originCoords.lat,
                lng: originCoords.lng
            },
            {
                lat: destinationCoords.lat,
                lng: destinationCoords.lng
            }
        );

        setDistance(distance);

        console.log(distance); // TODO Delete this after, this is only for testing

        // Step 6


        // Set the step to 3 (payment page)
        setStep(3);
    }

    const handleSubmitPayment = (e) => {
        const payment = Object.fromEntries(new FormData(e.target));
        e.preventDefault();
        console.log(payment);
    }

    const handleOriginCP = async (e) => {
        const cp = e.target.value;
        if (cp.match(/^[0-9]{5}$/)) {
            let city = await getCity(cp);
            console.log(city);
            setOriginCity(city);
        } else {
            setOriginCity("");
        }
    }

    const usePersonalData = async () => {
        setOriginPersonal(true);
    }

    const handleDestinationCP = async (e) => {
        const cp = e.target.value;
        if (cp.length === 5) {
            let city = await getCity(cp);
            console.log(city);
            setDestinationCity(city);
        } else {
            setDestinationCity("");
        }
    }

    return (
        <>
            <Helmet>
                <title>New Order</title>
                <meta name="description" content="New Order"/>
            </Helmet>
            <Navbar/>
            <div className="flex flex-row w-full justify-center min-h-[90vh]">
                <div
                    className="xl:w-3/4 lg:absolute lg:pt-0 pt-16 pb-10 top-16 sm:bottom-14 bottom-28 w-full flex flex-col h-max lg:px-20 px-6 font-main">
                    <div>
                        <h1 className=" font-bold text-5xl lg:pt-14 pt-8 select-none lg:text-left text-center">
                            <span className="text-purple1">Nuevo </span>
                            <span className=" text-black">pedido</span>
                        </h1>
                    </div>
                    {step === 1 && <div className="w-full h-max flex lg:flex-row flex-col justify-center">
                        <Steps step={1} setStep={setStep}/>
                        <div className="lg:w-auto w-full flex flex-row justify-center">
                            <div id="originform" className="lg:block flex-row justify-center min-w-min">
                                {(sessionStorage.getItem('logged') && !originPersonal) && <button
                                    className="w-fit mx-auto py-1 border-2 rounded-full block font-main border-purple1 text-purple1 text-sm mt-4 px-2 shadow-xl bg-white hover:scale-105 active:scale-95"
                                    onClick={() => usePersonalData()}>Utiliza tus datos personales</button>}
                                <form onSubmit={(e) => handleSubmitOrigin(e)}
                                      className="lg:block flex flex-col lg:w-full w-64">
                                    <label htmlFor="name" className="text-main block mt-6">Nombre completo <span
                                        className="text-main text-red1">*</span></label>
                                    {!originPersonal && <input type="text" name="originName" id="origin_name"
                                                               defaultValue={origin.originName}
                                                               className="border-b-2 inline-block" required/>}
                                    {originPersonal &&
                                        <span>{`${sessionStorage.getItem('name')} ${sessionStorage.getItem('surname')}`}</span>}

                                    <label htmlFor="origin_email" className="text-main block mt-8">Correo
                                        Electrónico <span className="text-main text-red1">*</span></label>
                                    {!originPersonal && <input type="email" name="originEmail" id="origin_email"
                                                               defaultValue={origin.originEmail}
                                                               className="border-b-2 inline-block" required></input>}
                                    {originPersonal && <span>{sessionStorage.getItem('email')}</span>}

                                    <label htmlFor="origin_tlf" className="text-main block mt-8">Teléfono <span
                                        className="text-main text-red1">*</span></label>
                                    <input type="tel" name="originPhone" id="origin_tlf"
                                           defaultValue={origin.originPhone} className="border-b-2 inline-block"
                                           required/>


                                    <label htmlFor="origin_addr1name" className="text-main block mt-8">Dirección 1 <span
                                        className="text-main text-red1">*</span></label>
                                    <input type="text" name="originAddr1" id="origin_addr1"
                                           defaultValue={origin.originAddr1} className="border-b-2 inline-block"
                                           required/>

                                    <label htmlFor="origin_addr_2" className="text-main block mt-8">Dirección 2</label>
                                    <input type="text" name="originAddr2" id="origin_addr2"
                                           defaultValue={origin.originAddr2} className="border-b-2 inline-block"/>

                                    <label htmlFor="origin_cp" className="text-main block mt-8">CP <span
                                        className="text-main text-red1">*</span></label>
                                    <input type="text" name="originCP" id="origin_cp" defaultValue={origin.originCP}
                                           className="border-b-2 inline-block w-full" required
                                           onChange={(e) => handleOriginCP(e)}/>

                                    <label htmlFor="city" className="text-main block mt-8">Ciudad <span
                                        className="text-main text-red1">*</span></label>
                                    <input type="text" name="originCity" value={originCity} id="origin_city"
                                           className="border-b-2 inline-block w-full" required
                                           onChange={(e) => setOriginCity(e.target.value)}/>


                                    <input type="submit" value="Continuar"
                                           className="block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl max-w-fit lg:hover:hue-rotate-15 mx-auto hover:scale-105 active:scale-95"/>

                                </form>

                            </div>
                        </div>
                        <div id="image" className="sm:block hidden min-h-fit">
                            <TrackingImage step={step}/>
                        </div>
                    </div>}
                    {step === 2 && <div className="w-full h-max flex lg:flex-row flex-col justify-center">
                        <Steps step={2} setStep={setStep}/>
                        <div className="lg:w-auto w-full flex flex-row justify-center">
                            <div id="destform" className="lg:block flex-row justify-center min-w-min">
                                {(sessionStorage.getItem('logged') && !destinationPersonal && !originPersonal) &&
                                    <button
                                        className="w-fit mx-auto py-1 border-2 rounded-full block font-main border-purple1 text-purple1 text-sm mt-4 px-2 shadow-xl bg-white hover:scale-105 active:scale-95"
                                        onClick={() => setDestinationPersonal(true)}>Utiliza tus datos
                                        personales</button>}
                                <form onSubmit={(e) => handleSubmitDestination(e)}
                                      className="lg:block flex flex-col lg:w-full w-64">
                                    <label htmlFor="name" className="text-main block mt-8">Nombre completo <span
                                        className="text-main text-red1">*</span></label>
                                    {!destinationPersonal && <input type="text" name="destName" id="dest_name"
                                                                    className="border-b-2 inline-block" required/>}
                                    {destinationPersonal &&
                                        <span>{`${sessionStorage.getItem('name')} ${sessionStorage.getItem('surname')}`}</span>}

                                    <label htmlFor="dest_email" className="text-main block mt-8">Correo
                                        Electrónico <span className="text-main text-red1">*</span></label>
                                    {!destinationPersonal && <input type="email" name="destEmail" id="dest_email"
                                                                    className="border-b-2 inline-block"
                                                                    required></input>}
                                    {destinationPersonal && <span>{sessionStorage.getItem('email')}</span>}

                                    <label htmlFor="dest_tlf" className="text-main block mt-8">Teléfono <span
                                        className="text-main text-red1">*</span></label>
                                    <input type="tel" name="destPhone" id="dest_tlf" className="border-b-2 inline-block"
                                           required/>

                                    <label htmlFor="dest_addr1name" className="text-main block mt-8">Dirección 1 <span
                                        className="text-main text-red1">*</span></label>
                                    <input type="text" name="destAddr1" id="dest_addr1"
                                           className="border-b-2 inline-block" required/>

                                    <label htmlFor="dest_addr_2" className="text-main block mt-8">Dirección 2</label>
                                    <input type="text" name="destAddr2" id="dest_addr2"
                                           className="border-b-2 inline-block"/>

                                    <label htmlFor="dest_cp" className="text-main block mt-8">CP <span
                                        className="text-main text-red1">*</span></label>
                                    <input type="text" name="destCP" id="dest_cp"
                                           className="border-b-2 inline-block w-2/3" required
                                           onBlur={(e) => handleDestinationCP(e)}/>

                                    <label htmlFor="city" className="text-main block mt-8">Ciudad <span
                                        className="text-main text-red1">*</span></label>
                                    <input type="text" name="destCity" id="dest_city" value={destinationCity}
                                           className="border-b-2 inline-block" required
                                           onChange={(e) => setDestinationCity(e.target.value)}/>

                                    <input type="submit" value="Continuar"
                                           className="mx-auto block mt-8 bg-purple1 font-main text-white px-4 py-1 rounded-full font-semibold drop-shadow-xl max-w-fit lg:hover:hue-rotate-15 hover:scale-105 active:scale-95"/>

                                </form>
                            </div>
                        </div>
                        <div id="image" className="sm:block hidden min-h-fit">
                            <div className="flex flex-col h-full justify-center">
                                <div className="h-max">
                                    {step === 1 && <img src={neworder1} alt="Imagen por defecto"></img>}
                                    {step === 2 && <img src={neworder2} alt="Imagen por defecto"></img>}
                                    {step === 3 && <img src={neworder3} alt="Imagen por defecto"></img>}
                                </div>
                            </div>
                        </div>
                    </div>}
                    {step === 3 && <div className="w-full h-max flex lg:flex-row flex-col justify-center">
                        <Steps step={3} setStep={setStep}/>
                        <div className="lg:w-auto w-full flex flex-row justify-center">
                            <div id="newform" className="lg:block flex-row justify-center min-w-min">
                                <form onSubmit={(e) => handleSubmitPayment(e)}
                                      className="lg:block flex flex-col lg:w-full w-64">
                                    <label htmlFor="Comentarios" className="text-main block mt-8">Comentarios</label>
                                    <textarea name="Comentarios" id="Comentarios" className="border-b-2 block w-64"
                                              rows="1"></textarea>
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
                                            <img src={payicon} className="inline-block h-7" alt="Imagen por defecto"></img>
                                            <span
                                                className="text-white text-xl font-semibold ml-3 inline-block">Pagar</span>
                                        </button>
                                    </div>
                                    <div className="flex flex-row w-full justify-center">
                                        <img src={Stripe} className="mt-4" alt="Imagen por defecto"></img>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div id="image" className="sm:block hidden min-h-fit">
                            <TrackingImage step={step}/>
                        </div>
                    </div>}
                </div>
            </div>
            <Footer/>
        </>
    );
}
