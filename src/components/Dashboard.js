import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Dashboard({ user }) {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalSessions: 0,
    recentSessions: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');

      const studentsResponse = await axios.get(`${API_URL}/api/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const sessionsResponse = await axios.get(
        `${API_URL}/api/attendance/sessions`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setStats({
        totalStudents: studentsResponse.data.students.length,
        totalSessions: sessionsResponse.data.sessions.length,
        recentSessions: sessionsResponse.data.sessions.slice(0, 10)
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ===== Chart data for recent sessions ===== */
  const recentSessionsChartData = stats.recentSessions.map(session => ({
    subject:
      session.course_name ||
      'Subject',
    Present: parseInt(session.present_count) || 0,
    Absent: parseInt(session.absent_count) || 0
  }));

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      {/* ===== HEADER ===== */}
      <div className="dashboard-header">
        <h1>Welcome, {user.username}!</h1>
        <p>
          Role:{' '}
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.totalSessions}</h3>
            <p>Attendance Sessions</p>
          </div>
        </div>

        {user.role === 'admin' && (
          <div
            className="stat-card clickable"
            onClick={() => navigate('/students/register')}
          >
            <div className="stat-icon">➕</div>
            <div className="stat-info">
              <h3>Register</h3>
              <p>New Student</p>
            </div>
          </div>
        )}

        <div
          className="stat-card clickable"
          onClick={() => navigate('/attendance/mark')}
        >
          <div className="stat-icon">✓</div>
          <div className="stat-info">
            <h3>Mark</h3>
            <p>Attendance</p>
          </div>
        </div>
      </div>

      {/* ===== RECENT SESSIONS BAR GRAPH ===== */}
      {recentSessionsChartData.length > 0 && (
        <div className="chart-section">
          <h2>Recent Sessions Attendance</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={recentSessionsChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="subject"
                angle={-30}
                textAnchor="end"
                interval={0}
                height={50}
              />
              <YAxis
                label={{
                  value: 'Number of Students',
                  angle: -90,
                  position: 'Topleft'
                }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="Present" fill="#4CAF50" />
              <Bar dataKey="Absent" fill="#f44336" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ===== RECENT SESSIONS LIST ===== */}
      <div className="recent-sessions">
        <h2>Recent Sessions</h2>

        {stats.recentSessions.length > 0 ? (
          <div className="sessions-list">
            {stats.recentSessions.map(session => (
              <div
                key={session.id}
                className="session-item"
                onClick={() =>
                  navigate(`/attendance/sessions/${session.id}`)
                }
              >
                <div className="session-header">
                  <h3>
                    {session.subject_code && `${session.subject_code} - `}
                    {session.course_name || 'Unknown Subject'}
                  </h3>
                  <span className="session-date">
                    {session.session_date
                      ? new Date(
                          session.session_date
                        ).toLocaleDateString()
                      : new Date(
                          session.created_at
                        ).toLocaleDateString()}
                  </span>
                </div>

                <div className="session-stats">
                  <span className="present">
                    ✓ {session.present_count || 0} Present
                  </span>
                  <span className="absent">
                    ✗ {session.absent_count || 0} Absent
                  </span>
                  <span className="total">
                    Total: {session.total_count || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">
            No sessions yet. Start by marking attendance!
          </p>
        )}
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          
          {user.role === 'admin' && (
              <button
              className="action-btn"
              onClick={() => navigate('/students/register')}
            >
              <span className="action-icon">👤</span>
              Register Student
            </button>
        )}

          
          <button
            className="action-btn"
            onClick={() => navigate('/students')}
          >
            <span className="action-icon">📋</span>
            View Students
          </button>

          <button
            className="action-btn"
            onClick={() => navigate('/attendance/mark')}
          >
            <span className="action-icon">📸</span>
            Mark Attendance
          </button>

          <button
            className="action-btn"
            onClick={() => navigate('/attendance/sessions')}
          >
            <span className="action-icon">📊</span>
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
