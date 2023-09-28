import * as api from "../api"

export const setCurrentUser = (location,navigate,userData) => async(dispatch) =>{
    try{
        const {data} = await api.getCurrentUser(userData);
        dispatch({type:'FETCH_CURRENT_USER',payload:data})
        console.log(data);
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}



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