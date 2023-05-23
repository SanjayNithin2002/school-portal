import axios from "axios"
const API = axios.create({baseURL:'https://schoolportalbackend.onrender.com',headers:{authorization:`Bearer ${localStorage.getItem('token')}`}})

export const getCurrentUser = (userData) => API.get(`/${userData.type}s/${userData.id}`)
export const requestBonafide = (requestData) => API.post('/bonafides',requestData)
export const requestContact = (contactData) => API.post('/sendmail',contactData)
export const requestStudents = () => API.get('/students/')
export const createClass = (classData) => API.post('/classes/',classData)
export const updateSection = (id,studentData) => API.patch(`/students/${id}`,studentData)
export const getAttendance = (userid) => API.get(`${userid}`)
export const getClassMessage = (classid) =>API.get(`${classid}`)
export const AddStudent = (authData) => API.post('/students/signup',authData)
export const AddTeacher = (authData) => API.post('/teachers/signup',authData)
