import * as api from "../api"

export const postBusDetails = (busData) => async (dispatch) => {
    try{
        const {data} = await api.postBusDetails(busData)
        console.log(data)
        dispatch(getBusDetails());
    }
    catch(err){
        console.log(err)
    }
}

export const getBusDetails = () => async (dispatch) => {
    try{
        const {data} = await api.getBusDetails()
        console.log(data)
        dispatch({type:"FETCH_ALL_BUSES",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const getBusDetail = (busID) => async (dispatch) => {
    try{
        const {data} = await api.getBusDetail(busID)
        console.log(data)
        dispatch({type:"FETCH_BUS_DETAIL",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const updateBusDetails = (busID,busData) => async (dispatch) => {
    try{
        const {data} = await api.updateBusDetails(busID,busData);
        console.log(data);
        dispatch(getBusDetails());
    }
    catch(err){
        console.log(err)
    }
}

export const deleteBusDetails = (busID) => async (dispatch) => {
    try{
        const {data} = await api.deleteBusDetails(busID);
        console.log(data);
        dispatch(getBusDetails());
    }
    catch(err){
        console.log(err)
    }
}