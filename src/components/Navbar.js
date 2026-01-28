import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          📸 Face Attendance
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/dashboard" className={isActive('/dashboard')}>
              Dashboard
            </Link>
          </li>
          
          <li className="dropdown">
            <span className="dropdown-toggle">Students ▾</span>
            <ul className="dropdown-menu">
              {user.role === 'admin' && (
                <li>
                    <Link to="/students/register">Register Student</Link>
                  </li>
              )}
              
              <li>
                <Link to="/students">View Students</Link>
              </li>
            </ul>
          </li>
          
          <li className="dropdown">
            <span className="dropdown-toggle">Attendance ▾</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/attendance/mark">Mark Attendance</Link>
              </li>
              <li>
                <Link to="/attendance/sessions">View Sessions</Link>
              </li>
            </ul>
          </li>

          <li className="dropdown">
            <span className="dropdown-toggle">Reports ▾</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/reports/student">Student Report</Link>
              </li>
              <li>
                <Link to="/reports/comprehensive">Class Report</Link>
              </li>
            </ul>
          </li>

          {/* Admin Only Menu */}
          {user.role === 'admin' && (
            <li className="dropdown">
              <span className="dropdown-toggle">Admin ▾</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/faculty">Manage Faculty</Link>
                </li>
              </ul>
            </li>
          )}
        </ul>

        <div className="navbar-user">
          <span className="user-info">
            {user.username}
            <span className={`role-badge ${user.role}`}>
              {user.role}
            </span>
          </span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

