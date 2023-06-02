import { combineReducers } from "redux"
import currentUserReducer from "./CurrentUser"
import attendanceReducer from "./Attendance"
import classmessageReducer from "./ClassMessage"
import allStudentsReducer from "./AllStudents"
import bonafideReducer from "./Bonafide"
import subjectTeacherReducer from "./SubjectTeachers"
import assessmentsReducer from "./Assessments"
import answersReducer from "./Answers"
import teacherReducer from "./Teacher"
import adminReducer from "./Admin"

export default combineReducers({
    currentUserReducer,attendanceReducer,classmessageReducer,allStudentsReducer,bonafideReducer,subjectTeacherReducer
    ,assessmentsReducer,answersReducer,teacherReducer,adminReducer
})