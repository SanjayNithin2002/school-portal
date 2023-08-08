const marksCSVReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_MARKS_CSV' : 
            return action.payload;
        default : 
            return state;
    }
}
export default marksCSVReducer