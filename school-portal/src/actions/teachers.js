import * as api from "../api"

export const requestTeacher = (teacherID) => async (dispatch) => {
    try{
        const {data} = await api.requestTeacher(teacherID)
        console.log(data)
        if(data.docs)
        dispatch({type:'FETCH_TEACHER',payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const requestTeachers = (location,navigate) => async (dispatch) => {
    try{
        const {data} = await api.requestTeachers()
        console.log(data)
        dispatch({type:'FETCH_ALL_TEACHERS',payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}