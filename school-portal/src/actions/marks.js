import * as api from "../api"

export const getMarks = (userData) => async (dispatch) => {
    try {
        const { data } = await api.getMarks(userData)
        // console.log(data);   
        dispatch({ type: "FETCH_MARKS", payload: data })
    }
    catch (err) {
        console.log(err)
    }
}
export const getMarksCSV = (userData) => async (dispatch) => {
    try {
        const data = await api.getMarksCSV(userData)
        // console.log(data);   
        dispatch({ type: "FETCH_MARKS_CSV", payload: data })
    }
    catch (err) {
        console.log(err)
    }
}
export const getMarksByAssessmentID = (userData) => async (dispatch) => {
    try {
        const { data } = await api.getMarksByAssessmentID(userData)
        // console.log(data);
        dispatch({ type: "FETCH_MARKS", payload: data })
    }
    catch (err) {
        console.log(err)
    }
}
export const getMarksByExamID = (userData) => async (dispatch) => {
    try {
        const { data } = await api.getMarksByExamID(userData)
        // console.log(data);
        dispatch({ type: "FETCH_MARKS", payload: data })
    }
    catch (err) {
        console.log(err)
    }
}


export const getMarksForStudent = (userData) => async (dispatch) => {
    try {
        const { data } = await api.getMarksForStudent(userData)
        // console.log(data);
        dispatch({ type: "FETCH_STUDENT_MARKS", payload: data })
    }
    catch (err) {
        console.log(err)
    }
}

export const postMarks = (updateData) => async () => {
    try {
        const { data } = await api.postMarks(updateData)
        console.log(data);
    }
    catch (err) {
        console.log(err)
    }
}
export const delMarks = (updateData) => async () => {
    try {
        const { data } = await api.delMarks(updateData)
        console.log(data);
    }
    catch (err) {
        console.log(err)
    }
}

export const postMany = (marksData) => async () => {
    try {
        const { data } = await api.postMany(marksData)
        console.log(data);
    }
    catch (err) {
        console.log(err)
    }
}
export const postManyFile = (formData) => async () => {
    try {
        const { data } = await api.postManyFile(formData)
        console.log(data);
    }
    catch (err) {
        console.log(err)
    }
}
