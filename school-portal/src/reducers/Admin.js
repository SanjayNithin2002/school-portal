const adminReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_ALL_ADMINS': 
            return action.payload;
        default : 
            return state;
    }
}
export default adminReducer