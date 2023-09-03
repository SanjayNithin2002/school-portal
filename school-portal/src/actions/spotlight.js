import * as api from "../api";

export const getSpotlight = () => async (dispatch) => {
    try {
        const { data } = await api.getSpotlight();
        dispatch({ type: "FETCH_USER_SPOTLIGHT", payload: data });
    } catch (err) {
        console.log(err);
    }
};

export const postSpotlight = (FunctionData) => async (dispatch) => {
    try {
        console.log(FunctionData);
        const { data } = await api.postSpotlight(FunctionData);
        dispatch(getSpotlight());
        console.log(data);
    } catch (err) {
        console.log(err);
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

export const deleteSpotlight = (functionID) => async (dispatch) => {
    try {
        const { data } = await api.deleteSpotlight(functionID);
        dispatch(getSpotlight());
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};
