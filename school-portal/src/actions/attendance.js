import * as api from "../api"

export const getStudentAttendances = (userData) => async (dispatch) => {
    try{
        const { data } = await api.getStudentAttendances(userData)
        dispatch({type:"ALL_STUDENT_FETCH_ATTENDANCE",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const getStudentAttendance = (userID) => async (dispatch) => {
    try{
        const { data } = await api.getStudentAttendance(userID)
        dispatch({type:"STUDENT_FETCH_ATTENDANCE",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const postStudentAttendance = (FunctionData,navigate) => async (dispatch) => {
    try{
        console.log(FunctionData)
        const {data} = await api.postStudentAttendance(FunctionData)
        console.log(data);
        navigate('/Home')
    }
    catch(err){
        console.log(err)
    }
}

export const deleteStudentAttendance = (FunctionData) => async () => {
    try{
        await Promise.all(
            FunctionData.map(async (functionID) => {
                console.log(functionID);
                const { data } = await api.deleteStudentAttendance(functionID);
                console.log(data);
            })
        );
    }
    catch(err){
        console.log(err)
    }
}