const subjectTeacherReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_SUBJECTS_AND_TEACHERS': 
            return action.payload;
        default : 
            return state;
    }
}
export default subjectTeacherReducer