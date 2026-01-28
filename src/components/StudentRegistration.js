import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { toast } from 'react-toastify';
import './StudentRegistration.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const DEPARTMENTS = ['AIML', 'DS', 'IT', 'CSE'];
const YEARS = ['YEAR-1', 'YEAR-2', 'YEAR-3', 'YEAR-4'];
const SECTIONS = ['A', 'B', 'C'];

function StudentRegistration() {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    email: '',
    department: '',
    year: '',
    section: ''
  });
  
  const [capturedImage, setCapturedImage] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setUseWebcam(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setUseWebcam(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!capturedImage) {
      toast.error('Please capture or upload a photo');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      await axios.post(
        `${API_URL}/api/students/register`,
        {
          ...formData,
          image: capturedImage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Student registered successfully!');
      
      // Reset form
      setFormData({
        student_id: '',
        name: '',
        email: '',
        department: '',
        year: '',
        section: ''
      });
      setCapturedImage(null);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-registration">
      <h2>Register New Student</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Student ID *</label>
            <input
              type="text"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Department --</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Year *</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Year --</option>
              {YEARS.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>


          <div className="form-group">
              <label>Section *</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Section --</option>
                {SECTIONS.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
        </div>

        <div className="photo-section">
          <h3>Student Photo *</h3>
          
          {!capturedImage && !useWebcam && (
            <div className="photo-options">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setUseWebcam(true)}
              >
                Use Webcam
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => fileInputRef.current.click()}
              >
                Upload Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          )}

          {useWebcam && !capturedImage && (
            <div className="webcam-container">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="webcam"
              />
              <div className="webcam-controls">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={capturePhoto}
                >
                  Capture Photo
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setUseWebcam(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {capturedImage && (
            <div className="captured-image">
              <img src={capturedImage} alt="Captured" />
              <button
                type="button"
                className="btn-secondary"
                onClick={retakePhoto}
              >
                Retake Photo
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary btn-submit"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register Student'}
        </button>
      </form>
    </div>
  );
}

export default StudentRegistration;