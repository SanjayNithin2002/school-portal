import React from "react";
import { Routes,Route,BrowserRouter} from "react-router-dom"
import App from "./App"
import Navbar from "./components/NavBar/Navbar";
import Home from "./Pages/Home/Home"
import Attendance from "./Pages/Attendance/Attendance"
import Error404 from "./Pages/Error404";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Leave from "./Pages/Leave/Leave";
import Assessments from "./Pages/Assessments/Assessments";
import Teacher from "./Pages/Teacher/Teacher";
import Settings from "./Pages/Settings/Settings";
import ViewAssessment from "./Pages/Assessments/ViewAssessment";
import Marks from "./Pages/Marks/Marks";
const AllRoutes = () => {
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/Home' element={<Home/>}/>
                <Route path='/Attendance' element={<Attendance/>}/>
                <Route path='/Leave' element={<Leave/>}/>
                <Route path='/Contact' element={<ContactUs/>}/>
                <Route path='/Assessment' element={<Assessments/>}/>
                <Route path='/Assessment/:id' element={<ViewAssessment />}/>
                <Route path='/Marks' element={<Marks/>}/>
                <Route path='/Teachers' element={<Teacher/>}/>
                <Route path='/Setting' element={<Settings/>}/>
                <Route path='*' element={<Error404/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default AllRoutes;