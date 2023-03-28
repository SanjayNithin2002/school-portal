import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import { Container, Header, Content, Footer } from 'rsuite';

function ContactUs(){

    return(
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <SideNavBar eventKey='8'/>
            
        </div>
    )
}

export default ContactUs;

