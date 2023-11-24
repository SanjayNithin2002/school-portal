const adminReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Fetch all admin data and update redux store
        case 'FETCH_ALL_ADMINS': 
            return action.payload;
        default : 
            return state;
    }
}
export default adminReducer