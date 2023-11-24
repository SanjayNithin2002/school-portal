const adminAttendanceReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetch admin attendance details with respect to a date
        case 'ALL_ADMIN_FETCH_ATTENDANCE' : 
            return action.payload;
        default : 
            return state;
    }
}
export default adminAttendanceReducer