import * as api from "../api"
import axios from "axios"

import { setCurrentUser } from "./currentUser"

export const StudentlogIn = (authData,navigate) => async (dispatch) => {
    try{
        localStorage.setItem("type","student")
        navigate('/Home');
        console.log(authData); 
        // const { data } = await axios.post('https://schoolportalbackend.onrender.com/students/login',authData)
        // if(data.docs) {
        //     localStorage.setItem("type","student")
        //     localStorage.setItem("id",data.docs._id)
        //     localStorage.setItem("token",data.token)
        //     dispatch(setCurrentUser("student",data.docs._id))
        // }  
        // data.docs ? navigate('/Home') : navigate('/')
    }
    catch(err){
        console.log(err)
    }
}
export const TeacherlogIn = (authData,navigate) => async (dispatch) => {
    try{
        localStorage.setItem("type","teacher");
        navigate("Home");

        console.log(authData); 
        // const { data } = await axios.post('https://schoolportalbackend.onrender.com/teachers/login',authData)
        // if(data.docs) {
        //     localStorage.setItem("type","teacher")
        //     localStorage.setItem("id",data.docs._id)
        //     localStorage.setItem("token",data.token)
        //     dispatch(setCurrentUser("teacher",data.docs._id))
        // }  
        // data.docs ? navigate('/Home') : navigate('/')
    }
    catch(err){
        console.log(err)
    }
}
export const AdminlogIn = (authData,navigate) => async (dispatch) => {
    try{
        localStorage.setItem("type","admin");
        navigate("admin");  
        // const { data } = await axios.post('https://schoolportalbackend.onrender.com/admins/login',authData)
        // if(data.docs) {
        //     localStorage.setItem("type","admin")
        //     localStorage.setItem("id",data.docs._id)
        //     localStorage.setItem("token",data.token)
        //     dispatch(setCurrentUser({type:"admin",id:data.docs._id}))
        // }  
        // else{
        //     console.log(data);
        // }
        // data.docs ? navigate('/Home') : navigate('/')
    }
    catch(err){
        console.log(err)
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