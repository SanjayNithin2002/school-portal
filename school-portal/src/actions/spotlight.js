import * as api from "../api";

export const getSpotlight = (location,navigate) => async (dispatch) => {
    try {
        const { data } = await api.getSpotlight();
        dispatch({ type: "FETCH_USER_SPOTLIGHT", payload: data });
    } catch (err) {
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
        console.log(err);
    }
};

export const postSpotlight = (location,navigate,FunctionData) => async (dispatch) => {
    try {
        console.log(FunctionData);
        const { data } = await api.postSpotlight(FunctionData);
        dispatch(getSpotlight());
        console.log(data);
        navigate(location,{state:{status:200,message:"Spotlight message has been posted successfully."}});
    } catch (err) {
        console.log(err);
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
};

export const updateSpotlight = (FunctionData) => async (dispatch) => {
    try {
        console.log(FunctionData);
        const { data } = await api.updateSpotlight(FunctionData);
        dispatch(getSpotlight());
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

export const deleteSpotlight = (location,navigate,functionID) => async (dispatch) => {
    try {
        const { data } = await api.deleteSpotlight(functionID);
        dispatch(getSpotlight());
        console.log(data);
        navigate(location,{state:{status:200,message:"Spotlight message has been deleted successfully."}});
    } catch (err) {
        console.log(err);
        navigate(location,{state:{status:err.response.status,message:err.response.data.message ? err.response.data.message :"Kindly refresh the page.\nIf the error cause again contact your admin."}});
    }
};
