const timeTableReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches time tables for all classes
        case 'FETCH_ALL_TIMETABLE': 
            return action.payload;
        // Fetches time table for a class given the standard
        case 'FETCH_CLASS_TIMETABLE': 
            return action.payload;    
        default : 
            return state;
    }
}
export default timeTableReducer