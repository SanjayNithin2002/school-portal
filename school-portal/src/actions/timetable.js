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
