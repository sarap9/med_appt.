import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sign_Up.css';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');

    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        // Validaciones
        if (!name || !email || !phone || !password) {
            setShowerr("Por favor completa todos los campos.");
            return;
        }

        if (phone.length !== 10) {
            setShowerr("El teléfono debe tener exactamente 10 dígitos.");
            return;
        }

        if (password.length < 6) {
            setShowerr("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setShowerr("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, password }),
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("phone", phone);
                navigate("/");
                window.location.reload();
            } else {
                setShowerr(json.errors ? json.errors[0].msg : (json.error || "Error al registrarse"));
            }
        } catch (err) {
            setShowerr("No se pudo conectar con el servidor.");
        }
    };

    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-form">
                    <h2>Sign Up</h2>
                    {showerr && <div className="err" style={{ color: 'red', marginBottom: '10px' }}>{showerr}</div>}
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                id="phone"
                                className="form-control"
                                placeholder="Enter your 10 digit phone number"
                                required
                            />
                        </div>
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
                            <button type="submit" className="btn btn-primary mb-2 mr-1">Submit</button>
                            <button type="reset" onClick={() => { setName(''); setEmail(''); setPhone(''); setPassword(''); setShowerr(''); }} className="btn btn-danger mb-2">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sign_Up;