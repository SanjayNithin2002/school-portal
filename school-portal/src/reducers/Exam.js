const examReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches exam details given the standard
        case 'FETCH_EXAM_DETAILS' : 
            return action.payload;
        // Fetches exam data for a user (student) given type and ID
        case 'FETCH_STUDENT_EXAM' : 
            return action.payload;
        default : 
            return state;
    }
}
export default examReducer