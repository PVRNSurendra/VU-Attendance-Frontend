import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './ComprehensiveClassReport.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const DEPARTMENTS = ['AIML', 'DS', 'IT', 'CSE'];
const SECTIONS = ['A', 'B', 'C'];
const YEARS = ['YEAR-1', 'YEAR-2', 'YEAR-3', 'YEAR-4'];

function ComprehensiveClassReport() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    department: '',
    section: '',
    year: '',
    start_date: '',
    end_date: ''
  });

  const fetchReport = async () => {
    if (!filters.department || !filters.section || !filters.year) {
      toast.error('Please select Department, Section and Year');
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
      const res = await axios.get(`${API_URL}/api/reports/class`, {
        params: filters,
        headers: { Authorization: `Bearer ${token}` }
      });

      setReportData(res.data);
    } catch {
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/reports/class/pdf`, {
        params: filters,
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `class_attendance_${filters.department}_${filters.section}_${filters.year}.pdf`;
      link.click();
    } catch {
      toast.error('Failed to download PDF');
    }
  };

  return (
    <div className="attendance-report wide-report">
      <h2>Class Attendance Report</h2>

      {/* FILTERS */}
      <div className="report-filters">

        <div className="filter-row">
          <label>Department *</label>
          <select
            value={filters.department}
            onChange={e => setFilters({ ...filters, department: e.target.value })}
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="filter-row">
          <label>Section *</label>
          <select
            value={filters.section}
            onChange={e => setFilters({ ...filters, section: e.target.value })}
          >
            <option value="">Select Section</option>
            {SECTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="filter-row">
          <label>Year *</label>
          <select
            value={filters.year}
            onChange={e => setFilters({ ...filters, year: e.target.value })}
          >
            <option value="">Select Year</option>
            {YEARS.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="filter-row">
          <label>Start Date</label>
          <input
            type="date"
            value={filters.start_date}
            onChange={e => setFilters({ ...filters, start_date: e.target.value })}
          />
        </div>

        <div className="filter-row">
          <label>End Date</label>
          <input
            type="date"
            value={filters.end_date}
            onChange={e => setFilters({ ...filters, end_date: e.target.value })}
          />
        </div>

        <button className="btn-primary" onClick={fetchReport}>
          {loading ? 'Loading...' : 'Generate Report'}
        </button>
      </div>

      {/* REPORT */}
      {reportData && (
        <div className="report-content">

          <div className="section-header">
            <h3>
              {reportData.department} – {reportData.section} – {reportData.year}
            </h3>

            <button className="btn-secondary" onClick={downloadPDF}>
              Download PDF
            </button>
          </div>

          {(filters.start_date || filters.end_date) && (
            <div className="report-dates">
              Period:&nbsp;
              {filters.start_date || 'Beginning'} → {filters.end_date || 'Present'}
            </div>
          )}

          <div className="table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Total</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Percentage</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.students.map((st, i) => {
                  const pct = st.overall.percentage;
                  return (
                    <tr key={st.student_id}>
                      <td>{i + 1}</td>
                      <td>{st.student_id}</td>
                      <td>{st.name}</td>
                      <td>{st.overall.total}</td>
                      <td>{st.overall.attended}</td>
                      <td>{st.overall.total - st.overall.attended}</td>
                      <td className={pct >= 75 ? 'good' : pct >= 65 ? 'warning' : 'danger'}>
                        {pct.toFixed(1)}%
                      </td>
                      <td className={pct >= 75 ? 'good' : pct >= 65 ? 'warning' : 'danger'}>
                        {pct >= 75 ? 'Good' : pct >= 65 ? 'Warning' : 'Critical'}
                      </td>
                    </tr>
                  );

                  
                })}
              </tbody>
            </table>
          </div>
          {/* LEGEND */}
          <div className="legend">
            <h4>Attendance Status:</h4>

            <div className="legend-items">
              <div className="legend-item good">
                <span className="color-box"></span>
                <span>≥75% - Good</span>
              </div>

              <div className="legend-item warning">
                <span className="color-box"></span>
                <span>65–74% - Warning</span>
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

export default ComprehensiveClassReport;
