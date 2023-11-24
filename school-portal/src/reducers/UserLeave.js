const userLeaveReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches leave requests for user given type and ID
        case 'FETCH_LEAVE_REQUEST': 
            return action.payload;
        default : 
            return state;
    }
}
export default userLeaveReducer