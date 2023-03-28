import React, { useEffect } from 'react';
import {Link } from "react-router-dom";
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import Upload from '@rsuite/icons/legacy/FileUpload';
import Calendar from '@rsuite/icons/legacy/Calendar';
import Graph from "@rsuite/icons/legacy/BarChart";
import User from "@rsuite/icons/legacy/User"
import Payment from "@rsuite/icons/legacy/CreditCard"
import Setting from "@rsuite/icons/legacy/Setting"
import './SideNavBar.css';

const SideNavBar = ({eventKey}) => {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState(eventKey);
  
  function handleResize() {
    if(window.innerWidth<900 && expanded) setExpanded(false)
    else if(window.innerWidth>900 && !expanded) setExpanded(true)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
  })
  handleResize();
  return (
    <div style={{height:"100vh",backgroundColor:"#f7f7fa"}}>
      <Sidenav expanded={expanded}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item href='/Home' eventKey="1" title={"DashBoard"} icon={<DashboardIcon />}>
              Dashboard
            </Nav.Item>
            <Nav.Item href='/Attendance' eventKey="2" icon={<Upload />}>
              Attendance
            </Nav.Item>
            <Nav.Item href='/Timetable' eventKey="3" icon={<Calendar />}>
              TimeTable
            </Nav.Item>
            <Nav.Item href='/Assessment' eventKey="4" icon={<Graph />}>
              Assessment
            </Nav.Item>
            <Nav.Item href='/Teachers' eventKey="5" icon={<User />}>
              Teachers
            </Nav.Item>
            <Nav.Item href='/Payment' eventKey="6" icon={<Payment />}>
              Payment
            </Nav.Item>
            <Nav.Item href='/Setting' eventKey="7" icon={<Setting />}>
              Settings
            </Nav.Item>
            <Nav.Item href='/Contact' eventKey="8" icon={<GroupIcon />}>
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
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default SideNavBar;