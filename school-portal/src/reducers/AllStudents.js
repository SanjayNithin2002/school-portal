const allStudentsReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches all students' list and data into the store
        case 'FETCH_ALL_STUDENTS': 
            return action.payload;
        // Fetches all students in a class given the class ID
        case 'FETCH_CLASS_STUDENTS':
            return action.payload;
        default : 
            return state;
    }
}
export default allStudentsReducer