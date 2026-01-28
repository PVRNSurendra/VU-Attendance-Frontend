import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'faculty'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username: formData.username,
        password: formData.password
      });

      toast.success('Login successful!');
      onLogin(response.data.user, response.data.token);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/auth/register`, formData);
      
      toast.success('Registration successful! Please login.');
      setIsRegistering(false);
      setFormData({
        username: '',
        password: '',
        email: '',
        role: 'faculty'
      });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Face Recognition Attendance System</h1>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>

        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {isRegistering && (
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* REMOVED: Role selection is no longer visible to users */}
          {/* Only Admin role can be registered, and only by existing admins */}

          <button type="submit" className="btn-primary">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>

        {/* Hide registration option - only admins can create accounts */}
        {/* <p className="info-text">
          {isRegistering 
            ? 'Note: Only administrators can create new accounts. Please contact your admin for access.'
            : 'Contact your administrator for account access.'}
        </p> */}

        {/* Optional: Keep this if you want initial setup capability */}
        {/* {!isRegistering && (
          <p className="toggle-form">
            First time setup? 
            <span onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? ' Login' : ' Create Admin Account'}
            </span>
          </p>
        )} */}
      </div>
    </div>
  );
}

export default Login;