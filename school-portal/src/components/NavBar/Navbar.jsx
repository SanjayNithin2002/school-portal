import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate, useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { Dropdown } from 'rsuite';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import * as regular from "@fortawesome/free-regular-svg-icons"

import "./Navbar.css"

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        location.pathname !== "/" &&
        <nav className="top-navbar">
                <Link to="/" className="title">
                    Website
                </Link>
                <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <i class='bx bx-menu' ></i>
                </div>
                <ul className={menuOpen ? "top-navbar-ul open" : "top-navbar-ul"}>
                    <li >
                        <div className="search-bar">
                        <i className="bx bx-search"></i>
                        <input type="search" placeholder="Search"/>
                        </div>
                    </li>
                    <li>
                        <NavLink><FontAwesomeIcon icon={regular.faBell} style={{fontSize:"22px"}}/></NavLink>
                    </li>
                    <li>
                        <Dropdown title="Kumar" placement="bottomEnd">
                            <Dropdown.Item key={1}><NavLink to='/Profile'><FontAwesomeIcon icon={solid.faUser} />&emsp;Profile</NavLink></Dropdown.Item>
                            <Dropdown.Item key={2}><a onClick={()=>logout()}><FontAwesomeIcon icon={solid.faSignOutAlt} />&emsp;Logout</a></Dropdown.Item>
                        </Dropdown>
                    </li>
                </ul>
        </nav >
    )
}

export default Navbar