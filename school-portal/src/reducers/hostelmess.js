const hostelMessReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_ALL_MESS': 
            return action.payload;
        case 'FETCH_MESS_DETAIL': 
            return action.payload;
        default : 
            return state;
    }
}
export default hostelMessReducer