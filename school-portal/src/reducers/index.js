import { combineReducers } from "redux";
import currentUserReducer from "./CurrentUser"
import attendanceReducer from "./Attendance"
import classmessageReducer from "./ClassMessage";
import allStudentsReducer from "./AllStudents"
export default combineReducers({
    currentUserReducer,attendanceReducer,classmessageReducer,allStudentsReducer
})