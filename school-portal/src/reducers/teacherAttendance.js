const teacherAttendanceReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches teacher attendance given the date
        case 'ALL_TEACHER_FETCH_ATTENDANCE' : 
            return action.payload;
        default : 
            return state;
    }
}
export default teacherAttendanceReducer