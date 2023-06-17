import * as api from "../api"

export const createExam = (examData,navigate) => async () => {
    try{
        await Promise.all(
            examData.map(async (item) => {
                console.log(item)
                const { data } = await api.createExam(item)
                console.log(data)
            })
        );
        navigate('/Home')

    }
    catch(err){
        console.log(err)
    }
}

export const getExam = (examData) => async(dispatch) =>{
    try{
        console.log(examData)
        const {data} = await api.getExam(examData)
        dispatch({type:'FETCH_EXAM_DETAILS',payload:data})
    }
    catch(err){
        console.log(err)
    }
}