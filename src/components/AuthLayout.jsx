import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children }) {
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.auth.status)
    const navigate = useNavigate();

    useEffect(() => {

        if (authStatus) {

        }
        else {
            navigate('/login');
        }
        setLoader(false);

    }, [authStatus])
    // setAuth(auth);
    return loader ? <h3>Loading...</h3> : <>{children}</>;
}

export default AuthLayout