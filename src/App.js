import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import StudentRegistration from './components/StudentRegistration';
import StudentList from './components/StudentList';
import MarkAttendance from './components/MarkAttendance';
import AttendanceSessions from './components/AttendanceSessions';
import SessionDetails from './components/SessionDetails';
import FacultyManagement from './components/FacultyManagement';
import StudentAttendanceReport from './components/StudentAttendanceReport';
import ClassAttendanceReport from './components/ClassAttendanceReport';
import Navbar from './components/Navbar';
import ComprehensiveClassReport from './components/ComprehensiveClassReport';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const AdminRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (user.role !== 'admin') {
      return (
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You need administrator privileges to access this page.</p>
        </div>
      );
    }
    return children;
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-right" autoClose={3000} />
        
        {user && <Navbar user={user} onLogout={handleLogout} />}
        
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
          />
          
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/students/register" 
            element={user ? <StudentRegistration /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/students" 
            element={user ? <StudentList /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/attendance/mark" 
            element={user ? <MarkAttendance /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/attendance/sessions" 
            element={user ? <AttendanceSessions /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/attendance/sessions/:sessionId" 
            element={user ? <SessionDetails /> : <Navigate to="/login" />} 
          />

          {/* Attendance Reports */}
          <Route 
            path="/reports/student" 
            element={user ? <StudentAttendanceReport /> : <Navigate to="/login" />} 
          />
          
          {/* <Route 
            path="/reports/class" 
            element={user ? <ClassAttendanceReport /> : <Navigate to="/login" />} 
          /> */}

          <Route path="/reports/comprehensive" element={user ? <ComprehensiveClassReport /> : <Navigate to="/login" />} />
          
          {/* Admin Only Routes */}
          <Route 
            path="/faculty" 
            element={
              <AdminRoute>
                <FacultyManagement />
              </AdminRoute>
            } 
          />
          
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;