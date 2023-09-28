import * as api from "../api"

export const createClass = (location,navigate,classData) => async (dispatch) => {
    try{
        console.log(classData)
        const { data } = await api.createClass(classData);
        console.log(data);
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getAllClass = (location,navigate) => async(dispatch) =>{
    try{
        const {data} = await api.getAllClass();
        dispatch({type:'FETCH_ALL_CLASSES',payload:data})
        console.log(data);
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getStandardClass = (location,navigate,standard) => async(dispatch) =>{
    try{
        console.log(standard)
        const {data} = await api.getStandardClass(standard);
        dispatch({type:'FETCH_STANDARD_CLASS',payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getClass = (location,navigate,userData) => async(dispatch) =>{
    try{
        // console.log(userData)
        const {data} = await api.getClass(userData);
        dispatch({type:'FETCH_CLASS_DETAILS',payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const updateClassDetails = (location,navigate,classData) => async (dispatch) => {
    try{
        console.log(classData);
        const { data } = await api.updateClassDetails(classData);
		dispatch(getAllClass(location,navigate));
        console.log(data);
        navigate(location,{state:{status:200,message:"TimeTable has been updated."}});
    
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}
//