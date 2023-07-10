import * as api from "../api"
import { setCurrentUser } from "./currentUser"


export const postLeave = (leaveData) => async (dispatch) => {
    try{
        console.log(leaveData)
        const {data} = await api.postLeave(leaveData)
        console.log(data);
        dispatch(getLeave({type:localStorage.getItem('type'),id:localStorage.getItem('id')}))
        dispatch(setCurrentUser({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(getAllLeave())
    }
    catch(err){
        console.log(err)
    }
}

export const getLeave = (userData) => async (dispatch) =>{
    try{
        console.log(userData)
        const {data} = await api.getLeave(userData)
        dispatch({type:"FETCH_LEAVE_REQUEST",payload:data});
    }
    catch(err){
        console.log(err)
    }
}

export const getAllLeave = () => async (dispatch) =>{
    try{
        const {data} = await api.getAllLeave()
        dispatch({type:"FETCH_ALL_LEAVE_REQUEST",payload:data});
    }
    catch(err){
        console.log(err)
    }
}


export const deleteLeave = (leaveData) => async (dispatch) => {
    try{
        console.log(leaveData)
        const {data} = await api.deleteLeave(leaveData)
        console.log(data);
        dispatch(getLeave({type:localStorage.getItem('type'),id:localStorage.getItem('id')}))
        dispatch(setCurrentUser({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))        
        dispatch(getAllLeave())
    }
    catch(err){
        console.log(err)
    }
}

export const updateStatusLeave = (leaveData) => async (dispatch) => {
    try{
        console.log(leaveData)
        const {data} = await api.updateStatusLeave(leaveData)
        console.log(data);
        dispatch(getLeave({type:localStorage.getItem('type'),id:localStorage.getItem('id')}))
        dispatch(setCurrentUser({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))        
        dispatch(getAllLeave())
    }
    catch(err){
        console.log(err)
    }
}

