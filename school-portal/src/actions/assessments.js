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

export const getAnswers = (userData) => async(dispatch) =>{
    try{
        const {data} = await api.getAnswers(userData);
        dispatch({type:'FETCH_USER_ANSWERS',payload:data})
        console.log(data);
    }
    catch(err){
        console.log(err)
    }
}

export const getAssessmentAnswers = (AssessmentID) => async(dispatch) =>{
    try{
        const {data} = await api.getAssessmentAnswers(AssessmentID);
        dispatch({type:'FETCH_ASSESSMENT_ANSWERS',payload:data})
        console.log(data);
    }
    catch(err){
        console.log(err)
    }
}

export const postAnswers = (formData) => async (dispatch) => {
    try {
        const { data } = await api.postAnswers(formData);
        console.log(data);
        dispatch(getAnswers({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    } catch (err) {
        console.log(err);
    }
};


export const deleteAnswers = (answerID) => async (dispatch) => {
    try{
        const { data } = await api.deleteAnswers(answerID);
        console.log(data);
        dispatch(getAnswers({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    } catch (err) {
        console.log(err);
    }
}


export const updateAssessment = (assessmentID,functionData,navigate) => async (dispatch) => {
    try{
        const { data } = await api.updateAssessment(assessmentID,functionData);
        console.log(data);
        dispatch(getAssessments({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    } catch (err) {
        console.log(err);
    }
}

export const updateQuestionPaper = (assessmentID,functionData,navigate) => async (dispatch) => {
    try{
        const { data } = await api.updateQuestionPaper(assessmentID,functionData);
        console.log(data);
        dispatch(getAssessments({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    } catch (err) {
        console.log(err);
    }
}

export const deleteAssessment = (assessmentID,navigate) => async (dispatch) => {
    try{
        const { data } = await api.deleteAssessment(assessmentID);
        console.log(data);
        navigate('/Assessment');
        dispatch(getAssessments({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    } catch (err) {
        console.log(err);
    }
}