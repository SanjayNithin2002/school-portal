import * as api from "../api"

export const getClassMessage = (userData) => async (dispatch) => {
    try{
        console.log(userData)
        const { data } = await api.getClassMessage(userData)
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