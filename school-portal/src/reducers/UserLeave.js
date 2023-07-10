const userLeaveReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_LEAVE_REQUEST': 
            return action.payload;
        default : 
            return state;
    }
}
export default userLeaveReducer