import * as api from "../api";


/*  
    ->This Function is for Teachers to create the assessments for the students.
    ->To post new assessment, the assessment details are stored in the functionData variable and data is passed with a POST api call using postAssessment()
    ->After successfully creating the assessment, the system fetches the assessment details of the current user.
    ->Following the successful creation of the assessment and retrieval of assessment details, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
 */

export const postAssessment = (location,navigate,functionData) => async (dispatch) => {
    try {
        await api.postAssessment(functionData);
        dispatch(getAssessments(location,navigate,{type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        navigate(location,{state:{status:200,message:"New Assessment is posted successfully."}});
    } catch (err) {
        console.log(err);
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
};

/*  
    ->This Function is for Students and Teachers.
    ->userData contains the user type and user id is stored. 
    ->To fetch all the corresponsing assessments detail for the particular current User, the getAssessments(userData) API call is used, and the retrieved data is stored in the studentAttendanceReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

export const getAssessments = (location,navigate,userData) => async(dispatch) =>{
    try{
        const {data} = await api.getAssessments(userData);
        dispatch({type:'FETCH_USER_ASSESSMENTS',payload:data})  // this FETCH_USER_ASSESSMENTS type is located in the assessmentsReducer.js file.
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Students to fetch their uploaded answers for the assessments.
    ->userData contains the user type and user id is stored. 
    ->To fetch all the corresponsing answers detail for the particular, the getAssessments(userData) API call is used, and the retrieved data is stored in the answersReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

export const getAnswers = (location,navigate,userData) => async(dispatch) =>{
    try{
        const {data} = await api.getAnswers(userData);
        dispatch({type:'FETCH_USER_ANSWERS',payload:data})
    }
    catch(err){
        console.log(err)
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
}

/*  
    ->This Function is for Teachers to fetch students answer for the particular assessment.
    ->AssessmentID contains the unique id of an assessment  
    ->To fetch all the corresponsing student answers detail for the particular, the getAssessments(userData) API call is used, and the retrieved data is stored in the assessmentsReducer.
    ->In the event of an error or a response with a status code other than 200, the catch block is executed, and an error message is passed to the user.
*/

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

/*  
    ->This Function is for Students to upload answer for the corresponding assessment.
    ->To post new answer, the assessment ID and answer details are stored in the formData variable and data is passed with a POST api call using postAnswers()
    ->After successfully uploading the answer, the system fetches the answers details of the current user.
    ->Following the successful updating the answer and retrieval of answer details, the system passes a success message to the user
    ->If any error occurs during the POST API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
 */

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

/*  
    ->This Function is for Students to delete the uploaded answer in the corresponding assessment.
    ->To delete answer, the answerID is passed with a DELETE api call using deleteAnswers()
    ->After successfully deleting the answer, the system fetches the answers details of the current user.
    ->Following the successful deleting the answer and retrieval of answer details, the system passes a success message to the user
    ->If any error occurs during the DELETE API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
 */

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

/*  
    ->This Function is for Teachers to update the assessment details except question paper.
    ->To Update assessment details, the new assessment details are stored in the functionData variable. the functionData and assessment ID are passed with a PATCH api call using updateAssessment()
    ->After successfully Updating the assessment details, the system fetches the assessment details of the current user.
    ->Following the successful updating the assessment and retrieval of assessments detail, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
 */
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

/*  
    ->This Function is for Teachers to update the assessment question paper.
    ->To Update assessment question paper, the new question paper details are stored in the functionData variable. the functionData and assessment ID are passed with a PATCH api call using updateQuestionPaper()
    ->After successfully Updating the assessment question paper, the system fetches the assessments detail of the current user.
    ->Following the successful updating the assessment question paper and retrieval of assessments detail, the system passes a success message to the user
    ->If any error occurs during the PATCH API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
 */

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

/*  
    ->This Function is for Teacher to delete a particular assessment.
    ->To delete a assessment, the assessment ID is passed with a DELETE api call using deleteAssessment()
    ->After successfully deleting the assessment, the system fetches the assessments detail of the current user.
    ->Following the successful deleting the assessment and retrieval of assessments detail, the system passes a success message to the user
    ->If any error occurs during the DELETE API call, or if the API response does not have a status code of 200 (indicating a successful operation), the catch block gets executed. In this case, the system passes an error message to the user.
*/

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