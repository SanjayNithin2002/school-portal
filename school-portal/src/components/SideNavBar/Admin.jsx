import React from "react";
import { Nav } from 'rsuite';
import { Link } from "react-router-dom";

import "./SideNavBar.css";

const Admin = () => {

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
                            <i class='bx bx-collection'></i>
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
                    <div class="iocn-link" onClick={() => subMenu(1)}>
                        <span>
                            <i class='bx bx-collection'></i>
                            <span class="link_name">HR</span>
                        </span>
                        <i class='bx bxs-chevron-down arrow'></i>
                    </div>
                    <ul class="sub-menu">
                        <li><Link class="link_name">HR</Link></li>
                        <li><Link class="sub-link-name"><hr/><span>Student</span></Link></li>
                        <li><Link to='/StudentInfo'>Student Info</Link></li>
                        <li><Link to='/AddStudent'>Add Student</Link></li>
                        <li><Link to='/Bonafide'>Bonafide</Link></li>
                        <li><Link class="sub-link-name"><hr/><span>Staff</span></Link></li>
                        <li><Link to='/StaffInfo'>Staff Info</Link></li>
                        <li><Link to='/AddStaff'>Add Staff</Link></li>
                        <li><Link to='/PostTeacherAttendanc'>Attendance</Link></li>
                        <li><Link to='/PostLeave'>Leave</Link></li>
                    </ul>
                </li>
                <li>
                    <div class="iocn-link" onClick={() => subMenu(2)}>
                        <span>
                            <i class='bx bx-collection'></i>
                            <span class="link_name">Class Info</span>
                        </span>
                        <i class='bx bxs-chevron-down arrow'></i>
                    </div>
                    <ul class="sub-menu">
                        <li><Link class="link_name">Class Info</Link></li>
                        <li><Link to='/ClassInfo'>Classes</Link></li>
                        <li><Link to='/TimeTable'>Time Table</Link></li>
                        <li><Link to='/Exam'>Exams</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to='/payment'>
                        <i class='bx bxs-contact'></i>
                        <span class="link_name">Fees Structure</span>
                    </Link>
                    <ul class="sub-menu blank">
                        <li><Link to='/payment' class="link_name">Fees Structure</Link></li>
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

export default Admin;


// <Nav>
// 
// <Nav.Menu placement="rightStart" title="HR" icon={<HR />}>
//   <Nav.Item divider />
//   <Nav.Item panel style={{ padding: '15px 20px', color: '#aaa' }}>
//     Student
//   </Nav.Item>
//   <Nav.Item href='/StudentInfo'>
//     <a href="/StudentInfo" style={{ textDecoration: 'none', color: 'black' }}>Student Info </a></Nav.Item>
//   <Nav.Item href='/AddStudent'>
//     <a href="/AddStudent" style={{ textDecoration: 'none', color: 'black' }}>Add Student </a></Nav.Item>
//   <Nav.Item href='/Bonafide'>
//     <a href="/Bonafide" style={{ textDecoration: 'none', color: 'black' }}>Student Bonafide </a></Nav.Item>
//   <Nav.Item divider />
//   <Nav.Item panel style={{ padding: '15px 20px', color: '#aaa' }}>
//     Staff
//   </Nav.Item>
//   <Nav.Item href='/StaffInfo'>
//     <a href="/StaffInfo" style={{ textDecoration: 'none', color: 'black' }}>Staff List </a></Nav.Item>
//   <Nav.Item href='/AddStaff'>
//     <a href="/AddStaff" style={{ textDecoration: 'none', color: 'black' }}>Add Staff </a></Nav.Item>
//   <Nav.Item href='/PostTeacherAttendance'>
//     <a href="/PostTeacherAttendance" style={{ textDecoration: 'none', color: 'black' }}>Attendance </a></Nav.Item>
//   <Nav.Item href='/PostLeave'>
//     <a href="/PostLeave" style={{ textDecoration: 'none', color: 'black' }}>Leave Request </a></Nav.Item>
// </Nav.Menu>
// <Nav.Item href='/Meeting' icon={<Meet />}>
//   Meetings
// </Nav.Item>
// <Nav.Menu placement="rightStart" title="Class" icon={<Class />}>
//   <Nav.Item href='/ClassInfo'>
//     <a href="/ClassInfo" style={{ textDecoration: 'none', color: 'black' }}>Class Info </a></Nav.Item>
//   <Nav.Item href='/Exam'>
//     <a href="/Exam" style={{ textDecoration: 'none', color: 'black' }}>Exams </a></Nav.Item>
//   <Nav.Item href='/TimeTable'>
//     <a href="/TimeTable" style={{ textDecoration: 'none', color: 'black' }}>TimeTable </a></Nav.Item>
// </Nav.Menu>
// <Nav.Item href='/payment' icon={<Fees />}>
//   Fees Stucture
// </Nav.Item>
// <Nav.Item href='/Setting' icon={<Setting />}>
//   Settings
// </Nav.Item>
// </Nav>