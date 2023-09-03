import * as api from "../api"
import axios from "axios"

export const StudentlogIn = (authData,navigate) => async (dispatch) => {
    try{ 
        const {data} = await axios.post('https://schoolportalbackend.onrender.com/students/login',authData)

        if(data.docs) {
            localStorage.setItem("token",data.token)
            localStorage.setItem("type","student")
            localStorage.setItem("id",data.docs._id)
            navigate('/Home');
        }  
    }
    catch(err){
        console.log(err)
        

    }
}
export const TeacherlogIn = (authData,navigate) => async (dispatch) => {
    try{
        const { data } = await axios.post('https://schoolportalbackend.onrender.com/teachers/login',authData)
        if(data.docs) {
            localStorage.setItem("token",data.token)
            localStorage.setItem("type","teacher")
            localStorage.setItem("id",data.docs._id)
            navigate('/Home')
        }  
    }
    catch(err){
        console.log(err)
    }
}
export const AdminlogIn = (authData,navigate) => async (dispatch) => {
    try{ 
        const { data } = await axios.post('https://schoolportalbackend.onrender.com/admins/login',authData)
        if(data.docs) {
            localStorage.setItem("token",data.token)
            localStorage.setItem("type","admin")
            localStorage.setItem("id",data.docs._id)
            navigate('/Home')
        }  
    }
    catch(err){
        console.log(err)
        navigate('/',{state:{status:err.response.status,message:err.response.data.message}})
    }
}

export const AddStudents = (authData,navigate) => async (dispatch) => {
    try{
        console.log(authData)
        const {data} = await api.AddStudent(authData)
        console.log(data)
        navigate('/AddStudent');
    }
    catch(err){
        console.log(err)
    }
}

export const AddTeachers = (authData,navigate) => async (dispatch) => {
    try{
        console.log(authData)
        const {data} = await api.AddTeacher(authData)
        console.log(data)
        navigate('/AddStaff');
    }
    catch(err){
        console.log(err)
    }
}

export const AddAdmin = (authData,navigate) => async (dispatch) => {
    try{
        console.log(authData)
        const {data} = await api.AddAdmin(authData)
        console.log(data)
        navigate('/AddStaff');
    }
    catch(err){
        console.log(err)
    }
}

export const AddWorkers = (authData,navigate) => async (dispatch) => {
    try{
        console.log(authData)
        const {data} = await api.AddWorkers(authData)
        console.log(data)
        navigate('/AddStaff');
    }
    catch(err){
        console.log(err)
    }
}

export const requestContact = (contactData,navigate) => async (dispatch) => {
    try{
        console.log(contactData)
        const {data} = await api.requestContact(contactData)
        console.log(data)
        navigate('/Home');
    }
    catch(err){
        console.log(err)
    }
}