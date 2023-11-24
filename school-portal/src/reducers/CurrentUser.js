const currentUserReducer = (state=null,action) =>{
    switch(action.type)
    {   
        // Fetches the current user details given the type and ID
        case 'FETCH_CURRENT_USER': 
            return action.payload;
        default : 
            return state;
    }
}
export default currentUserReducer