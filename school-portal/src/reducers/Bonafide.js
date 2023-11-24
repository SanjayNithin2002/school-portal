const bonafideReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches student bonafide given the student ID
        case 'FETCH_STUDENT_BONAFIDE' : 
            return action.payload;
        // Fetches all bonafides of all to the store
        case 'FETCH_ALL_BONAFIDE' : 
            return action.payload;
        default : 
            return state;
    }
}
export default bonafideReducer