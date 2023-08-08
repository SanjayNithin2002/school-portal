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
import examReducer from "./Exam"
import userLeaveReducer from "./UserLeave"
import allLeaveReducer from "./AllLeave"
import marksReducer from "./Marks"
import marksCSVReducer from "./MarksCSV"
export default combineReducers({
    currentUserReducer,marksCSVReducer,attendanceReducer,classmessageReducer,allStudentsReducer,bonafideReducer,assessmentsReducer,answersReducer,teacherReducer,adminReducer,timeTableReducer,allClassReducer,examReducer,allLeaveReducer,userLeaveReducer,marksReducer
})