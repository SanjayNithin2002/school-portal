const adminAttendanceReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'ALL_ADMIN_FETCH_ATTENDANCE' : 
            return action.payload;
        default : 
            return state;
    }
}
export default adminAttendanceReducer