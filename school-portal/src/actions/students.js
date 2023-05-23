import * as api from "../api"

export const requestStudents = () => async (dispatch) => {
    try{
        const {data} = await api.requestStudents()
        console.log(data)
        if(data.docs)
        dispatch({type:'FETCH_ALL_STUDENTS',payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const updateSection = (studentData,navigate) => async (dispatch) => {
    try{
        await Promise.all(
            studentData.map(async (item) => {
                console.log(item);
                const { data } = await api.updateSection(item.student._id,item.request);
                console.log(data);
            })
        );
        navigate('/Home');
    }   
    catch(err){
        console.log(err)
    }
}