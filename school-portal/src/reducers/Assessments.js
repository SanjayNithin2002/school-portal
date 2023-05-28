const assessmentsReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_USER_ASSESSMENTS': 
            return action.payload;
        default : 
            return state;
    }
}
export default assessmentsReducer