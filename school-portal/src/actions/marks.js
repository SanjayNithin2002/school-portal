import * as api from "../api"

export const getMarks = (userData) => async (dispatch) => {
    try{
        const { data } = await api.getMarks(userData)
        // console.log(data);   
        dispatch({type:"FETCH_MARKS",payload:data})
    }
    catch(err){
        console.log(err)
    }
}
