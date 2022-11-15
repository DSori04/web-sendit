import React from 'react'

export function Textinp(props){
    return(
        <>
        <span className='font-main font-semibold pb-5'>{props.name}</span><br></br>
        <input type={props.type} className='border-b-2 pb-2'></input><br></br><br></br>
        </>
    )
}