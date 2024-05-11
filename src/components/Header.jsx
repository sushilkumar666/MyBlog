import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import Logout from './Logout';

function BasicExample() {
    const authStatus = useSelector(state => state.auth.auth.status);

    return (
        <Container>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" activeclassname="active">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-posts" activeclassname="active">
                            My Posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/form" activeclassname="active">
                            Add Post
                        </NavLink>
                    </li>
                    <li>
                        {authStatus ? (
                            <Logout />
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Signup</Link>
                            </>
                        )}
                    </li>
                </ul>
            </nav>
        </Container>
    );
}

export default BasicExample;
