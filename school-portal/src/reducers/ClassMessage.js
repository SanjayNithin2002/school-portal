const classmessageReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches class messages given the user type and ID
        case 'FETCH_CLASS_MESSAGE' : 
            return action.payload;
        default : 
            return state;   
    }
}
export default classmessageReducer