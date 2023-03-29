import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom"

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Assessments.css"



function Assessments() {
    


    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Assessments</h2>
                    <hr style={{border:"1px solid gray"}}/>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header style={{ padding: "initial" }}>Upcoming/Ongoing Assessments</Accordion.Header>
                            <Accordion.Body>
                                <Link to='/Assessment/1' style={{color:'inherit',textDecoration:"none"}}>
                                <div className='Assessment-tab'>
                                    <div className='Assessment-tab-1'>
                                        <h4>Assessement - 1</h4>
                                        <h5>Physcics</h5>
                                    </div>
                                    <div className='Assessment-tab-1'>
                                        <div style={{ fontWeight: "800" }}>Status :<span style={{ color: "#ffea00" }}> File not uploaded</span></div>
                                        <div>30 March, 2023 11:59pm </div>
                                    </div>
                                </div>
                                </Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Completed Assessments</Accordion.Header>
                            <Accordion.Body>
                                <div className='Assessment-tab'>
                                    <div className='Assessment-tab-1'>
                                        <h4>Assessement - 1</h4>
                                        <h5>Maths</h5>
                                    </div>
                                    <div className='Assessment-tab-1'>
                                        <div style={{ fontWeight: "800" }}>Status :<span style={{ color: "green" }}> File uploaded</span></div>
                                        <div>20 March, 2023 11:59pm </div>
                                    </div>
                                </div>
                                <div className='Assessment-tab'>
                                    <div className='Assessment-tab-1'>
                                        <h4>Assessement - 1</h4>
                                        <h5>English</h5>
                                    </div>
                                    <div className='Assessment-tab-1'>
                                        <div style={{ fontWeight: "800" }}>Status :<span style={{ color: "Red" }}> Due pasted over</span></div>
                                        <div>20 March, 2023 11:59pm </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Examination Schedule</Accordion.Header>
                            <Accordion.Body>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Subject Name</th>
                                            <th>Exam Date</th>
                                            <th>Exam Time</th>
                                            <th>Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{textAlign:"center"}} colSpan={5}>No Data</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default Assessments
