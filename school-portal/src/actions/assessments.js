import * as api from "../api";

export const postAssessment = (functionData, navigate) => async (dispatch) => {
    try {
        console.log(functionData);
        const { data } = await api.postAssessment(functionData);
        console.log(data);
        navigate("/Home");
    } catch (err) {
        console.log(err);
    }
};

export const getAssessments = (userData) => async(dispatch) =>{
    try{
        const {data} = await api.getAssessments(userData);
        dispatch({type:'FETCH_USER_ASSESSMENTS',payload:data})
        console.log(data);
    }
    catch(err){
        console.log(err)
    }
}