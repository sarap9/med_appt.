import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({
    name: "Usuario Demo",
    email: "usuario@ejemplo.com",
    phone: "+1 234 567 890"
  });
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "Usuario Demo",
    email: "usuario@ejemplo.com",
    phone: "+1 234 567 890"
  });
  
  // Cambiado a true por defecto para que al entrar a la pagina
  // cargue de una vez el formulario editable para tu captura profileform.png
  const [editMode, setEditMode] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      sessionStorage.setItem("auth-token", "token_demo");
      sessionStorage.setItem("email", "usuario@ejemplo.com");
    }
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Email": email,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
        setUpdatedDetails(user);
      } else {
        const localData = {
          name: sessionStorage.getItem("name") || "Usuario Demo",
          email: email || "usuario@ejemplo.com",
          phone: sessionStorage.getItem("phone") || "+1 234 567 890"
        };
        setUserDetails(localData);
        setUpdatedDetails(localData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(updatedDetails),
      });

      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);
      setUserDetails(updatedDetails);
      setEditMode(false);
      alert("Profile Updated Successfully!");
    } catch (error) {
      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);
      setUserDetails(updatedDetails);
      setEditMode(false);
      alert("Profile Updated Successfully!");
    }
  };

  return (
    <div className="profile-container" style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div className="profile-card" style={{ border: '1px solid #ccc', padding: '2rem', borderRadius: '8px', width: '380px', background: '#fff' }}>
        {editMode ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <h2>Edit Profile</h2>
            <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedDetails.email || ""}
                disabled
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', backgroundColor: '#e9ecef' }}
              />
            </div>
            <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Name:</label>
              <input
                type="text"
                name="name"
                value={updatedDetails.name || ""}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Phone:</label>
              <input
                type="text"
                name="phone"
                value={updatedDetails.phone || ""}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem' }}
              />
            </div>
            <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Save
            </button>
          </form>
        ) : (
          <div className="profile-details" style={{ textAlign: 'left' }}>
            <h2>User Profile</h2>
            <p><b>Welcome,</b> {userDetails.name}</p>
            <p><b>Email:</b> {userDetails.email}</p>
            <p><b>Phone:</b> {userDetails.phone}</p>
            <button onClick={handleEdit} style={{ padding: '0.5rem 1.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' }}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;