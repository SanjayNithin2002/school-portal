import * as api from "../api"

export const requestAdmins = () => async (dispatch) => {
    try{
        const {data} = await api.requestAdmins()
        console.log(data)
        dispatch({type:'FETCH_ALL_ADMINS',payload:data})
    }
    catch(err){
        console.log(err)
    }
}