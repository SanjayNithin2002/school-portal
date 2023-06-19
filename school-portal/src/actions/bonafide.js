import * as api from "../api"

export const requestBonafide = (requestData,navigate) => async (dispatch) => {
    try{
        console.log(requestData)
        const {data} = await api.requestBonafide(requestData)
        dispatch(StudentBonafide(navigate));
        console.log(data)
        navigate('/Bonafide',{state:{message:"success"}});
    }
    catch(err){
        console.log(err)
    }
}

export const StudentBonafide = (navigate) => async (dispatch) => {
    try{
        const {data} = await api.StudentBonafide(localStorage.getItem("id"))
        dispatch({type:"FETCH_STUDENT_BONAFIDE",payload:data})
        console.log(data)
    }
    catch(err){
        console.log(err)
    }
}

export const getAllBonafide = () => async (dispatch) => {
    try{
        const {data} = await api.getAllBonafide()
        dispatch({type:"FETCH_ALL_BONAFIDE",payload:data})
        console.log(data)
    }
    catch(err){
        console.log(err)
    }
}



export const postBonafideFile = (bonafideID,formData,navigate) => async (dispatch) => {
    try{
        console.log(bonafideID,formData)
        const {data} = await api.postBonafideFile(bonafideID,formData)
        console.log(data)
        navigate('/Home')
    }
    catch(err){
        console.log(err)
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

export const rejectBonafide = (functionData,bonafideID) => async (dispatch) => {
    try{
        console.log(bonafideID,functionData)
        const {data} = await api.rejectBonafide(bonafideID,functionData)
        dispatch(getAllBonafide())
        console.log(data)
    }
    catch(err){
        console.log(err)
    }
}

export const deleteBonafide = (bonafideID) => async (dispatch) => {
    try{
        console.log(bonafideID)
        const {data} = await api.deleteBonafide(bonafideID)
        dispatch(getAllBonafide())
        console.log(data)
    }
    catch(err){
        console.log(err)
    }
}

