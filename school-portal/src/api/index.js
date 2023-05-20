import axios from "axios"
const API = axios.create({baseURL:'http://localhost:5000/',headers:{authorization:`Bearer ${localStorage.getItem('token')}`}})

export const getCurrentUser = (userData) => API.get(`/${userData.type}s/${userData.id}`)
export const getAttendance = (userid) => API.get(`${userid}`)
export const getClassMessage = (classid) =>API.get(`${classid}`)
