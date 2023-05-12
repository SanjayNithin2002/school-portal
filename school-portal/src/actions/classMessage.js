import * as api from "../api"

export const getClassMessage = (classid) => async (dispatch) => {
    try{
        const { data } = await api.getClassMessage(classid)
        dispatch({type:"FETCH_CLASS_MESSAGE",payload:data})
    }
    catch(err){
        console.log(err)
    }
}
