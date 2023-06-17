import * as api from "../api"

export const getStudentAttendance = (userData) => async (dispatch) => {
    try{
        const { data } = await api.getStudentAttendance(userData)
        dispatch({type:"STUDENT_FETCH_ATTENDANCE",payload:data})
    }
    catch(err){
        console.log(err)
    }
}
