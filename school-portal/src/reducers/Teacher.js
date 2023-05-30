const teacherReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_TEACHER': 
            return action.payload;
        default : 
            return state;
    }
}
export default teacherReducer