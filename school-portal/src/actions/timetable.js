import * as api from "../api";

export const postTimeTable = (location,navigate,classData) => async (dispatch) => {
    try {
        console.log(classData);
        const { data } = await api.postTimeTable(classData);
        console.log(data);
    } catch (err) {
        console.log(err);
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
};

export const getTimeTables = (location,navigate) => async (dispatch) => {
    try {
        const { data } = await api.getTimeTables();
        console.log(data);
        dispatch({type:"FETCH_ALL_TIMETABLE",payload:data});
    } catch (err) {
        console.log(err);
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
};

export const getTimeTable = (location,navigate,standard) => async (dispatch) => {
    try {
        const { data } = await api.getTimeTable(standard);
        console.log(data);
        dispatch({type:"FETCH_CLASS_TIMETABLE",payload:data});
    } catch (err) {
        console.log(err); 
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
};