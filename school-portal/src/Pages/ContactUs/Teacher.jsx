import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import { Container, Header } from "rsuite";
function ContactUsStudent() {

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <SideNavBar />

      <Container style={{ margin: "10px" }}>
        <div className="container rounded bg-white">
          <Header>
            <h2>Contact Us</h2>
            <hr style={{ border: "1px solid gray" }} />
          </Header><br /><br />

          
          

          
        </div>
      </Container>
    </div>
  )
}

export default ContactUsStudent;

