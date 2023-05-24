import React from "react";
import { Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import Attendance from '@rsuite/icons/legacy/CalendarCheckO';
import HR from "@rsuite/icons/legacy/UserInfo";
import Class from "@rsuite/icons/legacy/Book";
import Fees from "@rsuite/icons/legacy/Money"
import Setting from "@rsuite/icons/legacy/Setting";

const Admin = () => {
  return (
    <Nav>
      <Nav.Item href='/Home' title={"DashBoard"} icon={<DashboardIcon />}>
        Dashboard
      </Nav.Item>
      <Nav.Menu placement="rightStart" title="Attendance" icon={<Attendance />}>
        <Nav.Item href='/Attendance'>
          <a href="/Attendance" style={{ textDecoration: 'none', color: 'black'}}>Attendance </a></Nav.Item>
        <Nav.Item href='/Leave'>
          <a href="/Leave" style={{ textDecoration: 'none', color: 'black'}}>Leave </a></Nav.Item>
      </Nav.Menu>
      <Nav.Menu placement="rightStart" title="HR" icon={<HR />}>
        <Nav.Item divider />
        <Nav.Item panel style={{ padding: '15px 20px',color: '#aaa'}}>
          Student
        </Nav.Item>
        <Nav.Item href='/StudentInfo'>
          <a href="/StudentInfo" style={{ textDecoration: 'none', color: 'black'}}>Student Info </a></Nav.Item>
        <Nav.Item href='/AddStudent'>
          <a href="/AddStudent" style={{ textDecoration: 'none', color: 'black'}}>Add Student </a></Nav.Item>
        <Nav.Item href='/Bonafide'>
          <a href="/Bonafide" style={{ textDecoration: 'none', color: 'black'}}>Student Bonafide </a></Nav.Item>
        <Nav.Item divider />
        <Nav.Item panel style={{ padding: '15px 20px',color: '#aaa'}}>
          Staff
        </Nav.Item>
        <Nav.Item href='/StaffInfo'>
          <a href="/StaffInfo" style={{ textDecoration: 'none', color: 'black'}}>Staff List </a></Nav.Item>
        <Nav.Item href='/AddStaff'>
          <a href="/AddStaff" style={{ textDecoration: 'none', color: 'black'}}>Add Staff </a></Nav.Item>
        <Nav.Item href='/PostAttendance'>
          <a href="/PostAttendance" style={{ textDecoration: 'none', color: 'black'}}>Attendance </a></Nav.Item>
        <Nav.Item href='/Meeting'>
          <a href="/Meeting" style={{ textDecoration: 'none', color: 'black'}}>Meetings </a></Nav.Item>
      </Nav.Menu>
      <Nav.Menu placement="rightStart" title="Class" icon={<Class />}>
        <Nav.Item href='/ClassInfo'>
          <a href="/ClassInfo" style={{ textDecoration: 'none', color: 'black'}}>Class Info </a></Nav.Item>
        <Nav.Item href='/Exam'>
          <a href="/Exam" style={{ textDecoration: 'none', color: 'black'}}>Exams </a></Nav.Item>
        <Nav.Item href='/TimeTable'>
          <a href="/TimeTable" style={{ textDecoration: 'none', color: 'black'}}>TimeTable </a></Nav.Item>
      </Nav.Menu>
      <Nav.Item href='/payment' icon={<Fees />}>
        Fees Stucture
      </Nav.Item>
      <Nav.Item href='/Setting' icon={<Setting />}>
        Settings
      </Nav.Item>
      {/* <Nav.Item href='/Contact' icon={<GroupIcon />}>
        Contact
      </Nav.Item> */}
      {/*<Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
  </Nav.Menu>
            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title="Settings"
              icon={<GearCircleIcon />}
            >
              <Nav.Item eventKey="4-1">Applications</Nav.Item>
              <Nav.Item eventKey="4-2">Channels</Nav.Item>
              <Nav.Item eventKey="4-3">Versions</Nav.Item>
              <Nav.Menu eventKey="4-5" title="Custom Action">
                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
              </Nav.Menu>
            </Nav.Menu>*/}
    </Nav>
  )
}

export default Admin;