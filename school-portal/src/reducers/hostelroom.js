const hostelRoomReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_ALL_ROOMS': 
            return action.payload;
        case 'FETCH_ROOM_DETAIL': 
            return action.payload;
        default : 
            return state;
    }
}
export default hostelRoomReducer