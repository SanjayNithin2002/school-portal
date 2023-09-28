import * as api from "../api"

export const requestBonafide = (location,navigate,requestData) => async (dispatch) => {
    try{
        console.log(requestData)
        const {data} = await api.requestBonafide(requestData)
        dispatch(StudentBonafide(location,navigate));
        console.log(data)
        navigate(location,{state:{status:200,message:"success"}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const StudentBonafide = (location,navigate) => async (dispatch) => {
    try{
        const {data} = await api.StudentBonafide(localStorage.getItem("id"))
        dispatch({type:"FETCH_STUDENT_BONAFIDE",payload:data})
        console.log(data)
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getAllBonafide = (location,navigate) => async (dispatch) => {
    try{
        const {data} = await api.getAllBonafide()
        dispatch({type:"FETCH_ALL_BONAFIDE",payload:data})
        console.log(data)
    }
    catch(err){
        console.log(err)
        if(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
        else{
            
        }
    }
}

export const postBonafideFile = (location,navigate,bonafideID,formData) => async (dispatch) => {
    try{
        console.log(bonafideID,formData)
        const {data} = await api.postBonafideFile(bonafideID,formData)
        dispatch(getAllBonafide(location,navigate))
        console.log(data)
        navigate(location,{state:{status:200,message:"The Certificate is uploaded successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const viewBonafide = (request) => async (dispatch) => {
    try{
        console.log(request)
        const {data} = await api.viewBonafide(request)
        console.log(data)
        console.log(data.url[0])
        window.open(data.url[0], '_blank');
    }
    catch(err){
        console.log(err)
    }
}

export const rejectBonafide = (location,navigate,functionData,bonafideID) => async (dispatch) => {
    try{
        console.log(bonafideID,functionData)
        const {data} = await api.rejectBonafide(bonafideID,functionData)
        dispatch(getAllBonafide(location,navigate))
        console.log(data)
        navigate(location,{state:{status:200,message:"The Request is rejected successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const deleteBonafide = (location,navigate,bonafideID) => async (dispatch) => {
    try{
        console.log(bonafideID)
        const {data} = await api.deleteBonafide(bonafideID)
        dispatch(getAllBonafide(location,navigate))
        console.log(data)
        navigate(location,{state:{status:200,message:"The Request is deleted successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

