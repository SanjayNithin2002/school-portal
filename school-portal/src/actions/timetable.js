import * as api from "../api";

export const postTimeTable = (classData, navigate) => async (dispatch) => {
    try {
        console.log(classData);
        const { data } = await api.postTimeTable(classData);
        console.log(data);
        navigate("/Home");
    } catch (err) {
        console.log(err);
    }
};

export const getTimeTables = () => async (dispatch) => {
    try {
        const { data } = await api.getTimeTables();
        console.log(data);
        dispatch({type:"FETCH_ALL_TIMETABLE",payload:data});
    } catch (err) {
        console.log(err);
    }
};

export const getTimeTable = (standard) => async (dispatch) => {
    try {
        const { data } = await api.getTimeTable(standard);
        console.log(data);
        dispatch({type:"FETCH_CLASS_TIMETABLE",payload:data});
    } catch (err) {
        console.log(err);
    }
};