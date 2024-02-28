import * as api from "../api"

/*  
    ->This Function is for Teachers and Students to get corresponding class message.
    ->userData contains the user type and user id is stored. For students, the message post by the subject handling teachers will be retrieved and for teachers, the message posted by them will be retrieved.
    ->To fetch the class message, the getClassMessage(userData) GET API call is used, and the retrieved data is stored in the classmessageReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

export const getClassMessage = (location,navigate,userData) => async (dispatch) => {
    try{
        const { data } = await api.getClassMessage(userData)
        dispatch({type:"FETCH_CLASS_MESSAGE",payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Teachers to send a class message to all the students.
    ->To send a class message, the class message details are stored in the message variable and message is passed with a POST api call using postClassMessage()
    ->After successfully sending a class message, the system fetches class message for the teacher.
    ->Following the successful sending the class message and retrieval of class message, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const postClassMessage = (location,navigate,message) => async (dispatch) => {
    try{
        await api.postClassMessage(message)
        dispatch(getClassMessage(location,navigate,{type:localStorage.getItem("type"),id:localStorage.getItem("id")}))
        navigate(location,{state:{status:200,message:"Message sent successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Teachers to send a class message to a group students or single student.
    ->To send a class message, the class message details are stored in the message variable and message is passed with a POST api call using postClassMessage1()
    ->After successfully sending a class message, the system fetches class message for the teacher.
    ->Following the successful sending the class message and retrieval of class message, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const postClassMessage1 = (location,navigate,message) => async(dispatch) =>{
    try{
        await api.postClassMessage1(message)
        dispatch(getClassMessage(location,navigate,{type:localStorage.getItem("type"),id:localStorage.getItem("id")}))
        navigate(location,{state:{status:200,message:"Message sent successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Teachers to delete a class message which is sent to all the students.
    ->To delete a class message, messageID is passed with a DELETE api call using deleteClassMessage()
    ->After successfully deleting a class message, the system fetches class messages for the teacher.
    ->Following the successful deleting the class message and retrieval of class messages, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const deleteClassMessage = (location,navigate,messageID) => async (dispatch) => {
    try{
        await api.deleteClassMessage(messageID)
        dispatch(getClassMessage(location,navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate(location,{state:{status:200,message:"Message deleted successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Teachers to delete a class message which is sent to a group of students or to a single student.
    ->To delete a class message, messageID is passed with a DELETE api call using deleteClassMessage()
    ->After successfully deleting a class message, the system fetches class messages for the teacher.
    ->Following the successful deleting the class message and retrieval of class messages, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const deleteClassMessage1 = (location,navigate,messageID) => async (dispatch) => {
    try{
        await api.deleteClassMessage1(messageID)
        dispatch(getClassMessage(location,navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate(location,{state:{status:200,message:"Message deleted successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}