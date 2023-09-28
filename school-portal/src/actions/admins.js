import * as api from "../api"

export const requestAdmins = (location,navigate) => async (dispatch) => {
    try{
        const {data} = await api.requestAdmins()
        console.log(data)
        dispatch({type:'FETCH_ALL_ADMINS',payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}