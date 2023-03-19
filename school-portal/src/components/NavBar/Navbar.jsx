import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar1 from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, Link } from "react-router-dom";
import * as Regular from "@fortawesome/free-regular-svg-icons"
import * as Solid from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import "./Navbar.css"

const Navbar = () => {
    const location = useLocation();
    return (
        location.pathname !== "/" &&
        <Navbar1 className="customNavbar" bg="light" expand="lg">
            <Container fluid>
                <Navbar1.Brand href="#">SCHOOL NAME</Navbar1.Brand>
                <Navbar1.Toggle aria-controls="navbarScroll" />
                <Navbar1.Collapse className="customNavbarCollapse" id="navbarScroll">

                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            style={{maxHeight:"46px"}}
                        />
                        &ensp;
                        <Nav className="me-auto my-lg-0" >
                            <Nav.Link href="#action1"><FontAwesomeIcon style={{ fontSize: "25px" }} icon={Regular.faBell} /></Nav.Link>
                            &emsp;
                            <NavDropdown title={<div style={{ display: "inline-flex", justifyContent: "center" }}><FontAwesomeIcon style={{ border: "2px solid gray", padding: "5px", borderRadius: "50%" }} icon={Solid.faUser} /><>&ensp;Kumar</></div>} id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Form>
                </Navbar1.Collapse>
            </Container>
        </Navbar1>
    )
}

export default Navbar