const answersReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches answers uploaded by a user given user type and ID
        case 'FETCH_USER_ANSWERS': 
            return action.payload;
        // Fetches assessment answers given the assessment ID
        case 'FETCH_ASSESSMENT_ANSWERS':
            return action.payload;
        default : 
            return state;
    }
}
export default answersReducer