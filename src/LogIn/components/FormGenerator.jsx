import React from "react";

export function FormGenerator(props){
    console.log(Object.keys(props.inputs));
    return(
        <form>
            {Object.keys(props.inputs).map((el) => {
                    <span>{el}</span>
            })}
        </form>
    )
}