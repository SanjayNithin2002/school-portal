const singleClassReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_CLASS_DETAILS': 
            return action.payload;
        default : 
            return state;
    }
}
export default singleClassReducer