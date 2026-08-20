import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
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
        setShowDropdown(false);
        navigate('/login');
        window.location.reload();
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
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
                    <li className="user-dropdown-container" style={{ position: 'relative' }}>
                        <span 
                            onClick={toggleDropdown} 
                            className="user-welcome-text" 
                            style={{ cursor: 'pointer', fontWeight: 'bold', padding: '0.5rem 1rem' }}
                        >
                            Welcome, {userName} ▼
                        </span>
                        {showDropdown && (
                            <ul className="dropdown-menu" style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                backgroundColor: '#ffffff',
                                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                                listStyle: 'none',
                                padding: '0.5rem 0',
                                borderRadius: '4px',
                                minWidth: '150px',
                                zIndex: 1000
                            }}>
                                <li style={{ padding: '0.5rem 1rem' }}>
                                    <Link 
                                        to="/profile" 
                                        onClick={() => setShowDropdown(false)}
                                        style={{ textDecoration: 'none', color: '#333', display: 'block' }}
                                    >
                                        Your Profile
                                    </Link>
                                </li>
                                <li style={{ padding: '0.5rem 1rem', borderTop: '1px solid #eee' }}>
                                    <button 
                                        onClick={handleLogout} 
                                        className="btn-logout"
                                        style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', padding: 0, width: '100%', textAlign: 'left' }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
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