const allLeaveReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches all leave requests posted
        case 'FETCH_ALL_LEAVE_REQUEST': 
            return action.payload;
        default : 
            return state;
    }
}
export default allLeaveReducer