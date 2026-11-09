import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const reportsData = [
    { id: 1, doctorName: 'Dr. Denis Raj', specialty: 'Dentist', reportType: 'Dental Checkup' },
    { id: 2, doctorName: 'Dr. Michael Smith', specialty: 'General Physician', reportType: 'Blood Pressure Analysis' },
  ];

  return (
    <div className="reports-container">
      <h2 className="reports-title">Your Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Doctor Name</th>
            <th>Speciality</th>
            <th>Report</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.doctorName}</td>
              <td>{report.specialty}</td>
              <td>{report.reportType}</td>
              <td style={{ textAlign: 'center' }}>
                <a 
                  href="/patient_report.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-view"
                >
                  View
                </a>
                <a 
                  href="/patient_report.pdf" 
                  download="patient_report.pdf"
                  className="btn-download"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;