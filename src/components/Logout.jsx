import React from 'react'
import auth from '../database/auth/auth'
import { logout as storeLogout } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap';


function Logout() {

    const dispatch = useDispatch();
    const logout = () => {
        try {
            auth.logout().then(() => {
                dispatch(storeLogout());

            })
        } catch (error) {
            console.log('error in logout', error);
        }

    }
    return (
        <>
            <Button onClick={logout}>
                Logout
            </Button>
        </>
    )
}

export default Logout