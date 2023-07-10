import { combineReducers } from "redux"
import currentUserReducer from "./CurrentUser"
import attendanceReducer from "./Attendance"
import classmessageReducer from "./ClassMessage"
import allStudentsReducer from "./AllStudents"
import bonafideReducer from "./Bonafide"
import assessmentsReducer from "./Assessments"
import answersReducer from "./Answers"
import teacherReducer from "./Teacher"
import adminReducer from "./Admin"
import timeTableReducer from "./TimeTable"
import allClassReducer from "./AllClass"
import singleClassReducer from "./SingleClass"
import examReducer from "./Exam"
import userLeaveReducer from "./UserLeave"
import allLeaveReducer from "./AllLeave"

export default combineReducers({
    currentUserReducer,attendanceReducer,classmessageReducer,allStudentsReducer,bonafideReducer,assessmentsReducer,answersReducer,teacherReducer,adminReducer,timeTableReducer,allClassReducer,singleClassReducer,examReducer,allLeaveReducer,userLeaveReducer
})