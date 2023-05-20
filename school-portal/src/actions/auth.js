import * as api from "../api"
import axios from "axios"

import { setCurrentUser } from "./currentUser"

export const StudentlogIn = (authData,navigate) => async (dispatch) => {
    try{
        localStorage.setItem("type","student")
        navigate('/Home');
        console.log(authData); 
        // const { data } = await axios.post('http://localhost:5000/students/login',authData)
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
        localStorage.setItem("type",authData.type);
        if(authData.type === "student")
        navigate('/StudentDashboard');
        else if(authData.type ==="teacher")
        navigate('/TeacherDashboard')
        else if(authData.type ==="admin")
        navigate('/TeacherDashboard')

        console.log(authData); 
        // const { data } = await axios.post('http://localhost:5000/teachers/login',authData)
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
        const { data } = await axios.post('http://localhost:5000/admins/login',authData)
        if(data.docs) {
            localStorage.setItem("type","admin")
            localStorage.setItem("id",data.docs._id)
            localStorage.setItem("token",data.token)
            dispatch(setCurrentUser({type:"admin",id:data.docs._id}))
        }  
        data.docs ? navigate('/Home') : navigate('/')
    }
    catch(err){
        console.log(err)
    }
}

