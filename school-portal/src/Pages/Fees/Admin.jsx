import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap';

import "./Fees.css"
import Table from 'react-bootstrap/Table';

const Admin = () => {
    const [buttonType, setButtonType] = useState("feesStructure");
    return (
        <div className='Main'>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h2>Fees Structure</h2>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='Profile-Container-2-1'>
                        <div className='Profile-tab'>
                            <div className="Profile-tab-1 ">
                                <button onClick={() => setButtonType("feesStructure")} className={buttonType === "feesStructure" ? "btn btn-primary" : "btn btn-outline-primary"}>Fees Structure</button>&ensp;
                                <button onClick={() => setButtonType("payment")} className={buttonType === "payment" ? "btn btn-primary" : "btn btn-outline-primary"}>Payment Request</button>&ensp;
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Accordion defaultActiveKey="0" className='col-xl-8 col-lg-9 col-md-10'>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Academic Fees</Accordion.Header>
                                    <Accordion.Body>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Bus Fees</Accordion.Header>
                                    <Accordion.Body>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Hostel Fees</Accordion.Header>
                                    <Accordion.Body>

                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
