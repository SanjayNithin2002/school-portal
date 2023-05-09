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
        <Nav.Item href='/Attendance'>Attendance</Nav.Item>
        <Nav.Item href='/Leave'>Leave</Nav.Item>
      </Nav.Menu>
      <Nav.Menu placement="rightStart" title="HR" icon={<HR />}>
        <Nav.Item divider />
        <Nav.Item panel style={{ padding: '15px 20px',color: '#aaa'}}>
          Student
        </Nav.Item>
        <Nav.Item href='/StudentInfo'>Student Info</Nav.Item>
        <Nav.Item href='/AddStudent'>Add Student</Nav.Item>
        <Nav.Item divider />
        <Nav.Item panel style={{ padding: '15px 20px',color: '#aaa'}}>
          Staff
        </Nav.Item>
        <Nav.Item href='/StaffInfo'>Staff List</Nav.Item>
        <Nav.Item href='/AddStaff'>Add Staff</Nav.Item>
        <Nav.Item href='/PostAttendance'>Attendance</Nav.Item>
        <Nav.Item href='/Meeting'>Meetings</Nav.Item>
      </Nav.Menu>
      <Nav.Menu placement="rightStart" title="Class" icon={<Class />}>
        <Nav.Item href='/StudentInfo'>Exams</Nav.Item>
        <Nav.Item href='/PostAttendance'>TimeTable</Nav.Item>
      </Nav.Menu>
      <Nav.Item href='/Fees' icon={<Fees />}>
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