import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Sign_Up.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          phone: phone,
          role: "Patient"
        }),
      });

      const json = await response.json();

      if (json.authtoken) {
        // Guardar sesión en el navegador
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("phone", phone);

        // Redirigir a la página principal y refrescar el Navbar
        navigate("/");
        window.location.reload();
      } else {
        alert(json.error || "Error al registrar el usuario");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("No se pudo conectar con el servidor backend.");
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-form">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input value={name} type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" className="form-control" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="form-control" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input value={phone} type="tel" onChange={(e) => setPhone(e.target.value)} name="phone" id="phone" className="form-control" placeholder="Enter your phone number" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" placeholder="Enter your password" required />
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
              <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light" onClick={() => { setName(''); setEmail(''); setPhone(''); setPassword(''); }}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}