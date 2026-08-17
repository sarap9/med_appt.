import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const json = await res.json();
        if (json.authtoken) {
          sessionStorage.setItem('auth-token', json.authtoken);
          sessionStorage.setItem('email', email);
          navigate('/');
          window.location.reload();
        } else {
          setShowerr(json.error || 'Error al iniciar sesión');
        }
    } catch (err) {
        setShowerr('Error conectando con el servidor');
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="login-grid">
        <h2>Login</h2>
        <div className="login-text1">
          New member? <Link to="/signup" style={{ color: '#2196f3' }}>Sign Up Here</Link>
        </div>
        <form onSubmit={login} className="login-form">
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
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="reset" className="btn btn-danger" onClick={() => { setEmail(''); setPassword(''); setShowerr(''); }}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
