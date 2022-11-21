import React, { useState, useEffect } from "react";
import { Navbar } from "../SharedComponents/Navbar";
import { Footer } from "../SharedComponents/Footer";
import { Options } from "./components/Options";
import { useNavigate } from "react-router";

export function Profile() {
    const navigate = useNavigate()
    const [editting, setEdit] = useState(false)
    const [deleting, setDelete] = useState(false)
    const [selected, setSelected] = useState(1)

    const [name, setName] = useState("Lorem ipsum dolor")
    const [surname, setSurname] = useState("Lorem, ipsum dolor.")
    const [email, setEmail] = useState("lorem@ipsum.dolor")
    const [pw, setPw] = useState("")

    const firstName = name;
    const firstSurname = surname;
    const firstemail = email;

    function discard(e){
        console.log(firstName, firstSurname, firstemail);
        e.preventDefault()
        setName(firstName)
        setSurname(firstSurname)
        setEmail(firstemail)
        setEdit(false)
    }

    function submitChanges(e) {
        e.preventDefault()
        setEdit(false)
    }
    useEffect(() => {    
      return () => {
        if(!localStorage.getItem('logged')){
        navigate('/login')
    }
      }
    }, [])
    
    

    return (
        <>
            <Navbar />
            <div className="flex flex-row w-full justify-center">
                <div className="flex flex-row justify-around xl:w-3/4 w-full absolute lg:pt-0 top-16 sm:bottom-14 bottom-28 h-full md:px-20 px-6 font-main">
                    <div className="w-1/3 h-5/6 mt-4 border-r-4 border-gray2 flex flex-col justify-around pt-8 min-w-fit">
                        <div id="icon" className="w-64 h-64 rounded-full bg-purple2 text-7xl font-bold text-main leading-[16rem] text-center mx-auto">C</div>
                        <Options selected={selected}/>
                    </div>
                    <div className="w-2/3 h-5/6 mt-4 flex flex-col pt-24 pl-32 min-w-fit">
                        <form>
                        <b className="block">Nombre</b>
                        {!editting ? <span className="block mt-2">{name}</span> : <input type="text" defaultValue={name} className="border-b-2 w-1/3" onChange={(e) => setName(e.target.value) } ></input>}
                        <b className="block mt-10">Apellidos</b>
                        {!editting ? <span className="mt-2">{surname}</span> : <input type="text" defaultValue={surname} className="border-b-2 w-1/3" onChange={(e) => setSurname(e.target.value)}></input>}
                        <b className="block mt-10">Email</b>
                        {!editting ? <span className="mt-2">{email}</span> : <input type="text" defaultValue={email} className="border-b-2 w-1/3" onChange={(e) => setPw(e.target.value)}></input>}
                        <b className="block mt-10">Contraseña</b>
                        {!editting ? <span className="mt-2">***********</span> : <input type="password" className="border-b-2 w-1/3"></input>}
                        {(!editting && !deleting) && <div className="flex flex-row justify-start mt-10 flex-wrap">
                            <button className="w-fit rounded-full bg-purple1 px-4 text-white font-bold py-2 shadow-xl hover:hue-rotate-15" onClick={() => setEdit(true)}>Editar Perfil</button>
                            <button className="w-fit rounded-full bg-red1 px-4 text-white font-bold py-2 ml-6 shadow-xl hover:hue-rotate-15" onClick={() => setDelete(true)}>Eliminar Perfil</button>
                        </div>}
                        {(editting && !deleting) && <div className="flex flex-row justify-start mt-10 flex-wrap">
                            <button className="w-fit rounded-full bg-purple1 px-4 text-white font-bold py-2 shadow-xl hover:hue-rotate-15" onClick={() => setEdit(false)}>Guardar</button>
                            <button className="w-fit rounded-full bg-red1 px-4 text-white font-bold py-2 ml-6 shadow-xl hover:hue-rotate-15" onClick={(e) => discard(e)}>Descartar</button>
                        </div>}
                        {deleting && <div className="mt-10">
                            <span className="font-bold">¿Seguro que desea eliminar la cuenta?</span>
                            <button className="border-2 border-red1 font-bold text-red1 px-6 py-1 ml-4 rounded-full shadow-xl hover:bg-red1 hover:text-white" onClick={() => setDelete(false)}>Sí</button>
                            <button className="border-2 border-purple1 font-bold text-white bg-purple1 px-6 py-1 ml-4 rounded-full shadow-xl hover:hue-rotate-30" onClick={() => setDelete(false)}>No</button>
                            </div>}
                        </form>    
                    </div>
                    
                </div>
            </div>
            <Footer />
        </>
    )

}