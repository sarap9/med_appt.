import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("auth-token");
        const name = sessionStorage.getItem("name");
        if (token) {
            setIsLoggedIn(true);
            setUsername(name || "Usuario");
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        setIsLoggedIn(false);
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">StayHealthy</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                {isLoggedIn ? (
                    <>
                        <li className="welcome-text">Welcome, {username}</li>
                        <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/signup" className="btn-nav">Sign Up</Link></li>
                        <li><Link to="/login" className="btn-nav">Login</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
