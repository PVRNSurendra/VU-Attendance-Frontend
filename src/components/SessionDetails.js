import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SessionDetails.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function SessionDetails() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessionDetails();
  }, [sessionId]);

  const fetchSessionDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/api/attendance/sessions/${sessionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSession(response.data.session);
      setRecords(response.data.records);
    } catch (error) {
      toast.error('Failed to fetch session details');
      navigate('/attendance/sessions');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/api/attendance/sessions/${sessionId}/pdf`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${session.session_name}_attendance.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to download PDF');
    }
  };

  if (loading) {
    return <div className="loading">Loading session details...</div>;
  }

  if (!session) {
    return <div className="no-data">Session not found</div>;
  }

  const presentCount = records.filter(r => r.status === 'present').length;
  const absentCount = records.filter(r => r.status === 'absent').length;

  return (
    <div className="session-details">
      <div className="session-info">
        <h2>{session.session_name}</h2>
        
        <div className="info-grid">
          <div className="info-item">
            <div className="info-label">Course</div>
            <div className="info-value">{session.subject_name || 'N/A'}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Faculty</div>
            <div className="info-value">{session.faculty_name}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Total Students</div>
            <div className="info-value">{records.length}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Present</div>
            <div className="info-value" style={{ color: '#27ae60' }}>
              {presentCount}
            </div>
          </div>
          <div className="info-item">
            <div className="info-label">Absent</div>
            <div className="info-value" style={{ color: '#e74c3c' }}>
              {absentCount}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button className="btn-primary" onClick={downloadPDF}>
            Download PDF Report
          </button>
          <button className="btn-secondary" onClick={() => navigate('/attendance/sessions')}>
            Back to Sessions
          </button>
        </div>
      </div>

      <div className="attendance-table">
        <h3 style={{ padding: '20px', margin: 0 }}>Attendance Records</h3>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.student_id}</td>
                <td>{record.subject_name}</td>
                <td>{record.department || 'N/A'}</td>
                <td>
                  <span className={`status-${record.status}`}>
                    {record.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SessionDetails;