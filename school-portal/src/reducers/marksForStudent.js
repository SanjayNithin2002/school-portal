const studentMarksReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_STUDENT_MARKS' : 
            // console.log(action.payload);
            return action.payload;
        default : 
            return state;
    }
}
export default studentMarksReducer