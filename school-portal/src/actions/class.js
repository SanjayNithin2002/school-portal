import * as api from "../api"

export const createClass = (classData,navigate) => async (dispatch) => {
    try{
        await Promise.all(
            classData.map(async (item) => {
                console.log(item);
                const { data } = await api.createClass(item);
                console.log(data);
            })
          );
        navigate('/Home')

    }
    catch(err){
        console.log(err)
    }
}

export const getAllClass = () => async(dispatch) =>{
    try{
        const {data} = await api.getAllClass();
        dispatch({type:'FETCH_ALL_CLASSES',payload:data})
        console.log(data);
    }
    catch(err){
        console.log(err)
    }
}

export const getStandardClass = (standard) => async(dispatch) =>{
    try{
        console.log(standard)
        const {data} = await api.getStandardClass(standard);
        dispatch({type:'FETCH_STANDARD_CLASS',payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const getClass = (userData) => async(dispatch) =>{
    try{
        // console.log(userData)
        const {data} = await api.getClass(userData);
        dispatch({type:'FETCH_CLASS_DETAILS',payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const updateClassDetails = (classData,navigate) => async (dispatch) => {
    try{
        console.log(classData);
        const { data } = await api.updateClassDetails(classData);
		dispatch(getAllClass());
        console.log(data);
        navigate('/Home')
    }
    catch(err){
        console.log(err)
    }
}
//