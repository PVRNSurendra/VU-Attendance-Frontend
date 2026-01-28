import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ClassAttendanceReport.css';

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

  /* =========================
     FETCH STUDENTS
  ========================= */
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data.students || []);
    } catch {
      toast.error('Failed to fetch students');
    }
  };

  /* =========================
     FETCH REPORT
  ========================= */
  const fetchReport = async () => {
    if (!selectedStudent) {
      toast.error('Please select a student');
      return;
    }

    setLoading(true);
    setReportData(null); // reset previous report

    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `${API_URL}/api/reports/student/${selectedStudent}`,
        {
          params: filters,
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setReportData(res.data);
      toast.success('Report generated successfully');
    } catch {
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DOWNLOAD PDF
  ========================= */
  const downloadPDF = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `${API_URL}/api/reports/student/${selectedStudent}/pdf`,
        {
          params: filters,
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance_${selectedStudent}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
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

      {/* =========================
          FILTERS
      ========================= */}
      <div className="report-filters">

        <div className="form-group">
          <label>Select Student *</label>
          <select
            value={selectedStudent}
            onChange={e => setSelectedStudent(e.target.value)}
          >
            <option value="">-- Select Student --</option>
            {students.map(s => (
              <option key={s.student_id} value={s.student_id}>
                {s.student_id} - {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={filters.start_date}
            onChange={e =>
              setFilters({ ...filters, start_date: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={filters.end_date}
            onChange={e =>
              setFilters({ ...filters, end_date: e.target.value })
            }
          />
        </div>

        <button
          className="btn-primary"
          onClick={fetchReport}
        >
          {loading ? 'Loading...' : 'Generate Report'}
        </button>
      </div>

      {/* =========================
          REPORT CONTENT
      ========================= */}
      {reportData && (
        <div className="report-content">

          {/* STUDENT INFO */}
          <div className="student-info-card">
            <h3>Student Information</h3>
            <div className="info-grid">
              <div><strong>Student ID:</strong> {reportData.student.student_id}</div>
              <div><strong>Name:</strong> {reportData.student.name}</div>
              <div><strong>Department:</strong> {reportData.student.department}</div>
              <div><strong>Section:</strong> {reportData.student.section}</div>
            </div>
          </div>

          {/* OVERALL SUMMARY */}
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

          {/* SUBJECT-WISE */}
          <div className="subject-breakdown">
            <div className="section-header">
              <h3>Subject-wise Attendance</h3>

              {/* ✅ APPEARS ONLY AFTER GENERATE */}
              <button
                className="btn-secondary"
                onClick={downloadPDF}
              >
                Download PDF
              </button>
            </div>

            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Type</th>
                  <th>Total</th>
                  <th>Attended</th>
                  <th>Absent</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {reportData.subjects.map((sub, i) => (
                  <tr key={i}>
                    <td>{sub.subject_code}</td>
                    <td>{sub.subject_name}</td>
                    <td>
                      <span className={`badge badge-${sub.subject_type}`}>
                        {sub.subject_type}
                      </span>
                    </td>
                    <td>{sub.total_classes}</td>
                    <td>{sub.classes_attended}</td>
                    <td>{sub.classes_absent}</td>
                    <td>
                      <span className={`percentage-badge ${getAttendanceClass(sub.percentage)}`}>
                        {sub.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
}

export default StudentAttendanceReport;
