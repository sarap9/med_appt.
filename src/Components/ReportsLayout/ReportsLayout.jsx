import React from 'react';

const ReportsLayout = () => {
  const reportsData = [
    { id: 1, doctorName: 'Dr. Denis Raj', specialty: 'Dentist', reportType: 'Dental Checkup' },
    { id: 2, doctorName: 'Dr. Michael Smith', specialty: 'General Physician', reportType: 'Blood Pressure Analysis' },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Your Reports</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#2190ff', color: '#fff' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Serial No.</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Doctor Name</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Speciality</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Report</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((report, index) => (
            <tr key={report.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{index + 1}</td>
              <td style={{ padding: '12px' }}>{report.doctorName}</td>
              <td style={{ padding: '12px' }}>{report.specialty}</td>
              <td style={{ padding: '12px' }}>{report.reportType}</td>
              <td style={{ padding: '12px', textAlign: 'center' }}>
                {/* Botón Ver */}
                <a 
                  href="/patient_report.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    padding: '6px 12px', 
                    backgroundColor: '#2190ff', 
                    color: '#fff', 
                    textDecoration: 'none', 
                    borderRadius: '4px', 
                    marginRight: '8px',
                    display: 'inline-block',
                    fontSize: '14px'
                  }}
                >
                  View
                </a>

                {/* Botón Descargar */}
                <a 
                  href="/patient_report.pdf" 
                  download="patient_report.pdf"
                  style={{ 
                    padding: '6px 12px', 
                    backgroundColor: '#28a745', 
                    color: '#fff', 
                    textDecoration: 'none', 
                    borderRadius: '4px',
                    display: 'inline-block',
                    fontSize: '14px'
                  }}
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