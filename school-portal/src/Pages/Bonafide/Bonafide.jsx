import React from 'react'
import Table from "react-bootstrap/Table"
import { DatePicker, Stack } from 'rsuite'

import "./Bonafide.css"
import SideNavBar from '../../components/SideNavBar/SideNavBar'


function Bonafide() {
    const [certificate, setCertificate] = React.useState('select');
    const data = ['Passport', 'Visa', 'BusPass', 'Income Tax', 'NCC Bonafide'].map(
        item => ({ label: item, value: item })
    );
    console.log(certificate);
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>Bonafide Application</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='bonafide-content'>
                        <div className='row bonafide-content-1'>
                            <div className='col-lg-3'>
                                <h4>Select Service : </h4>
                            </div>
                            <div className='col-lg-4'>
                                <select value={certificate} className="selectPicker" onChange={(e) => setCertificate(e.target.value)} required>
                                    <option value='select' disabled>Select Service</option>
                                    {
                                        data.map((item) => (
                                            <option value={item.value}>{item.value}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='bonafide-content-2'>

                                <br /><br />
                                {certificate !== 'select' &&
                                    <Table className='tablestyle3'>
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'center' }} colSpan={2}>Bonafide Application(All fields are mandatory)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                certificate === "Income Tax" &&
                                                <tr>
                                                    <td>Who is Employee<span style={{ color: "red" }}>*</span></td>
                                                    <td>
                                                        <select className="selectPicker1" required>
                                                            <option value='select' disabled>Select one option</option>
                                                            <option value='Father'>Father</option>
                                                            <option value='Mother'>Mother</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            }
                                            {
                                                certificate === "Visa" && <>
                                                    <tr>
                                                        <td>From Date<span style={{ color: "red" }}>*</span></td>
                                                        <td>
                                                            <Stack direction="column" alignItems="flex-start" spacing={6}>
                                                                <DatePicker editable={false} />
                                                            </Stack>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>To Date<span style={{ color: "red" }}>*</span></td>
                                                        <td>
                                                            <Stack direction="column" alignItems="flex-start" spacing={6}>
                                                                <DatePicker editable={false} />
                                                            </Stack>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Enter Visa Place<span style={{ color: "red" }}>*</span></td>
                                                        <td>
                                                            <input type="text" className="selectPicker1"/>
                                                        </td>
                                                    </tr>
                                                </>
                                            }
                                            <tr>
                                                <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                <td><textarea rows="5" cols="60" ></textarea></td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: "center" }} colSpan={2}>
                                                    <button className='btn btn-primary'>Submit</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bonafide