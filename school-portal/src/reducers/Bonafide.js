const bonafideReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_STUDENT_BONAFIDE' : 
            return action.payload;
        case 'FETCH_ALL_BONAFIDE' : 
            return action.payload;
        default : 
            return state;
    }
}
export default bonafideReducer