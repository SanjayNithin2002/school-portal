const paymentReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetches payment detials given the user type and ID
        case 'FETCH_STUDENT_PAYMENT': 
            return action.payload;
        default : 
            return state;
    }
}
export default paymentReducer