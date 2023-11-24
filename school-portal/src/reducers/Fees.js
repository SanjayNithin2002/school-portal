const feesReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches all fees data present into the store
        case 'FETCH_ALL_FEES': 
            return action.payload;
        default : 
            return state;
    }
}
export default feesReducer