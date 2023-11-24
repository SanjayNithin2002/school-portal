const marksReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches marks either by marks ID or all marks details
        case 'FETCH_MARKS' : 
            return action.payload;
        // Fetches student marks given the student ID
        case 'FETCH_STUDENT_MARKS' : 
            return action.payload;
        default : 
            return state;
    }
}
export default marksReducer