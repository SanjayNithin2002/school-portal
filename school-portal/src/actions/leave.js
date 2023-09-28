import * as api from "../api"
import { setCurrentUser } from "./currentUser"


export const postLeave = (navigate,leaveData) => async (dispatch) => {
    try{
        console.log(leaveData)
        const {data} = await api.postLeave(leaveData)
        console.log(data);
        dispatch(getLeave("/Leave",navigate,{type:localStorage.getItem('type'),id:localStorage.getItem('id')}))
        dispatch(setCurrentUser("/Leave",navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate("/Leave",{state:{status:200,message:"Your leave request has been sent to the Admin."}});
    
    }
    catch(err){
        console.log(err)
        navigate("/Leave",{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getLeave = (location,navigate,userData) => async (dispatch) =>{
    try{
        console.log(userData)
        const {data} = await api.getLeave(userData)
        dispatch({type:"FETCH_LEAVE_REQUEST",payload:data});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getAllLeave = (location,navigate) => async (dispatch) =>{
    try{
        const {data} = await api.getAllLeave()
        dispatch({type:"FETCH_ALL_LEAVE_REQUEST",payload:data});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}


export const deleteLeave = (location,navigate,leaveData) => async (dispatch) => {
    try{
        console.log(leaveData)
        const {data} = await api.deleteLeave(leaveData)
        console.log(data);
        dispatch(getLeave(location,navigate,{type:localStorage.getItem('type'),id:localStorage.getItem('id')}))
        dispatch(setCurrentUser(location,navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate(location,{state:{status:200,message:"The leave request has been deleted successfully."}});
    
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const updateStatusLeave = (location,navigate,leaveData) => async (dispatch) => {
    try{
        console.log(leaveData)
        const {data} = await api.updateStatusLeave(leaveData)
        console.log(data);
        dispatch(getLeave(location,navigate,{type:localStorage.getItem('type'),id:localStorage.getItem('id')}))
        dispatch(setCurrentUser(location,navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))        
        dispatch(getAllLeave(location,navigate))
        navigate(location,{state:{status:200,message:"The leave request has been "+leaveData.status}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

