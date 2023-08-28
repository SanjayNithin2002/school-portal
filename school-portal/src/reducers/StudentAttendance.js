const studentAttendanceReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'ALL_STUDENT_FETCH_ATTENDANCE' : 
            return action.payload;
        default : 
            return state;
    }
}
export default studentAttendanceReducer