const classmessageReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_CLASS_MESSAGE' : 
            return action.payload;
        default : 
            return state;   
    }
}
export default classmessageReducer