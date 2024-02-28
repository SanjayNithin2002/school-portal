import * as api from "../api"

/*  
    ->This Function is for Admins to create a new class details.
    ->To create a new class details, the class details are stored in the classData variable and classData is passed with a POST api call using createClass()
    ->After successfully creating the new class details, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const createClass = (location,navigate,classData) => async (dispatch) => {
    try{
        await api.createClass(classData);
        navigate(location,{state:{status:200,message:"The class is been created successfully."}})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins to get all the class details.
    ->To fetch all the class detail , the getAllClass() GET API call is used, and the retrieved data is stored in the allClassReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

export const getAllClass = (location,navigate) => async(dispatch) =>{
    try{
        const {data} = await api.getAllClass();
        dispatch({type:'FETCH_ALL_CLASSES',payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins to get the particular standard class details.
    ->To fetch the class detail , the getStandardClass(standard) GET API call is used, and the retrieved data is stored in the standardClassReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

export const getStandardClass = (location,navigate,standard) => async(dispatch) =>{
    try{
        const {data} = await api.getStandardClass(standard);
        dispatch({type:'FETCH_STANDARD_CLASS',payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Students to get their class details.
    ->userData contains the user type and user id is stored. 
    ->To fetch the class detail , the getClass(userData) GET API call is used, and the retrieved data is stored in the allClassReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

export const getClass = (location,navigate,userData) => async(dispatch) =>{
    try{
        const {data} = await api.getClass(userData);
        dispatch({type:'FETCH_CLASS_DETAILS',payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Admins to update the time table(class timings,change the subject teacher,class teacher,etc..).
    ->To update the timetable, the timetable details are stored in the classData variable and classData is passed with a PATCH api call using updateClassDetails()
    ->After successfully updating the timetable, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

export const updateClassDetails = (location,navigate,classData) => async (dispatch) => {
    try{
        await api.updateClassDetails(classData);
        navigate(location,{state:{status:200,message:"TimeTable has been updated."}});
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}
