import React from 'react'

export function LoggingIn(){
    return (
        <>
            <form className='font-main'>
                <label for="email">Correo Electrónico</label><br></br>
                <input type="email" id="email" name="email" className='border-b-2 w-1/4' /><br></br><br></br>
                <label for="password">Contraseña</label><br></br>
                <input type="password" id="password" name="password" className='border-b-2 w-1/4' /><br></br>
            </form>
        </>
    )
}