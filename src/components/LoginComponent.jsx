import React, { useEffect } from 'react'
import auth from '../database/auth/auth'
import { useForm } from "react-hook-form"
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function LoginComponent() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submit = async (data) => {
        try {
            const authData = await auth.login(data)
            if (authData) {
                const session = await auth.currentUser()

                dispatch(login(session));
                navigate('/');
            }
            console.log('loggedIn successfully ');
        } catch (err) {
            console.log('Login failed ' + err.message);
        }

    }


    return (
        <>
            <form onSubmit={handleSubmit(submit)} action="">

                <Input type="email" placeholder='email'
                    {...register("email", { required: true })}
                /> <br />
                <Input type="password" placeholder='password'
                    {...register("password", { required: true })}
                /> <br />
                <Button type='submit' value='submit'>submit</Button>
            </form>
        </>
    )
}

export default LoginComponent