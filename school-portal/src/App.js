import React, { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import admin from "./assests/admin1.png";
import teacher from "./assests/teacher1.png";
import student from "./assests/student1.png";
import StudentLogin from "./Pages/LoginPage/StudentLogin";
import TeacherLogin from "./Pages/LoginPage/TeacherLogin";
import AdminLogin from "./Pages/LoginPage/AdminLogin";

function App() {

    const [userType,setUserType] = useState("");
    
    return (
        <div className="App">
            <nav className="top-navbar">
                <Link to="/" className="title1 d-flex justify-content-start align-item-center">
                    <i class="bx bxl-c-plus-plus nav-logo"></i>
                    &ensp; School Name
                </Link>
            </nav>

            <div class="container-fluid1">
                
            {
                    userType==="" && 
                    <>
                <div className=" Main-Page-Content d-flex flex-column align-item-start">
                    <div>
                        Welcome to the School Portal
                    </div>
                    <div>
                        A digital initiative by the school facilitating Teachers, Staff, Students, Parents to access and process Academics, Supporting services at one common platform.
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="Login-Main-Content col-xl-8 col-lg-9 col-md-10 col-sm-10 d-flex justify-content-evenly">
                        <div style={{ borderTop: "3px solid #0d6efd" }} className="col-xl-3 col-lg-3 col-md-4 col-sm-4 Login-card d-flex justify-content-center">
                            <div className="Login-logo">
                                <img src={student} alt="no img" />
                            </div>
                            <div className="Login-subMenu d-flex flex-column">
                                <div style={{ color: "#0d6efd" }} className="Login-type">Student</div>
                                <div className="Login-button">
                                    <button onClick={()=>setUserType("student")} className="btn btn-primary btn-sm" ><FontAwesomeIcon icon={solid.faSignInAlt} /></button>
                                </div>
                            </div>
                        </div>
                        <div style={{ borderTop: "3px solid #198754" }} className="col-xl-3 col-lg-3 col-md-4 col-sm-4 Login-card d-flex justify-content-center ">
                            <div className="Login-logo">
                                <img src={teacher} alt="no img" />
                            </div>
                            <div className="Login-subMenu d-flex flex-column">
                                <div style={{ color: "#198754" }} className="Login-type">Teacher</div>
                                <div className="Login-button">
                                    <button onClick={()=>setUserType("teacher")} className="btn btn-success btn-sm" ><FontAwesomeIcon icon={solid.faSignInAlt} /></button>
                                </div>
                            </div>
                        </div>
                        <div style={{ borderTop: "3px solid #6c757d" }} className="col-xl-3 col-lg-3 col-md-4 col-sm-4 Login-card d-flex justify-content-center ">
                            <div className="Login-logo">
                                <img src={admin} alt="no img" />
                            </div>
                            <div className="Login-subMenu d-flex flex-column">
                                <div style={{ color: "#6c757d" }} className="Login-type">Admin</div>
                                <div className="Login-button">
                                    <button onClick={()=>setUserType("admin")} className="btn btn-secondary btn-sm" ><FontAwesomeIcon icon={solid.faSignInAlt} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
                }
                {
                    userType==="student" && <StudentLogin handleBack={()=>setUserType("")}/>
                }
                {
                    userType==="teacher" && <TeacherLogin handleBack={()=>setUserType("")}/>
                }
                {
                    userType==="admin" && <AdminLogin handleBack={()=>setUserType("")}/>
                }
            </div>
        </div>
    );
}

export default App;
