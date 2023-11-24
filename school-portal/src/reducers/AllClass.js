const allClassReducer = (state=null,action) =>{
    switch(action.type)
    {
        // Returns deteails of all classes present in the school     
        case 'FETCH_ALL_CLASSES': 
            return action.payload;
        // Returns details of the class based on user tyoe and id
        case 'FETCH_CLASS_DETAILS':
            return action.payload;
        default : 
            return state;
    }
}
export default allClassReducer