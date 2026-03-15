// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import './StudentList.css';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// function StudentList() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${API_URL}/api/students`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setStudents(response.data.students);
//     } catch (error) {
//       toast.error('Failed to fetch students');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteStudent = async (studentId) => {
//     if (!window.confirm('Are you sure you want to delete this student?')) {
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`${API_URL}/api/students/${studentId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       toast.success('Student deleted successfully');
//       fetchStudents();
//     } catch (error) {
//       toast.error(error.response?.data?.error || 'Failed to delete student');
//     }
//   };

//   const filteredStudents = students.filter(student =>
//     student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     student.student_id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) {
//     return <div className="loading">Loading students...</div>;
//   }

//   return (
//     <div className="student-list">
//       <h2>Registered Students</h2>

//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search by name or student ID..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {filteredStudents.length === 0 ? (
//         <div className="no-data">
//           <p>No students found</p>
//         </div>
//       ) : (
//         <div className="students-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Student ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Department</th>
//                 {/* <th>Registered On</th> */}
//                 <th>Year</th>
//                 <th>Section</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredStudents.map((student) => (
//                 <tr key={student.id}>
//                   <td>{student.student_id}</td>
//                   <td>{student.name}</td>
//                   <td>{student.email || 'N/A'}</td>
//                   <td>{student.department || 'N/A'}</td>
//                   {/* <td>{new Date(student.registered_at).toLocaleDateString()}</td> */}
//                   <td>{student.year || 'N/A'}</td>
//                   <td>{student.section || 'N/A'}</td>
//                   <td>
//                     <button
//                       className="btn-delete"
//                       onClick={() => deleteStudent(student.student_id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StudentList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './StudentList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const YEARS = ['YEAR-1', 'YEAR-2', 'YEAR-3', 'YEAR-4'];
const SECTIONS = ['A', 'B', 'C'];
const DEPARTMENTS = ['AIML', 'DS', 'IT', 'CSE'];

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // New filter states
  const [filters, setFilters] = useState({
    year: '',
    section: '',
    department: ''
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
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete student');
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      year: '',
      section: '',
      department: ''
    });
    setSearchQuery('');
  };

  // Apply all filters
  const filteredStudents = students.filter(student => {
    // Search query filter
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.email && student.email.toLowerCase().includes(searchQuery.toLowerCase()));

    // Year filter
    const matchesYear = !filters.year || 
      (student.year && student.year.toUpperCase() === filters.year.toUpperCase());

    // Section filter
    const matchesSection = !filters.section || 
      (student.section && student.section.toUpperCase() === filters.section.toUpperCase());

    // Department filter
    const matchesDepartment = !filters.department || 
      (student.department && student.department.toUpperCase() === filters.department.toUpperCase());

    return matchesSearch && matchesYear && matchesSection && matchesDepartment;
  });

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  const activeFiltersCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className="student-list">
      <h2>Registered Students</h2>

      {/* Search and Filters Section */}
      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search by name, ID, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="filter-row">
            <div className="filter-group">
              <label>Department</label>
              <select
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="">All Departments</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Year</label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
              >
                <option value="">All Years</option>
                {YEARS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Section</label>
              <select
                value={filters.section}
                onChange={(e) => handleFilterChange('section', e.target.value)}
              >
                <option value="">All Sections</option>
                {SECTIONS.map(section => (
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </select>
            </div>

            {activeFiltersCount > 0 && (
              <div className="filter-group">
                <label>&nbsp;</label>
                <button 
                  className="btn-clear-filters"
                  onClick={clearFilters}
                >
                  Clear Filters ({activeFiltersCount})
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <span className="results-count">
            Showing <strong>{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
          </span>
          {activeFiltersCount > 0 && (
            <span className="active-filters-badge">
              {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
            </span>
          )}
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="no-data">
          {students.length === 0 ? (
            <p>No students registered yet</p>
          ) : (
            <div>
              <p>No students found matching your criteria</p>
              <button className="btn-secondary" onClick={clearFilters}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="students-table">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Year</th>
                <th>Section</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.student_id}</td>
                  <td>{student.name}</td>
                  <td>{student.email || 'N/A'}</td>
                  <td>
                    <span className="badge badge-department">
                      {student.department || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-year">
                      {student.year || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-section">
                      {student.section || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deleteStudent(student.student_id)}
                      title="Delete student"
                    >
                      🗑️ Delete
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

export default StudentList;