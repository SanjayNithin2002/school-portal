import * as api from "../api";

export const postAssessment = (location,navigate,functionData) => async (dispatch) => {
    try {
        console.log(functionData);
        const { data } = await api.postAssessment(functionData);
        console.log(data);
        dispatch(getAssessments(location,navigate,{type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate(location,{state:{status:200,message:"New Assessment is posted successfully."}});
    } catch (err) {
        console.log(err);
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
};

export const getAssessments = (location,navigate,userData) => async(dispatch) =>{
    try{
        const {data} = await api.getAssessments(userData);
        dispatch({type:'FETCH_USER_ASSESSMENTS',payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getAnswers = (location,navigate,userData) => async(dispatch) =>{
    try{
        const {data} = await api.getAnswers(userData);
        dispatch({type:'FETCH_USER_ANSWERS',payload:data})
        // console.log(data);
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const getAssessmentAnswers = (location,navigate,AssessmentID) => async(dispatch) =>{
    try{
        const {data} = await api.getAssessmentAnswers(AssessmentID);
        dispatch({type:'FETCH_ASSESSMENT_ANSWERS',payload:data})
        console.log(data);
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const postAnswers = (location,navigate,formData) => async (dispatch) => {
    try {
        const { data } = await api.postAnswers(formData);
        console.log(data);
        dispatch(getAnswers(location,navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate(location,{state:{status:200,message:"Your answer has been uploaded successfully."}});
    } catch (err) {
        console.log(err);
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
};


export const deleteAnswers = (location,navigate,answerID) => async (dispatch) => {
    try{
        const { data } = await api.deleteAnswers(answerID);
        console.log(data);
        dispatch(getAnswers(location,navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate(location,{state:{status:200,message:"Your answer has been deleted successfully."}});
    } catch (err) {
        console.log(err);
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}


export const updateAssessment = (location,navigate,assessmentID,functionData) => async (dispatch) => {
    try{
        const { data } = await api.updateAssessment(assessmentID,functionData);
        console.log(data);
        dispatch(getAssessments(location,navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate(location,{state:{status:200,message:"Assessment details are updated successfully."}});
    } catch (err) {
        console.log(err);
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const updateQuestionPaper = (location,navigate,assessmentID,functionData) => async (dispatch) => {
    try{
        const { data } = await api.updateQuestionPaper(assessmentID,functionData);
        console.log(data);
        dispatch(getAssessments(location,navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate(location,{state:{status:200,message:"Assessment question paper has been updated successfully."}});
    } catch (err) {
        console.log(err);
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

export const deleteAssessment = (location,navigate,assessmentID) => async (dispatch) => {
    try{
        const { data } = await api.deleteAssessment(assessmentID);
        console.log(data);
        dispatch(getAssessments(location,navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate(location,{state:{status:200,message:"The Assessment has been deleted successfully."}});
    } catch (err) {
        console.log(err);
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}