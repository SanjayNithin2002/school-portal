import React from "react";
import { Routes,Route,BrowserRouter} from "react-router-dom"
import App from "./App"
import Navbar from "./components/NavBar/Navbar";
import StudentDashboard from "./Pages/Dashboard/StudentDashboard"
import TeacherDashboard from "./Pages/Dashboard/TeacherDashboard";
import Attendance from "./Pages/Attendance/Attendance"
import Error404 from "./Pages/Error404";
import ContactUsStudent from "./Pages/ContactUs/ContactUsStudent";
import ContactUsTeacher from "./Pages/ContactUs/ContactUsTeacher";
import Leave from "./Pages/Leave/Leave";
import Assessments from "./Pages/Assessments/Assessments";
import Teacher from "./Pages/Teacher/Teacher";
import Settings from "./Pages/Settings/Settings";
import ViewAssessment from "./Pages/Assessments/ViewAssessment";
import Marks from "./Pages/Marks/Marks";
import Bonafide from "./Pages/Bonafide/Bonafide";
import StudentInfo from "./Pages/Student/StudentInfo";
import TeacherInfo from "./Pages/Teacher/TeacherInfo";
import StudentList from "./Pages/Student/StudentList";
import PostStudent from "./Pages/Attendance/PostStudent2";
import PostStudent1 from "./Pages/Attendance/PostStudent1";
import ClassMessage from "./Pages/ClassMessage/ClassMessage";
import Timetable from "./Pages/Time table/timetable";
import PostAssessment from "./Pages/Assessments/PostAssessment"
import NewAssessment from "./Pages/Assessments/NewAssessment"
import Exam from "./Pages/Exam/Exam"
import AddStudent from "./Pages/Student/AddStudent";
import AddTeacher from "./Pages/Teacher/AddTeacher";
import Fees from "./Pages/Fees/Fees";
import AddExam from "./Pages/Exam/AddExam";
import Meeting from "./Pages/Meeting/Meeting";
import AddMeeting from "./Pages/Meeting/AddMeeting";
import MarksTeacher from "./Pages/Marks/MarksTeacher";
import AdminBonafide from "./Pages/Bonafide/AdminBonafide";
import Student from "./components/SideNavBar/Student";

const AllRoutes = () => {
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/StudentDashboard' element={<StudentDashboard/>}/>
                <Route path='/TeacherDashboard' element={<TeacherDashboard/>}/>
                <Route path='/Attendance' element={<Attendance/>}/>
                <Route path='/Leave' element={<Leave/>}/>
                <Route path='/ContactUsStudent' element={<ContactUsStudent/>}/>
                <Route path='/ContactUsTeacher' element={<ContactUsTeacher/>}/>
                <Route path='/Assessment' element={<Assessments/>}/>
                <Route path='/Assessment/:id' element={<ViewAssessment />}/>
                <Route path='/PostAssessment/:id' element={<PostAssessment />}/>
                <Route path='/PostAssessment' element={<NewAssessment />}/>
                <Route path='/Marks' element={<Marks/>}/>
                <Route path='/Teachers' element={<Teacher/>}/>
                <Route path='/Setting' element={<Settings/>}/>
                <Route path='/Bonafide' element={<Bonafide/>}/>
                <Route path='/StudentInfo' element={<StudentInfo/>}/>
                <Route path='/AddStudent' element={<AddStudent/>}/>
                <Route path='/StaffInfo' element={<TeacherInfo/>}/>
                <Route path='/StudentList' element={<StudentList/>}/>
                <Route path='/PostAttendance' element={<PostStudent/>}/>
                <Route path='/PostAttendance1' element={<PostStudent1/>}/>
                <Route path='/ClassMessage' element={<ClassMessage/>}/>
                <Route path='/timetable' element={<Timetable/>}/> 
                <Route path='*' element={<Error404/>}/>
                <Route path='/Exam' element={<Exam/>}/>
                <Route path='/AddStaff' element={<AddTeacher/>}/>
                <Route path='/Payment' element={<Fees/>}/>
                <Route path='/AddSchedule' element={<AddExam/>} />
                <Route path='/Meeting' element={<Meeting/>} />
                <Route path='/AddMeeting' element={<AddMeeting/>} />
                <Route path='/MarksTeacher' element={<MarksTeacher/>} />
                <Route path='/AdminBonafide' element={<AdminBonafide/>} />
                
            </Routes>
        </BrowserRouter>
    )
}
export default AllRoutes;