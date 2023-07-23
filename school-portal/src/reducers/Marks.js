const marksReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_MARKS' : 
            return action.payload;
        default : 
            return state;
    }
}
export default marksReducer