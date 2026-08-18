import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearchIC = ({ onSearch }) => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities] = useState(initSpeciality);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        if (onSearch) {
            onSearch(speciality);
        }
        navigate(`/instant-consultation?speciality=${speciality}`);
    };

    const handleInputChange = (e) => {
        const text = e.target.value;
        setSearchDoctor(text);
        if (onSearch) {
            onSearch(text);
        }
    };

    return (
        <div className='finddoctor'>
            <center>
                <h1>Find a doctor and Consult instantly</h1>
                <div>
                    <i style={{ color: '#000000', fontSize: '10rem' }} className="fa fa-user-md"></i>
                </div>
                <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="doctor-search-box">
                        <input
                            type="text"
                            className="search-doctor-input-box"
                            placeholder="Search doctors, clinics, hospitals, etc."
                            onFocus={() => setDoctorResultHidden(false)}
                            onBlur={() => setTimeout(() => setDoctorResultHidden(true), 200)}
                            value={searchDoctor}
                            onChange={handleInputChange}
                        />
                        
                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            {specialities
                                .filter(spec => spec.toLowerCase().includes(searchDoctor.toLowerCase()))
                                .map(speciality => (
                                    <div
                                        className="search-doctor-result-item"
                                        key={speciality}
                                        onMouseDown={() => handleDoctorSelect(speciality)}
                                    >
                                        <span>{speciality}</span>
                                        <span className="search-speciality-label">SPECIALITY</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default FindDoctorSearchIC;