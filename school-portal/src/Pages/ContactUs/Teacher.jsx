import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Header, Content, Footer, Grid, Row, Col, FlexboxGrid, Form, ButtonToolbar, Button, Input, InputGroup, InputNumber } from 'rsuite';
import LocationIcon from '@rsuite/icons/Location';
import TimeIcon from '@rsuite/icons/Time';
import EmailIcon from '@rsuite/icons/Email';
import PhoneIcon from '@rsuite/icons/Phone';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {requestContact} from "../../actions/auth";
import SideNavBar from "../../components/SideNavBar/SideNavBar";

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
const LocIcon = ({ size }) => <LocationIcon style={{ fontSize: size, marginRight: 10 }} />;
const TimIcon = ({ size }) => <TimeIcon style={{ fontSize: size, marginRight: 10 }} />;
const MailIcon = ({ size }) => <EmailIcon style={{ fontSize: size, marginRight: 10 }} />;
const PhIcon = ({ size }) => <PhoneIcon style={{ fontSize: size, marginRight: 10 }} />;


function ContactUsStudent() {
  const [request,setRequest] = useState({name:'',email:'',subject:'',message:''});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = () =>{
    dispatch(requestContact(request,navigate));
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <SideNavBar />

      <Container style={{ margin: "10px" }}>
        <div className="container rounded bg-white">
          <Header>
            <h2>Contact Us</h2>
            <hr style={{ border: "1px solid gray" }} />
          </Header><br /><br />
          <Content style={{marginLeft:"10px"}}>
            <Grid fluid >
              <Col className="show-grid" xl={11}>
                <Row>
                  <Col > <LocIcon size="3em" /> </Col>
                  <Col ><h4>Location:</h4><h6> XYZ block, abc road, pqr layout, abcd Nagar, Vellore.</h6></Col>
                </Row>
                <br /><br/>
                <Row>
                  <Col > <TimIcon size="3em" /></Col>
                  <Col ><h4>Open Hours:</h4><h6>Monday-Friday:</h6><h6>09:00 AM - 03:00 PM</h6><h6>Saturday:</h6><h6>09:00 AM – 12:30 PM</h6></Col>
                </Row>
                <br /><br/>
                <Row>
                  <Col > <MailIcon size="3em" /></Col>
                  <Col ><h4>Email:</h4><h6> abcdefg@gmail.com</h6> <h6> zxyasfd@gmail.com</h6></Col>
                </Row>
                <br /><br/>
                <Row>
                  <Col > <PhIcon size="3em" /></Col>
                  <Col ><h4>Call:</h4><h6> +91 123456789</h6> <h6> +91 987654321</h6></Col>
                </Row>
              </Col>

              <Col className="show-grid" xl={11}>
                <Form fluid>
                  <Form.Group controlId="name-1">
                    <Form.ControlLabel><h6>Username</h6></Form.ControlLabel>
                    <Form.Control defaultValue={request.name} onChange={(value) => setRequest((prev)=>({...prev,name:value}))} name="name" />
                    <Form.HelpText>Required</Form.HelpText>
                  </Form.Group>
                  <Form.Group controlId="email-1">
                    <Form.ControlLabel><h6>Email ID</h6></Form.ControlLabel>
                    <Form.Control defaultValue={request.email} onChange={(value) => setRequest((prev)=>({...prev,email:value}))} name="email" type="email" />
                    <Form.HelpText>Required</Form.HelpText>
                  </Form.Group>
                  <Form.Group controlId="password-1">
                    <Form.ControlLabel><h6>Subject</h6></Form.ControlLabel>
                    <Form.Control defaultValue={request.subject} onChange={(value) => setRequest((prev)=>({...prev,subject:value}))} name="text" type="text" autoComplete="on" />
                  </Form.Group>
                  <Form.Group controlId="textarea-1">
                    <Form.ControlLabel><h6>Message</h6></Form.ControlLabel>
                    <Form.Control defaultValue={request.message} onChange={(value) => setRequest((prev)=>({...prev,message:value}))} rows={5} cols={12} name="textarea" accepter={Textarea} />
                  </Form.Group>
                  <Form.Group controlId="input-group" alignItems="center">
                    <ButtonToolbar>
                      <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
                      <Button appearance="default">Cancel</Button>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
              </Col>
                  
            </Grid>
          </Content>

          <Container style={{ margin: "20px", align:"center"}}>
            <iframe width="100%" height="500" borderRadius="20px" frameborder="1" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=VIT%20Vellore+(Vellore%20Institute%20of%20Techonlogy)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/distance-area-calculator.html">measure acres/hectares on map</a></iframe>
          </Container>
        </div>
      </Container>
    </div>
  )
}

export default ContactUsStudent;

