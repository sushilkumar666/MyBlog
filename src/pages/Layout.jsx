import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Container from '../components/Container'
import { Outlet } from 'react-router-dom'
import auth from '../database/auth/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from '../store/authSlice'

function Layout() {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('insdie Layout')
        auth.currentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }))
                } else {
                    dispatch(logout())
                }
            })
            .finally(() => setLoading(false))
    }, [])
    return !loading ? (
        (<Container>
            <Header />
            <Outlet />
            <Footer />
        </Container>)

    ) : null
}

export default Layout