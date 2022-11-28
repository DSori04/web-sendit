import React, { useState, useEffect } from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { Options } from "./components/Options";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { Userorders } from "./components/UserOrders";
import axios from "axios";
import { appendErrors } from "react-hook-form";

export function Profile() {
    const navigate = useNavigate()
    const [editting, setEdit] = useState(false)
    const [deleting, setDelete] = useState(false)
    const [selected, setSelected] = useState(1)

    const [name, setName] = useState(sessionStorage.getItem('name'))
    const [surname, setSurname] = useState(sessionStorage.getItem('surname'))
    const [email, setEmail] = useState(sessionStorage.getItem('email'))
    const [pw, setPw] = useState("")
    const user_id = sessionStorage.getItem('user_id')
    const [error, setError] = useState({
        state: false,
        message: ""
    })

    function discard(e){
        e.preventDefault()
        setName(sessionStorage.getItem('name'))
        setSurname(sessionStorage.getItem('surname'))
        setEmail(sessionStorage.getItem('email'))
        setEdit(false)
    }

    async function submitChanges(e) {
        e.preventDefault()
        console.log(e.target)
        const formdata = Object.fromEntries(new FormData(e.target))
        console.log(formdata)
        await axios({
            method: 'put',
            url: `http://localhost:3170/user/${user_id}`,
            data: formdata
        })
        .then(res => {
            sessionStorage.setItem('name', res.data.name)
            sessionStorage.setItem('surname', res.data.surname)
            sessionStorage.setItem('email', res.data.email)
            setName(res.data.name)
            setSurname(res.data.surname)
            setEmail(res.data.email)
            setEdit(false)
        })
        .catch(err => {
            console.log(err)
            setError({
                state: true,
                message: err.response.data.message
            })
        })
    }

    useEffect(() => {    
      return () => {
        if (!sessionStorage.getItem('logged')) {
            navigate('/login')
        }
      }
    }, [])

    
    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Navbar />
            <div className="flex flex-row w-full justify-center min-h-[calc(100vh-3.5rem)]">
                <div className={`flex flex-row lg:justify-around justify-around xl:w-3/4 w-full relative lg:pt-0 lg:top-16 top-4 sm:bottom-14 bottom-28 lg:h-5/6 h-auto md:px-20 px-6 font-main sm:flex-nowrap flex-wrap`}> 
                    <div className="w-1/3 lg:h-5/6 min-h-fit lg:mt-16 lg:border-r-4 border-gray2 flex flex-col lg:justify-around justify-center pt-8 min-w-fit">
                        <div id="icon" className="xl:w-64 xl:h-64 lg:w-48 lg:h-48 h-36 w-36 rounded-full bg-purple2 xl:text-7xl lg:text-5xl text-6xl font-bold text-main xl:leading-[16rem] lg:leading-[12rem] leading-[9rem] text-center mx-auto">{sessionStorage.getItem('name').charAt(0).toUpperCase()}</div>
                        <Options selected={selected} setSelected={setSelected}/>
                    </div>
                    {selected == 1 && <div className="lg:w-2/3 max-w-fit h-5/6 mt-16 flex flex-col lg:pt-24 pt-8 min-w-fit">
                        <form onSubmit={(e) => submitChanges(e)}>
                        <label htmlFor="name" className="block">Nombre</label>
                        {!editting ? <span className="block mt-2">{name}</span> : <input type="text" defaultValue={name} name="name" className="border-b-2 w-1/3 min-w-fit" required></input>}
                        <label htmlFor="surname" className="block mt-10">Apellidos</label>
                        {!editting ? <span className="mt-2">{surname}</span> : <input type="text" defaultValue={surname} name="surname" className="border-b-2 w-1/3 min-w-fit" required></input>}
                        <label htmlFor="email" className="block mt-10">Email</label>
                        {!editting ? <span className="mt-2">{email}</span> : <input type="text" defaultValue={email} name="email" className="border-b-2 w-1/3 min-w-fit" required></input>}
                        <label htmlFor="password" className="block mt-10">Contraseña</label>
                        {!editting ? <span className="mt-2">***********</span> : <input type="password" name="password" className="border-b-2 w-1/3 min-w-fit" required></input>}
                        {(error.state && editting) && <span className="block text-red1 mt-2">{error.message}</span>}

                        {(!editting && !deleting) && <div className="flex lg:flex-row lg:justify-start mt-10 lg:text-lg text-sm flex-wrap`">
                            <button className="w-fit rounded-full bg-purple1 px-4 text-white font-bold py-2 shadow-xl hover:hue-rotate-15" onClick={() => setEdit(true)}>Editar Perfil</button>
                            <button className="w-fit rounded-full bg-red1 px-4 text-white font-bold py-2 ml-6 shadow-xl hover:hue-rotate-15" onClick={() => setDelete(true)}>Eliminar Perfil</button>
                        </div>}
                        
                        {(editting && !deleting) && <div className="flex flex-row justify-start mt-10 flex-wrap">
                            <input type="submit" value="Guardar" className="w-fit rounded-full bg-purple1 px-4 text-white font-bold py-2 shadow-xl hover:hue-rotate-15"></input>
                            <button className="w-fit rounded-full bg-red1 px-4 text-white font-bold py-2 ml-6 shadow-xl hover:hue-rotate-15" onClick={(e) => discard(e)}>Descartar</button>
                        </div>}
                        
                        {deleting && <div className="mt-10">
                            <span className="font-bold">¿Seguro que desea eliminar la cuenta?</span>
                            <button className="border-2 border-red1 font-bold text-red1 px-6 py-1 ml-4 rounded-full shadow-xl hover:bg-red1 hover:text-white" onClick={() => setDelete(false)}>Sí</button>
                            <button className="border-2 border-purple1 font-bold text-white bg-purple1 px-6 py-1 ml-4 rounded-full shadow-xl hover:hue-rotate-30" onClick={() => setDelete(false)}>No</button>
                            </div>}
                        </form>    
                    </div>}
                    {selected == 2 && <Userorders />}
                    
                </div>
            </div>
            <Footer />
        </>
    )

}