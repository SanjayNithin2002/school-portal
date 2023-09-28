import * as api from "../api"

export const getClassMessage = (location,navigate,userData) => async (dispatch) => {
    try{
        console.log(userData)
        const { data } = await api.getClassMessage(userData)
        console.log(data);
        dispatch({type:"FETCH_CLASS_MESSAGE",payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const postClassMessage = (location,navigate,message) => async (dispatch) => {
    try{
        console.log(message)
        const { data } = await api.postClassMessage(message)
        dispatch(getClassMessage(location,navigate,{type:localStorage.getItem("type"),id:localStorage.getItem("id")}))
        console.log(data)
        navigate(location,{state:{status:200,message:"Message sent successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const postClassMessage1 = (location,navigate,message) => async(dispatch) =>{
    try{
        console.log(message)
        const{data} = await api.postClassMessage1(message)
        dispatch(getClassMessage(location,navigate,{type:localStorage.getItem("type"),id:localStorage.getItem("id")}))
        console.log(data);
        navigate(location,{state:{status:200,message:"Message sent successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const deleteClassMessage = (location,navigate,messageID) => async (dispatch) => {
    try{
        console.log(messageID)
        const { data } = await api.deleteClassMessage(messageID)
        console.log(data)
        dispatch(getClassMessage(location,navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate(location,{state:{status:200,message:"Message deleted successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const deleteClassMessage1 = (location,navigate,messageID) => async (dispatch) => {
    try{
        console.log(messageID)
        const { data } = await api.deleteClassMessage1(messageID)
        console.log(data)
        dispatch(getClassMessage(location,navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate(location,{state:{status:200,message:"Message deleted successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}