import axios from "axios"
const API = axios.create({baseURL:'https://schoolportalbackend.onrender.com',headers:{authorization:`Bearer ${localStorage.getItem('token')}`}})

export const getCurrentUser = (userData) => API.get(`/${userData.type}s/${userData.id}`)
export const getAttendance = (userid) => API.get(`${userid}`)
export const getClassMessage = (classid) =>API.get(`${classid}`)
export const AddStudent = (authData) => API.post('/students/signup',authData)
