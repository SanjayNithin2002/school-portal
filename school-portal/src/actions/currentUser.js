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
