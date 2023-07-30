import React from "react";
import {Link} from "react-router-dom";
import './SideNavBar.css';
const Student = () => {
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
    return(
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
                <Link to='/Attendance' >
                    <i class='bx bx-calendar'></i>
                    <span class="link_name">Attendance</span>
                </Link>
                <ul class="sub-menu blank">
                    <li><Link to='/Attendance' class="link_name">Attendance</Link></li>
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
                <div class="iocn-link" onClick={()=>subMenu(0)}>
                    <Link>
                        <i class='bx bx-collection'></i>
                        <span class="link_name">Class Info</span>
                    </Link>
                    <i class='bx bxs-chevron-down arrow'></i>
                </div>
                <ul class="sub-menu">
                    <li><Link class="link_name">Class Info</Link></li>
                    <li><Link to='/Assessment'>Assessment</Link></li>
                    <li><Link to='/ClassMessage'>Messages</Link></li>
                    <li><Link to='/Exam'>Exams</Link></li>
                    <li><Link to='/Home'>Marks</Link></li>
                </ul>
            </li>
            <li>
                <Link to='/Teachers'>
                    <i class='bx bx-user-pin'></i>
                    <span class="link_name">Teachers</span>
                </Link>
                <ul class="sub-menu blank">
                    <li><Link to='/Teachers' class="link_name">Teachers</Link></li>
                </ul>
            </li>
            <li>
                <Link to='/Bonafide'>
                    <i class='bx bx-certification'></i>
                    <span class="link_name">Bonafide</span>
                </Link>
                <ul class="sub-menu blank">
                    <li><Link to='/Bonafide' class="link_name">Bonafide</Link></li>
                </ul>
            </li>
            <li>
                <Link to='/Payment'>
                    <i class='bx bx-money'></i>
                    <span class="link_name">Payments</span>
                </Link>
                <ul class="sub-menu blank">
                    <li><Link to='/Payment' class="link_name">Payments</Link></li>
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
            <li>
                <Link to='/ContactUs'>
                    <i class='bx bxs-contact'></i>
                    <span class="link_name">Contacts</span>
                </Link>
                <ul class="sub-menu blank">
                    <li><Link to='/ContactUs' class="link_name">Contacts</Link></li>
                </ul>
            </li>
        </ul>
    </div>
        
    )
}

export default Student;

// <Nav style={{width:"100%"}}>
        //     <Nav.Item href='/Home' title={"DashBoard"} icon={<DashboardIcon />}>
        //       Dashboard
        //     </Nav.Item>
        //     <Nav.Item href='/Attendance' icon={<Upload />}>
        //       Attendance
        //     </Nav.Item>
        //     <Nav.Item href='/Timetable' icon={<Calendar />}>
        //       TimeTable
        //     </Nav.Item>
        //     <Nav.Menu placement="rightStart" title="Class Info" icon={<Class />}>
        //     <Nav.Item href='/Assessment'>
        //       <Link to='/Home' href="/Assessment" style={{ textDecoration: 'none', color: 'black'}}>Assessment</Link> 
        //     </Nav.Item>
        //     <Nav.Item href='/ClassMessage'>
        //     <Link to='/Home' href="/ClassMessage" style={{ textDecoration: 'none', color: 'black'}}>Class Messages</Link>
        //     </Nav.Item>
        //     <Nav.Item href='/Exam'>
        //     <Link to='/Home' href="/Exam" style={{ textDecoration: 'none', color: 'black'}}>Exam Schedule</Link>
        //     </Nav.Item>
        //     <Nav.Item href='/Marks'>
        //     <Link to='/Home' href="/Marks" style={{ textDecoration: 'none', color: 'black'}}>Marks/Grade</Link>
        //     </Nav.Item>
        //     </Nav.Menu>
        //     <Nav.Item href='/Teachers' icon={<User />}>
        //       Teachers
        //     </Nav.Item>
        //     <Nav.Item href='/Bonafide' icon={<Bonafide/>}>
        //       Bonafide
        //     </Nav.Item>
        //     <Nav.Item href='/Payment' icon={<Payment />}>
        //       Payment
        //     </Nav.Item>
        //     <Nav.Item href='/Setting' icon={<Setting />}>
        //       Settings
        //     </Nav.Item>
        //     <Nav.Item href='/ContactUs' icon={<GroupIcon />}>
        //       Contact
        //     </Nav.Item>
        
        //   </Nav>