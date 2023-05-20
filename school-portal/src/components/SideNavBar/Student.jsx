import React from "react";
import { Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import Upload from '@rsuite/icons/legacy/FileUpload';
import Calendar from '@rsuite/icons/legacy/Calendar';
import Marks from "@rsuite/icons/legacy/BarChart";
import Graph from "@rsuite/icons/legacy/Briefcase";
import User from "@rsuite/icons/legacy/User"
import Payment from "@rsuite/icons/legacy/CreditCard"
import Setting from "@rsuite/icons/legacy/Gear"
import Bonafide from "@rsuite/icons/legacy/Certificate"
import Message from "@rsuite/icons/Message"
import Class from "@rsuite/icons/legacy/Book";
const Student = () => {
    return(
        <Nav style={{width:"100%"}}>
            <Nav.Item href='/Home' title={"DashBoard"} icon={<DashboardIcon />}>
              Dashboard
            </Nav.Item>
            <Nav.Item href='/Attendance' icon={<Upload />}>
              Attendance
            </Nav.Item>
            <Nav.Item href='/Timetable' icon={<Calendar />}>
              TimeTable
            </Nav.Item>
            <Nav.Menu placement="rightStart" title="Class Info" icon={<Class />}>
            <Nav.Item href='/Assessment'>
              Assessment
            </Nav.Item>
            <Nav.Item href='/ClassMessage'>
              Class Message
            </Nav.Item>
            <Nav.Item href='/Exam'>
              Exam Schedule
            </Nav.Item>
            <Nav.Item href='/Marks'>
              Marks/Grade
            </Nav.Item>
            </Nav.Menu>
            <Nav.Item href='/Teachers' icon={<User />}>
              Teachers
            </Nav.Item>
            <Nav.Item href='/Bonafide' icon={<Bonafide/>}>
              Bonafide
            </Nav.Item>
            <Nav.Item href='/Payment' icon={<Payment />}>
              Payment
            </Nav.Item>
            <Nav.Item href='/Setting' icon={<Setting />}>
              Settings
            </Nav.Item>
            <Nav.Item href='/ContactUs' icon={<GroupIcon />}>
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

export default Student;