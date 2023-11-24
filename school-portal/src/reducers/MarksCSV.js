const marksCSVReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches student marks list given the standard and section of the class
        case 'FETCH_MARKS_CSV' : 
            return action.payload;
        default : 
            return state;
    }
}
export default marksCSVReducer