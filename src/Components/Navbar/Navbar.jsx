import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('email') || localStorage.getItem('email');
        const token = sessionStorage.getItem('auth-token') || localStorage.getItem('auth-token');

        if (token) {
            setIsLoggedIn(true);
            if (storedEmail) {
                // Extrae el nombre del usuario antes del símbolo '@'
                const extractedName = storedEmail.split('@')[0];
                setUserName(extractedName);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        // Limpiar sesión y almacenamiento local
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('phone');
        localStorage.removeItem('auth-token');
        localStorage.removeItem('email');

        setIsLoggedIn(false);
        setUserName('');
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">StayHealthy</Link>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/appointments">Appointments</Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li className="user-welcome-text" style={{ marginRight: '15px', fontWeight: 'bold' }}>
                            Welcome, {userName}
                        </li>
                        <li>
                            <button onClick={handleLogout} className="btn-logout">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/signup" className="btn-primary">
                                Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="btn-secondary">
                                Login
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;