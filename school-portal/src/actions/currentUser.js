import * as api from "../api"

export const setCurrentUser = (userData) => async(dispatch) =>{
    try{
        const {data} = await api.getCurrentUser(userData);
        dispatch({type:'FETCH_CURRENT_USER',payload:data})
        console.log(data);
    }
    catch(err){
        console.log(err)
    }
}

export const getClass = (userData) => async(dispatch) =>{
    try{
        const {data} = await api.getClass(userData);
        dispatch({type:'FETCH_SUBJECTS_AND_TEACHERS',payload:data})
        console.log(data);
    }
    catch(err){
        console.log(err)
    }
}

export const changeUserID = (type,userData,navigate) => async(dispatch) =>{
    try{
        console.log(userData);
        const {data} = await api.changeUserID(type,userData);
        dispatch(setCurrentUser({type:localStorage.getItem('type'),id:localStorage.getItem('id')}))
        console.log(data);
        navigate('/Home');
    }
    catch(err){
        console.log(err)
    }
}

export const changePassword = (type,userData,navigate) => async(dispatch) =>{
    try{
        console.log(userData);
        const {data} = await api.changePassword(type,userData);
        dispatch(setCurrentUser({type:localStorage.getItem('type'),id:localStorage.getItem('id')}))
        console.log(data);
        navigate('/Home');
    }
    catch(err){
        console.log(err)
    }
}