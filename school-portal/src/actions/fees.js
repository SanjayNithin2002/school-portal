import * as api from "../api"

export const getFees = (location,navigate) => async (dispatch) => {
    try{
        const {data} = await api.getFees()
        dispatch({type:"FETCH_ALL_FEES",payload:data})
        console.log(data)
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const postFees = (location,navigate,FunctionData) => async (dispatch) => {
    try{
        const {data} = await api.postFees(FunctionData)
        dispatch(getFees(location,navigate))
        console.log(data)
        navigate(location,{state:{status:200,message:"The fees structure is uploaded successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const deleteFees = (location,navigate,deleteID) => async (dispatch) => {
    try{
        const {data} = await api.deleteFees(deleteID)
        dispatch(getFees(location,navigate))
        console.log(data)
        navigate(location,{state:{status:200,message:"The fees structure is deteled successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const updateFees = (location,navigate,functionData) => async (dispatch) => {
    try{
        const {data} = await api.updateFees(functionData)
        dispatch(getFees(location,navigate))
        console.log(data)
        navigate(location,{state:{status:200,message:"The fees structure is updated successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getPaymentRequest = (location,navigate,userData) => async (dispatch) => {
    try{
        const {data} = await api.getPaymentRequest(userData);
        dispatch({type:"FETCH_STUDENT_PAYMENT",payload:data})
        console.log(data)
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}