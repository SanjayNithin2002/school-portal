const studentAttendanceReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches student attendance given the standard, sectin and date
        case 'ALL_STUDENT_FETCH_ATTENDANCE' : 
            return action.payload;
        default : 
            return state;
    }
}
export default studentAttendanceReducer