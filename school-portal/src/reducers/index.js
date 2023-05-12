import { combineReducers } from "redux";
import currentUserReducer from "./CurrentUser"
import attendanceReducer from "./Attendance"
import classmessageReducer from "./ClassMessage";
export default combineReducers({
    currentUserReducer,attendanceReducer,classmessageReducer
})