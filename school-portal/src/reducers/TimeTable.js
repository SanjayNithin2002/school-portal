const timeTableReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_ALL_TIMETABLE': 
            return action.payload;
        case 'FETCH_CLASS_TIMETABLE': 
            return action.payload;    
        default : 
            return state;
    }
}
export default timeTableReducer