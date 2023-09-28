import * as api from "../api"

export const getRecords = (location,navigate) => async (dispatch) => {
    try{
        const {data} = await api.getRecords()
        dispatch({type:"FETCH_ALL_RECORDS",payload:data})
        console.log(data)
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const postRecords = (location,navigate,formData) => async (dispatch) => {
    try{
        const {data} = await api.postRecords(formData)
        dispatch(getRecords(location,navigate))
        console.log(data)
        navigate(location,{state:{status:200,message:"The document is uploaded successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const deleteRecords = (location,navigate,deleteID) => async (dispatch) => {
    try{
        const {data} = await api.deleteRecords(deleteID)
        dispatch(getRecords(location,navigate))
        console.log(data)
        navigate(location,{state:{status:200,message:"The document is deteled successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}