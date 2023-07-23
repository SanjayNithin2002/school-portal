import * as api from "../api"

export const getMarks = (examData) => async (dispatch) => {
    try{
        const { data } = await api.getMarks()
        // console.log(data);
        dispatch({type:"FETCH_MARKS",payload:data})
    }
    catch(err){
        console.log(err)
    }
}
