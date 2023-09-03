const answersReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_USER_ANSWERS': 
            return action.payload;
        case 'FETCH_ASSESSMENT_ANSWERS':
            return action.payload;
        default : 
            return state;
    }
}
export default answersReducer