const attendanceReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'STUDENT_FETCH_ATTENDANCE' : 
            return action.payload;
        default : 
            return state;
    }
}
export default attendanceReducer