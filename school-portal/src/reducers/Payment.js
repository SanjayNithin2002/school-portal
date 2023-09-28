const paymentReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_STUDENT_PAYMENT': 
            return action.payload;
        default : 
            return state;
    }
}
export default paymentReducer