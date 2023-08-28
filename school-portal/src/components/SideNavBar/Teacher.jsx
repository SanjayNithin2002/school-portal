import React from "react";
import {Link } from "react-router-dom"

const Teacher = () => {

    let openList = document.querySelectorAll(".active");
    for (var i = 0; i < openList.length; i++) {
        openList[i].classList.toggle("active");
        openList[i].parentElement.classList.toggle("showMenu");
    }

    function subMenu(target1) {
        let subList = document.querySelectorAll(".iocn-link");
        let openList = document.querySelectorAll(".active");
        for (var i = 0; i < openList.length; i++) {
            if (openList[i] !== subList[target1]) {
                openList[i].classList.toggle("active");
                openList[i].parentElement.classList.toggle("showMenu");
            }
        }
        subList[target1].classList.toggle("active")
        subList[target1].parentElement.classList.toggle("showMenu");
    }
    return (
        <div class="sidebar">
            <div class="logo-details">
                <i class='bx bxl-c-plus-plus'></i>
                <span class="logo_name">School Name</span>
            </div>
            <ul class="nav-links">
                <li>
                    <Link to='/Home' >
                        <i class='bx bx-grid-alt'></i>
                        <span class="link_name">Dashboard</span>
                    </Link>
                    <ul class="sub-menu blank">
                        <li><Link to='/Home' class="link_name">Dashboard</Link></li>
                    </ul>
                </li>
                <li>
                    <div class="iocn-link" onClick={() => subMenu(0)}>
                        <span>
                            <i class='bx bx-calendar'></i>
                            <span class="link_name">Attendance Info</span>
                        </span>
                        <i class='bx bxs-chevron-down arrow'></i>
                    </div>
                    <ul class="sub-menu">
                        <li><Link class="link_name">Attendance Info</Link></li>
                        <li><Link to='/Attendance'>Attendance</Link></li>
                        <li><Link to='/Leave'>Leave</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to='/TimeTable'>
                        <i class='bx bx-table'></i>
                        <span class="link_name">TimeTable</span>
                    </Link>
                    <ul class="sub-menu blank">
                        <li><Link to='/TimeTable' class="link_name">TimeTable</Link></li>
                    </ul>
                </li>
                <li>
                    <div class="iocn-link" onClick={() => subMenu(1)}>
                        <span>
                            <i class='bx bx-collection'></i>
                            <span class="link_name">HR</span>
                        </span>
                        <i class='bx bxs-chevron-down arrow'></i>
                    </div>
                    <ul class="sub-menu">
                        <li><Link class="link_name">HR</Link></li>
                        <li><Link to='/StudentInfo'>Student Info</Link></li>
                        <li><Link to='/StaffInfo'>Staff Info</Link></li>
                    </ul>
                </li>
                <li>
                    <div class="iocn-link" onClick={() => subMenu(2)}>
                        <span>
                            <i class='bx bx-server'></i>
                            <span class="link_name">Class Info</span>
                        </span>
                        <i class='bx bxs-chevron-down arrow'></i>
                    </div>
                    <ul class="sub-menu">
                        <li><Link class="link_name">Class Info</Link></li>
                        <li><Link to='/StudentList'>Student List</Link></li>
                        <li><Link to='/PostStudentAttendance'>Attendance</Link></li>
                        <li><Link to='/ClassMessage'>Class Message</Link></li>
                        <li><Link to='/Assessment'>Assessments</Link></li>
                        <li><Link to='/Marks'>Marks</Link></li>
                        <li><Link to='/Exam'>Exams</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to='/Setting'>
                        <i class='bx bx-cog'></i>
                        <span class="link_name">Settings</span>
                    </Link>
                    <ul class="sub-menu blank">
                        <li><Link to='/Setting' class="link_name">Settings</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Teacher;
