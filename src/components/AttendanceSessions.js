import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './AttendanceSessions.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AttendanceSessions() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    department: '',
    year: '',
    section: ''
  });
  const YEARS = ['YEAR-1', 'YEAR-2', 'YEAR-3', 'YEAR-4'];

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/attendance/sessions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSessions(response.data.sessions);
    } catch (error) {
      toast.error('Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async (sessionId, sessionName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/api/attendance/sessions/${sessionId}/pdf`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${sessionName}_attendance.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to download PDF');
    }
  };

  const deleteSession = async (sessionId) => {
    if (!window.confirm('Are you sure you want to delete this session?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/attendance/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('Session deleted successfully');
      fetchSessions();
    } catch (error) {
      toast.error('Failed to delete session');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return timeString.slice(0, 5); // HH:MM format
  };

  // Filter sessions
  const filteredSessions = sessions.filter(session => {
    if (filters.department && session.department !== filters.department) return false;
    if (filters.section && session.section !== filters.section) return false;
    return true;
  });

  // Get unique departments and sections for filter
  const departments = [...new Set(sessions.map(s => s.department).filter(Boolean))];
  const sections = [...new Set(sessions.map(s => s.section).filter(Boolean))];

  if (loading) {
    return <div className="loading">Loading sessions...</div>;
  }

  return (
    <div className="attendance-sessions">
      <div className="header">
        <h2>Attendance Sessions</h2>
        <button
          className="btn-primary"
          onClick={() => navigate('/attendance/mark')}
        >
          + New Session
        </button>
      </div>

      {/* Filters */}
      {sessions.length > 0 && (
        <div className="filters">
          <div className="filter-group">
            <label>Filter by Department:</label>
            <select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Filter by Section:</label>
            <select
              value={filters.section}
              onChange={(e) => setFilters({ ...filters, section: e.target.value })}
            >
              <option value="">All Sections</option>
              {sections.map(sec => (
                <option key={sec} value={sec}>Section {sec}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
              <label>Filter by Year:</label>
            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            >
              <option value="">All Years</option>
              {YEARS.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>


          {(filters.department || filters.section || filters.year) && (
            <button
              className="btn-clear-filters"
              onClick={() => setFilters({ department: '', section: '', year: '' })}
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {filteredSessions.length === 0 ? (
        <div className="no-data">
          <p>No attendance sessions found</p>
          <button
            className="btn-primary"
            onClick={() => navigate('/attendance/mark')}
          >
            Mark First Attendance
          </button>
        </div>
      ) : (
        <div className="sessions-table">
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Department</th>
                <th>Section</th>
                <th>Date</th>
                <th>Period</th>
                <th>Faculty</th>
                <th>Presentees</th>
                <th>Absentees</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session) => (
                <tr key={session.id}>
                  <td>{session.course_name || 'N/A'}</td>
                  <td>
                    <span className="badge badge-department">
                      {session.department || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-section">
                      {session.section || 'N/A'}
                    </span>
                  </td>
                  <td>{formatDate(session.session_date)}</td>
                  <td>{session.period_number}</td>
                  <td>{session.faculty_name}</td>
                  <td className="present-count">{session.present_count}</td>
                  <td className="absent-count">{session.absent_count}</td>
                  <td>{session.total_count}</td>
                  <td className="actions">
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/attendance/sessions/${session.id}`)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button
                      className="btn-download"
                      onClick={() => downloadPDF(session.id, session.session_name)}
                      title="Download PDF"
                    >
                      📄
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteSession(session.id)}
                      title="Delete Session"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AttendanceSessions;
