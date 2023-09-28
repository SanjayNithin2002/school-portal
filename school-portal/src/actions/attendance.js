import * as api from "../api"

export const getStudentAttendances = (location,navigate,userData) => async (dispatch) => {
    try{
        const { data } = await api.getStudentAttendances(userData)
        dispatch({type:"ALL_STUDENT_FETCH_ATTENDANCE",payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getTeacherAttendances = (location,navigate,userData) => async (dispatch) => {
    try{
        const { data } = await api.getTeacherAttendances(userData)
        dispatch({type:"ALL_TEACHER_FETCH_ATTENDANCE",payload:data})
        console.log(data)
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getAdminAttendances = (location,navigate,userData) => async (dispatch) => {
    try{
        const { data } = await api.getAdminAttendances(userData)
        dispatch({type:"ALL_ADMIN_FETCH_ATTENDANCE",payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getAttendance = (location,navigate,userID) => async (dispatch) => {
    try{
        const { data } = await api.getAttendance(userID)
        dispatch({type:"USER_FETCH_ATTENDANCE",payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const postStudentAttendance = (location,navigate,FunctionData) => async (dispatch) => {
    try{
        console.log(FunctionData)
        const {data} = await api.postStudentAttendance(FunctionData)
        console.log(data);
        navigate(location,{state:{status:200,message:"Attendance has been Posted."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const updateStudentAttendance = (location,navigate,FunctionData,callback) => async (dispatch) => {
    try{
        console.log(FunctionData)
        const {data} = await api.updateStudentAttendance(FunctionData)
        dispatch(getStudentAttendances(location,navigate,callback))
        console.log(data);
        navigate(location,{state:{status:200,message:"Attendance has been Updated."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const deleteStudentAttendance = (location,navigate,FunctionData) => async () => {
    try{
        console.log(FunctionData);
        await api.deleteStudentAttendance(FunctionData);
        navigate(location,{state:{status:200,message:"Attendance deleted Successfully"}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const postTeacherAttendance = (location,navigate,FunctionData) => async (dispatch) => {
    try{
        console.log(FunctionData)
        const {data} = await api.postTeacherAttendance(FunctionData)
        console.log(data);
        navigate(location,{state:{status:200,message:"Attendance has been Updated."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const updateTeacherAttendance = (location,navigate,FunctionData,callback) => async (dispatch) => {
    try{
        console.log(FunctionData)
        const {data} = await api.updateTeacherAttendance(FunctionData)
        dispatch(getStudentAttendances(callback))
        console.log(data);
        navigate(location,{state:{status:200,message:"Attendance has been Updated."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const deleteTeacherAttendance = (location,navigate,FunctionData) => async () => {
    try{
        console.log(FunctionData);
        const { data } = await api.deleteTeacherAttendance(FunctionData);
        console.log(data);
        navigate(location,{state:{status:200,message:"Attendance deleted Successfully"}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const postAdminAttendance = (location,navigate,FunctionData) => async (dispatch) => {
    try{
        console.log(FunctionData)
        const {data} = await api.postAdminAttendance(FunctionData)
        console.log(data);
        navigate(location,{state:{status:200,message:"Attendance has been Updated."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const updateAdminAttendance = (location,navigate,FunctionData,callback) => async (dispatch) => {
    try{
        console.log(FunctionData)
        const {data} = await api.updateAdminAttendance(FunctionData)
        dispatch(getStudentAttendances(callback))
        console.log(data);
        navigate(location,{state:{status:200,message:"Attendance has been Updated."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const deleteAdminAttendance = (location,navigate,FunctionData) => async () => {
    try{
        console.log(FunctionData);
        const { data } = await api.deleteAdminAttendance(FunctionData);
        console.log(data);
        navigate(location,{state:{status:200,message:"Attendance deleted Successfully"}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}