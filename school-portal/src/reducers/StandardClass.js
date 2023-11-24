const standardClassReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches all sections' details given the standard
        case 'FETCH_STANDARD_CLASS': 
            return action.payload;
        default : 
            return state;
    }
}
export default standardClassReducer