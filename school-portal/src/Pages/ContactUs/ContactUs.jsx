//import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import { Container, Header, Content, Footer, Grid, Row, Col } from 'rsuite';
import LocationIcon from '@rsuite/icons/Location';
import TimeIcon from '@rsuite/icons/Time';
import EmailIcon from '@rsuite/icons/Email';
import PhoneIcon from '@rsuite/icons/Phone';
const LocIcon = ({ size }) => <LocationIcon style={{ fontSize: size, marginRight: 10 }} />;
const TimIcon = ({ size }) => <TimeIcon style={{ fontSize: size, marginRight: 10 }} />;
const MailIcon = ({ size }) => <EmailIcon style={{ fontSize: size, marginRight: 10 }} />;
const PhIcon = ({ size }) => <PhoneIcon style={{ fontSize: size, marginRight: 10 }} />;

function ContactUs(){

    return(
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>

            <SideNavBar/>

            <Container >
          <Header>
            <h2>Contact Us</h2>
          </Header><br/><br/>
          <Content>
            <Grid fluid >
                <Row className="show-grid">
                    <Col xs={3}> <LocIcon size="3em" /></Col>
                    <Col xs={3}><h3>Location:</h3></Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={3}> <TimIcon size="3em" /></Col>
                    <Col xs={6}><h3>Open Hours:</h3></Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={3}> <MailIcon size="3em" /></Col>
                    <Col xs={3}><h3>Email:</h3></Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={3}> <PhIcon size="3em" /></Col>
                    <Col xs={3}><h3>Call:</h3></Col>
                </Row>
            </Grid>

          </Content>
        </Container>

            <Container>
          <Header>
            <h2>Contact Us</h2>
          </Header>
          <Content>Content</Content>
        </Container>
        </div>
    )
}

export default ContactUs;

