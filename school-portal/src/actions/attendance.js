import * as api from "../api"

export const getAttendance = (userid,navigate) => async (dispatch) => {
    try{
        const { data } = await api.getAttendance(userid)
        dispatch({type:"FETCH_ATTENDANCE",payload:data})
    }
    catch(err){
        console.log(err)
    }
}
