import * as api from "../api"

export const getClassMessage = (userData) => async (dispatch) => {
    try{
        console.log(userData)
        const { data } = await api.getClassMessage(userData)
        console.log(data);
        dispatch({type:"FETCH_CLASS_MESSAGE",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const postClassMessage = (message,navigate) => async () => {
    try{
        console.log(message)
        const { data } = await api.postClassMessage(message)
        console.log(data)
        navigate('/Home')
    }
    catch(err){
        console.log(err)
    }
}

export const deleteClassMessage = (messageID) => async (dispatch) => {
    try{
        console.log(messageID)
        const { data } = await api.deleteClassMessage(messageID)
        console.log(data)
        dispatch(getClassMessage({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }
    catch(err){
        console.log(err)
    }
}