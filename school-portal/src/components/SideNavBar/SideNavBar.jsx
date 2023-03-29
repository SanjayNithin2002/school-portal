import React, { useEffect } from 'react';
import { Sidenav } from 'rsuite';

import './SideNavBar.css';
import Student from './Student';
import Teacher from './Teacher';
import Admin from './Admin';

const SideNavBar = () => {
  const [expanded, setExpanded] = React.useState(true);
  
  function handleResize() {
    if(window.innerWidth<900 && expanded) setExpanded(false)
    else if(window.innerWidth>900 && !expanded) setExpanded(true)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
  })
  handleResize();
  return (
    <div style={{height:"90vh",backgroundColor:"#f7f7fa"}}>
      <Sidenav expanded={expanded}>
        <Sidenav.Body>
          {
            localStorage.getItem("type")==="student" &&
            <Student/>
          }
          {
            localStorage.getItem("type")==="teacher" &&
            <Teacher/>
          }
          {
            localStorage.getItem("type")==="admin" &&
            <Admin/>
          }
          
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default SideNavBar;