const attendanceReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches user attendance given the user type and ID
        case 'USER_FETCH_ATTENDANCE' : 
            return action.payload;
        default : 
            return state;
    }
}
export default attendanceReducer