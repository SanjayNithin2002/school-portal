const recordsReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_ALL_RECORDS': 
            return action.payload;
        default : 
            return state;
    }
}
export default recordsReducer