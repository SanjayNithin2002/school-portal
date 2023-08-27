const busReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_ALL_BUSES': 
            return action.payload;
        case 'FETCH_BUS_DETAIL': 
            return action.payload;
        default : 
            return state;
    }
}
export default busReducer