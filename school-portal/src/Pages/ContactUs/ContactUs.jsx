import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import { Container, Header, Content, Footer, Grid, Row, Col, FlexboxGrid, Form, ButtonToolbar, Button, Input, InputGroup, InputNumber    } from 'rsuite';
import LocationIcon from '@rsuite/icons/Location';
import TimeIcon from '@rsuite/icons/Time';
import EmailIcon from '@rsuite/icons/Email';
import PhoneIcon from '@rsuite/icons/Phone';
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
const LocIcon = ({ size }) => <LocationIcon style={{ fontSize: size, marginRight: 10 }} />;
const TimIcon = ({ size }) => <TimeIcon style={{ fontSize: size, marginRight: 10 }} />;
const MailIcon = ({ size }) => <EmailIcon style={{ fontSize: size, marginRight: 10 }} />;
const PhIcon = ({ size }) => <PhoneIcon style={{ fontSize: size, marginRight: 10 }} />;

function ContactUs() {

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <SideNavBar />
      <Container style={{ margin: "10px" }}>
        <div className="container rounded bg-white">
          <Header>
            <h2>Contact Us</h2>
            <hr style={{ border: "1px solid gray" }} />
          </Header><br /><br />
          <Content>
            <Grid fluid >
              <Col className="show-grid">
                <Row>kjbn</Row>
                <Row>kjbn</Row>
              </Col>
              <Col className="show-grid">
                <Row>yuh</Row>
              </Col>
              {/* <Row className="show-grid">
                <Col xs={1}> <LocIcon size="3em" /> </Col>
                <Col xs={11}><h3>Location:</h3><h6> XYZ block, abc road,</h6><h6> pqr layout,Vellore.</h6></Col>
              </Row>
              <Row className="show-grid">
                <Col xs={1}> <TimIcon size="3em" /></Col>
                <Col xs={11}><h3>Open Hours:</h3><h6>Monday-Friday:</h6><h6>09:00 AM - 03:00 PM</h6><h6>Saturday:</h6><h6>09:00 AM – 12:30 PM</h6></Col>
              </Row>
              <Row>
                <Col xs={1}> <MailIcon size="3em" /></Col>
                <Col xs={11}><h3>Email:</h3><h6> abcdefg@gmail.com</h6> <h6> zxyasfd@gmail.com</h6></Col>
              </Row>
              <Row>
                <Col xs={1}> <PhIcon size="3em" /></Col>
                <Col xs={11}><h3>Call:</h3><h6> +91 123456789</h6> <h6> +91 987654321</h6></Col>
              </Row> */}
            </Grid>
            
          </Content>
        </div>
      </Container>
    </div>
  )
}

export default ContactUs;

