const assessmentsReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches assessment details given the user type and ID
        case 'FETCH_USER_ASSESSMENTS': 
            return action.payload;
        default : 
            return state;
    }
}
export default assessmentsReducer