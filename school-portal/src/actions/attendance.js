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

export const getTeacherAttendances = (userData) => async (dispatch) => {
    try{
        const { data } = await api.getTeacherAttendances(userData)
        dispatch({type:"ALL_TEACHER_FETCH_ATTENDANCE",payload:data})
        console.log(data)
    }
    catch(err){
        console.log(err)
    }
}

export const getAdminAttendances = (userData) => async (dispatch) => {
    try{
        const { data } = await api.getAdminAttendances(userData)
        dispatch({type:"ALL_ADMIN_FETCH_ATTENDANCE",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const getAttendance = (userID) => async (dispatch) => {
    try{
        const { data } = await api.getAttendance(userID)
        dispatch({type:"USER_FETCH_ATTENDANCE",payload:data})
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

export const updateStudentAttendance = (FunctionData,callback) => async (dispatch) => {
    try{
        console.log(FunctionData)
        const {data} = await api.updateStudentAttendance(FunctionData)
        dispatch(getStudentAttendances(callback))
        console.log(data);
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

export const postTeacherAttendance = (FunctionData,navigate) => async (dispatch) => {
    try{
        console.log(FunctionData)
        const {data} = await api.postTeacherAttendance(FunctionData)
        console.log(data);
        navigate('/Home')
    }
    catch(err){
        console.log(err)
    }
}

export const updateTeacherAttendance = (FunctionData,callback) => async (dispatch) => {
    try{
        console.log(FunctionData)
        const {data} = await api.updateTeacherAttendance(FunctionData)
        dispatch(getStudentAttendances(callback))
        console.log(data);
    }
    catch(err){
        console.log(err)
    }
}

export const deleteTeacherAttendance = (FunctionData) => async () => {
    try{
        await Promise.all(
            FunctionData.map(async (functionID) => {
                console.log(functionID);
                const { data } = await api.deleteTeacherAttendance(functionID);
                console.log(data);
            })
        );
    }
    catch(err){
        console.log(err)
    }
}

export const postAdminAttendance = (FunctionData,navigate) => async (dispatch) => {
    try{
        console.log(FunctionData)
        const {data} = await api.postAdminAttendance(FunctionData)
        console.log(data);
        navigate('/Home')
    }
    catch(err){
        console.log(err)
    }
}

export const updateAdminAttendance = (FunctionData,callback) => async (dispatch) => {
    try{
        console.log(FunctionData)
        const {data} = await api.updateAdminAttendance(FunctionData)
        dispatch(getStudentAttendances(callback))
        console.log(data);
    }
    catch(err){
        console.log(err)
    }
}

export const deleteAdminAttendance = (FunctionData) => async () => {
    try{
        await Promise.all(
            FunctionData.map(async (functionID) => {
                console.log(functionID);
                const { data } = await api.deleteAdminAttendance(functionID);
                console.log(data);
            })
        );
    }
    catch(err){
        console.log(err)
    }
}