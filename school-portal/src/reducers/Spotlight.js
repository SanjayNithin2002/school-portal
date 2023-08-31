const spotlightReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_USER_SPOTLIGHT': 
            return action.payload;
        default : 
            return state;
    }
}
export default spotlightReducer