import axios from "axios"
const API = axios.create({baseURL:'https://schoolportalbackend.onrender.com',headers:{authorization:`Bearer ${localStorage.getItem('token')}`}})
const API1 = axios.create({headers:{authorization:`Bearer ${localStorage.getItem('token')}`}})

/* General */
export const getCurrentUser = (userData) => API.get(`/${userData.type}s/${userData.id}`)
export const requestStudents = () => API.get('/students/')
export const requestTeacher = (teacherID) => API.get(`/teachers/${teacherID}`)
export const requestContact = (contactData) => API.post('/sendmail',contactData)
export const AddStudent = (authData) => API.post('/students/signup',authData)
export const AddTeacher = (authData) => API.post('/teachers/signup',authData)

/* Settings */
export const changeUserID = (type,userData) => API.patch(`/${type}s/changeuserid`,userData)
export const changePassword = (type,userData) => API.patch(`/${type}s/changepassword`,userData)

/* Bonafide */
export const requestBonafide = (requestData) => API.post('/bonafides',requestData)
export const StudentBonafide = (studentID) => API.get(`/bonafides/students/${studentID}`)
export const getAllBonafide = () =>API.get('/bonafides/');
export const postBonafideFile = (bonafideID,formData) => API.patch(`/bonafides/${bonafideID}`,formData)
export const viewBonafide = (request) => API1.get(request) 

/* Classes */
export const createClass = (classData) => API.post('/classes/',classData)
export const updateSection = (id,studentData) => API.patch(`/students/${id}`,studentData)
export const getClass = (userData) => API.get(`/classes/`)

/* Assessments */
export const postAssessment = (functionData) => API.post('/assessments',functionData)
export const getAssessments = (userData) => API.get(`/assessments/${userData.type}s/${userData.id}`)
export const getAssessment = (functionID) => API.get(`/assessments/${functionID}`);
export const deleteAssessment = (functionID) => API.delete(`/assessments/${functionID}`)

/* Ansswer */
export const getAnswers = (userData) => API.get(`/answers/${userData.type}s/${userData.id}`)
export const postAnswers = (formData) => API.post('/answers',formData);
export const deleteAnswers = (answerID) => API.delete(`/answers/${answerID}`)


export const getAttendance = (userid) => API.get(`${userid}`)
export const getClassMessage = (classid) =>API.get(`${classid}`)
