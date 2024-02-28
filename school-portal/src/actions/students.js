import * as api from "../api"
import { getStudent, getUserDetails } from "./currentUser"

export const requestStudents = (location,navigate) => async (dispatch) => {
    try{
        const {data} = await api.requestStudents()
        console.log(data)
        dispatch({type:'FETCH_ALL_STUDENTS',payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const requestClassStudents = (location,navigate,classID) => async (dispatch) => {
    try{
        const {data} = await api.requestClassStudents(classID)
        dispatch({type:'FETCH_CLASS_STUDENTS',payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}



export const updateSection = (location,navigate,studentData) => async (dispatch) => {
    try{
        console.log(studentData)
        const { data } = await api.updateSection(studentData);
        console.log(data);
        navigate(location,{state:{status:200,message:"Class created successfully"}});
    }   
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const updateStudentDetails = (location,navigate,studentData) => async (dispatch) => {
    try{
        console.log(studentData)
        const { data } = await api.updateStudentDetails(studentData);
        dispatch(getUserDetails(location,navigate,{type:"students",id:studentData.id}))
        console.log(data);
        navigate(location,{state:{status:200,message:"Updated Successfully"}});
    }   
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}