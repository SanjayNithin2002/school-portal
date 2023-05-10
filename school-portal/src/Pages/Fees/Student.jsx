import React, { useState } from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/esm/Table';

import "./Fees.css"

const Admin = () => {
    const [active, setActive] = useState("school");
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h2>Payments</h2>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='payment-main-content'>
                        <div className='payment-tab'>
                            <button className={'btn btn-outline-success payment-btn'}>Paid Amount<br /> &#8377;100000</button>
                            <button className={'btn btn-outline-warning payment-btn'}>Pending Payment<br /> &#8377;5000</button>
                            <button className={'btn btn-outline-primary payment-btn'}>Wallet Amount <br />&#8377;0</button>
                        </div>
                        <br /><br />
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header style={{ padding: "initial" }}>Pending/Request Payment</Accordion.Header>
                                <Accordion.Body>
                                    <Table bordered striped hover>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Title</th>
                                                <th>Due Date</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={5}>No data</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header style={{ padding: "initial" }}>Payment Receipts</Accordion.Header>
                                <Accordion.Body>
                                    <Table bordered striped hover>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Title</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={4}>No data</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
