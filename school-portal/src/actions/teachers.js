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