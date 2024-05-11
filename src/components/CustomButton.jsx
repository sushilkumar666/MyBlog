import React from 'react'
import AuthLayout from './AuthLayout'
import Container from './Container'
// import { MDBBtn } from 'mdb-react-ui-kit'
import { Button } from 'react-bootstrap';

function CustomButton({ type = 'button', color = 'primary', children, ...props }) {
    return (

        <>

            <Button type={type} className={`${color}`} {...props}>{children}</Button>

        </>

    )
}

export default CustomButton