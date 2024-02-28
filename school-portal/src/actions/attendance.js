import * as api from "../api"

/*  
    ->This Function is for Teachers to get the students attendance details for a particular standard,section and date.
    ->To fetch all the corresponsing student attendance detail , the getStudentAttendances(userData) API call is used, and the retrieved data is stored in the studentAttendanceReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

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

/*  
    ->This Function is for Admin to get the teachers attendance details for a particular date.
    ->To fetch all the teachers attendance detail, the getTeacherAttendances(userData) API call is used, and the retrieved data is stored in the teacherAttendanceReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

export const getTeacherAttendances = (location,navigate,userData) => async (dispatch) => {
    try{
        const { data } = await api.getTeacherAttendances(userData)
        dispatch({type:"ALL_TEACHER_FETCH_ATTENDANCE",payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admin to get the admins attendance details for a particular date.
    ->To fetch all the admins attendance detail, the getAdminAttendances(userData) API call is used, and the retrieved data is stored in the adminAttendanceReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

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

/*  
    ->This Function is for Students, Teachers, and Admins to get their own complete attendance details or teachers can able to see the students attendance or admins can able to see the students and teachers attendance.
    ->To fetch the own user attendance or others attendance, the getAttendance(userID) API call is used, and the retrieved data is stored in the attendanceReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

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

/*  
    ->This Function is for Teachers and Admins to upload the students attendances.
    ->To post students attendance, the attendance details are stored in the FunctionData variable and data is passed with a POST api call using postStudentAttendance()
    ->After successfully uploading the students attendance, the system fetches the students attendance details for the current user.
    ->Following the successful uploading the students attendance and retrieval of students attendance details, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const postStudentAttendance = (location,navigate,FunctionData) => async (dispatch) => {
    try{
        await api.postStudentAttendance(FunctionData)
        navigate(location,{state:{status:200,message:"Attendance has been Posted."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Teachers and Admins to update the students attendances.
    ->To update students attendance, the attendance details are stored in the FunctionData variable and data is passed with a PATCH api call using updateStudentAttendance()
    ->After successfully updating the students attendance, the system fetches the students attendance details for the current user.
    ->Following the successful updating the students attendance and retrieval of students attendance details, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const updateStudentAttendance = (location,navigate,FunctionData,callback) => async (dispatch) => {
    try{
        const {data} = await api.updateStudentAttendance(FunctionData)
        dispatch(getStudentAttendances(location,navigate,callback))
        navigate(location,{state:{status:200,message:"Attendance has been Updated."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Teachers to delete the students attendances.
    ->To delete students attendance, the attendance details are stored in the FunctionData variable and data is passed with a PATCH api call using deleteStudentAttendance()
    ->After successfully deleting the students attendance, the system fetches the students attendance details for the current user.
    ->Following the successful deleting the students attendance and retrieval of students attendance details, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const deleteStudentAttendance = (location,navigate,FunctionData) => async () => {
    try{
        await api.deleteStudentAttendance(FunctionData);
        navigate(location,{state:{status:200,message:"Attendance deleted Successfully"}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins to upload the teachers attendance.
    ->To post teachers attendance, the attendance details are stored in the FunctionData variable and data is passed with a POST api call using postTeacherAttendance()
    ->After successfully uploading the teachers attendance, the system fetches the teachers attendance details for the current user.
    ->Following the successful uploading the teachers attendance and retrieval of teachers attendance details, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const postTeacherAttendance = (location,navigate,FunctionData) => async (dispatch) => {
    try{
        await api.postTeacherAttendance(FunctionData)
        navigate(location,{state:{status:200,message:"Attendance has been Updated."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins to update the admins attendances.
    ->To update admins attendance, the attendance details are stored in the FunctionData variable and data is passed with a PATCH api call using updateTeacherAttendance()
    ->After successfully updating the admins attendance, the system fetches the admins attendance details for the current user.
    ->Following the successful updating the admins attendance and retrieval of admins attendance details, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const updateTeacherAttendance = (location,navigate,FunctionData,callback) => async (dispatch) => {
    try{
        await api.updateTeacherAttendance(FunctionData)
        dispatch(getStudentAttendances(callback))
        navigate(location,{state:{status:200,message:"Attendance has been Updated."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins to delete the teachers attendances.
    ->To delete teachers attendance, the attendance details are stored in the FunctionData variable and data is passed with a PATCH api call using deleteStudentAttendance()
    ->After successfully deleting the teachers attendance, the system fetches the teachers attendance details for the current user.
    ->Following the successful deleting the teachers attendance and retrieval of teachers- attendance details, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const deleteTeacherAttendance = (location,navigate,FunctionData) => async () => {
    try{
        await api.deleteTeacherAttendance(FunctionData);
        navigate(location,{state:{status:200,message:"Attendance deleted Successfully"}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins to upload the admins attendance.
    ->To post admins attendance, the attendance details are stored in the FunctionData variable and data is passed with a POST api call using postAdminAttendance()
    ->After successfully uploading the admins attendance, the system fetches the admins attendance details for the current user.
    ->Following the successful uploading the admins attendance and retrieval of admins attendance details, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const postAdminAttendance = (location,navigate,FunctionData) => async (dispatch) => {
    try{
        await api.postAdminAttendance(FunctionData)
        navigate(location,{state:{status:200,message:"Attendance has been Updated."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins to update the admins attendances.
    ->To update admins attendance, the attendance details are stored in the FunctionData variable and data is passed with a PATCH api call using updateAdminAttendance()
    ->After successfully updating the admins attendance, the system fetches the admins attendance details for the current user.
    ->Following the successful updating the admins attendance and retrieval of admins attendance details, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const updateAdminAttendance = (location,navigate,FunctionData,callback) => async (dispatch) => {
    try{
        await api.updateAdminAttendance(FunctionData)
        dispatch(getStudentAttendances(callback))
        navigate(location,{state:{status:200,message:"Attendance has been Updated."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins to delete the admins attendances.
    ->To delete admins attendance, the attendance details are stored in the FunctionData variable and data is passed with a PATCH api call using deleteAdminAttendance()
    ->After successfully deleting the admins attendance, the system fetches the admins attendance details for the current user.
    ->Following the successful deleting the admins attendance and retrieval of admins attendance details, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const deleteAdminAttendance = (location,navigate,FunctionData) => async () => {
    try{
        await api.deleteAdminAttendance(FunctionData);
        navigate(location,{state:{status:200,message:"Attendance deleted Successfully"}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}