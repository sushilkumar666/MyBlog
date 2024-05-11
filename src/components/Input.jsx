import React from 'react'
import { forwardRef, useId } from 'react'


function Input({ placeholder, type = 'text', ...props }, ref) {


    const id = useId();
    return (
        <>
            <label htmlFor={id}></label>
            <input ref={ref} type={type} placeholder={placeholder}  {...props} id={id} />
        </>
    )
}

export default forwardRef(Input)