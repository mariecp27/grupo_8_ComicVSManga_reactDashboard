import React from 'react';

function Input(props) {

    return (
        <div>
            <label htmlFor={props.id} className={props.className}><b>{props.title}</b></label>
            <input type={props.type} name={props.name} id={props.id} autoComplete="off" onChange={props.validation}></input>
        </div>
    )
}

export default Input;
