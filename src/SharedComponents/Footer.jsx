import React from "react";

export function Footer() {
    /*TODO: 
        Add Social Icons
        Add Links
     */
    return (
        <div className="bg-gray1 w-full h-14 lg:flex justify-around absolute bottom-0 pt-4 self-center">
            <div className=" lg:flex hidden">
                <a href="/not-found" className=" hover:underline">Github</a> &nbsp; · &nbsp;
                <a href="/not-found" className=" hover:underline">Twitter</a> &nbsp; · &nbsp;
                <a href="/not-found" className=" hover:underline">Instagram</a> &nbsp; · &nbsp;
                <a href="/not-found" className=" hover:underline">Facebook</a>
            </div>
            <div className=" lg:hidden flex">
                {/* TODO Añadir iconitos para cuando el tamaño sea inferior a lg */}
            </div>
            <div className=" lg:self-auto self-center lg:w-auto w-full text-center">About Us · LOPD · Contacto</div>
        </div>
    );
}