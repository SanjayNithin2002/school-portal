import React from "react";
import { Routes,Route,BrowserRouter} from "react-router-dom"
import App from "./App"
import Navbar from "./components/NavBar/Navbar";
import Home from "./Pages/Dashboard/Home";
import Attendance from "./Pages/Attendance/Attendance"
import Error404 from "./Pages/Error404";
import ContactUs from "./Pages/ContactUs/ContactUs";
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
import PostStudent from "./Pages/Attendance/PostStudent";
import PostTeacher from "./Pages/Attendance/PostTeacher";
import ClassMessage from "./Pages/ClassMessage/ClassMessage";
import Timetable from "./Pages/Time table/timetable";
import PostAssessment from "./Pages/Assessments/PostAssessment"
import NewAssessment from "./Pages/Assessments/NewAssessment"
import Exam from "./Pages/Exam/Exam"
import AddStudent from "./Pages/Student/AddStudent";
import AddTeacher from "./Pages/Teacher/AddTeacher";
import Fees from "./Pages/Fees/Fees";
import AddExam from "./Pages/Exam/AddExam";
import UploadMarks from "./Pages/Marks/UploadMarks";
import EditMarks from "./Pages/Marks/EditMarks";
import Meeting from "./Pages/Meeting/Meeting";
import AddMeeting from "./Pages/Meeting/AddMeeting";
import CreateClass from "./Pages/Class/CreateClass";
import ClassInfo from "./Pages/Class/ClassInfo";
import ViewBonafide from "./Pages/Bonafide/ViewBonafide";
import UpdateLeave from "./Pages/Leave/UpdateLeave";
import AddTimeTable from "./Pages/Time table/AddTimeTable";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import BusHostel from "./Pages/BusHostel/BusHostel";
import Profile from "./Pages/Profile/Profile"

const AllRoutes = () => {
    return(
        <BrowserRouter>
            <Navbar/>
            <SideNavBar/>
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/Home' element={<Home/>}/>
                <Route path='/Attendance' element={<Attendance/>}/>
                <Route path='/Leave' element={<Leave/>}/>
                <Route path='/ContactUs' element={<ContactUs/>}/>                
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
                <Route path='/PostStudentAttendance' element={<PostStudent/>}/>
                <Route path='/PostTeacherAttendance' element={<PostTeacher/>}/>
                <Route path='/ClassMessage' element={<ClassMessage/>}/>
                <Route path='/timetable' element={<Timetable/>}/> 
                <Route path='*' element={<Error404/>}/>
                <Route path='/Exam' element={<Exam/>}/>
                <Route path='/AddStaff' element={<AddTeacher/>}/>
                <Route path='/Payment' element={<Fees/>}/>
                <Route path='/AddSchedule' element={<AddExam/>} />
                <Route path='/UploadMarks' element={<UploadMarks/>} />
                <Route path='/EditMarks' element={<EditMarks/>} />
                <Route path='/Meeting' element={<Meeting/>} />
                <Route path='/AddMeeting' element={<AddMeeting/>} />
                <Route path='/CreateClass' element={<CreateClass/>} />
                <Route path='/ClassInfo' element={<ClassInfo/>} />
                <Route path='/ViewBonafide' element={<ViewBonafide/>} />
                <Route path='/PostLeave' element={<UpdateLeave/>}/>
                <Route path='/AddTimeTable' element={<AddTimeTable/>}/>
                <Route path='/busHostel' element={<BusHostel/>}/>
                <Route path='/Profile' element={<Profile/>} />
                
            </Routes>
        </BrowserRouter>
    )
}
export default AllRoutes;