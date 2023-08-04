import axios from "axios"
const API = axios.create({baseURL:'https://schoolportalbackend.onrender.com',headers:{authorization:`Bearer ${localStorage.getItem('token')}`}})
const API1 = axios.create({headers:{authorization:`Bearer ${localStorage.getItem('token')}`}})

/* Generals */
export const getCurrentUser = (userData) => API.get(`/${userData.type}s/${userData.id}`)
export const requestStudents = () => API.get('/students/')
export const requestTeachers = () => API.get('/teachers');
export const requestAdmins = () => API.get('/admins');
export const requestClassStudents = (classID) => API.get(`/students/class/${classID}`)
export const requestTeacher = (teacherID) => API.get(`/teachers/${teacherID}`)
export const requestContact = (contactData) => API.post('/sendmail',contactData)
export const AddStudent = (authData) => API.post('/students/signup',authData)
export const AddTeacher = (authData) => API.post('/teachers/signup',authData)

/* Settings */
export const changeUserID = (type,userData) => API.patch(`/${type}s/changeuserid`,userData)
export const changePassword = (type,userData) => API.patch(`/${type}s/changepassword`,userData)

/* Bonafides */
export const requestBonafide = (requestData) => API.post('/bonafides',requestData)
export const StudentBonafide = (studentID) => API.get(`/bonafides/students/${studentID}`)
export const getAllBonafide = () =>API.get('/bonafides/');
export const postBonafideFile = (bonafideID,formData) => API.patch(`/bonafides/${bonafideID}`,formData)
export const viewBonafide = (request) => API1.get(request) 
export const rejectBonafide = (bonafideID,functionData) => API.patch(`/bonafides/${bonafideID}`,functionData) 
export const deleteBonafide = (bonafideID) => API.delete(`/bonafides/${bonafideID}`)

/* Classes */
export const createClass = (classData) => API.post('/classes/',classData)
export const updateSection = (id,studentData) => API.patch(`/students/${id}`,studentData)
export const getAllClass = () => API.get('/classes');
export const getClass = (userData) => API.get(`/classes/${userData.type}s/${userData.id}`)
export const getStandardClass = (standard) => API.get(`/classes/standard/${standard}`)

/* TimeTables */
export const postTimeTable = (classData) => API.post('/timetables/',classData)
export const getTimeTables = () =>API.get('/timetables/');
export const getTimeTable = (standard) => API.get(`/timetables/standard/${standard}`);

/* Assessments */
export const postAssessment = (functionData) => API.post('/assessments',functionData)
export const getAssessments = (userData) => API.get(`/assessments/${userData.type}s/${userData.id}`)
export const getAssessment = (functionID) => API.get(`/assessments/${functionID}`);
export const deleteAssessment = (functionID) => API.delete(`/assessments/${functionID}`)

/* Ansswers */
export const getAnswers = (userData) => API.get(`/answers/${userData.type}s/${userData.id}`)
export const postAnswers = (formData) => API.post('/answers',formData);
export const deleteAnswers = (answerID) => API.delete(`/answers/${answerID}`)

/* Class Messages */
export const getClassMessage = (userData) => API.get(`/classmessages/${userData.type}s/${userData.id}`)
export const postClassMessage = (message) => API.post('/classmessages',message);
export const deleteClassMessage = (messageID) => API.delete(`/classmessages/${messageID}`);

/* Exams */
export const createExam = (examData) => API.post('/exams/',examData)
export const getExam = (examData) => API.get(`/exams/standard/${examData.standard}`);
export const getStudentExam = (userData) => API.get(`/exams/${userData.type}s/${userData.id}`)

/* Marks */
export const getMarks = (userData) => API.get(`/marks/teachers/${userData.id}`);
export const getMarksForStudent = (userData) => API.get(`marks/students/${userData.id}`);
export const postMarks = (updateData) => API.patch(`marks/649244661c9f98c6b70d0334`,updateData);

/* Student Attendance */
export const getStudentAttendances = (userData) => API.get(`/studentattendances/standard/${userData.standard}/section/${userData.section}/date/${userData.date}`);
export const getStudentAttendance = (userData) => 
    userData.type==="student" ? API.get(`/studentattendances/${userData.type}s/${userData.id}`) :
    userData.type==="teacher" ? API.get(`/teacherattendances/${userData.type}s/${userData.id}`) : 
    API.get(`/adminattendances/${userData.type}s/${userData.id}`)
export const postStudentAttendance = (functionData) => API.post('/studentattendances/postmany',functionData);
export const deleteStudentAttendance = (functionID) => API.delete(`/studentattendances/${functionID}`);


/* Leaves */
export const getLeave = (userData) => API.get(`/leaves/${userData.type}s/${userData.id}`);
export const getAllLeave = () => API.get('/leaves');
export const postLeave = (leaveData) => API.post('/leaves',leaveData);
export const deleteLeave = (leaveData) => API.delete(`/leaves`,leaveData);
export const updateStatusLeave = (leaveData) => API.patch(`/leaves`,leaveData);
