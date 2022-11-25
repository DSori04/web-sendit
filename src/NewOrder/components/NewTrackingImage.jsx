import React from 'react';
import neworder1 from '../assets/neworder1.svg'
import neworder2 from '../assets/neworder2.svg'
import neworder3 from '../assets/neworder3.svg'

export function TrackingImage({ step }){
    return (
        <div className="flex flex-col h-full justify-center ml-12">
            <div className="h-max">
                {step === 1 && <img src={neworder1}></img>}
                {step === 2 && <img src={neworder2}></img>}
                {step === 3 && <img src={neworder3}></img>}
            </div>
        </div>
    )
}