import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './StudentAttendanceReport.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function StudentAttendanceReport() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data.students);
    } catch (error) {
      toast.error('Failed to fetch students');
    }
  };

  const fetchReport = async () => {
    if (!selectedStudent) {
      toast.error('Please select a student');
      return;
    }

    if (filters.start_date && filters.end_date) {
    const start = new Date(filters.start_date);
    const end = new Date(filters.end_date);

    if (start > end) {
      toast.warning('Start date cannot be greater than end date');
      return;
    }
  }


    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/api/reports/student/${selectedStudent}`,
        {
          params: filters,
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setReportData(response.data);
    } catch (error) {
      toast.error('Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/api/reports/student/${selectedStudent}/pdf`,
        {
          params: filters,
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance_${selectedStudent}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to download PDF');
    }
  };

  const getAttendanceClass = (percentage) => {
    if (percentage >= 75) return 'good';
    if (percentage >= 65) return 'warning';
    return 'danger';
  };

  return (
    <div className="attendance-report">
      <h2>Individual Student Attendance Report</h2>

      <div className="report-filters">
        <div className="form-group">
          <label>Select Student *</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">-- Select Student --</option>
            {students.map((student) => (
              <option key={student.student_id} value={student.student_id}>
                {student.student_id} - {student.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={filters.start_date}
            onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={filters.end_date}
            onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
          />
        </div>

        <button className="btn-primary" onClick={fetchReport} disabled={loading}>
          {loading ? 'Loading...' : 'Generate Report'}
        </button>
      </div>

      {reportData && (
        <div className="report-content">
          {/* Student Info */}
          <div className="student-info-card">
            <h3>Student Information</h3>
            <div className="info-grid">
              <div>
                <strong>Student ID:</strong> {reportData.student.student_id}
              </div>
              <div>
                <strong>Name:</strong> {reportData.student.name}
              </div>
              <div>
                <strong>Department:</strong> {reportData.student.department}
              </div>
              <div>
                <strong>Section:</strong> {reportData.student.section}
              </div>
            </div>
          </div>

          {/* Overall Summary */}
          <div className="overall-summary">
            <h3>Overall Attendance</h3>
            <div className="summary-stats">
              <div className="stat-box">
                <div className="stat-value">{reportData.overall.total_classes}</div>
                <div className="stat-label">Total Classes</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{reportData.overall.classes_attended}</div>
                <div className="stat-label">Attended</div>
              </div>
              <div className={`stat-box ${getAttendanceClass(reportData.overall.percentage)}`}>
                <div className="stat-value">{reportData.overall.percentage}%</div>
                <div className="stat-label">Percentage</div>
              </div>
            </div>
          </div>

          {/* Subject-wise Breakdown */}
          <div className="subject-breakdown">
            <div className="section-header">
              <h3>Subject-wise Attendance</h3>
              <button className="btn-secondary" onClick={downloadPDF}>
                Download PDF
              </button>
            </div>

            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Type</th>
                  <th>Total Classes</th>
                  <th>Attended</th>
                  <th>Absent</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {reportData.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.subject_code}</td>
                    <td>{subject.subject_name}</td>
                    <td>
                      <span className={`badge badge-${subject.subject_type}`}>
                        {subject.subject_type}
                      </span>
                    </td>
                    <td>{subject.total_classes}</td>
                    <td>{subject.classes_attended}</td>
                    <td>{subject.classes_absent}</td>
                    <td>
                      <span className={`percentage-badge ${getAttendanceClass(subject.percentage)}`}>
                        {subject.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Attendance Status Legend */}
          <div className="legend">
            <h4>Attendance Status:</h4>
            <div className="legend-items">
              <div className="legend-item good">
                <span className="color-box"></span>
                <span>≥75% - Good</span>
              </div>
              <div className="legend-item warning">
                <span className="color-box"></span>
                <span>65-74% - Warning</span>
              </div>
              <div className="legend-item danger">
                <span className="color-box"></span>
                <span>&lt;65% - Critical</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentAttendanceReport;