import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, [navigate]);

    const login = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setShowerr("Por favor completa todos los campos.");
            return;
        }

        setShowerr("");

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const json = await res.json();

            if (json.authtoken) {
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("email", email);
                navigate("/");
                window.location.reload();
            } else {
                setShowerr(json.errors ? json.errors[0].msg : (json.error || "Credenciales inválidas."));
            }
        } catch (err) {
            setShowerr("No se pudo conectar con el servidor.");
        }
    };

    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="login-grid">
                <div className="login-form">
                    <h2>Login</h2>
                    {showerr && <div className="err" style={{ color: 'red', marginBottom: '10px' }}>{showerr}</div>}
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary mb-2 mr-1">Login</button>
                            <button type="reset" onClick={() => { setEmail(''); setPassword(''); setShowerr(''); }} className="btn btn-danger mb-2">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;