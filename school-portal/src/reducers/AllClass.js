const allClassReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FETCH_ALL_CLASSES': 
            return action.payload;
        default : 
            return state;
    }
}
export default allClassReducer