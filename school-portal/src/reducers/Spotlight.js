const spotlightReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches the spotlight details into the store
        case 'FETCH_USER_SPOTLIGHT': 
            return action.payload;
        default : 
            return state;
    }
}
export default spotlightReducer