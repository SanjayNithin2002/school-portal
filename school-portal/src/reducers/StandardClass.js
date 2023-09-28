const standardClassReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_STANDARD_CLASS': 
            return action.payload;
        default : 
            return state;
    }
}
export default standardClassReducer