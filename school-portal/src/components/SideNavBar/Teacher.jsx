import React from "react";
import { Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import Upload from '@rsuite/icons/legacy/FileUpload';
import Calendar from '@rsuite/icons/legacy/Calendar';
import HR from "@rsuite/icons/legacy/UserInfo";
import Class from "@rsuite/icons/legacy/Book";
import Setting from "@rsuite/icons/legacy/Setting"

const Teacher = () => {
    return(
        <Nav>
            <Nav.Item href='/Home' title={"DashBoard"} icon={<DashboardIcon />}>
              Dashboard
            </Nav.Item>
            <Nav.Menu placement="rightStart" title="Attendance" icon={<Upload />}>
              <Nav.Item href='/Attendance'>Attendance</Nav.Item>
              <Nav.Item href='/Leave'>Leave</Nav.Item>
            </Nav.Menu>
            <Nav.Item href='/Timetable' icon={<Calendar />}>
              TimeTable
            </Nav.Item>
            <Nav.Menu placement="rightStart" title="HR" icon={<HR />}>
              <Nav.Item href='/StudentInfo'>Student Info</Nav.Item>
              <Nav.Item href='/StaffInfo'>Staffs Info</Nav.Item>
            </Nav.Menu>
            <Nav.Menu placement="rightStart" title="Class Info" icon={<Class />}>
              <Nav.Item href='/StudentInfo'>Student List</Nav.Item>
              <Nav.Item href='/PostAttendance'>Attendance</Nav.Item>
              <Nav.Item href='/ClassMessage'>Class Message</Nav.Item>
              <Nav.Item href='/Assessments'>Assessments</Nav.Item>
            </Nav.Menu>
            <Nav.Item href='/Setting' icon={<Setting />}>
              Settings
            </Nav.Item>
            <Nav.Item href='/Contact' icon={<GroupIcon />}>
              Contact
            </Nav.Item>
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

export default Teacher;