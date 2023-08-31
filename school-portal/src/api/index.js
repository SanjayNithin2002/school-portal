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
export const updateClassDetails = (classData) => API.patch('/classes/patchmany',classData);

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
export const postClassMessage1 = (message) => API.post('/personalmessages',message);
export const deleteClassMessage = (messageID) => API.delete(`/classmessages/${messageID}`);

/* Exams */
export const createExam = (examData) => API.post('/exams/',examData)
export const getExam = (examData) => API.get(`/exams/standard/${examData.standard}`);
export const getStudentExam = (userData) => API.get(`/exams/${userData.type}s/${userData.id}`)

/* Marks */
export const getMarks = (userData) => API.get(`/marks/teachers/${userData.id}`);
export const getMarksCSV = (userData) => API.get(`/students/marks/generatecsv/5/A`);
export const getMarksByID = (userData) => API.get(`marks/assessments/64923d976255f24e230a6c65`);
export const getMarksForStudent = (userData) => API.get(`/marks/students/${userData.id}`);
export const postMarks = (updateData) => API.post(`/marks/`,updateData);
export const delMarks = (updateData) => API.delete(`/marks/64d139c5b613daf5ecc7ec53`);
export const postMany = (updateData) => API.post(`/marks/postmany`,updateData);

/* Student Attendance */
export const getStudentAttendances = (userData) => API.get(`/studentattendances/standard/${userData.standard}/section/${userData.section}/date/${userData.date}`);
export const getTeacherAttendances = (userData) => API.get(`/teacherattendances`);
export const getAdminAttendances = (userData) => API.get(`/adminattendances`);
export const getAttendance = (userData) => 
    userData.type==="student" ? API.get(`/studentattendances/${userData.type}s/${userData.id}`) :
    userData.type==="teacher" ? API.get(`/teacherattendances/${userData.type}s/${userData.id}`) : 
    API.get(`/adminattendances/${userData.type}s/${userData.id}`)
export const postStudentAttendance = (functionData) => API.post('/studentattendances/postmany',functionData);
export const updateStudentAttendance = (functionData) => API.patch('/studentattendances/patchmany',functionData);
export const deleteStudentAttendance = (functionID) => API.delete(`/studentattendances/${functionID}`);
export const postTeacherAttendance = (functionData) => API.post('/teacherattendances/postmany',functionData);
export const updateTeacherAttendance = (functionData) => API.patch('/teacherattendances/patchmany',functionData);
export const deleteTeacherAttendance = (functionID) => API.delete(`/teacherattendances/${functionID}`);
export const postAdminAttendance = (functionData) => API.post('/adminattendances/postmany',functionData);
export const updateAdminAttendance = (functionData) => API.patch('/adminattendances/patchmany',functionData);
export const deleteAdminAttendance = (functionID) => API.delete(`/adminattendances/${functionID}`);


/* Leaves */
export const getLeave = (userData) => API.get(`/leaves/${userData.type}s/${userData.id}`);
export const getAllLeave = () => API.get('/leaves');
export const postLeave = (leaveData) => API.post('/leaves',leaveData);
export const deleteLeave = (leaveData) => API.delete(`/leaves`,leaveData);
export const updateStatusLeave = (leaveData) => API.patch(`/leaves`,leaveData);

/* Bus Details */
export const getBusDetail = (busID) => API.get(`/buses/${busID}`);
export const getBusDetails = () => API.get('/buses');
export const postBusDetails = (busData) => API.post('/buses',busData);
export const updateBusDetails = (busID,busData) => API.patch(`/buses/${busID}`,busData);
export const deleteBusDetails = (busID) => API.delete(`/buses/${busID}`);

/* Hostel Details */
export const getHostelRoomDetail = (hostelID) => API.get(`/hostelrooms/${hostelID}`);
export const getHostelRoomDetails = () => API.get('/hostelrooms');
export const postHostelRoomDetails = (hostelData) => API.post('/hostelrooms',hostelData);
export const updateHostelRoomDetails = (hostelID,hostelData) => API.patch(`/hostelrooms/${hostelID}`,hostelData);
export const deleteHostelRoomDetails = (hostelID) => API.delete(`/hostelrooms/${hostelID}`);

export const getHostelMessDetail = (hostelID) => API.get(`/hostelmess/${hostelID}`);
export const getHostelMessDetails = () => API.get('/hostelmess');
export const postHostelMessDetails = (hostelData) => API.post('/hostelmess',hostelData);
export const updateHostelMessDetails = (hostelID,hostelData) => API.patch(`/hostelmess/${hostelID}`,hostelData);
export const deleteHostelMessDetails = (hostelID) => API.delete(`/hostelmess/${hostelID}`);


export const getSpotlight = () => API.get('/spotlight');
export const postSpotlight = (FunctionData) => API.post('/spotlight',FunctionData);
export const updateSpotlight = (functionID,FunctionData) => API.patch(`/spotlight/${functionID}`,FunctionData);
export const deleteSpotlight = (functionID) => API.delete(`/spotlight/${functionID}`);