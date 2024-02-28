import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"
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
import Marks from "./Pages/Marks/Marks";
import Bonafide from "./Pages/Bonafide/Bonafide";
import StudentInfo from "./Pages/Student/StudentInfo";
import TeacherInfo from "./Pages/Teacher/TeacherInfo";
import StudentList from "./Pages/Student/StudentList";
import PostStudent from "./Pages/Attendance/PostStudent";
import PostTeacher from "./Pages/Attendance/PostTeacher";
import ClassMessage from "./Pages/ClassMessage/ClassMessage";
import Timetable from "./Pages/Time table/timetable";
import NewAssessment from "./Pages/Assessments/NewAssessment"
import Exam from "./Pages/Exam/Exam"
import AddStudent from "./Pages/Student/AddStudent";
import AddTeacher from "./Pages/Teacher/AddTeacher";
import Fees from "./Pages/Fees/Fees";
import AddExam from "./Pages/Exam/AddExam";
import UploadMarks from "./Pages/Marks/UploadMarks";
import EditMarks from "./Pages/Marks/EditMarks";
import CreateClass from "./Pages/Class/CreateClass";
import ClassInfo from "./Pages/Class/ClassInfo";
import ViewBonafide from "./Pages/Bonafide/ViewBonafide";
import UpdateLeave from "./Pages/Leave/UpdateLeave";
import AddTimeTable from "./Pages/Time table/AddTimeTable";
import SideNavBar from "./components/SideNavBar/SideNavBar";
import Profile from "./Pages/Profile/Profile"
import Spotlight from "./Pages/Spotlight/Spotlight";
import Loading from "./Pages/Loading/Loading";
import Records from "./Pages/Records/Records";
import { useDispatch } from "react-redux";
import { logout } from "./actions/logout";



const AllRoutes = () => {

    const [status, setStatus] = useState(false);
    const dispatch = useDispatch();
    console.log(status);

    const checkForInactivity = () => {
        const expireTime = localStorage.getItem("expireTime");
        if (expireTime < Date.now()) {
            dispatch(logout());
        }
    }

    const updateExpireTime = () => {
        const expireTime = Date.now() + 900000;
        localStorage.setItem("expireTime", expireTime);
    }

    useEffect(() => {
        updateExpireTime();
        window.addEventListener("click", updateExpireTime);
        window.addEventListener("keypress", updateExpireTime);
        window.addEventListener("scroll", updateExpireTime);
        window.addEventListener("mousemove", updateExpireTime);
        return () => {
            window.removeEventListener("click", updateExpireTime);
            window.removeEventListener("keypress", updateExpireTime);
            window.removeEventListener("scroll", updateExpireTime);
            window.removeEventListener("mousemove", updateExpireTime);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            checkForInactivity();
        }, 60000);
        return () => clearInterval(interval);
    }, [])

    return (    
        <BrowserRouter>
            <Navbar />
            <SideNavBar />
            <Loading status={status} />
            <Routes>
                <Route path='/' element={<App status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/Home' element={<Home status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/Attendance' element={<Attendance status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/Leave' element={<Leave status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/ContactUs' element={<ContactUs status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/Assessment' element={<Assessments status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/PostAssessment' element={<NewAssessment status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/Marks' element={<Marks />} />
                <Route path='/Teachers' element={<Teacher status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/Setting' element={<Settings status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/Bonafide' element={<Bonafide status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/StudentInfo' element={<StudentInfo status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/AddStudent' element={<AddStudent status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/StaffInfo' element={<TeacherInfo status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/StudentList' element={<StudentList status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/PostStudentAttendance' element={<PostStudent status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/PostTeacherAttendance' element={<PostTeacher status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/ClassMessage' element={<ClassMessage status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/timetable' element={<Timetable status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='*' element={<Error404 />} />
                <Route path='/Exam' element={<Exam status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/AddStaff' element={<AddTeacher status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/Payment' element={<Fees status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/AddSchedule' element={<AddExam status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/UploadMarks' element={<UploadMarks />} />
                <Route path='/EditMarks' element={<EditMarks />} />
                <Route path='/CreateClass' element={<CreateClass status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/ClassInfo' element={<ClassInfo status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/ViewBonafide' element={<ViewBonafide status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/PostLeave' element={<UpdateLeave status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/AddTimeTable' element={<AddTimeTable status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/Profile' element={<Profile status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/Spotlight' element={<Spotlight status={status} onLoading={(status1) => setStatus(status1)} />} />
                <Route path='/Records' element={<Records status={status} onLoading={(status1) => setStatus(status1)} />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AllRoutes;