import * as api from "../api"

/*  
    ->This Function is for Students to sent a bonafide request to the admin.
    ->To sent a bonafide request, the bonafide details are stored in the requestData variable and data is passed with a POST api call using StudentBonafide()
    ->After successfully sending the bonafide details, the system fetches all bonafide requests made by the Student.
    ->Following the successful sending the bonafide request and retrieval of bonafide details, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const requestBonafide = (location,navigate,requestData) => async (dispatch) => {
    try{
        await api.requestBonafide(requestData)
        dispatch(StudentBonafide(location,navigate));
        navigate(location,{state:{status:200,message:"Your request has been sent to the Admin."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Students to get the bonafide requests made by them.
    ->To fetch all the bonafide requests detail , the StudentBonafide(StudentID) GET API call is used, and the retrieved data is stored in the bonafideReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

export const StudentBonafide = (location,navigate) => async (dispatch) => {
    try{
        const {data} = await api.StudentBonafide(localStorage.getItem("id"))
        dispatch({type:"FETCH_STUDENT_BONAFIDE",payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins to get all bonafide requests made by the students.
    ->To fetch all the bonafide requests detail, the getAllBonafide() GET API call is used, and the retrieved data is stored in the bonafideReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

export const getAllBonafide = (location,navigate) => async (dispatch) => {
    try{
        const {data} = await api.getAllBonafide()
        dispatch({type:"FETCH_ALL_BONAFIDE",payload:data})
    }
    catch(err){
        console.log(err)
        if(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
        else{
            
        }
    }
}

/*  
    ->This Function is for Admins to approve the bonafide requests made by the students.
    ->To approve the bonafide request, the certifcate and message are stored in the formData variable and bonafideID,formData are passed with a PATCH api call using postBonafideFile()
    ->After successfully approving the bonafide request, the system fetches all bonafide requests for the admins.
    ->Following the successful approving the bonafide request and retrieval of all bonafide details, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const postBonafideFile = (location,navigate,bonafideID,formData) => async (dispatch) => {
    try{
        console.log(bonafideID,formData)
        const {data} = await api.postBonafideFile(bonafideID,formData)
        dispatch(getAllBonafide(location,navigate))
        console.log(data)
        navigate(location,{state:{status:200,message:"The Certificate is uploaded successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const viewFile = (request) => async (dispatch) => {
    try{
        console.log(request)
        const {data} = await api.viewFile(request)
        console.log(data)
        console.log(data.url[0])
        window.open(data.url[0], '_blank');
    }
    catch(err){
        console.log(err)
    }
}

/*  
    ->This Function is for Admins to reject the bonafide requests made by the students.
    ->To reject the bonafide request, the message is stored in the functionData variable and bonafideID,functionData are passed with a PATCH api call using rejectBonafide()
    ->After successfully rejecting the bonafide request, the system fetches all bonafide requests for the admins.
    ->Following the successful rejecting the bonafide request and retrieval of all bonafide details, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const rejectBonafide = (location,navigate,functionData,bonafideID) => async (dispatch) => {
    try{
        await api.rejectBonafide(bonafideID,functionData)
        dispatch(getAllBonafide(location,navigate))
        navigate(location,{state:{status:200,message:"The Request has been rejected successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins to delete the bonafide requests made by the students.
    ->To delete the bonafide request, bonafideID is passed with a DELETE api call using deleteBonafide()
    ->After successfully rejecting the bonafide request, the system fetches all bonafide requests for the admins.
    ->Following the successful rejecting the bonafide request and retrieval of all bonafide details, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const deleteBonafide = (location,navigate,bonafideID) => async (dispatch) => {
    try{
        await api.deleteBonafide(bonafideID)
        dispatch(getAllBonafide(location,navigate))
        navigate(location,{state:{status:200,message:"The Request is deleted successfully."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

