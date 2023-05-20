import * as api from "../api"
import { setCurrentUser } from "./currentUser"

export const logIn = (authData,navigate) => async (dispatch) => {
    try{
        localStorage.setItem("type",authData.type);
        navigate("Home");

        console.log(authData); 
        // const { data } = await api.logIn(authData)
        // data.message && data.status==="Error" ?  dispatch({type:"AUTH_ERROR",payload:data}) : dispatch({type:"Auth",data})
        // dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile')).result))
        // data.message && data.status==="Error" ?  navigate('/') : navigate('/Home')
    }
    catch(err){
        console.log(err)
    }
}
