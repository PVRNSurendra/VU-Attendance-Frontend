// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import './MarkAttendance.css';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const DEPARTMENTS = ['AIML', 'DS', 'IT', 'CSE'];
// const SECTIONS = ['A', 'B', 'C'];
// const PERIODS = [1, 2, 3, 4, 5, 6, 7];
// const YEARS = ['YEAR-1', 'YEAR-2', 'YEAR-3', 'YEAR-4'];

// // function MarkAttendance() {
// //   const navigate = useNavigate();
// //   const fileInputRef = useRef(null);
  
// //   const [formData, setFormData] = useState({
// //     subject_id: '',
// //     department: '',
// //     section: '',
// //     year: '',
// //     session_date: new Date().toISOString().split('T')[0],
// //     session_time: new Date().toTimeString().slice(0, 5),
// //     period_number: ''
// //   });
  
// //   const [subjects, setSubjects] = useState([]);
// //   const [loadingSubjects, setLoadingSubjects] = useState(false);
// //   const [groupPhoto, setGroupPhoto] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [result, setResult] = useState(null);

// //   // Fetch subjects when department and section change
// //   useEffect(() => {
// //     if (formData.department && formData.section  && formData.year) {
// //       fetchSubjects();
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [formData.department, formData.section,formData.year]);

// //   const fetchSubjects = async () => {
// //     setLoadingSubjects(true);
// //     try {
// //       const token = localStorage.getItem('token');
      
// //       console.log('Fetching subjects with:', {
// //         department: formData.department,
// //         section: formData.section,
// //         year: formData.year
// //       });
      
// //       const response = await axios.get(`${API_URL}/api/subjects`, {
// //         params: {
// //           department: formData.department,
// //           year: formData.year
// //         },
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
      
// //       console.log('Subjects received:', response.data);
      
// //       setSubjects(response.data.subjects || []);
      
// //       if (!response.data.subjects || response.data.subjects.length === 0) {
// //         toast.info(`No subjects found for ${formData.department} - ${formData.section} - ${formData.year}`);
// //       } else {
// //         toast.success(`Found ${response.data.subjects.length} subject(s)`);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching subjects:', error);
// //       toast.error('Failed to fetch subjects');
// //     } finally {
// //       setLoadingSubjects(false);
// //     }
// //   };
// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleFileUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setGroupPhoto(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const removePhoto = () => {
// //     setGroupPhoto(null);
// //     setResult(null);
// //     if (fileInputRef.current) {
// //       fileInputRef.current.value = '';
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!groupPhoto) {
// //       toast.error('Please upload a group photo');
// //       return;
// //     }

// //     if (!formData.subject_id) {
// //       toast.error('Please select a subject');
// //       return;
// //     }

// //     if (!formData.department || !formData.section) {
// //       toast.error('Please select department and section');
// //       return;
// //     }

// //     setLoading(true);
// //     setResult(null);

// //     try {
// //       const token = localStorage.getItem('token');
      
// //       const response = await axios.post(
// //         `${API_URL}/api/attendance/mark`,
// //         {
// //           ...formData,
// //           image: groupPhoto
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       toast.success('Attendance marked successfully!');
// //       setResult(response.data);
      
// //       setTimeout(() => {
// //         navigate('/attendance/sessions');
// //       }, 3000);
// //     } catch (error) {
// //       toast.error(error.response?.data?.error || 'Failed to mark attendance');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="mark-attendance">
// //       <h2>Mark Attendance</h2>

// //       <form onSubmit={handleSubmit}>
// //         {/* Class Information */}
// //         <div className="form-section">
// //           <h3>Class Information</h3>
          
// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Department *</label>
// //               <select
// //                 name="department"
// //                 value={formData.department}
// //                 onChange={handleChange}
// //                 required
// //               >
// //                 <option value="">-- Select Department --</option>
// //                 {DEPARTMENTS.map((dept) => (
// //                   <option key={dept} value={dept}>
// //                     {dept}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div className="form-group">
// //               <label>Section *</label>
// //               <select
// //                 name="section"
// //                 value={formData.section}
// //                 onChange={handleChange}
// //                 required
// //               >
// //                 <option value="">-- Select Section --</option>
// //                 {SECTIONS.map((section) => (
// //                   <option key={section} value={section}>
// //                     Section {section}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           <div className="form-group">
// //             <label>Year *</label>
// //             <select
// //               name="year"
// //               value={formData.year}
// //               onChange={handleChange}
// //               required
// //             >
// //               <option value="">-- Select Year --</option>
// //               {YEARS.map(year => (
// //                 <option key={year} value={year}>{year}</option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Subject *</label>
// //               <select
// //                 name="subject_id"
// //                 value={formData.subject_id}
// //                 onChange={handleChange}
// //                 required
// //                 disabled={!formData.department || !formData.section || !formData.year || loadingSubjects}
// //               >
// //                 <option value="">
// //                   {loadingSubjects ? 'Loading subjects...' : '-- Select Subject --'}
// //                 </option>
// //                 {subjects.map((subject) => (
// //                   <option key={subject.id} value={subject.id}>
// //                     {subject.subject_code} - {subject.subject_name}
// //                     {subject.subject_type === 'elective' ? ' (Elective)' : ''}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div className="form-group">
// //               <label>Period Number *</label>
// //               <select
// //                 name="period_number"
// //                 value={formData.period_number}
// //                 onChange={handleChange}
// //                 required
// //               >
// //                 <option value="">-- Select Period --</option>
// //                 {PERIODS.map((period) => (
// //                   <option key={period} value={period}>
// //                     Period {period}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Session Details */}
// //         <div className="form-section">
// //           <h3>Session Details</h3>
          
// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Date *</label>
// //               <input
// //                 type="date"
// //                 name="session_date"
// //                 value={formData.session_date}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label>Time *</label>
// //               <input
// //                 type="time"
// //                 name="session_time"
// //                 value={formData.session_time}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Photo Upload */}
// //         <div className="form-section">
// //           <h3>Upload Group Photo *</h3>
          
// //           {!groupPhoto && (
// //             <div className="upload-area" onClick={() => fileInputRef.current.click()}>
// //               <div className="upload-icon">📷</div>
// //               <p>Click to upload group photo</p>
// //               <p className="upload-hint">JPG, PNG or JPEG (Max 10MB)</p>
// //               <input
// //                 ref={fileInputRef}
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleFileUpload}
// //                 style={{ display: 'none' }}
// //               />
// //             </div>
// //           )}

// //           {groupPhoto && (
// //             <div className="uploaded-photo">
// //               <img src={groupPhoto} alt="Group" />
// //               <button
// //                 type="button"
// //                 className="btn-secondary"
// //                 onClick={removePhoto}
// //               >
// //                 Remove Photo
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         {!result && (
// //           <button
// //             type="submit"
// //             className="btn-primary btn-submit"
// //             disabled={loading}
// //           >
// //             {loading ? 'Processing...' : 'Mark Attendance'}
// //           </button>
// //         )}
// //       </form>

// //       {result && (
// //         <div className="result-section">
// //           <h3>Attendance Summary</h3>
          
// //           <div className="session-details-summary">
// //             <p><strong>Subject:</strong> {result.subject_name}</p>
// //             <p><strong>Department:</strong> {formData.department}</p>
// //             <p><strong>Section:</strong> {formData.section}</p>
// //             <p><strong>Period:</strong> {formData.period_number}</p>
// //             <p><strong>Date:</strong> {formData.session_date}</p>
// //             <p><strong>Time:</strong> {formData.session_time}</p>
// //           </div>

// //           <div className="summary-cards">
// //             <div className="summary-card">
// //               <div className="card-value">{result.faces_detected}</div>
// //               <div className="card-label">Faces Detected</div>
// //             </div>
            
// //             <div className="summary-card">
// //               <div className="card-value">{result.recognized_count}</div>
// //               <div className="card-label">Students Recognized</div>
// //             </div>
            
// //             <div className="summary-card success">
// //               <div className="card-value">{result.summary.present_count}</div>
// //               <div className="card-label">Present</div>
// //             </div>
            
// //             <div className="summary-card danger">
// //               <div className="card-value">{result.summary.absent_count}</div>
// //               <div className="card-label">Absent</div>
// //             </div>
// //           </div>

// //           {result.unrecognized_faces > 0 && (
// //             <div className="warning-box">
// //               <h4>⚠️ Warning</h4>
// //               <p>
// //                 {result.unrecognized_faces} face(s) were detected but could not be matched 
// //                 to any registered student. These faces were NOT marked present.
// //               </p>
// //             </div>
// //           )}

// //           {result.recognized_students.length > 0 && (
// //             <div className="recognized-list">
// //               <h4>✓ Recognized Students (Marked Present):</h4>
// //               <ul>
// //                 {result.recognized_students.map((student, index) => (
// //                   <li key={index}>
// //                     <span className="student-name">{student.name}</span>
// //                     <span className="student-id">({student.student_id})</span>
// //                     <span className={`confidence ${student.confidence >= 0.8 ? 'high' : student.confidence >= 0.7 ? 'medium' : 'low'}`}>
// //                       Confidence: {(student.confidence * 100).toFixed(1)}%
// //                     </span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           )}

// //           <button
// //             className="btn-primary"
// //             onClick={() => navigate('/attendance/sessions')}
// //           >
// //             View All Sessions
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default MarkAttendance;



// // function MarkAttendance() {
// //   const navigate = useNavigate();
// //   const fileInputRef = useRef(null);
// //   const videoRef = useRef(null);
// //   const canvasRef = useRef(null);
  
// //   const [formData, setFormData] = useState({
// //     subject_id: '',
// //     department: '',
// //     section: '',
// //     year: '',
// //     session_date: new Date().toISOString().split('T')[0],
// //     session_time: new Date().toTimeString().slice(0, 5),
// //     period_number: ''
// //   });
  
// //   const [subjects, setSubjects] = useState([]);
// //   const [students, setStudents] = useState([]);
// //   const [attendance, setAttendance] = useState({});
// //   const [loadingSubjects, setLoadingSubjects] = useState(false);
// //   const [loadingStudents, setLoadingStudents] = useState(false);
  
// //   // Multiple images support
// //   const [capturedImages, setCapturedImages] = useState([]);
// //   const [uploadedImages, setUploadedImages] = useState([]);
// //   const [cameraActive, setCameraActive] = useState(false);
// //   const [processing, setProcessing] = useState(false);
// //   const [recognitionDone, setRecognitionDone] = useState(false);
// //   const [recognitionResult, setRecognitionResult] = useState(null);
// //   const [cameraFacingMode, setCameraFacingMode] = useState('user'); 

// //   const fetchSubjects = useCallback(async () => {
// //     setLoadingSubjects(true);
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await axios.get(`${API_URL}/api/subjects`, {
// //         params: {
// //           department: formData.department,
// //           section: formData.section,
// //           year: formData.year
// //         },
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       setSubjects(response.data.subjects || []);
// //     } catch (error) {
// //       toast.error('Failed to fetch subjects');
// //     } finally {
// //       setLoadingSubjects(false);
// //     }
// //   }, [formData.department, formData.section, formData.year]);

// //   const fetchStudents = useCallback(async () => {
// //     setLoadingStudents(true);
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await axios.get(`${API_URL}/api/students`, {
// //         params: {
// //           department: formData.department,
// //           section: formData.section,
// //           year: formData.year
// //         },
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
      
// //       const studentsList = response.data.students || [];
// //       setStudents(studentsList);
      
// //       // Initialize all students as absent
// //       const initialAttendance = {};
// //       studentsList.forEach(student => {
// //         initialAttendance[student.student_id] = {
// //           present: false,
// //           confidence: null,
// //           manually_marked: false
// //         };
// //       });
// //       setAttendance(initialAttendance);
// //       setRecognitionDone(false);
// //       setRecognitionResult(null);
// //     } catch (error) {
// //       console.error('Error fetching students:', error);
// //       toast.error('Failed to fetch students');
// //     } finally {
// //       setLoadingStudents(false);
// //     }
// //   }, [formData.department, formData.section, formData.year]);

// //   useEffect(() => {
// //     if (formData.department && formData.section && formData.year) {
// //       fetchSubjects();
// //       fetchStudents();
// //     } else {
// //       setStudents([]);
// //       setAttendance({});
// //     }
// //   }, [formData.department, formData.section, formData.year, fetchSubjects, fetchStudents]);

// //   useEffect(() => {
// //     if (cameraActive) {
// //       startCamera();
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [cameraFacingMode]);

// //   useEffect(() => {
// //     return () => {
// //       stopCamera();
// //     };
// //   }, []);


// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   // Camera functions
// //   const startCamera = async () => {
// //     try {
// //       setCameraActive(true);

// //       // Stop existing stream
// //       if (videoRef.current?.srcObject) {
// //         videoRef.current.srcObject.getTracks().forEach(t => t.stop());
// //       }

// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: {
// //           facingMode: cameraFacingMode, // user | environment
// //           width: { ideal: 1280 },
// //           height: { ideal: 720 }
// //         }
// //       });

// //       const video = videoRef.current;
// //       if (!video) return;

// //       video.srcObject = stream;

// //       video.onloadedmetadata = () => {
// //         video.play();

// //         // 🔥 FORCE MIRROR BEHAVIOR (THIS IS THE FIX)
// //         if (cameraFacingMode === 'user') {
// //           video.style.transform = 'scaleX(-1)';
// //         } else {
// //           video.style.transform = 'scaleX(1)';
// //         }
// //       };

// //     } catch (err) {
// //       console.error('Camera error:', err);
// //       toast.error('Failed to access camera');
// //       setCameraActive(false);
// //     }
// //   };



// //   const stopCamera = () => {
// //     if (videoRef.current && videoRef.current.srcObject) {
// //       const tracks = videoRef.current.srcObject.getTracks();
// //       tracks.forEach(track => track.stop());
// //       videoRef.current.srcObject = null;
// //       setCameraActive(false);
// //     }
// //   };

// //   const captureImage = () => {
// //     if (!videoRef.current || !canvasRef.current) return;

// //     const canvas = canvasRef.current;
// //     const video = videoRef.current;
    
// //     canvas.width = video.videoWidth;
// //     canvas.height = video.videoHeight;
    
// //     const ctx = canvas.getContext('2d');
// //     ctx.drawImage(video, 0, 0);
    
// //     canvas.toBlob((blob) => {
// //       const file = new File([blob], `capture_${Date.now()}.jpg`, {
// //         type: 'image/jpeg'
// //       });
// //       setCapturedImages(prev => [...prev, file]);
// //       toast.success(`Image captured! Total: ${capturedImages.length + 1}`);
// //     }, 'image/jpeg', 0.9);
// //   };

// //   const handleFileUpload = (e) => {
// //     const files = Array.from(e.target.files);
// //     const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
// //     if (imageFiles.length !== files.length) {
// //       toast.error('Only image files are allowed');
// //     }
    
// //     if (imageFiles.length > 0) {
// //       setUploadedImages(prev => [...prev, ...imageFiles]);
// //       toast.success(`${imageFiles.length} image(s) uploaded`);
// //     }
    
// //     e.target.value = ''; // Reset input
// //   };

// //   const removeImage = (index, type) => {
// //     if (type === 'captured') {
// //       setCapturedImages(prev => prev.filter((_, i) => i !== index));
// //     } else {
// //       setUploadedImages(prev => prev.filter((_, i) => i !== index));
// //     }
// //   };

// //   const clearAllImages = () => {
// //     setCapturedImages([]);
// //     setUploadedImages([]);
// //     stopCamera();
// //     setRecognitionDone(false);
// //     setRecognitionResult(null);
    
// //     // Reset attendance to all absent
// //     const resetAttendance = {};
// //     students.forEach(student => {
// //       resetAttendance[student.student_id] = {
// //         present: false,
// //         confidence: null,
// //         manually_marked: false
// //       };
// //     });
// //     setAttendance(resetAttendance);
// //   };

// //   const getAllImages = () => {
// //     return [...capturedImages, ...uploadedImages];
// //   };

// //   const processImages = async () => {
// //     const allImages = getAllImages();
    
// //     if (allImages.length === 0) {
// //       toast.error('Please capture or upload at least one image');
// //       return;
// //     }

// //     if (students.length === 0) {
// //       toast.error('No students found for selected class');
// //       return;
// //     }

// //     setProcessing(true);

// //     try {
// //       const token = localStorage.getItem('token');
      
// //       // Convert images to base64
// //       const imagePromises = allImages.map(file => {
// //         return new Promise((resolve, reject) => {
// //           const reader = new FileReader();
// //           reader.onloadend = () => resolve(reader.result);
// //           reader.onerror = reject;
// //           reader.readAsDataURL(file);
// //         });
// //       });

// //       const base64Images = await Promise.all(imagePromises);

// //       console.log('Sending recognition request for:', {
// //         department: formData.department,
// //         section: formData.section,
// //         year: formData.year,
// //         imagesCount: base64Images.length,
// //         studentsCount: students.length
// //       });
      
// //       // Call backend to recognize faces in multiple images
// //       const response = await axios.post(
// //         `${API_URL}/api/attendance/recognize-multiple`,
// //         {
// //           images: base64Images,
// //           department: formData.department,
// //           section: formData.section,
// //           year: formData.year
// //         },
// //         {
// //           headers: { Authorization: `Bearer ${token}` }
// //         }
// //       );

// //       console.log('Recognition response:', response.data);

// //       const recognizedStudents = response.data.recognized_students || [];
      
// //       // Update attendance based on recognition (duplicates already filtered by backend)
// //       const updatedAttendance = { ...attendance };
// //       recognizedStudents.forEach(recognized => {
// //         if (updatedAttendance[recognized.student_id]) {
// //           updatedAttendance[recognized.student_id] = {
// //             present: true,
// //             confidence: recognized.confidence,
// //             manually_marked: false
// //           };
// //         }
// //       });
      
// //       setAttendance(updatedAttendance);
// //       setRecognitionDone(true);
// //       setRecognitionResult(response.data);
      
// //       const presentCount = recognizedStudents.length;
// //       toast.success(`Recognized ${presentCount} unique student(s) from ${allImages.length} image(s)`);
      
// //       // Stop camera after processing
// //       stopCamera();
// //     } catch (error) {
// //       console.error('Error processing images:', error);
// //       console.error('Error response:', error.response?.data);
      
// //       const errorMsg = error.response?.data?.error || error.message || 'Failed to process images';
// //       toast.error(errorMsg);
      
// //       if (error.response) {
// //         console.error('Server error details:', {
// //           status: error.response.status,
// //           data: error.response.data
// //         });
// //       }
// //     } finally {
// //       setProcessing(false);
// //     }
// //   };

// //   const toggleAttendance = (studentId) => {
// //     setAttendance(prev => ({
// //       ...prev,
// //       [studentId]: {
// //         ...prev[studentId],
// //         present: !prev[studentId].present,
// //         manually_marked: true
// //       }
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.subject_id) {
// //       toast.error('Please select a subject');
// //       return;
// //     }

// //     if (students.length === 0) {
// //       toast.error('No students to mark attendance for');
// //       return;
// //     }

// //     // Prepare attendance data
// //     const attendanceData = students.map(student => ({
// //       student_id: student.student_id,
// //       status: attendance[student.student_id].present ? 'present' : 'absent',
// //       confidence_score: attendance[student.student_id].confidence
// //     }));

// //     try {
// //       const token = localStorage.getItem('token');
      
// //       const response = await axios.post(
// //         `${API_URL}/api/attendance/mark`,
// //         {
// //           ...formData,
// //           attendance_records: attendanceData
// //         },
// //         {
// //           headers: { Authorization: `Bearer ${token}` }
// //         }
// //       );

// //       toast.success('Attendance marked successfully!');
      
// //       setTimeout(() => {
// //         navigate(`/attendance/sessions/${response.data.session_id}`);
// //       }, 1500);
// //     } catch (error) {
// //       console.error('Error marking attendance:', error);
// //       toast.error(error.response?.data?.error || 'Failed to mark attendance');
// //     }
// //   };

// //   const presentCount = Object.values(attendance).filter(a => a.present).length;
// //   const absentCount = students.length - presentCount;
// //   const totalImages = capturedImages.length + uploadedImages.length;

// //   return (
// //     <div className="mark-attendance">
// //       <h2>Mark Attendance</h2>

// //       <form onSubmit={handleSubmit}>
// //         {/* Class Information */}
// //         <div className="form-section">
// //           <h3>Class Information</h3>
          
// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Department *</label>
// //               <select
// //                 name="department"
// //                 value={formData.department}
// //                 onChange={handleChange}
// //                 required
// //               >
// //                 <option value="">-- Select Department --</option>
// //                 {DEPARTMENTS.map((dept) => (
// //                   <option key={dept} value={dept}>{dept}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div className="form-group">
// //               <label>Year *</label>
// //               <select
// //                 name="year"
// //                 value={formData.year}
// //                 onChange={handleChange}
// //                 required
// //               >
// //                 <option value="">-- Select Year --</option>
// //                 {YEARS.map(year => (
// //                   <option key={year} value={year}>{year}</option>
// //                 ))}
// //               </select>
// //             </div>
            
// //             <div className="form-group">
// //               <label>Section *</label>
// //               <select
// //                 name="section"
// //                 value={formData.section}
// //                 onChange={handleChange}
// //                 required
// //               >
// //                 <option value="">-- Select Section --</option>
// //                 {SECTIONS.map((section) => (
// //                   <option key={section} value={section}>Section {section}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Subject *</label>
// //               <select
// //                 name="subject_id"
// //                 value={formData.subject_id}
// //                 onChange={handleChange}
// //                 required
// //                 disabled={!formData.department || !formData.section || !formData.year || loadingSubjects}
// //               >
// //                 <option value="">
// //                   {loadingSubjects ? 'Loading subjects...' : '-- Select Subject --'}
// //                 </option>
// //                 {subjects.map((subject) => (
// //                   <option key={subject.id} value={subject.id}>
// //                     {subject.subject_code} - {subject.subject_name}
// //                     {subject.subject_type === 'elective' ? ' (Elective)' : ''}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div className="form-group">
// //               <label>Period Number *</label>
// //               <select
// //                 name="period_number"
// //                 value={formData.period_number}
// //                 onChange={handleChange}
// //                 required
// //               >
// //                 <option value="">-- Select Period --</option>
// //                 {PERIODS.map((period) => (
// //                   <option key={period} value={period}>Period {period}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           <div className="form-row">
// //             <div className="form-group">
// //               <label>Date *</label>
// //               <input
// //                 type="date"
// //                 name="session_date"
// //                 value={formData.session_date}
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Multiple Images Section */}
// //         {students.length > 0 && (
// //           <div className="form-section">
// //             <h3>Capture/Upload Images (Optional)</h3>
// //             <p style={{ color: '#666', marginBottom: '15px' }}>
// //               Capture or upload multiple images for automatic attendance marking. Duplicate students will be filtered automatically.
// //             </p>
            
// //             {/* Camera Section */}
// //             <div className="camera-section">
// //               <h4>📷 Camera Capture</h4>
              
// //               <button
// //                 type="button"
// //                 className="btn-camera start"
// //                 onClick={startCamera}
// //               >
// //                 Start Camera
// //               </button>
// //             </div>

// //             {/* Camera Modal Dialog */}
// //             {cameraActive && (
// //               <div className="camera-modal-overlay" onClick={(e) => {
// //                 // Close modal if clicking on overlay background
// //                 if (e.target.className === 'camera-modal-overlay') {
// //                   stopCamera();
// //                 }
// //               }}>
// //                 <div className="camera-modal-dialog">
// //                   <div className="camera-modal-header">
// //                     <h3>📷 Camera Preview</h3>
// //                     <button
// //                       type="button"
// //                       className="close-modal-btn"
// //                       onClick={stopCamera}
// //                       title="Close Camera"
// //                     >
// //                       ✕
// //                     </button>
// //                   </div>

// //                   <div className="camera-modal-body">
// //                     <div className="camera-preview-wrapper">
// //                       <video
// //                         ref={videoRef}
// //                         autoPlay
// //                         playsInline
// //                         muted
// //                         className="camera-video-preview"
// //                       />
// //                       <canvas ref={canvasRef} style={{ display: 'none' }} />
                      
// //                       <div className="capture-counter">
// //                         📸 Captured: {capturedImages.length}
// //                       </div>
                      
// //                       {/* Loading indicator */}
// //                       <div className="camera-loading">
// //                         {/* <div className="loading-spinner"></div> */}
// //                         {/* <p>Starting camera...</p> */}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="camera-modal-footer">
// //                     <button
// //                       type="button"
// //                       className="btn-camera capture"
// //                       onClick={captureImage}
// //                     >
// //                       📸 Capture Image
// //                     </button>

// //                      <button
// //                         type="button" 
// //                         className="btn-camera switch"
// //                         onClick={() => {
// //                           setCameraFacingMode(prev =>
// //                             prev === 'user' ? 'environment' : 'user'
// //                           );
// //                         }}
// //                       >
// //                         🔄 Switch Camera
// //                       </button>

// //                     <button
// //                       type="button"
// //                       className="btn-camera stop"
// //                       onClick={stopCamera}
// //                     >
// //                       ⏹ Close Camera
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* File Upload Section */}
// //             <div className="upload-section">
// //               <h4>📁 Upload Images</h4>
// //               <label className="file-upload-label">
// //                 <input
// //                   ref={fileInputRef}
// //                   type="file"
// //                   accept="image/*"
// //                   multiple
// //                   onChange={handleFileUpload}
// //                   className="file-input"
// //                 />
// //                 <span className="upload-btn">Choose Images</span>
// //               </label>
// //               <p className="upload-hint">You can select multiple images at once</p>
// //             </div>

// //             {/* Images Summary */}
// //             {totalImages > 0 && (
// //               <div className="images-summary">
// //                 <div className="summary-cards">
// //                   <div className="summary-card">
// //                     <span className="summary-icon">📷</span>
// //                     <div>
// //                       <strong>{capturedImages.length}</strong>
// //                       <p>Captured</p>
// //                     </div>
// //                   </div>
// //                   <div className="summary-card">
// //                     <span className="summary-icon">📁</span>
// //                     <div>
// //                       <strong>{uploadedImages.length}</strong>
// //                       <p>Uploaded</p>
// //                     </div>
// //                   </div>
// //                   <div className="summary-card total">
// //                     <span className="summary-icon">🖼️</span>
// //                     <div>
// //                       <strong>{totalImages}</strong>
// //                       <p>Total Images</p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Images List (No Preview) */}
// //                 <div className="images-list">
// //                   <h5>Selected Images ({totalImages})</h5>
// //                   <div className="image-items">
// //                     {capturedImages.map((file, index) => (
// //                       <div key={`captured-${index}`} className="image-item">
// //                         <span className="image-icon">📷</span>
// //                         <span className="image-name">{file.name}</span>
// //                         <button
// //                           type="button"
// //                           className="remove-btn"
// //                           onClick={() => removeImage(index, 'captured')}
// //                         >
// //                           ✕
// //                         </button>
// //                       </div>
// //                     ))}
// //                     {uploadedImages.map((file, index) => (
// //                       <div key={`uploaded-${index}`} className="image-item">
// //                         <span className="image-icon">📁</span>
// //                         <span className="image-name">{file.name}</span>
// //                         <button
// //                           type="button"
// //                           className="remove-btn"
// //                           onClick={() => removeImage(index, 'uploaded')}
// //                         >
// //                           ✕
// //                         </button>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Process and Clear Buttons */}
// //                 <div className="image-actions">
// //                   <button
// //                     type="button"
// //                     className="btn-primary"
// //                     onClick={processImages}
// //                     disabled={processing || recognitionDone}
// //                   >
// //                     {processing ? 'Processing...' : recognitionDone ? 'Processed ✓' : `Process ${totalImages} Image(s)`}
// //                   </button>
// //                   <button
// //                     type="button"
// //                     className="btn-secondary"
// //                     onClick={clearAllImages}
// //                   >
// //                     Clear All Images
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Recognition Results */}
// //             {recognitionResult && (
// //               <div className="recognition-summary">
// //                 <h4>✓ Recognition Results:</h4>
// //                 <div className="result-stats">
// //                   <div className="result-stat">
// //                     <strong>{recognitionResult.images_processed}</strong>
// //                     <span>Images Processed</span>
// //                   </div>
// //                   {/* <div className="result-stat">
// //                     <strong>{recognitionResult.total_faces_detected}</strong>
// //                     <span>Total Faces Detected</span>
// //                   </div> */}
// //                   <div className="result-stat">
// //                     <strong>{recognitionResult.recognized_count}</strong>
// //                     <span>Unique Students</span>
// //                   </div>
// //                   {/* <div className="result-stat">
// //                     <strong>{recognitionResult.duplicates_filtered || 0}</strong>
// //                     <span>Duplicates Filtered</span>
// //                   </div> */}
// //                 </div>
// //                 {recognitionResult.unrecognized_faces > 0 && (
// //                   <p style={{ color: '#ff9800', marginTop: '10px' }}>
// //                     ⚠️ {recognitionResult.unrecognized_faces} face(s) could not be matched to any student
// //                   </p>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* Students List */}
// //         {students.length > 0 && (
// //           <div className="form-section">
// //             <div className="students-header">
// //               <h3>Students ({students.length})</h3>
// //               <div className="attendance-summary">
// //                 <span className="present-badge">Present: {presentCount}</span>
// //                 <span className="absent-badge">Absent: {absentCount}</span>
// //               </div>
// //             </div>

// //             <div className="students-grid">
// //               {Array.from({ length: Math.ceil(students.length / 5) }, (_, rowIndex) => {
// //                 const row = students.slice(rowIndex * 5, rowIndex * 5 + 5);
// //                 return (
// //                   <div key={rowIndex} className="student-row">
// //                     {row.map(student => (
// //                       <div
// //                         key={student.student_id}
// //                         className={`student-cell ${attendance[student.student_id]?.present ? 'present' : 'absent'}`}
// //                         onClick={() => toggleAttendance(student.student_id)}
// //                       >
// //                         <input
// //                           type="checkbox"
// //                           checked={attendance[student.student_id]?.present || false}
// //                           onChange={() => {}}
// //                         />
// //                         <span className="student-id">
// //                           {student.student_id}
// //                         </span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         )}

// //         {loadingStudents && (
// //           <div className="loading-message">Loading students...</div>
// //         )}

// //         {!loadingStudents && students.length === 0 && formData.department && formData.section && formData.year && (
// //           <div className="no-students-message">
// //             No students found for {formData.department} - Section {formData.section} - {formData.year}
// //           </div>
// //         )}

// //         {students.length > 0 && (
// //           <button
// //             type="submit"
// //             className="btn-primary btn-submit"
// //           >
// //             Submit Attendance
// //           </button>
// //         )}
// //       </form>

// //       {/* Processing Overlay */}
// //       {processing && (
// //         <div className="processing-overlay">
// //           <div className="processing-spinner"></div>
// //           <p>Processing {totalImages} image(s) and detecting faces...</p>
// //           <p className="processing-note">Filtering duplicate students automatically...</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default MarkAttendance;


// function MarkAttendance() {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     subject_id: '',
//     department: '',
//     section: '',
//     year: '',
//     session_date: new Date().toISOString().split('T')[0],
//     session_time: new Date().toTimeString().slice(0, 5),
//     period_number: ''
//   });
  
//   const [subjects, setSubjects] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [loadingSubjects, setLoadingSubjects] = useState(false);
//   const [loadingStudents, setLoadingStudents] = useState(false);
  
//   // Multiple images support with preview URLs
//   const [capturedImages, setCapturedImages] = useState([]);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [recognitionDone, setRecognitionDone] = useState(false);
//   const [recognitionResult, setRecognitionResult] = useState(null);
//   const [cameraFacingMode, setCameraFacingMode] = useState('user'); 

//   const fetchSubjects = useCallback(async () => {
//     setLoadingSubjects(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${API_URL}/api/subjects`, {
//         params: {
//           department: formData.department,
//           section: formData.section,
//           year: formData.year
//         },
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSubjects(response.data.subjects || []);
//     } catch (error) {
//       toast.error('Failed to fetch subjects');
//     } finally {
//       setLoadingSubjects(false);
//     }
//   }, [formData.department, formData.section, formData.year]);

//   const fetchStudents = useCallback(async () => {
//     setLoadingStudents(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${API_URL}/api/students`, {
//         params: {
//           department: formData.department,
//           section: formData.section,
//           year: formData.year
//         },
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       const studentsList = response.data.students || [];
//       setStudents(studentsList);
      
//       // Initialize all students as absent
//       const initialAttendance = {};
//       studentsList.forEach(student => {
//         initialAttendance[student.student_id] = {
//           present: false,
//           confidence: null,
//           manually_marked: false
//         };
//       });
//       setAttendance(initialAttendance);
//       setRecognitionDone(false);
//       setRecognitionResult(null);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       toast.error('Failed to fetch students');
//     } finally {
//       setLoadingStudents(false);
//     }
//   }, [formData.department, formData.section, formData.year]);

//   useEffect(() => {
//     if (formData.department && formData.section && formData.year) {
//       fetchSubjects();
//       fetchStudents();
//     } else {
//       setStudents([]);
//       setAttendance({});
//     }
//   }, [formData.department, formData.section, formData.year, fetchSubjects, fetchStudents]);

//   useEffect(() => {
//     if (cameraActive) {
//       startCamera();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [cameraFacingMode]);

//   useEffect(() => {
//     return () => {
//       stopCamera();
//       // Cleanup preview URLs
//       capturedImages.forEach(img => URL.revokeObjectURL(img.preview));
//       uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Camera functions
//   const startCamera = async () => {
//     try {
//       setCameraActive(true);

//       // Stop existing stream
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(t => t.stop());
//       }

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode: cameraFacingMode,
//           width: { ideal: 1280 },
//           height: { ideal: 720 }
//         }
//       });

//       const video = videoRef.current;
//       if (!video) return;

//       video.srcObject = stream;

//       video.onloadedmetadata = () => {
//         video.play();

//         if (cameraFacingMode === 'user') {
//           video.style.transform = 'scaleX(-1)';
//         } else {
//           video.style.transform = 'scaleX(1)';
//         }
//       };

//     } catch (err) {
//       console.error('Camera error:', err);
//       toast.error('Failed to access camera');
//       setCameraActive(false);
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//       setCameraActive(false);
//     }
//   };

//   const captureImage = () => {
//     if (!videoRef.current || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const video = videoRef.current;
    
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
    
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0);
    
//     canvas.toBlob((blob) => {
//       const file = new File([blob], `capture_${Date.now()}.jpg`, {
//         type: 'image/jpeg'
//       });
      
//       // Create preview URL
//       const imageWithPreview = {
//         file: file,
//         preview: URL.createObjectURL(blob),
//         name: file.name
//       };
      
//       setCapturedImages(prev => [...prev, imageWithPreview]);
//       toast.success(`Image captured! Total: ${capturedImages.length + 1}`);
//     }, 'image/jpeg', 0.9);
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
//     if (imageFiles.length !== files.length) {
//       toast.error('Only image files are allowed');
//     }
    
//     if (imageFiles.length > 0) {
//       // Create preview URLs for uploaded images
//       const imagesWithPreviews = imageFiles.map(file => ({
//         file: file,
//         preview: URL.createObjectURL(file),
//         name: file.name
//       }));
      
//       setUploadedImages(prev => [...prev, ...imagesWithPreviews]);
//       toast.success(`${imageFiles.length} image(s) uploaded`);
//     }
    
//     e.target.value = ''; // Reset input
//   };

//   const removeImage = (index, type) => {
//     if (type === 'captured') {
//       // Revoke URL before removing
//       URL.revokeObjectURL(capturedImages[index].preview);
//       setCapturedImages(prev => prev.filter((_, i) => i !== index));
//     } else {
//       // Revoke URL before removing
//       URL.revokeObjectURL(uploadedImages[index].preview);
//       setUploadedImages(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   const clearAllImages = () => {
//     // Revoke all URLs
//     capturedImages.forEach(img => URL.revokeObjectURL(img.preview));
//     uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
    
//     setCapturedImages([]);
//     setUploadedImages([]);
//     stopCamera();
//     setRecognitionDone(false);
//     setRecognitionResult(null);
    
//     // Reset attendance to all absent
//     const resetAttendance = {};
//     students.forEach(student => {
//       resetAttendance[student.student_id] = {
//         present: false,
//         confidence: null,
//         manually_marked: false
//       };
//     });
//     setAttendance(resetAttendance);
//   };

//   const getAllImages = () => {
//     return [...capturedImages.map(img => img.file), ...uploadedImages.map(img => img.file)];
//   };

//   const processImages = async () => {
//     const allImages = getAllImages();
    
//     if (allImages.length === 0) {
//       toast.error('Please capture or upload at least one image');
//       return;
//     }

//     if (students.length === 0) {
//       toast.error('No students found for selected class');
//       return;
//     }

//     setProcessing(true);

//     try {
//       const token = localStorage.getItem('token');
      
//       // Convert images to base64
//       const imagePromises = allImages.map(file => {
//         return new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           reader.onerror = reject;
//           reader.readAsDataURL(file);
//         });
//       });

//       const base64Images = await Promise.all(imagePromises);

//       console.log('Sending recognition request for:', {
//         department: formData.department,
//         section: formData.section,
//         year: formData.year,
//         imagesCount: base64Images.length,
//         studentsCount: students.length
//       });
      
//       // Call backend to recognize faces in multiple images
//       const response = await axios.post(
//         `${API_URL}/api/attendance/recognize-multiple`,
//         {
//           images: base64Images,
//           department: formData.department,
//           section: formData.section,
//           year: formData.year
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       console.log('Recognition response:', response.data);

//       const recognizedStudents = response.data.recognized_students || [];
      
//       // Update attendance based on recognition
//       const updatedAttendance = { ...attendance };
//       recognizedStudents.forEach(recognized => {
//         if (updatedAttendance[recognized.student_id]) {
//           updatedAttendance[recognized.student_id] = {
//             present: true,
//             confidence: recognized.confidence,
//             manually_marked: false
//           };
//         }
//       });
      
//       setAttendance(updatedAttendance);
//       setRecognitionDone(true);
//       setRecognitionResult(response.data);
      
//       const presentCount = recognizedStudents.length;
//       toast.success(`Recognized ${presentCount} unique student(s) from ${allImages.length} image(s)`);
      
//       // Stop camera after processing
//       stopCamera();
//     } catch (error) {
//       console.error('Error processing images:', error);
//       console.error('Error response:', error.response?.data);
      
//       const errorMsg = error.response?.data?.error || error.message || 'Failed to process images';
//       toast.error(errorMsg);
      
//       if (error.response) {
//         console.error('Server error details:', {
//           status: error.response.status,
//           data: error.response.data
//         });
//       }
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const toggleAttendance = (studentId) => {
//     setAttendance(prev => ({
//       ...prev,
//       [studentId]: {
//         ...prev[studentId],
//         present: !prev[studentId].present,
//         manually_marked: true
//       }
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.subject_id) {
//       toast.error('Please select a subject');
//       return;
//     }

//     if (students.length === 0) {
//       toast.error('No students to mark attendance for');
//       return;
//     }

//     // Prepare attendance data
//     const attendanceData = students.map(student => ({
//       student_id: student.student_id,
//       status: attendance[student.student_id].present ? 'present' : 'absent',
//       confidence_score: attendance[student.student_id].confidence
//     }));

//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await axios.post(
//         `${API_URL}/api/attendance/mark`,
//         {
//           ...formData,
//           attendance_records: attendanceData
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       toast.success('Attendance marked successfully!');
      
//       setTimeout(() => {
//         navigate(`/attendance/sessions/${response.data.session_id}`);
//       }, 1500);
//     } catch (error) {
//       console.error('Error marking attendance:', error);
//       toast.error(error.response?.data?.error || 'Failed to mark attendance');
//     }
//   };

//   const presentCount = Object.values(attendance).filter(a => a.present).length;
//   const absentCount = students.length - presentCount;
//   const totalImages = capturedImages.length + uploadedImages.length;

//   return (
//     <div className="mark-attendance">
//       <h2>Mark Attendance</h2>

//       <form onSubmit={handleSubmit}>
//         {/* Class Information */}
//         <div className="form-section">
//           <h3>Class Information</h3>
          
//           <div className="form-row">
//             <div className="form-group">
//               <label>Department *</label>
//               <select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Department --</option>
//                 {DEPARTMENTS.map((dept) => (
//                   <option key={dept} value={dept}>{dept}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Year *</label>
//               <select
//                 name="year"
//                 value={formData.year}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Year --</option>
//                 {YEARS.map(year => (
//                   <option key={year} value={year}>{year}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label>Section *</label>
//               <select
//                 name="section"
//                 value={formData.section}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Section --</option>
//                 {SECTIONS.map((section) => (
//                   <option key={section} value={section}>Section {section}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Subject *</label>
//               <select
//                 name="subject_id"
//                 value={formData.subject_id}
//                 onChange={handleChange}
//                 required
//                 disabled={!formData.department || !formData.section || !formData.year || loadingSubjects}
//               >
//                 <option value="">
//                   {loadingSubjects ? 'Loading subjects...' : '-- Select Subject --'}
//                 </option>
//                 {subjects.map((subject) => (
//                   <option key={subject.id} value={subject.id}>
//                     {subject.subject_code} - {subject.subject_name}
//                     {subject.subject_type === 'elective' ? ' (Elective)' : ''}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Period Number *</label>
//               <select
//                 name="period_number"
//                 value={formData.period_number}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Period --</option>
//                 {PERIODS.map((period) => (
//                   <option key={period} value={period}>Period {period}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Date *</label>
//               <input
//                 type="date"
//                 name="session_date"
//                 value={formData.session_date}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Multiple Images Section */}
//         {students.length > 0 && (
//           <div className="form-section">
//             <h3>Capture/Upload Images (Optional)</h3>
//             <p style={{ color: '#666', marginBottom: '15px' }}>
//               Capture or upload multiple images for automatic attendance marking. Duplicate students will be filtered automatically.
//             </p>
            
//             {/* Camera Section */}
//             <div className="camera-section">
//               <h4>📷 Camera Capture</h4>
              
//               <button
//                 type="button"
//                 className="btn-camera start"
//                 onClick={startCamera}
//               >
//                 Start Camera
//               </button>
//             </div>

//             {/* Camera Modal Dialog */}
//             {cameraActive && (
//               <div className="camera-modal-overlay" onClick={(e) => {
//                 if (e.target.className === 'camera-modal-overlay') {
//                   stopCamera();
//                 }
//               }}>
//                 <div className="camera-modal-dialog">
//                   <div className="camera-modal-header">
//                     <h3>📷 Camera Preview</h3>
//                     <button
//                       type="button"
//                       className="close-modal-btn"
//                       onClick={stopCamera}
//                       title="Close Camera"
//                     >
//                       ✕
//                     </button>
//                   </div>

//                   <div className="camera-modal-body">
//                     <div className="camera-preview-wrapper">
//                       <video
//                         ref={videoRef}
//                         autoPlay
//                         playsInline
//                         muted
//                         className="camera-video-preview"
//                       />
//                       <canvas ref={canvasRef} style={{ display: 'none' }} />
                      
//                       <div className="capture-counter">
//                         📸 Captured: {capturedImages.length}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="camera-modal-footer">
//                     <button
//                       type="button"
//                       className="btn-camera capture"
//                       onClick={captureImage}
//                     >
//                       📸 Capture Image
//                     </button>

//                     <button
//                       type="button" 
//                       className="btn-camera switch"
//                       onClick={() => {
//                         setCameraFacingMode(prev =>
//                           prev === 'user' ? 'environment' : 'user'
//                         );
//                       }}
//                     >
//                       🔄 Switch Camera
//                     </button>

//                     <button
//                       type="button"
//                       className="btn-camera stop"
//                       onClick={stopCamera}
//                     >
//                       ⏹ Close Camera
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* File Upload Section */}
//             <div className="upload-section">
//               <h4>📁 Upload Images</h4>
//               <label className="file-upload-label">
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleFileUpload}
//                   className="file-input"
//                 />
//                 <span className="upload-btn">Choose Images</span>
//               </label>
//               <p className="upload-hint">You can select multiple images at once</p>
//             </div>

//             {/* Images Summary */}
//             {totalImages > 0 && (
//               <div className="images-summary">
//                 <div className="summary-cards">
//                   <div className="summary-card">
//                     <span className="summary-icon">📷</span>
//                     <div>
//                       <strong>{capturedImages.length}</strong>
//                       <p>Captured</p>
//                     </div>
//                   </div>
//                   <div className="summary-card">
//                     <span className="summary-icon">📁</span>
//                     <div>
//                       <strong>{uploadedImages.length}</strong>
//                       <p>Uploaded</p>
//                     </div>
//                   </div>
//                   <div className="summary-card total">
//                     <span className="summary-icon">🖼️</span>
//                     <div>
//                       <strong>{totalImages}</strong>
//                       <p>Total Images</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Images Grid with Previews */}
//                 <div className="images-preview-grid">
//                   <h5>Selected Images ({totalImages})</h5>
//                   <div className="preview-grid">
//                     {/* Captured Images */}
//                     {capturedImages.map((image, index) => (
//                       <div key={`captured-${index}`} className="preview-item">
//                         <div className="preview-image-wrapper">
//                           <img 
//                             src={image.preview} 
//                             alt={`Captured ${index + 1}`}
//                             className="preview-thumbnail"
//                           />
//                           <button
//                             type="button"
//                             className="remove-preview-btn"
//                             onClick={() => removeImage(index, 'captured')}
//                             title="Remove image"
//                           >
//                             ✕
//                           </button>
//                           <div className="preview-badge captured">📷</div>
//                         </div>
//                         <p className="preview-name">{image.name}</p>
//                       </div>
//                     ))}
                    
//                     {/* Uploaded Images */}
//                     {uploadedImages.map((image, index) => (
//                       <div key={`uploaded-${index}`} className="preview-item">
//                         <div className="preview-image-wrapper">
//                           <img 
//                             src={image.preview} 
//                             alt={`Uploaded ${index + 1}`}
//                             className="preview-thumbnail"
//                           />
//                           <button
//                             type="button"
//                             className="remove-preview-btn"
//                             onClick={() => removeImage(index, 'uploaded')}
//                             title="Remove image"
//                           >
//                             ✕
//                           </button>
//                           <div className="preview-badge uploaded">📁</div>
//                         </div>
//                         <p className="preview-name">{image.name}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Process and Clear Buttons */}
//                 <div className="image-actions">
//                   <button
//                     type="button"
//                     className="btn-primary"
//                     onClick={processImages}
//                     disabled={processing || recognitionDone}
//                   >
//                     {processing ? 'Processing...' : recognitionDone ? 'Processed ✓' : `Process ${totalImages} Image(s)`}
//                   </button>
//                   <button
//                     type="button"
//                     className="btn-secondary"
//                     onClick={clearAllImages}
//                   >
//                     Clear All Images
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Recognition Results */}
//             {recognitionResult && (
//               <div className="recognition-summary">
//                 <h4>✓ Recognition Results:</h4>
//                 <div className="result-stats">
//                   <div className="result-stat">
//                     <strong>{recognitionResult.images_processed}</strong>
//                     <span>Images Processed</span>
//                   </div>
//                   <div className="result-stat">
//                     <strong>{recognitionResult.recognized_count}</strong>
//                     <span>Unique Students</span>
//                   </div>
//                 </div>
//                 {recognitionResult.unrecognized_faces > 0 && (
//                   <p style={{ color: '#ff9800', marginTop: '10px' }}>
//                     ⚠️ {recognitionResult.unrecognized_faces} face(s) could not be matched to any student
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Students List */}
//         {students.length > 0 && (
//           <div className="form-section">
//             <div className="students-header">
//               <h3>Students ({students.length})</h3>
//               <div className="attendance-summary">
//                 <span className="present-badge">Present: {presentCount}</span>
//                 <span className="absent-badge">Absent: {absentCount}</span>
//               </div>
//             </div>

//             <div className="students-grid">
//               {Array.from({ length: Math.ceil(students.length / 5) }, (_, rowIndex) => {
//                 const row = students.slice(rowIndex * 5, rowIndex * 5 + 5);
//                 return (
//                   <div key={rowIndex} className="student-row">
//                     {row.map(student => (
//                       <div
//                         key={student.student_id}
//                         className={`student-cell ${attendance[student.student_id]?.present ? 'present' : 'absent'}`}
//                         onClick={() => toggleAttendance(student.student_id)}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={attendance[student.student_id]?.present || false}
//                           onChange={() => {}}
//                         />
//                         <span className="student-id">
//                           {student.student_id}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {loadingStudents && (
//           <div className="loading-message">Loading students...</div>
//         )}

//         {!loadingStudents && students.length === 0 && formData.department && formData.section && formData.year && (
//           <div className="no-students-message">
//             No students found for {formData.department} - Section {formData.section} - {formData.year}
//           </div>
//         )}

//         {students.length > 0 && (
//           <button
//             type="submit"
//             className="btn-primary btn-submit"
//           >
//             Submit Attendance
//           </button>
//         )}
//       </form>

//       {/* Processing Overlay */}
//       {processing && (
//         <div className="processing-overlay">
//           <div className="processing-spinner"></div>
//           <p>Processing {totalImages} image(s) and detecting faces...</p>
//           <p className="processing-note">Filtering duplicate students automatically...</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MarkAttendance;






// -------------------------




// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import './MarkAttendance.css';
// import InlineAnnotatedImage from './InlineAnnotatedImage'; // ✅ NEW IMPORT

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const DEPARTMENTS = ['AIML', 'DS', 'IT', 'CSE'];
// const SECTIONS = ['A', 'B', 'C'];
// const PERIODS = [1, 2, 3, 4, 5, 6, 7];
// const YEARS = ['YEAR-1', 'YEAR-2', 'YEAR-3', 'YEAR-4'];

// function MarkAttendance() {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     subject_id: '',
//     department: '',
//     section: '',
//     year: '',
//     session_date: new Date().toISOString().split('T')[0],
//     session_time: new Date().toTimeString().slice(0, 5),
//     period_number: ''
//   });
  
//   const [subjects, setSubjects] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [loadingSubjects, setLoadingSubjects] = useState(false);
//   const [loadingStudents, setLoadingStudents] = useState(false);
  
//   // Multiple images support with preview URLs
//   const [capturedImages, setCapturedImages] = useState([]);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [recognitionDone, setRecognitionDone] = useState(false);
//   const [recognitionResult, setRecognitionResult] = useState(null);
//   const [cameraFacingMode, setCameraFacingMode] = useState('user');
  
//   // ✅ NEW STATE for annotated image display
//   const [processedImageData, setProcessedImageData] = useState(null);

//   const fetchSubjects = useCallback(async () => {
//     setLoadingSubjects(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${API_URL}/api/subjects`, {
//         params: {
//           department: formData.department,
//           section: formData.section,
//           year: formData.year
//         },
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSubjects(response.data.subjects || []);
//     } catch (error) {
//       toast.error('Failed to fetch subjects');
//     } finally {
//       setLoadingSubjects(false);
//     }
//   }, [formData.department, formData.section, formData.year]);

//   const fetchStudents = useCallback(async () => {
//     setLoadingStudents(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${API_URL}/api/students`, {
//         params: {
//           department: formData.department,
//           section: formData.section,
//           year: formData.year
//         },
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       const studentsList = response.data.students || [];
//       setStudents(studentsList);
      
//       // Initialize all students as absent
//       const initialAttendance = {};
//       studentsList.forEach(student => {
//         initialAttendance[student.student_id] = {
//           present: false,
//           confidence: null,
//           manually_marked: false
//         };
//       });
//       setAttendance(initialAttendance);
//       setRecognitionDone(false);
//       setRecognitionResult(null);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       toast.error('Failed to fetch students');
//     } finally {
//       setLoadingStudents(false);
//     }
//   }, [formData.department, formData.section, formData.year]);

//   useEffect(() => {
//     if (formData.department && formData.section && formData.year) {
//       fetchSubjects();
//       fetchStudents();
//     } else {
//       setStudents([]);
//       setAttendance({});
//     }
//   }, [formData.department, formData.section, formData.year, fetchSubjects, fetchStudents]);

//   useEffect(() => {
//     if (cameraActive) {
//       startCamera();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [cameraFacingMode]);

//   useEffect(() => {
//     return () => {
//       stopCamera();
//       // Cleanup preview URLs
//       capturedImages.forEach(img => URL.revokeObjectURL(img.preview));
//       uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Camera functions
//   const startCamera = async () => {
//     try {
//       setCameraActive(true);

//       // Stop existing stream
//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(t => t.stop());
//       }

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode: cameraFacingMode,
//           width: { ideal: 1280 },
//           height: { ideal: 720 }
//         }
//       });

//       const video = videoRef.current;
//       if (!video) return;

//       video.srcObject = stream;

//       video.onloadedmetadata = () => {
//         video.play();

//         if (cameraFacingMode === 'user') {
//           video.style.transform = 'scaleX(-1)';
//         } else {
//           video.style.transform = 'scaleX(1)';
//         }
//       };

//     } catch (err) {
//       console.error('Camera error:', err);
//       toast.error('Failed to access camera');
//       setCameraActive(false);
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//       setCameraActive(false);
//     }
//   };

//   const captureImage = () => {
//     if (!videoRef.current || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const video = videoRef.current;
    
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
    
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0);
    
//     canvas.toBlob((blob) => {
//       const file = new File([blob], `capture_${Date.now()}.jpg`, {
//         type: 'image/jpeg'
//       });
      
//       // Create preview URL
//       const imageWithPreview = {
//         file: file,
//         preview: URL.createObjectURL(blob),
//         name: file.name
//       };
      
//       setCapturedImages(prev => [...prev, imageWithPreview]);
//       toast.success(`Image captured! Total: ${capturedImages.length + 1}`);
//     }, 'image/jpeg', 0.9);
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
//     if (imageFiles.length !== files.length) {
//       toast.error('Only image files are allowed');
//     }
    
//     if (imageFiles.length > 0) {
//       // Create preview URLs for uploaded images
//       const imagesWithPreviews = imageFiles.map(file => ({
//         file: file,
//         preview: URL.createObjectURL(file),
//         name: file.name
//       }));
      
//       setUploadedImages(prev => [...prev, ...imagesWithPreviews]);
//       toast.success(`${imageFiles.length} image(s) uploaded`);
//     }
    
//     e.target.value = ''; // Reset input
//   };

//   const removeImage = (index, type) => {
//     if (type === 'captured') {
//       // Revoke URL before removing
//       URL.revokeObjectURL(capturedImages[index].preview);
//       setCapturedImages(prev => prev.filter((_, i) => i !== index));
//     } else {
//       // Revoke URL before removing
//       URL.revokeObjectURL(uploadedImages[index].preview);
//       setUploadedImages(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   const clearAllImages = () => {
//     // Revoke all URLs
//     capturedImages.forEach(img => URL.revokeObjectURL(img.preview));
//     uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
    
//     setCapturedImages([]);
//     setUploadedImages([]);
//     stopCamera();
//     setRecognitionDone(false);
//     setRecognitionResult(null);
    
//     // ✅ NEW: Clear processed image data
//     setProcessedImageData(null);
    
//     // Reset attendance to all absent
//     const resetAttendance = {};
//     students.forEach(student => {
//       resetAttendance[student.student_id] = {
//         present: false,
//         confidence: null,
//         manually_marked: false
//       };
//     });
//     setAttendance(resetAttendance);
//   };

//   const getAllImages = () => {
//     return [...capturedImages.map(img => img.file), ...uploadedImages.map(img => img.file)];
//   };

//   const processImages = async () => {
//     const allImages = getAllImages();
    
//     if (allImages.length === 0) {
//       toast.error('Please capture or upload at least one image');
//       return;
//     }

//     if (students.length === 0) {
//       toast.error('No students found for selected class');
//       return;
//     }

//     setProcessing(true);

//     try {
//       const token = localStorage.getItem('token');
      
//       // Convert images to base64
//       const imagePromises = allImages.map(file => {
//         return new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           reader.onerror = reject;
//           reader.readAsDataURL(file);
//         });
//       });

//       const base64Images = await Promise.all(imagePromises);

//       console.log('Sending recognition request for:', {
//         department: formData.department,
//         section: formData.section,
//         year: formData.year,
//         imagesCount: base64Images.length,
//         studentsCount: students.length
//       });
      
//       // Call backend to recognize faces in multiple images
//       const response = await axios.post(
//         `${API_URL}/api/attendance/recognize-multiple`,
//         {
//           images: base64Images,
//           department: formData.department,
//           section: formData.section,
//           year: formData.year
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       console.log('Recognition response:', response.data);

//       const recognizedStudents = response.data.recognized_students || [];
      
//       // Update attendance based on recognition
//       const updatedAttendance = { ...attendance };
//       recognizedStudents.forEach(recognized => {
//         if (updatedAttendance[recognized.student_id]) {
//           updatedAttendance[recognized.student_id] = {
//             present: true,
//             confidence: recognized.confidence,
//             manually_marked: false
//           };
//         }
//       });
      
//       setAttendance(updatedAttendance);
//       setRecognitionDone(true);
//       setRecognitionResult(response.data);
      
//       // ✅ NEW: Store processed image data for display
//       if (response.data.annotated_images && response.data.annotated_images.length > 0) {
//         const firstImage = response.data.annotated_images[0];
//         setProcessedImageData({
//           imageData: firstImage.original_image,
//           recognitionData: {
//             faces_detected: firstImage.faces_detected,
//             recognized_students: firstImage.recognized_students,
//             unrecognized_faces: firstImage.unrecognized_faces
//           }
//         });
//       }
      
//       const presentCount = recognizedStudents.length;
//       toast.success(`Recognized ${presentCount} unique student(s) from ${allImages.length} image(s)`);
      
//       // Stop camera after processing
//       stopCamera();
//     } catch (error) {
//       console.error('Error processing images:', error);
//       console.error('Error response:', error.response?.data);
      
//       const errorMsg = error.response?.data?.error || error.message || 'Failed to process images';
//       toast.error(errorMsg);
      
//       if (error.response) {
//         console.error('Server error details:', {
//           status: error.response.status,
//           data: error.response.data
//         });
//       }
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const toggleAttendance = (studentId) => {
//     setAttendance(prev => ({
//       ...prev,
//       [studentId]: {
//         ...prev[studentId],
//         present: !prev[studentId].present,
//         manually_marked: true
//       }
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.subject_id) {
//       toast.error('Please select a subject');
//       return;
//     }

//     if (students.length === 0) {
//       toast.error('No students to mark attendance for');
//       return;
//     }

//     // Prepare attendance data
//     const attendanceData = students.map(student => ({
//       student_id: student.student_id,
//       status: attendance[student.student_id].present ? 'present' : 'absent',
//       confidence_score: attendance[student.student_id].confidence
//     }));

//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await axios.post(
//         `${API_URL}/api/attendance/mark`,
//         {
//           ...formData,
//           attendance_records: attendanceData
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       toast.success('Attendance marked successfully!');
      
//       setTimeout(() => {
//         navigate(`/attendance/sessions/${response.data.session_id}`);
//       }, 1500);
//     } catch (error) {
//       console.error('Error marking attendance:', error);
//       toast.error(error.response?.data?.error || 'Failed to mark attendance');
//     }
//   };

//   const presentCount = Object.values(attendance).filter(a => a.present).length;
//   const absentCount = students.length - presentCount;
//   const totalImages = capturedImages.length + uploadedImages.length;

//   return (
//     <div className="mark-attendance">
//       <h2>Mark Attendance</h2>

//       <form onSubmit={handleSubmit}>
//         {/* Class Information */}
//         <div className="form-section">
//           <h3>Class Information</h3>
          
//           <div className="form-row">
//             <div className="form-group">
//               <label>Department *</label>
//               <select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Department --</option>
//                 {DEPARTMENTS.map((dept) => (
//                   <option key={dept} value={dept}>{dept}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Year *</label>
//               <select
//                 name="year"
//                 value={formData.year}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Year --</option>
//                 {YEARS.map(year => (
//                   <option key={year} value={year}>{year}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label>Section *</label>
//               <select
//                 name="section"
//                 value={formData.section}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Section --</option>
//                 {SECTIONS.map((section) => (
//                   <option key={section} value={section}>Section {section}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Subject *</label>
//               <select
//                 name="subject_id"
//                 value={formData.subject_id}
//                 onChange={handleChange}
//                 required
//                 disabled={!formData.department || !formData.section || !formData.year || loadingSubjects}
//               >
//                 <option value="">
//                   {loadingSubjects ? 'Loading subjects...' : '-- Select Subject --'}
//                 </option>
//                 {subjects.map((subject) => (
//                   <option key={subject.id} value={subject.id}>
//                     {subject.subject_code} - {subject.subject_name}
//                     {subject.subject_type === 'elective' ? ' (Elective)' : ''}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Period Number *</label>
//               <select
//                 name="period_number"
//                 value={formData.period_number}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Period --</option>
//                 {PERIODS.map((period) => (
//                   <option key={period} value={period}>Period {period}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Date *</label>
//               <input
//                 type="date"
//                 name="session_date"
//                 value={formData.session_date}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Multiple Images Section */}
//         {students.length > 0 && (
//           <div className="form-section">
//             <h3>Capture/Upload Images (Optional)</h3>
//             <p style={{ color: '#666', marginBottom: '15px' }}>
//               Capture or upload multiple images for automatic attendance marking. Duplicate students will be filtered automatically.
//             </p>
            
//             {/* Camera Section */}
//             <div className="camera-section">
//               <h4>📷 Camera Capture</h4>
              
//               <button
//                 type="button"
//                 className="btn-camera start"
//                 onClick={startCamera}
//               >
//                 Start Camera
//               </button>
//             </div>

//             {/* Camera Modal Dialog */}
//             {cameraActive && (
//               <div className="camera-modal-overlay" onClick={(e) => {
//                 if (e.target.className === 'camera-modal-overlay') {
//                   stopCamera();
//                 }
//               }}>
//                 <div className="camera-modal-dialog">
//                   <div className="camera-modal-header">
//                     <h3>📷 Camera Preview</h3>
//                     <button
//                       type="button"
//                       className="close-modal-btn"
//                       onClick={stopCamera}
//                       title="Close Camera"
//                     >
//                       ✕
//                     </button>
//                   </div>

//                   <div className="camera-modal-body">
//                     <div className="camera-preview-wrapper">
//                       <video
//                         ref={videoRef}
//                         autoPlay
//                         playsInline
//                         muted
//                         className="camera-video-preview"
//                       />
//                       <canvas ref={canvasRef} style={{ display: 'none' }} />
                      
//                       <div className="capture-counter">
//                         📸 Captured: {capturedImages.length}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="camera-modal-footer">
//                     <button
//                       type="button"
//                       className="btn-camera capture"
//                       onClick={captureImage}
//                     >
//                       📸 Capture Image
//                     </button>

//                     <button
//                       type="button" 
//                       className="btn-camera switch"
//                       onClick={() => {
//                         setCameraFacingMode(prev =>
//                           prev === 'user' ? 'environment' : 'user'
//                         );
//                       }}
//                     >
//                       🔄 Switch Camera
//                     </button>

//                     <button
//                       type="button"
//                       className="btn-camera stop"
//                       onClick={stopCamera}
//                     >
//                       ⏹ Close Camera
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* File Upload Section */}
//             <div className="upload-section">
//               <h4>📁 Upload Images</h4>
//               <label className="file-upload-label">
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleFileUpload}
//                   className="file-input"
//                 />
//                 <span className="upload-btn">Choose Images</span>
//               </label>
//               <p className="upload-hint">You can select multiple images at once</p>
//             </div>

//             {/* Images Summary */}
//             {totalImages > 0 && (
//               <div className="images-summary">
//                 <div className="summary-cards">
//                   <div className="summary-card">
//                     <span className="summary-icon">📷</span>
//                     <div>
//                       <strong>{capturedImages.length}</strong>
//                       <p>Captured</p>
//                     </div>
//                   </div>
//                   <div className="summary-card">
//                     <span className="summary-icon">📁</span>
//                     <div>
//                       <strong>{uploadedImages.length}</strong>
//                       <p>Uploaded</p>
//                     </div>
//                   </div>
//                   <div className="summary-card total">
//                     <span className="summary-icon">🖼️</span>
//                     <div>
//                       <strong>{totalImages}</strong>
//                       <p>Total Images</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Images Grid with Previews */}
//                 <div className="images-preview-grid">
//                   <h5>Selected Images ({totalImages})</h5>
//                   <div className="preview-grid">
//                     {/* Captured Images */}
//                     {capturedImages.map((image, index) => (
//                       <div key={`captured-${index}`} className="preview-item">
//                         <div className="preview-image-wrapper">
//                           <img 
//                             src={image.preview} 
//                             alt={`Captured ${index + 1}`}
//                             className="preview-thumbnail"
//                           />
//                           <button
//                             type="button"
//                             className="remove-preview-btn"
//                             onClick={() => removeImage(index, 'captured')}
//                             title="Remove image"
//                           >
//                             ✕
//                           </button>
//                           <div className="preview-badge captured">📷</div>
//                         </div>
//                         <p className="preview-name">{image.name}</p>
//                       </div>
//                     ))}
                    
//                     {/* Uploaded Images */}
//                     {uploadedImages.map((image, index) => (
//                       <div key={`uploaded-${index}`} className="preview-item">
//                         <div className="preview-image-wrapper">
//                           <img 
//                             src={image.preview} 
//                             alt={`Uploaded ${index + 1}`}
//                             className="preview-thumbnail"
//                           />
//                           <button
//                             type="button"
//                             className="remove-preview-btn"
//                             onClick={() => removeImage(index, 'uploaded')}
//                             title="Remove image"
//                           >
//                             ✕
//                           </button>
//                           <div className="preview-badge uploaded">📁</div>
//                         </div>
//                         <p className="preview-name">{image.name}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Process and Clear Buttons */}
//                 <div className="image-actions">
//                   <button
//                     type="button"
//                     className="btn-primary"
//                     onClick={processImages}
//                     disabled={processing || recognitionDone}
//                   >
//                     {processing ? 'Processing...' : recognitionDone ? 'Processed ✓' : `Process ${totalImages} Image(s)`}
//                   </button>
//                   <button
//                     type="button"
//                     className="btn-secondary"
//                     onClick={clearAllImages}
//                   >
//                     Clear All Images
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Recognition Results */}
//             {recognitionResult && (
//               <div className="recognition-summary">
//                 <h4>✓ Recognition Results:</h4>
//                 <div className="result-stats">
//                   <div className="result-stat">
//                     <strong>{recognitionResult.images_processed}</strong>
//                     <span>Images Processed</span>
//                   </div>
//                   <div className="result-stat">
//                     <strong>{recognitionResult.recognized_count}</strong>
//                     <span>Unique Students</span>
//                   </div>
//                 </div>
//                 {recognitionResult.unrecognized_faces > 0 && (
//                   <p style={{ color: '#ff9800', marginTop: '10px' }}>
//                     ⚠️ {recognitionResult.unrecognized_faces} face(s) could not be matched to any student
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

        

//         {/* Students List */}
//         {students.length > 0 && (
//           <div className="form-section">
//             <div className="students-header">
//               <h3>Students ({students.length})</h3>
//               <div className="attendance-summary">
//                 <span className="present-badge">Present: {presentCount}</span>
//                 <span className="absent-badge">Absent: {absentCount}</span>
//               </div>
//             </div>

//             <div className="students-grid">
//               {Array.from({ length: Math.ceil(students.length / 5) }, (_, rowIndex) => {
//                 const row = students.slice(rowIndex * 5, rowIndex * 5 + 5);
//                 return (
//                   <div key={rowIndex} className="student-row">
//                     {row.map(student => (
//                       <div
//                         key={student.student_id}
//                         className={`student-cell ${attendance[student.student_id]?.present ? 'present' : 'absent'}`}
//                         onClick={() => toggleAttendance(student.student_id)}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={attendance[student.student_id]?.present || false}
//                           onChange={() => {}}
//                         />
//                         <span className="student-id">
//                           {student.student_id}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {loadingStudents && (
//           <div className="loading-message">Loading students...</div>
//         )}

//         {!loadingStudents && students.length === 0 && formData.department && formData.section && formData.year && (
//           <div className="no-students-message">
//             No students found for {formData.department} - Section {formData.section} - {formData.year}
//           </div>
//         )}

//         {students.length > 0 && (
//           <button
//             type="submit"
//             className="btn-primary btn-submit"
//           >
//             Submit Attendance
//           </button>
//         )}
//       </form>

//       {/* Processing Overlay */}
//       {processing && (
//         <div className="processing-overlay">
//           <div className="processing-spinner"></div>
//           <p>Processing {totalImages} image(s) and detecting faces...</p>
//           <p className="processing-note">Filtering duplicate students automatically...</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MarkAttendance;



// -----------------------



// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import './MarkAttendance.css';
// import InlineAnnotatedImage from './InlineAnnotatedImage';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const DEPARTMENTS = ['AIML', 'DS', 'IT', 'CSE'];
// const SECTIONS = ['A', 'B', 'C'];
// const PERIODS = [1, 2, 3, 4, 5, 6, 7];
// const YEARS = ['YEAR-1', 'YEAR-2', 'YEAR-3', 'YEAR-4'];

// function MarkAttendance() {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const videoInputRef = useRef(null); // ✅ NEW: For video file upload
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const videoPreviewRef = useRef(null); // ✅ NEW: For video preview
  
//   const [formData, setFormData] = useState({
//     subject_id: '',
//     department: '',
//     section: '',
//     year: '',
//     session_date: new Date().toISOString().split('T')[0],
//     session_time: new Date().toTimeString().slice(0, 5),
//     period_number: ''
//   });
  
//   const [subjects, setSubjects] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [loadingSubjects, setLoadingSubjects] = useState(false);
//   const [loadingStudents, setLoadingStudents] = useState(false);
  
//   // Image support
//   const [capturedImages, setCapturedImages] = useState([]);
//   const [uploadedImages, setUploadedImages] = useState([]);
  
//   // ✅ NEW: Video support
//   const [uploadedVideo, setUploadedVideo] = useState(null);
//   const [isRecordingVideo, setIsRecordingVideo] = useState(false);
//   const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [extractedFrames, setExtractedFrames] = useState([]);
//   const [extractingFrames, setExtractingFrames] = useState(false);
  
//   const [cameraActive, setCameraActive] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [recognitionDone, setRecognitionDone] = useState(false);
//   const [recognitionResult, setRecognitionResult] = useState(null);
//   const [cameraFacingMode, setCameraFacingMode] = useState('user');
//   const [processedImageData, setProcessedImageData] = useState(null);

//   // ✅ NEW: Video frame extraction settings
//   const [frameExtractionSettings, setFrameExtractionSettings] = useState({
//     frameInterval: 1, // Extract every 1 second
//     maxFrames: 10     // Maximum 10 frames
//   });

//   const fetchSubjects = useCallback(async () => {
//     setLoadingSubjects(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${API_URL}/api/subjects`, {
//         params: {
//           department: formData.department,
//           section: formData.section,
//           year: formData.year
//         },
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSubjects(response.data.subjects || []);
//     } catch (error) {
//       toast.error('Failed to fetch subjects');
//     } finally {
//       setLoadingSubjects(false);
//     }
//   }, [formData.department, formData.section, formData.year]);

//   const fetchStudents = useCallback(async () => {
//     setLoadingStudents(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${API_URL}/api/students`, {
//         params: {
//           department: formData.department,
//           section: formData.section,
//           year: formData.year
//         },
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       const studentsList = response.data.students || [];
//       setStudents(studentsList);
      
//       const initialAttendance = {};
//       studentsList.forEach(student => {
//         initialAttendance[student.student_id] = {
//           present: false,
//           confidence: null,
//           manually_marked: false
//         };
//       });
//       setAttendance(initialAttendance);
//       setRecognitionDone(false);
//       setRecognitionResult(null);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       toast.error('Failed to fetch students');
//     } finally {
//       setLoadingStudents(false);
//     }
//   }, [formData.department, formData.section, formData.year]);

//   useEffect(() => {
//     if (formData.department && formData.section && formData.year) {
//       fetchSubjects();
//       fetchStudents();
//     } else {
//       setStudents([]);
//       setAttendance({});
//     }
//   }, [formData.department, formData.section, formData.year, fetchSubjects, fetchStudents]);

//   useEffect(() => {
//     if (cameraActive) {
//       startCamera();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [cameraFacingMode]);

//   useEffect(() => {
//     return () => {
//       stopCamera();
//       capturedImages.forEach(img => URL.revokeObjectURL(img.preview));
//       uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
//       extractedFrames.forEach(frame => URL.revokeObjectURL(frame.preview));
//       if (uploadedVideo) URL.revokeObjectURL(uploadedVideo.preview);
//       if (recordedVideoBlob) URL.revokeObjectURL(recordedVideoBlob.preview);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Camera functions
//   const startCamera = async () => {
//     try {
//       setCameraActive(true);

//       if (videoRef.current?.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach(t => t.stop());
//       }

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode: cameraFacingMode,
//           width: { ideal: 1280 },
//           height: { ideal: 720 }
//         },
//         audio: false
//       });

//       const video = videoRef.current;
//       if (!video) return;

//       video.srcObject = stream;

//       video.onloadedmetadata = () => {
//         video.play();

//         if (cameraFacingMode === 'user') {
//           video.style.transform = 'scaleX(-1)';
//         } else {
//           video.style.transform = 'scaleX(1)';
//         }
//       };

//     } catch (err) {
//       console.error('Camera error:', err);
//       toast.error('Failed to access camera');
//       setCameraActive(false);
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//       setCameraActive(false);
//     }
//   };

//   // ✅ NEW: Start video recording
//   const startVideoRecording = async () => {
//     try {
//       if (!videoRef.current || !videoRef.current.srcObject) {
//         toast.error('Camera not active');
//         return;
//       }

//       const stream = videoRef.current.srcObject;
//       const recorder = new MediaRecorder(stream, {
//         mimeType: 'video/webm;codecs=vp8,opus'
//       });

//       const chunks = [];

//       recorder.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           chunks.push(e.data);
//         }
//       };

//       recorder.onstop = () => {
//         const blob = new Blob(chunks, { type: 'video/webm' });
//         const videoFile = new File([blob], `recording_${Date.now()}.webm`, {
//           type: 'video/webm'
//         });

//         setRecordedVideoBlob({
//           file: videoFile,
//           preview: URL.createObjectURL(blob),
//           name: videoFile.name,
//           duration: 0
//         });

//         toast.success('Video recorded successfully!');
//       };

//       recorder.start();
//       setMediaRecorder(recorder);
//       setIsRecordingVideo(true);
//       toast.info('Recording started...');
//     } catch (error) {
//       console.error('Recording error:', error);
//       toast.error('Failed to start recording');
//     }
//   };

//   // ✅ NEW: Stop video recording
//   const stopVideoRecording = () => {
//     if (mediaRecorder && isRecordingVideo) {
//       mediaRecorder.stop();
//       setIsRecordingVideo(false);
//       setMediaRecorder(null);
//     }
//   };

//   const captureImage = () => {
//     if (!videoRef.current || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const video = videoRef.current;
    
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
    
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0);
    
//     canvas.toBlob((blob) => {
//       const file = new File([blob], `capture_${Date.now()}.jpg`, {
//         type: 'image/jpeg'
//       });
      
//       const imageWithPreview = {
//         file: file,
//         preview: URL.createObjectURL(blob),
//         name: file.name
//       };
      
//       setCapturedImages(prev => [...prev, imageWithPreview]);
//       toast.success(`Image captured! Total: ${capturedImages.length + 1}`);
//     }, 'image/jpeg', 0.9);
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
//     if (imageFiles.length !== files.length) {
//       toast.error('Only image files are allowed');
//     }
    
//     if (imageFiles.length > 0) {
//       const imagesWithPreviews = imageFiles.map(file => ({
//         file: file,
//         preview: URL.createObjectURL(file),
//         name: file.name
//       }));
      
//       setUploadedImages(prev => [...prev, ...imagesWithPreviews]);
//       toast.success(`${imageFiles.length} image(s) uploaded`);
//     }
    
//     e.target.value = '';
//   };

//   // ✅ NEW: Handle video file upload
//   const handleVideoUpload = (e) => {
//     const file = e.target.files[0];
    
//     if (!file) return;
    
//     if (!file.type.startsWith('video/')) {
//       toast.error('Please upload a video file');
//       return;
//     }

//     const videoWithPreview = {
//       file: file,
//       preview: URL.createObjectURL(file),
//       name: file.name,
//       duration: 0
//     };

//     setUploadedVideo(videoWithPreview);
//     toast.success('Video uploaded successfully!');
    
//     e.target.value = '';
//   };

//   // ✅ NEW: Extract frames from video
//   const extractFramesFromVideo = async (videoSource) => {
//     setExtractingFrames(true);
    
//     try {
//       const video = document.createElement('video');
//       video.src = videoSource.preview;
//       video.muted = true;

//       await new Promise((resolve, reject) => {
//         video.onloadedmetadata = resolve;
//         video.onerror = reject;
//       });

//       const duration = video.duration;
//       const { frameInterval, maxFrames } = frameExtractionSettings;
      
//       const frames = [];
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');

//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       const frameCount = Math.min(
//         Math.floor(duration / frameInterval),
//         maxFrames
//       );

//       toast.info(`Extracting ${frameCount} frames from video...`);

//       for (let i = 0; i < frameCount; i++) {
//         const time = i * frameInterval;
        
//         await new Promise((resolve) => {
//           video.currentTime = time;
//           video.onseeked = resolve;
//         });

//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         const blob = await new Promise(resolve => {
//           canvas.toBlob(resolve, 'image/jpeg', 0.9);
//         });

//         const file = new File([blob], `frame_${i + 1}_${Date.now()}.jpg`, {
//           type: 'image/jpeg'
//         });

//         frames.push({
//           file: file,
//           preview: URL.createObjectURL(blob),
//           name: file.name,
//           timestamp: time.toFixed(2)
//         });
//       }

//       setExtractedFrames(frames);
//       toast.success(`Extracted ${frames.length} frames successfully!`);
//     } catch (error) {
//       console.error('Frame extraction error:', error);
//       toast.error('Failed to extract frames from video');
//     } finally {
//       setExtractingFrames(false);
//     }
//   };

//   const removeImage = (index, type) => {
//     if (type === 'captured') {
//       URL.revokeObjectURL(capturedImages[index].preview);
//       setCapturedImages(prev => prev.filter((_, i) => i !== index));
//     } else if (type === 'uploaded') {
//       URL.revokeObjectURL(uploadedImages[index].preview);
//       setUploadedImages(prev => prev.filter((_, i) => i !== index));
//     } else if (type === 'frame') {
//       URL.revokeObjectURL(extractedFrames[index].preview);
//       setExtractedFrames(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   // ✅ NEW: Remove video
//   const removeVideo = (type) => {
//     if (type === 'uploaded' && uploadedVideo) {
//       URL.revokeObjectURL(uploadedVideo.preview);
//       setUploadedVideo(null);
//       setExtractedFrames([]);
//     } else if (type === 'recorded' && recordedVideoBlob) {
//       URL.revokeObjectURL(recordedVideoBlob.preview);
//       setRecordedVideoBlob(null);
//       setExtractedFrames([]);
//     }
//   };

//   const clearAllImages = () => {
//     capturedImages.forEach(img => URL.revokeObjectURL(img.preview));
//     uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
//     extractedFrames.forEach(frame => URL.revokeObjectURL(frame.preview));
    
//     if (uploadedVideo) URL.revokeObjectURL(uploadedVideo.preview);
//     if (recordedVideoBlob) URL.revokeObjectURL(recordedVideoBlob.preview);
    
//     setCapturedImages([]);
//     setUploadedImages([]);
//     setExtractedFrames([]);
//     setUploadedVideo(null);
//     setRecordedVideoBlob(null);
//     stopCamera();
//     setRecognitionDone(false);
//     setRecognitionResult(null);
//     setProcessedImageData(null);
    
//     const resetAttendance = {};
//     students.forEach(student => {
//       resetAttendance[student.student_id] = {
//         present: false,
//         confidence: null,
//         manually_marked: false
//       };
//     });
//     setAttendance(resetAttendance);
//   };

//   const getAllImages = () => {
//     return [
//       ...capturedImages.map(img => img.file),
//       ...uploadedImages.map(img => img.file),
//       ...extractedFrames.map(frame => frame.file)
//     ];
//   };

//   const processImages = async () => {
//     const allImages = getAllImages();
    
//     if (allImages.length === 0) {
//       toast.error('Please capture/upload images or extract frames from video');
//       return;
//     }

//     if (students.length === 0) {
//       toast.error('No students found for selected class');
//       return;
//     }

//     setProcessing(true);

//     try {
//       const token = localStorage.getItem('token');
      
//       const imagePromises = allImages.map(file => {
//         return new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           reader.onerror = reject;
//           reader.readAsDataURL(file);
//         });
//       });

//       const base64Images = await Promise.all(imagePromises);

//       console.log('Sending recognition request for:', {
//         department: formData.department,
//         section: formData.section,
//         year: formData.year,
//         imagesCount: base64Images.length,
//         studentsCount: students.length
//       });
      
//       const response = await axios.post(
//         `${API_URL}/api/attendance/recognize-multiple`,
//         {
//           images: base64Images,
//           department: formData.department,
//           section: formData.section,
//           year: formData.year
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       console.log('Recognition response:', response.data);

//       const recognizedStudents = response.data.recognized_students || [];
      
//       const updatedAttendance = { ...attendance };
//       recognizedStudents.forEach(recognized => {
//         if (updatedAttendance[recognized.student_id]) {
//           updatedAttendance[recognized.student_id] = {
//             present: true,
//             confidence: recognized.confidence,
//             manually_marked: false
//           };
//         }
//       });
      
//       setAttendance(updatedAttendance);
//       setRecognitionDone(true);
//       setRecognitionResult(response.data);
      
//       if (response.data.annotated_images && response.data.annotated_images.length > 0) {
//         const firstImage = response.data.annotated_images[0];
//         setProcessedImageData({
//           imageData: firstImage.original_image,
//           recognitionData: {
//             faces_detected: firstImage.faces_detected,
//             recognized_students: firstImage.recognized_students,
//             unrecognized_faces: firstImage.unrecognized_faces
//           }
//         });
//       }
      
//       const presentCount = recognizedStudents.length;
//       toast.success(`Recognized ${presentCount} unique student(s) from ${allImages.length} image(s)`);
      
//       stopCamera();
//     } catch (error) {
//       console.error('Error processing images:', error);
//       console.error('Error response:', error.response?.data);
      
//       const errorMsg = error.response?.data?.error || error.message || 'Failed to process images';
//       toast.error(errorMsg);
      
//       if (error.response) {
//         console.error('Server error details:', {
//           status: error.response.status,
//           data: error.response.data
//         });
//       }
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const toggleAttendance = (studentId) => {
//     setAttendance(prev => ({
//       ...prev,
//       [studentId]: {
//         ...prev[studentId],
//         present: !prev[studentId].present,
//         manually_marked: true
//       }
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.subject_id) {
//       toast.error('Please select a subject');
//       return;
//     }

//     if (students.length === 0) {
//       toast.error('No students to mark attendance for');
//       return;
//     }

//     const attendanceData = students.map(student => ({
//       student_id: student.student_id,
//       status: attendance[student.student_id].present ? 'present' : 'absent',
//       confidence_score: attendance[student.student_id].confidence
//     }));

//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await axios.post(
//         `${API_URL}/api/attendance/mark`,
//         {
//           ...formData,
//           attendance_records: attendanceData
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       toast.success('Attendance marked successfully!');
      
//       setTimeout(() => {
//         navigate(`/attendance/sessions/${response.data.session_id}`);
//       }, 1500);
//     } catch (error) {
//       console.error('Error marking attendance:', error);
//       toast.error(error.response?.data?.error || 'Failed to mark attendance');
//     }
//   };

//   const presentCount = Object.values(attendance).filter(a => a.present).length;
//   const absentCount = students.length - presentCount;
//   const totalImages = capturedImages.length + uploadedImages.length + extractedFrames.length;

//   return (
//     <div className="mark-attendance">
//       <h2>Mark Attendance</h2>

//       <form onSubmit={handleSubmit}>
//         {/* Class Information */}
//         <div className="form-section">
//           <h3>Class Information</h3>
          
//           <div className="form-row">
//             <div className="form-group">
//               <label>Department *</label>
//               <select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Department --</option>
//                 {DEPARTMENTS.map((dept) => (
//                   <option key={dept} value={dept}>{dept}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Year *</label>
//               <select
//                 name="year"
//                 value={formData.year}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Year --</option>
//                 {YEARS.map(year => (
//                   <option key={year} value={year}>{year}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label>Section *</label>
//               <select
//                 name="section"
//                 value={formData.section}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Section --</option>
//                 {SECTIONS.map((section) => (
//                   <option key={section} value={section}>Section {section}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Subject *</label>
//               <select
//                 name="subject_id"
//                 value={formData.subject_id}
//                 onChange={handleChange}
//                 required
//                 disabled={!formData.department || !formData.section || !formData.year || loadingSubjects}
//               >
//                 <option value="">
//                   {loadingSubjects ? 'Loading subjects...' : '-- Select Subject --'}
//                 </option>
//                 {subjects.map((subject) => (
//                   <option key={subject.id} value={subject.id}>
//                     {subject.subject_code} - {subject.subject_name}
//                     {subject.subject_type === 'elective' ? ' (Elective)' : ''}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Period Number *</label>
//               <select
//                 name="period_number"
//                 value={formData.period_number}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">-- Select Period --</option>
//                 {PERIODS.map((period) => (
//                   <option key={period} value={period}>Period {period}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group">
//               <label>Date *</label>
//               <input
//                 type="date"
//                 name="session_date"
//                 value={formData.session_date}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         {/* Media Capture Section */}
//         {students.length > 0 && (
//           <div className="form-section">
//             <h3>Capture/Upload Media (Optional)</h3>
//             <p style={{ color: '#666', marginBottom: '15px' }}>
//               Capture images, record video, or upload media files for automatic attendance marking.
//             </p>
            
//             {/* Camera Section */}
//             <div className="camera-section">
//               <h4>📷 Camera</h4>
              
//               <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//                 <button
//                   type="button"
//                   className="btn-camera start"
//                   onClick={startCamera}
//                   disabled={cameraActive}
//                 >
//                   {cameraActive ? '✓ Camera Active' : 'Start Camera'}
//                 </button>

//                 {cameraActive && !isRecordingVideo && (
//                   <button
//                     type="button"
//                     className="btn-camera record"
//                     onClick={startVideoRecording}
//                   >
//                     🎥 Start Recording
//                   </button>
//                 )}

//                 {isRecordingVideo && (
//                   <button
//                     type="button"
//                     className="btn-camera stop-record"
//                     onClick={stopVideoRecording}
//                   >
//                     ⏹ Stop Recording
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Camera Modal Dialog */}
//             {cameraActive && (
//               <div className="camera-modal-overlay" onClick={(e) => {
//                 if (e.target.className === 'camera-modal-overlay') {
//                   stopCamera();
//                 }
//               }}>
//                 <div className="camera-modal-dialog">
//                   <div className="camera-modal-header">
//                     <h3>📷 Camera Preview {isRecordingVideo && <span style={{color: 'red'}}>● REC</span>}</h3>
//                     <button
//                       type="button"
//                       className="close-modal-btn"
//                       onClick={stopCamera}
//                       title="Close Camera"
//                     >
//                       ✕
//                     </button>
//                   </div>

//                   <div className="camera-modal-body">
//                     <div className="camera-preview-wrapper">
//                       <video
//                         ref={videoRef}
//                         autoPlay
//                         playsInline
//                         muted
//                         className="camera-video-preview"
//                       />
//                       <canvas ref={canvasRef} style={{ display: 'none' }} />
                      
//                       <div className="capture-counter">
//                         📸 Captured: {capturedImages.length}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="camera-modal-footer">
//                     <button
//                       type="button"
//                       className="btn-camera capture"
//                       onClick={captureImage}
//                       disabled={isRecordingVideo}
//                     >
//                       📸 Capture Image
//                     </button>

//                     <button
//                       type="button" 
//                       className="btn-camera switch"
//                       onClick={() => {
//                         setCameraFacingMode(prev =>
//                           prev === 'user' ? 'environment' : 'user'
//                         );
//                       }}
//                       disabled={isRecordingVideo}
//                     >
//                       🔄 Switch Camera
//                     </button>

//                     <button
//                       type="button"
//                       className="btn-camera stop"
//                       onClick={stopCamera}
//                     >
//                       ⏹ Close Camera
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* File Upload Section */}
//             <div className="upload-section">
//               <h4>📁 Upload Files</h4>
//               <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//                 <label className="file-upload-label">
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={handleFileUpload}
//                     className="file-input"
//                   />
//                   <span className="upload-btn">📷 Upload Images</span>
//                 </label>

//                 <label className="file-upload-label">
//                   <input
//                     ref={videoInputRef}
//                     type="file"
//                     accept="video/*"
//                     onChange={handleVideoUpload}
//                     className="file-input"
//                   />
//                   <span className="upload-btn">🎥 Upload Video</span>
//                 </label>
//               </div>
//               <p className="upload-hint">Upload images or video for processing</p>
//             </div>

//             {/* ✅ NEW: Video Preview & Frame Extraction */}
//             {(uploadedVideo || recordedVideoBlob) && (
//               <div className="video-preview-section">
//                 <h4>🎥 Video Preview</h4>
//                 <div className="video-preview-container">
//                   <video
//                     ref={videoPreviewRef}
//                     src={(uploadedVideo || recordedVideoBlob).preview}
//                     controls
//                     style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
//                   />
//                   <div className="video-controls">
//                     <p><strong>File:</strong> {(uploadedVideo || recordedVideoBlob).name}</p>
                    
//                     <div className="frame-extraction-settings">
//                       <label>
//                         Frame Interval (seconds):
//                         <input
//                           type="number"
//                           min="0.5"
//                           max="5"
//                           step="0.5"
//                           value={frameExtractionSettings.frameInterval}
//                           onChange={(e) => setFrameExtractionSettings(prev => ({
//                             ...prev,
//                             frameInterval: parseFloat(e.target.value)
//                           }))}
//                           style={{ marginLeft: '10px', padding: '5px', width: '80px' }}
//                         />
//                       </label>
                      
//                       <label style={{ marginLeft: '15px' }}>
//                         Max Frames:
//                         <input
//                           type="number"
//                           min="1"
//                           max="30"
//                           value={frameExtractionSettings.maxFrames}
//                           onChange={(e) => setFrameExtractionSettings(prev => ({
//                             ...prev,
//                             maxFrames: parseInt(e.target.value)
//                           }))}
//                           style={{ marginLeft: '10px', padding: '5px', width: '80px' }}
//                         />
//                       </label>
//                     </div>

//                     <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
//                       <button
//                         type="button"
//                         className="btn-primary"
//                         onClick={() => extractFramesFromVideo(uploadedVideo || recordedVideoBlob)}
//                         disabled={extractingFrames}
//                       >
//                         {extractingFrames ? 'Extracting...' : `🎞️ Extract Frames`}
//                       </button>
                      
//                       <button
//                         type="button"
//                         className="btn-secondary"
//                         onClick={() => removeVideo(uploadedVideo ? 'uploaded' : 'recorded')}
//                       >
//                         🗑️ Remove Video
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Images Summary */}
//             {totalImages > 0 && (
//               <div className="images-summary">
//                 <div className="summary-cards">
//                   <div className="summary-card">
//                     <span className="summary-icon">📷</span>
//                     <div>
//                       <strong>{capturedImages.length}</strong>
//                       <p>Captured</p>
//                     </div>
//                   </div>
//                   <div className="summary-card">
//                     <span className="summary-icon">📁</span>
//                     <div>
//                       <strong>{uploadedImages.length}</strong>
//                       <p>Uploaded</p>
//                     </div>
//                   </div>
//                   <div className="summary-card">
//                     <span className="summary-icon">🎞️</span>
//                     <div>
//                       <strong>{extractedFrames.length}</strong>
//                       <p>Video Frames</p>
//                     </div>
//                   </div>
//                   <div className="summary-card total">
//                     <span className="summary-icon">🖼️</span>
//                     <div>
//                       <strong>{totalImages}</strong>
//                       <p>Total Images</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Images Grid with Previews */}
//                 <div className="images-preview-grid">
//                   <h5>Selected Images ({totalImages})</h5>
//                   <div className="preview-grid">
//                     {/* Captured Images */}
//                     {capturedImages.map((image, index) => (
//                       <div key={`captured-${index}`} className="preview-item">
//                         <div className="preview-image-wrapper">
//                           <img 
//                             src={image.preview} 
//                             alt={`Captured ${index + 1}`}
//                             className="preview-thumbnail"
//                           />
//                           <button
//                             type="button"
//                             className="remove-preview-btn"
//                             onClick={() => removeImage(index, 'captured')}
//                             title="Remove image"
//                           >
//                             ✕
//                           </button>
//                           <div className="preview-badge captured">📷</div>
//                         </div>
//                         <p className="preview-name">{image.name}</p>
//                       </div>
//                     ))}
                    
//                     {/* Uploaded Images */}
//                     {uploadedImages.map((image, index) => (
//                       <div key={`uploaded-${index}`} className="preview-item">
//                         <div className="preview-image-wrapper">
//                           <img 
//                             src={image.preview} 
//                             alt={`Uploaded ${index + 1}`}
//                             className="preview-thumbnail"
//                           />
//                           <button
//                             type="button"
//                             className="remove-preview-btn"
//                             onClick={() => removeImage(index, 'uploaded')}
//                             title="Remove image"
//                           >
//                             ✕
//                           </button>
//                           <div className="preview-badge uploaded">📁</div>
//                         </div>
//                         <p className="preview-name">{image.name}</p>
//                       </div>
//                     ))}

//                     {/* ✅ NEW: Extracted Frames */}
//                     {extractedFrames.map((frame, index) => (
//                       <div key={`frame-${index}`} className="preview-item">
//                         <div className="preview-image-wrapper">
//                           <img 
//                             src={frame.preview} 
//                             alt={`Frame ${index + 1}`}
//                             className="preview-thumbnail"
//                           />
//                           <button
//                             type="button"
//                             className="remove-preview-btn"
//                             onClick={() => removeImage(index, 'frame')}
//                             title="Remove frame"
//                           >
//                             ✕
//                           </button>
//                           <div className="preview-badge frame">🎞️</div>
//                         </div>
//                         <p className="preview-name">{frame.name}</p>
//                         <p className="preview-timestamp">{frame.timestamp}s</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Process and Clear Buttons */}
//                 <div className="image-actions">
//                   <button
//                     type="button"
//                     className="btn-primary"
//                     onClick={processImages}
//                     disabled={processing || recognitionDone}
//                   >
//                     {processing ? 'Processing...' : recognitionDone ? 'Processed ✓' : `Process ${totalImages} Image(s)`}
//                   </button>
//                   <button
//                     type="button"
//                     className="btn-secondary"
//                     onClick={clearAllImages}
//                   >
//                     Clear All Media
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Recognition Results */}
//             {recognitionResult && (
//               <div className="recognition-summary">
//                 <h4>✓ Recognition Results:</h4>
//                 <div className="result-stats">
//                   <div className="result-stat">
//                     <strong>{recognitionResult.images_processed}</strong>
//                     <span>Images Processed</span>
//                   </div>
//                   <div className="result-stat">
//                     <strong>{recognitionResult.recognized_count}</strong>
//                     <span>Unique Students</span>
//                   </div>
//                 </div>
//                 {recognitionResult.unrecognized_faces > 0 && (
//                   <p style={{ color: '#ff9800', marginTop: '10px' }}>
//                     ⚠️ {recognitionResult.unrecognized_faces} face(s) could not be matched to any student
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Students List */}
//         {students.length > 0 && (
//           <div className="form-section">
//             <div className="students-header">
//               <h3>Students ({students.length})</h3>
//               <div className="attendance-summary">
//                 <span className="present-badge">Present: {presentCount}</span>
//                 <span className="absent-badge">Absent: {absentCount}</span>
//               </div>
//             </div>

//             <div className="students-grid">
//               {Array.from({ length: Math.ceil(students.length / 5) }, (_, rowIndex) => {
//                 const row = students.slice(rowIndex * 5, rowIndex * 5 + 5);
//                 return (
//                   <div key={rowIndex} className="student-row">
//                     {row.map(student => (
//                       <div
//                         key={student.student_id}
//                         className={`student-cell ${attendance[student.student_id]?.present ? 'present' : 'absent'}`}
//                         onClick={() => toggleAttendance(student.student_id)}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={attendance[student.student_id]?.present || false}
//                           onChange={() => {}}
//                         />
//                         <span className="student-id">
//                           {student.student_id}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {loadingStudents && (
//           <div className="loading-message">Loading students...</div>
//         )}

//         {!loadingStudents && students.length === 0 && formData.department && formData.section && formData.year && (
//           <div className="no-students-message">
//             No students found for {formData.department} - Section {formData.section} - {formData.year}
//           </div>
//         )}

//         {students.length > 0 && (
//           <button
//             type="submit"
//             className="btn-primary btn-submit"
//           >
//             Submit Attendance
//           </button>
//         )}
//       </form>

//       {/* Processing Overlay */}
//       {processing && (
//         <div className="processing-overlay">
//           <div className="processing-spinner"></div>
//           <p>Processing {totalImages} image(s) and detecting faces...</p>
//           <p className="processing-note">Filtering duplicate students automatically...</p>
//         </div>
//       )}

//       {/* Extracting Frames Overlay */}
//       {extractingFrames && (
//         <div className="processing-overlay">
//           <div className="processing-spinner"></div>
//           <p>Extracting frames from video...</p>
//           <p className="processing-note">Please wait...</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MarkAttendance;

// ---------------------------------------------------------


import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './MarkAttendance.css';
import InlineAnnotatedImage from './InlineAnnotatedImage';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const DEPARTMENTS = ['AIML', 'DS', 'IT', 'CSE'];
const SECTIONS = ['A', 'B', 'C'];
const PERIODS = [1, 2, 3, 4, 5, 6, 7];
const YEARS = ['YEAR-1', 'YEAR-2', 'YEAR-3', 'YEAR-4'];

function MarkAttendance() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const videoPreviewRef = useRef(null);

  const [formData, setFormData] = useState({
    subject_id: '',
    department: '',
    section: '',
    year: '',
    session_date: new Date().toISOString().split('T')[0],
    session_time: new Date().toTimeString().slice(0, 5),
    period_number: ''
  });

  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Image support
  const [capturedImages, setCapturedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Video support
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [recordedVideoBlob, setRecordedVideoBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [extractedFrames, setExtractedFrames] = useState([]);
  const [extractingFrames, setExtractingFrames] = useState(false);

  // ✅ NEW: Flag to auto-start recording once camera is ready
  const [pendingRecording, setPendingRecording] = useState(false);

  const [cameraActive, setCameraActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [recognitionDone, setRecognitionDone] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [cameraFacingMode, setCameraFacingMode] = useState('user');
  const [processedImageData, setProcessedImageData] = useState(null);

  const [frameExtractionSettings, setFrameExtractionSettings] = useState({
    frameInterval: 1,
    maxFrames: 10
  });

  const fetchSubjects = useCallback(async () => {
    setLoadingSubjects(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/subjects`, {
        params: {
          department: formData.department,
          section: formData.section,
          year: formData.year
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubjects(response.data.subjects || []);
    } catch (error) {
      toast.error('Failed to fetch subjects');
    } finally {
      setLoadingSubjects(false);
    }
  }, [formData.department, formData.section, formData.year]);

  const fetchStudents = useCallback(async () => {
    setLoadingStudents(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/students`, {
        params: {
          department: formData.department,
          section: formData.section,
          year: formData.year
        },
        headers: { Authorization: `Bearer ${token}` }
      });

      const studentsList = response.data.students || [];
      setStudents(studentsList);

      const initialAttendance = {};
      studentsList.forEach(student => {
        initialAttendance[student.student_id] = {
          present: false,
          confidence: null,
          manually_marked: false
        };
      });
      setAttendance(initialAttendance);
      setRecognitionDone(false);
      setRecognitionResult(null);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students');
    } finally {
      setLoadingStudents(false);
    }
  }, [formData.department, formData.section, formData.year]);

  useEffect(() => {
    if (formData.department && formData.section && formData.year) {
      fetchSubjects();
      fetchStudents();
    } else {
      setStudents([]);
      setAttendance({});
    }
  }, [formData.department, formData.section, formData.year, fetchSubjects, fetchStudents]);

  useEffect(() => {
    if (cameraActive) {
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraFacingMode]);

  // ✅ NEW: Watch for camera becoming active + pendingRecording flag
  useEffect(() => {
    if (cameraActive && pendingRecording) {
      setPendingRecording(false);
      // Small delay to ensure stream is fully attached to video element
      setTimeout(() => {
        startVideoRecording();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraActive, pendingRecording]);

  useEffect(() => {
    return () => {
      stopCamera();
      capturedImages.forEach(img => URL.revokeObjectURL(img.preview));
      uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
      extractedFrames.forEach(frame => URL.revokeObjectURL(frame.preview));
      if (uploadedVideo) URL.revokeObjectURL(uploadedVideo.preview);
      if (recordedVideoBlob) URL.revokeObjectURL(recordedVideoBlob.preview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Camera functions
  const startCamera = async () => {
    try {
      setCameraActive(true);

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      const video = videoRef.current;
      if (!video) return;

      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();

        if (cameraFacingMode === 'user') {
          video.style.transform = 'scaleX(-1)';
        } else {
          video.style.transform = 'scaleX(1)';
        }
      };

    } catch (err) {
      console.error('Camera error:', err);
      toast.error('Failed to access camera');
      setCameraActive(false);
      setPendingRecording(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  // Start video recording
  const startVideoRecording = async () => {
    try {
      if (!videoRef.current || !videoRef.current.srcObject) {
        toast.error('Camera not active');
        return;
      }

      const stream = videoRef.current.srcObject;
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8,opus'
      });

      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoFile = new File([blob], `recording_${Date.now()}.webm`, {
          type: 'video/webm'
        });

        setRecordedVideoBlob({
          file: videoFile,
          preview: URL.createObjectURL(blob),
          name: videoFile.name,
          duration: 0
        });

        toast.success('Video recorded successfully!');
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecordingVideo(true);
      toast.info('Recording started...');
    } catch (error) {
      console.error('Recording error:', error);
      toast.error('Failed to start recording');
    }
  };

  // Stop video recording
  const stopVideoRecording = () => {
    if (mediaRecorder && isRecordingVideo) {
      mediaRecorder.stop();
      setIsRecordingVideo(false);
      setMediaRecorder(null);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], `capture_${Date.now()}.jpg`, {
        type: 'image/jpeg'
      });

      const imageWithPreview = {
        file: file,
        preview: URL.createObjectURL(blob),
        name: file.name
      };

      setCapturedImages(prev => [...prev, imageWithPreview]);
      toast.success(`Image captured! Total: ${capturedImages.length + 1}`);
    }, 'image/jpeg', 0.9);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length !== files.length) {
      toast.error('Only image files are allowed');
    }

    if (imageFiles.length > 0) {
      const imagesWithPreviews = imageFiles.map(file => ({
        file: file,
        preview: URL.createObjectURL(file),
        name: file.name
      }));

      setUploadedImages(prev => [...prev, ...imagesWithPreviews]);
      toast.success(`${imageFiles.length} image(s) uploaded`);
    }

    e.target.value = '';
  };

  // Handle video file upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }

    const videoWithPreview = {
      file: file,
      preview: URL.createObjectURL(file),
      name: file.name,
      duration: 0
    };

    setUploadedVideo(videoWithPreview);
    toast.success('Video uploaded successfully!');

    e.target.value = '';
  };

  // Extract frames from video
  const extractFramesFromVideo = async (videoSource) => {
    setExtractingFrames(true);

    try {
      const video = document.createElement('video');
      video.src = videoSource.preview;
      video.muted = true;

      await new Promise((resolve, reject) => {
        video.onloadedmetadata = resolve;
        video.onerror = reject;
      });

      const duration = video.duration;
      const { frameInterval, maxFrames } = frameExtractionSettings;

      const frames = [];
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const frameCount = Math.min(
        Math.floor(duration / frameInterval),
        maxFrames
      );

      toast.info(`Extracting ${frameCount} frames from video...`);

      for (let i = 0; i < frameCount; i++) {
        const time = i * frameInterval;

        await new Promise((resolve) => {
          video.currentTime = time;
          video.onseeked = resolve;
        });

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const blob = await new Promise(resolve => {
          canvas.toBlob(resolve, 'image/jpeg', 0.9);
        });

        const file = new File([blob], `frame_${i + 1}_${Date.now()}.jpg`, {
          type: 'image/jpeg'
        });

        frames.push({
          file: file,
          preview: URL.createObjectURL(blob),
          name: file.name,
          timestamp: time.toFixed(2)
        });
      }

      setExtractedFrames(frames);
      toast.success(`Extracted ${frames.length} frames successfully!`);
    } catch (error) {
      console.error('Frame extraction error:', error);
      toast.error('Failed to extract frames from video');
    } finally {
      setExtractingFrames(false);
    }
  };

  const removeImage = (index, type) => {
    if (type === 'captured') {
      URL.revokeObjectURL(capturedImages[index].preview);
      setCapturedImages(prev => prev.filter((_, i) => i !== index));
    } else if (type === 'uploaded') {
      URL.revokeObjectURL(uploadedImages[index].preview);
      setUploadedImages(prev => prev.filter((_, i) => i !== index));
    } else if (type === 'frame') {
      URL.revokeObjectURL(extractedFrames[index].preview);
      setExtractedFrames(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Remove video
  const removeVideo = (type) => {
    if (type === 'uploaded' && uploadedVideo) {
      URL.revokeObjectURL(uploadedVideo.preview);
      setUploadedVideo(null);
      setExtractedFrames([]);
    } else if (type === 'recorded' && recordedVideoBlob) {
      URL.revokeObjectURL(recordedVideoBlob.preview);
      setRecordedVideoBlob(null);
      setExtractedFrames([]);
    }
  };

  const clearAllImages = () => {
    capturedImages.forEach(img => URL.revokeObjectURL(img.preview));
    uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
    extractedFrames.forEach(frame => URL.revokeObjectURL(frame.preview));

    if (uploadedVideo) URL.revokeObjectURL(uploadedVideo.preview);
    if (recordedVideoBlob) URL.revokeObjectURL(recordedVideoBlob.preview);

    setCapturedImages([]);
    setUploadedImages([]);
    setExtractedFrames([]);
    setUploadedVideo(null);
    setRecordedVideoBlob(null);
    stopCamera();
    setRecognitionDone(false);
    setRecognitionResult(null);
    setProcessedImageData(null);

    const resetAttendance = {};
    students.forEach(student => {
      resetAttendance[student.student_id] = {
        present: false,
        confidence: null,
        manually_marked: false
      };
    });
    setAttendance(resetAttendance);
  };

  const getAllImages = () => {
    return [
      ...capturedImages.map(img => img.file),
      ...uploadedImages.map(img => img.file),
      ...extractedFrames.map(frame => frame.file)
    ];
  };

  const processImages = async () => {
    const allImages = getAllImages();

    if (allImages.length === 0) {
      toast.error('Please capture/upload images or extract frames from video');
      return;
    }

    if (students.length === 0) {
      toast.error('No students found for selected class');
      return;
    }

    setProcessing(true);

    try {
      const token = localStorage.getItem('token');

      const imagePromises = allImages.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const base64Images = await Promise.all(imagePromises);

      console.log('Sending recognition request for:', {
        department: formData.department,
        section: formData.section,
        year: formData.year,
        imagesCount: base64Images.length,
        studentsCount: students.length
      });

      const response = await axios.post(
        `${API_URL}/api/attendance/recognize-multiple`,
        {
          images: base64Images,
          department: formData.department,
          section: formData.section,
          year: formData.year
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log('Recognition response:', response.data);

      const recognizedStudents = response.data.recognized_students || [];

      const updatedAttendance = { ...attendance };
      recognizedStudents.forEach(recognized => {
        if (updatedAttendance[recognized.student_id]) {
          updatedAttendance[recognized.student_id] = {
            present: true,
            confidence: recognized.confidence,
            manually_marked: false
          };
        }
      });

      setAttendance(updatedAttendance);
      setRecognitionDone(true);
      setRecognitionResult(response.data);

      if (response.data.annotated_images && response.data.annotated_images.length > 0) {
        const firstImage = response.data.annotated_images[0];
        setProcessedImageData({
          imageData: firstImage.original_image,
          recognitionData: {
            faces_detected: firstImage.faces_detected,
            recognized_students: firstImage.recognized_students,
            unrecognized_faces: firstImage.unrecognized_faces
          }
        });
      }

      const presentCount = recognizedStudents.length;
      toast.success(`Recognized ${presentCount} unique student(s) from ${allImages.length} image(s)`);

      stopCamera();
    } catch (error) {
      console.error('Error processing images:', error);
      console.error('Error response:', error.response?.data);

      const errorMsg = error.response?.data?.error || error.message || 'Failed to process images';
      toast.error(errorMsg);

      if (error.response) {
        console.error('Server error details:', {
          status: error.response.status,
          data: error.response.data
        });
      }
    } finally {
      setProcessing(false);
    }
  };

  const toggleAttendance = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        present: !prev[studentId].present,
        manually_marked: true
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject_id) {
      toast.error('Please select a subject');
      return;
    }

    if (students.length === 0) {
      toast.error('No students to mark attendance for');
      return;
    }

    const attendanceData = students.map(student => ({
      student_id: student.student_id,
      status: attendance[student.student_id].present ? 'present' : 'absent',
      confidence_score: attendance[student.student_id].confidence
    }));

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${API_URL}/api/attendance/mark`,
        {
          ...formData,
          attendance_records: attendanceData
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success('Attendance marked successfully!');

      setTimeout(() => {
        navigate(`/attendance/sessions/${response.data.session_id}`);
      }, 1500);
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error(error.response?.data?.error || 'Failed to mark attendance');
    }
  };

  const presentCount = Object.values(attendance).filter(a => a.present).length;
  const absentCount = students.length - presentCount;
  const totalImages = capturedImages.length + uploadedImages.length + extractedFrames.length;

  return (
    <div className="mark-attendance">
      <h2>Mark Attendance</h2>

      <form onSubmit={handleSubmit}>
        {/* Class Information */}
        <div className="form-section">
          <h3>Class Information</h3>

          <div className="form-row">
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
                  <option key={dept} value={dept}>{dept}</option>
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
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Subject *</label>
              <select
                name="subject_id"
                value={formData.subject_id}
                onChange={handleChange}
                required
                disabled={!formData.department || !formData.section || !formData.year || loadingSubjects}
              >
                <option value="">
                  {loadingSubjects ? 'Loading subjects...' : '-- Select Subject --'}
                </option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subject_code} - {subject.subject_name}
                    {subject.subject_type === 'elective' ? ' (Elective)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Period Number *</label>
              <select
                name="period_number"
                value={formData.period_number}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Period --</option>
                {PERIODS.map((period) => (
                  <option key={period} value={period}>Period {period}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="session_date"
                value={formData.session_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Media Capture Section */}
        {students.length > 0 && (
          <div className="form-section">
            <h3>Capture/Upload Media (Optional)</h3>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              Capture images, record video, or upload media files for automatic attendance marking.
            </p>

            {/* ✅ Camera Section — both buttons always visible side by side */}
            <div className="camera-section">
              <h4>📷 Camera</h4>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>

                {/* Start Camera button */}
                <button
                  type="button"
                  className="btn-camera start"
                  onClick={startCamera}
                  disabled={cameraActive}
                >
                  {cameraActive ? '✓ Camera Active' : 'Start Camera'}
                </button>

                {/* Start/Stop Video Recording button — always visible next to Start Camera */}
                {!isRecordingVideo ? (
                  <button
                    type="button"
                    className="btn-camera record"
                    onClick={() => {
                      if (!cameraActive) {
                        // Camera not on yet — flag to start recording once camera is ready
                        setPendingRecording(true);
                        startCamera();
                      } else {
                        // Camera already active — start recording immediately
                        startVideoRecording();
                      }
                    }}
                  >
                    🎥 Start Video Recording
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-camera stop-record recording-active"
                    onClick={stopVideoRecording}
                  >
                    ⏹ Stop Recording
                  </button>
                )}

              </div>
            </div>

            {/* Camera Modal Dialog */}
            {cameraActive && (
              <div className="camera-modal-overlay" onClick={(e) => {
                if (e.target.className === 'camera-modal-overlay') {
                  stopCamera();
                }
              }}>
                <div className="camera-modal-dialog">
                  <div className="camera-modal-header">
                    <h3>
                      📷 Camera Preview{' '}
                      {isRecordingVideo && (
                        <span style={{ color: 'red' }}>● REC</span>
                      )}
                    </h3>
                    <button
                      type="button"
                      className="close-modal-btn"
                      onClick={stopCamera}
                      title="Close Camera"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="camera-modal-body">
                    <div className="camera-preview-wrapper">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="camera-video-preview"
                      />
                      <canvas ref={canvasRef} style={{ display: 'none' }} />

                      <div className="capture-counter">
                        📸 Captured: {capturedImages.length}
                      </div>
                    </div>
                  </div>

                  <div className="camera-modal-footer">
                    <button
                      type="button"
                      className="btn-camera capture"
                      onClick={captureImage}
                      disabled={isRecordingVideo}
                    >
                      📸 Capture Image
                    </button>

                    <button
                      type="button"
                      className="btn-camera switch"
                      onClick={() => {
                        setCameraFacingMode(prev =>
                          prev === 'user' ? 'environment' : 'user'
                        );
                      }}
                      disabled={isRecordingVideo}
                    >
                      🔄 Switch Camera
                    </button>

                    {/* Recording controls inside modal too */}
                    {!isRecordingVideo ? (
                      <button
                        type="button"
                        className="btn-camera record"
                        onClick={startVideoRecording}
                      >
                        🎥 Start Recording
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-camera stop-record recording-active"
                        onClick={stopVideoRecording}
                      >
                        ⏹ Stop Recording
                      </button>
                    )}

                    <button
                      type="button"
                      className="btn-camera stop"
                      onClick={stopCamera}
                    >
                      ⏹ Close Camera
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* File Upload Section */}
            <div className="upload-section">
              <h4>📁 Upload Files</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <label className="file-upload-label">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="file-input"
                  />
                  <span className="upload-btn">📷 Upload Images</span>
                </label>

                <label className="file-upload-label">
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="file-input"
                  />
                  <span className="upload-btn">🎥 Upload Video</span>
                </label>
              </div>
              <p className="upload-hint">Upload images or video for processing</p>
            </div>

            {/* Video Preview & Frame Extraction */}
            {(uploadedVideo || recordedVideoBlob) && (
              <div className="video-preview-section">
                <h4>🎥 Video Preview</h4>
                <div className="video-preview-container">
                  <video
                    ref={videoPreviewRef}
                    src={(uploadedVideo || recordedVideoBlob).preview}
                    controls
                    style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
                  />
                  <div className="video-controls">
                    <p><strong>File:</strong> {(uploadedVideo || recordedVideoBlob).name}</p>

                    <div className="frame-extraction-settings">
                      <label>
                        Frame Interval (seconds):
                        <input
                          type="number"
                          min="0.5"
                          max="5"
                          step="0.5"
                          value={frameExtractionSettings.frameInterval}
                          onChange={(e) => setFrameExtractionSettings(prev => ({
                            ...prev,
                            frameInterval: parseFloat(e.target.value)
                          }))}
                          style={{ marginLeft: '10px', padding: '5px', width: '80px' }}
                        />
                      </label>

                      <label style={{ marginLeft: '15px' }}>
                        Max Frames:
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={frameExtractionSettings.maxFrames}
                          onChange={(e) => setFrameExtractionSettings(prev => ({
                            ...prev,
                            maxFrames: parseInt(e.target.value)
                          }))}
                          style={{ marginLeft: '10px', padding: '5px', width: '80px' }}
                        />
                      </label>
                    </div>

                    <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => extractFramesFromVideo(uploadedVideo || recordedVideoBlob)}
                        disabled={extractingFrames}
                      >
                        {extractingFrames ? 'Extracting...' : `🎞️ Extract Frames`}
                      </button>

                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => removeVideo(uploadedVideo ? 'uploaded' : 'recorded')}
                      >
                        🗑️ Remove Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Images Summary */}
            {totalImages > 0 && (
              <div className="images-summary">
                <div className="summary-cards">
                  <div className="summary-card">
                    <span className="summary-icon">📷</span>
                    <div>
                      <strong>{capturedImages.length}</strong>
                      <p>Captured</p>
                    </div>
                  </div>
                  <div className="summary-card">
                    <span className="summary-icon">📁</span>
                    <div>
                      <strong>{uploadedImages.length}</strong>
                      <p>Uploaded</p>
                    </div>
                  </div>
                  <div className="summary-card">
                    <span className="summary-icon">🎞️</span>
                    <div>
                      <strong>{extractedFrames.length}</strong>
                      <p>Video Frames</p>
                    </div>
                  </div>
                  <div className="summary-card total">
                    <span className="summary-icon">🖼️</span>
                    <div>
                      <strong>{totalImages}</strong>
                      <p>Total Images</p>
                    </div>
                  </div>
                </div>

                {/* Images Grid with Previews */}
                <div className="images-preview-grid">
                  <h5>Selected Images ({totalImages})</h5>
                  <div className="preview-grid">
                    {/* Captured Images */}
                    {capturedImages.map((image, index) => (
                      <div key={`captured-${index}`} className="preview-item">
                        <div className="preview-image-wrapper">
                          <img
                            src={image.preview}
                            alt={`Captured ${index + 1}`}
                            className="preview-thumbnail"
                          />
                          <button
                            type="button"
                            className="remove-preview-btn"
                            onClick={() => removeImage(index, 'captured')}
                            title="Remove image"
                          >
                            ✕
                          </button>
                          <div className="preview-badge captured">📷</div>
                        </div>
                        <p className="preview-name">{image.name}</p>
                      </div>
                    ))}

                    {/* Uploaded Images */}
                    {uploadedImages.map((image, index) => (
                      <div key={`uploaded-${index}`} className="preview-item">
                        <div className="preview-image-wrapper">
                          <img
                            src={image.preview}
                            alt={`Uploaded ${index + 1}`}
                            className="preview-thumbnail"
                          />
                          <button
                            type="button"
                            className="remove-preview-btn"
                            onClick={() => removeImage(index, 'uploaded')}
                            title="Remove image"
                          >
                            ✕
                          </button>
                          <div className="preview-badge uploaded">📁</div>
                        </div>
                        <p className="preview-name">{image.name}</p>
                      </div>
                    ))}

                    {/* Extracted Frames */}
                    {extractedFrames.map((frame, index) => (
                      <div key={`frame-${index}`} className="preview-item">
                        <div className="preview-image-wrapper">
                          <img
                            src={frame.preview}
                            alt={`Frame ${index + 1}`}
                            className="preview-thumbnail"
                          />
                          <button
                            type="button"
                            className="remove-preview-btn"
                            onClick={() => removeImage(index, 'frame')}
                            title="Remove frame"
                          >
                            ✕
                          </button>
                          <div className="preview-badge frame">🎞️</div>
                        </div>
                        <p className="preview-name">{frame.name}</p>
                        <p className="preview-timestamp">{frame.timestamp}s</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process and Clear Buttons */}
                <div className="image-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={processImages}
                    disabled={processing || recognitionDone}
                  >
                    {processing ? 'Processing...' : recognitionDone ? 'Processed ✓' : `Process ${totalImages} Image(s)`}
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={clearAllImages}
                  >
                    Clear All Media
                  </button>
                </div>
              </div>
            )}

            {/* Recognition Results */}
            {recognitionResult && (
              <div className="recognition-summary">
                <h4>✓ Recognition Results:</h4>
                <div className="result-stats">
                  <div className="result-stat">
                    <strong>{recognitionResult.images_processed}</strong>
                    <span>Images Processed</span>
                  </div>
                  <div className="result-stat">
                    <strong>{recognitionResult.recognized_count}</strong>
                    <span>Unique Students</span>
                  </div>
                </div>
                {recognitionResult.unrecognized_faces > 0 && (
                  <p style={{ color: '#ff9800', marginTop: '10px' }}>
                    ⚠️ {recognitionResult.unrecognized_faces} face(s) could not be matched to any student
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Students List */}
        {students.length > 0 && (
          <div className="form-section">
            <div className="students-header">
              <h3>Students ({students.length})</h3>
              <div className="attendance-summary">
                <span className="present-badge">Present: {presentCount}</span>
                <span className="absent-badge">Absent: {absentCount}</span>
              </div>
            </div>

            <div className="students-grid">
              {Array.from({ length: Math.ceil(students.length / 5) }, (_, rowIndex) => {
                const row = students.slice(rowIndex * 5, rowIndex * 5 + 5);
                return (
                  <div key={rowIndex} className="student-row">
                    {row.map(student => (
                      <div
                        key={student.student_id}
                        className={`student-cell ${attendance[student.student_id]?.present ? 'present' : 'absent'}`}
                        onClick={() => toggleAttendance(student.student_id)}
                      >
                        <input
                          type="checkbox"
                          checked={attendance[student.student_id]?.present || false}
                          onChange={() => {}}
                        />
                        <span className="student-id">
                          {student.student_id}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {loadingStudents && (
          <div className="loading-message">Loading students...</div>
        )}

        {!loadingStudents && students.length === 0 && formData.department && formData.section && formData.year && (
          <div className="no-students-message">
            No students found for {formData.department} - Section {formData.section} - {formData.year}
          </div>
        )}

        {students.length > 0 && (
          <button
            type="submit"
            className="btn-primary btn-submit"
          >
            Submit Attendance
          </button>
        )}
      </form>

      {/* Processing Overlay */}
      {processing && (
        <div className="processing-overlay">
          <div className="processing-spinner"></div>
          <p>Processing {totalImages} image(s) and detecting faces...</p>
          <p className="processing-note">Filtering duplicate students automatically...</p>
        </div>
      )}

      {/* Extracting Frames Overlay */}
      {extractingFrames && (
        <div className="processing-overlay">
          <div className="processing-spinner"></div>
          <p>Extracting frames from video...</p>
          <p className="processing-note">Please wait...</p>
        </div>
      )}
    </div>
  );
}

export default MarkAttendance;