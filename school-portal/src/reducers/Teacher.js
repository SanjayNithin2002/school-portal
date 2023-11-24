const teacherReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches teacher details given the ID
        case 'FETCH_TEACHER': 
            return action.payload;
        // Fetches all teacher details into the store
        case 'FETCH_ALL_TEACHERS': 
            return action.payload;
        default : 
            return state;
    }
}
export default teacherReducer