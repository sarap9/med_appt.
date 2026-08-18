import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState('');

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/auth/login", {
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
      setShowerr(json.errors ? json.errors[0].msg : json.error);
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="login-grid">
        <h2>Login</h2>
        <p>Are you a new member? <Link to="/signup" style={{ color: '#007bff' }}>Sign Up Here</Link></p>
        <div className="login-form">
          <form onSubmit={login}>
            {showerr && <div className="err" style={{ color: 'red', marginBottom: '10px' }}>{showerr}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="form-control" placeholder="Enter your password" required />
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Login</button>
              <button type="reset" className="btn btn-danger" onClick={() => { setEmail(''); setPassword(''); setShowerr(''); }}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;