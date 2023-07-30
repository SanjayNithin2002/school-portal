import React, { useEffect } from 'react';
import './SideNavBar.css';
import Student from './Student';
import Teacher from './Teacher';
import Admin from './Admin';
import { useLocation } from 'react-router-dom';

const SideNavBar = () => {
  const [expanded, setExpanded] = React.useState(true);
  const location = useLocation();
  
  function handleResize() {
    if(window.innerWidth<900 && expanded) setExpanded(false)
    else if(window.innerWidth>900 && !expanded) setExpanded(true)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
  })
  handleResize();
  return (
    location.pathname !== "/" &&
    <>
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
          </>
  );
};

export default SideNavBar;