import React from 'react'
import auth from '../database/auth/auth'
import { useForm } from "react-hook-form"
import Input from './Input';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';
function SignupComponent() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (data) => {

        console.log('inside signup')
        const signupData = await auth.signup(data);
        if (signupData) {

            const session = await auth.currentUser();


            dispatch(login(session));
            navigate('/');


            console.log('signup successfully')
        } else {
            console.log('signup failed');
        }


    }
    return (
        <>
            <form onSubmit={handleSubmit(submit)} action="">
                <Input type="text" placeholder='name'
                    {...register("userName", { required: true })}
                />
                <span>{errors.userName && "Name is required"}</span> <br />
                <Input type="email" placeholder='email'
                    {...register("email", { required: true })}
                />
                <span>{errors.email && "Email is required"}</span> <br />
                <Input type="password" placeholder='password'
                    {...register("password", { required: true })}
                /> <br />
                <span>{errors.password && "Password is required"}</span>

                <CustomButton type='submit' value='submit'>submit</CustomButton>
            </form>
        </>
    )
}

export default SignupComponent