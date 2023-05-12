import axios from "axios"
const API = axios.create({baseURL:'http://localhost:5000'})
export const logIn = (authData) => API.post('',authData)
export const getCurrentUser = (userid) => API.get(`${userid}`)
export const getAttendance = (userid) => API.get(`${userid}`)
export const getClassMessage = (classid) =>API.get(`${classid}`)
