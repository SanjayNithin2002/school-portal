import * as api from "../api"

/*  
    ->This Function is for Admins, Teachers and Students to get their own details.
    ->userData contains the user type and user id is stored. 
    ->To fetch their own details the getUserDetails(userData) GET API call is used, and the retrieved data is stored in the currentUserReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

export const setCurrentUser = (location,navigate,userData) => async(dispatch) =>{
    try{
        const {data} = await api.getUserDetails(userData);
        dispatch({type:'FETCH_CURRENT_USER',payload:data})
        console.log(data);
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins, Teachers and Students to get their own details.
    ->userData contains the user type and user id is stored. 
    ->To fetch the other user details getUserDetails(userData) GET API call is used, and the retrieved data is stored in the singleUserReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

export const getUserDetails = (location,navigate,userData) => async(dispatch) =>{
    try{
        const {data} = await api.getUserDetails(userData);
        dispatch({type:'FETCH_USER_DETAILS',payload:data})
        console.log(data);
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins, Teachers, and Students to change their userID.
    ->To change a userID, the new userID details are stored in the userData varaible and the userData is passed with a PATCH api call using changeUserID()
    ->After successfully changing the userID, the system fetches currentUser details.
    ->Following the successful changing the userID and retrieval of currentUser details, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const changeUserID = (type,userData,navigate) => async(dispatch) =>{
    try{
        console.log(userData);
        const {data} = await api.changeUserID(type,userData);
        dispatch(setCurrentUser("/Setting",navigate,{type:localStorage.getItem('type'),id:localStorage.getItem('id')}))
        console.log(data);
        navigate("/Setting",{state:{status:200,message:data.message}});
    }
    catch(err){
        console.log(err)
        navigate("/Setting",{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins, Teachers, and Students to change their password.
    ->To change a password, the new password details are stored in the userData varaible and the userData is passed with a PATCH api call using changePassword()
    ->After successfully changing the password, the system fetches currentUser details.
    ->Following the successful changing the password and retrieval of currentUser details, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const changePassword = (type,userData,navigate) => async(dispatch) =>{
    try{
        console.log(userData);
        const {data} = await api.changePassword(type,userData);
        dispatch(setCurrentUser("/Setting",navigate,{type:localStorage.getItem('type'),id:localStorage.getItem('id')}))
        console.log(data);
        navigate("/Setting",{state:{status:200,message:data.message}});
    }
    catch(err){
        console.log(err)
        navigate("/Setting",{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}