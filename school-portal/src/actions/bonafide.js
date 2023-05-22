import * as api from "../api"

export const requestBonafide = (requestData,navigate) => async (dispatch) => {
    try{
        console.log(requestData)
        const {data} = await api.requestBonafide(requestData)
        console.log(data)
        navigate('/Bonafide',{state:{message:"success"}});
    }
    catch(err){
        console.log(err)
    }
}