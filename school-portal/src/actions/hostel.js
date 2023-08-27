import * as api from "../api"

export const postHostelRoomDetails = (hostelData) => async (dispatch) => {
    try{
        const {data} = await api.postHostelRoomDetails(hostelData)
        console.log(data)
        dispatch(getHostelRoomDetails());
    }
    catch(err){
        console.log(err)
    }
}

export const postHostelMessDetails = (hostelData) => async (dispatch) => {
    try{
        const {data} = await api.postHostelMessDetails(hostelData)
        console.log(data)
        dispatch(getHostelMessDetails());
    }
    catch(err){
        console.log(err)
    }
}

export const getHostelMessDetails = () => async (dispatch) => {
    try{
        const {data} = await api.getHostelMessDetails()
        console.log(data)
        dispatch({type:"FETCH_ALL_MESS",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const getHostelRoomDetails = () => async (dispatch) => {
    try{
        const {data} = await api.getHostelRoomDetails()
        console.log(data)
        dispatch({type:"FETCH_ALL_ROOMS",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const getHostelRoomDetail = (hostelID) => async (dispatch) => {
    try{
        const {data} = await api.getHostelRoomDetail(hostelID)
        console.log(data)
        dispatch({type:"FETCH_ROOM_DETAIL",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const getHostelMessDetail = (hostelID) => async (dispatch) => {
    try{
        const {data} = await api.getHostelMessDetail(hostelID)
        console.log(data)
        dispatch({type:"FETCH_MESS_DETAIL",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const updateHostelRoomDetails = (hostelID,hostelData) => async (dispatch) => {
    try{
        const {data} = await api.updateHostelRoomDetails(hostelID,hostelData);
        console.log(data);
        dispatch(getHostelRoomDetails());
    }
    catch(err){
        console.log(err)
    }
}

export const updateHostelMessDetails = (hostelID,hostelData) => async (dispatch) => {
    try{
        const {data} = await api.updateHostelMessDetails(hostelID,hostelData);
        console.log(data);
        dispatch(getHostelMessDetails());
    }
    catch(err){
        console.log(err)
    }
}

export const deleteHostelRoomDetails = (hostelID) => async (dispatch) => {
    try{
        const {data} = await api.deleteHostelRoomDetails(hostelID);
        console.log(data);
        dispatch(getHostelRoomDetails());
    }
    catch(err){
        console.log(err)
    }
}

export const deleteHostelMessDetails = (hostelID) => async (dispatch) => {
    try{
        const {data} = await api.deleteHostelMessDetails(hostelID);
        console.log(data);
        dispatch(getHostelMessDetails());
    }
    catch(err){
        console.log(err)
    }
}