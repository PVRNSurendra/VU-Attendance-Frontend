import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './FacultyManagement.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function FacultyManagement() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'faculty'
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/auth/faculty`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFaculty(response.data.faculty);
    } catch (error) {
      toast.error('Failed to fetch faculty');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/api/auth/register`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success('Faculty added successfully!');
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'faculty'
      });
      setShowAddForm(false);
      fetchFaculty();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add faculty');
    }
  };

  const deleteFaculty = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Faculty deleted successfully');
      fetchFaculty();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete faculty');
    }
  };

  if (loading) {
    return <div className="loading">Loading faculty...</div>;
  }

  return (
    <div className="faculty-management">
      <div className="header">
        <h2>Faculty Management</h2>
        <button
          className="btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : '+ Add Faculty'}
        </button>
      </div>

      {showAddForm && (
        <div className="add-faculty-form">
          <h3>Add New Faculty</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Minimum 6 characters"
                />
              </div>

              <div className="form-group">
                <label>Role *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary">
              Add Faculty
            </button>
          </form>
        </div>
      )}

      <div className="faculty-table">
        {faculty.length === 0 ? (
          <div className="no-data">
            <p>No faculty members found</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((member) => (
                <tr key={member.id}>
                  <td>{member.username}</td>
                  <td>{member.email}</td>
                  <td>
                    <span className={`badge badge-${member.role}`}>
                      {member.role.toUpperCase()}
                    </span>
                  </td>
                  <td>{new Date(member.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deleteFaculty(member.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FacultyManagement;