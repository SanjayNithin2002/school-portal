const feesReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_ALL_FEES': 
            return action.payload;
        default : 
            return state;
    }
}
export default feesReducer