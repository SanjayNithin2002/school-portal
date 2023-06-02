const teacherReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_TEACHER': 
            return action.payload;
        case 'FETCH_ALL_TEACHERS': 
            return action.payload;
        default : 
            return state;
    }
}
export default teacherReducer