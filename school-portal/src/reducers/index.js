import { combineReducers } from "redux";
import currentUserReducer from "./CurrentUser"
import attendanceReducer from "./Attendance"
import classmessageReducer from "./ClassMessage";
import allStudentsReducer from "./AllStudents"
import bonafideReducer from "./Bonafide"
import subjectTeacherReducer from "./SubjectTeachers"
import assessmentsReducer from "./Assessments"

export default combineReducers({
    currentUserReducer,attendanceReducer,classmessageReducer,allStudentsReducer,bonafideReducer,subjectTeacherReducer
    ,assessmentsReducer
})