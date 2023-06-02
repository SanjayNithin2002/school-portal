const allStudentsReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_ALL_STUDENTS': 
            return action.payload;
        case 'FETCH_CLASS_STUDENTS':
            return action.payload;
        default : 
            return state;
    }
}
export default allStudentsReducer