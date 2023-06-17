const examReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_EXAM_DETAILS' : 
            return action.payload;
        default : 
            return state;
    }
}
export default examReducer