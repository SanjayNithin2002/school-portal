const recordsReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fethes all user records to the store
        case 'FETCH_ALL_RECORDS': 
            return action.payload;
        default : 
            return state;
    }
}
export default recordsReducer