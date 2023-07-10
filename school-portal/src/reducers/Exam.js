const examReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_EXAM_DETAILS' : 
            return action.payload;
        case 'FETCH_STUDENT_EXAM' : 
            return action.payload;
        default : 
            return state;
    }
}
export default examReducer