import * as api from "../api"

export const createExam = (location,navigate,examData) => async () => {
    try{
        console.log(examData)
        const { data } = await api.createExam(examData)
        console.log(data)
        navigate(location,{state:{status:200,message:"The exam schedule has been posted"}});

    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getExam = (location,navigate,examData) => async(dispatch) =>{
    try{
        console.log(examData)
        const {data} = await api.getExam(examData)
        dispatch({type:'FETCH_EXAM_DETAILS',payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getStudentExam = (location,navigate,userData) => async(dispatch) => {
    try{
        // console.log(userData)
        const {data} = await api.getStudentExam(userData);
        dispatch({type:"FETCH_STUDENT_EXAM",payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}