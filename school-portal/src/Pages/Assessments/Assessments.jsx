import React from 'react'
import Accordion from 'react-bootstrap/Accordion';

import SideNavBar from '../../components/SideNavBar/SideNavBar'


function Assessments() {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <SideNavBar />
            <div className="Home" style={{ width: "90%", margin: "10px auto" }}>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Upcoming/Ongoing Assessments</Accordion.Header>
                        <Accordion.Body>
                            <h3>Upcoming/Ongoing Assessments</h3>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Completed Assessments</Accordion.Header>
                        <Accordion.Body>
                            <h3>Completed Assessments</h3>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Examination Schedule</Accordion.Header>
                        <Accordion.Body>
                             <h3>Examination Schedule</h3>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    )
}

export default Assessments
