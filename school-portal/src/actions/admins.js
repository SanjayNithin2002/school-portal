import * as api from "../api"

/*  
    ->To fetch all the administrators' details, the requestAdmins() API call is used, and the retrieved data is stored in the adminReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

export const requestAdmins = (location,navigate) => async (dispatch) => {
    try{
        const {data} = await api.requestAdmins()
        dispatch({type:'FETCH_ALL_ADMINS',payload:data})  // this FETCH_ALL_ADMINS type is located in the adminReducer.js file.
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}