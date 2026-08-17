import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        if (phone.length !== 10) {
            setShowerr('Phone number must be exactly 10 digits.');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role, name, email, password, phone }),
            });
            const json = await response.json();
            if (json.authtoken) {
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);
                navigate("/");
                window.location.reload();
            } else {
                setShowerr(json.error || 'Error en el registro');
            }
        } catch (err) {
            setShowerr('Error conectando con el servidor');
        }
    };

    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <h1>Sign Up</h1>
                <div className="signup-text1">
                    Already a member? <Link to="/login" style={{ color: '#2196f3' }}>Login</Link>
                </div>
                <form onSubmit={register} className="signup-form">
                    <div className="form-group">
                        <label>Role</label>
                        <input value={role} onChange={(e) => setRole(e.target.value)} type="text" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="form-control" maxLength="10" required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" required />
                    </div>
                    {showerr && <div style={{ color: 'red', marginTop: '10px' }}>{showerr}</div>}
                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="reset" className="btn btn-danger" onClick={() => { setRole(''); setName(''); setEmail(''); setPhone(''); setPassword(''); setShowerr(''); }}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Sign_Up;
