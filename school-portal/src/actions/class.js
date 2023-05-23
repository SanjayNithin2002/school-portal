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