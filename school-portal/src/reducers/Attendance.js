const attendanceReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'USER_FETCH_ATTENDANCE' : 
            return action.payload;
        default : 
            return state;
    }
}
export default attendanceReducer