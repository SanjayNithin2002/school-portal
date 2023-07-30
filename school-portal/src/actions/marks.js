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

export const getMarksForStudent = (userData) => async (dispatch) => {
    try{
        const { data } = await api.getMarksForStudent(userData)
        // console.log(data);
        dispatch({type:"FETCH_STUDENT_MARKS",payload:data})
    }
    catch(err){
        console.log(err)
    }
}
