const attendanceReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_ATTENDANCE' : 
            return action.payload;
        default : 
            return state;
    }
}
export default attendanceReducer