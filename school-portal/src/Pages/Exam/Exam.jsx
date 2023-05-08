import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Exam.css"



function Exam() {
    const [stardard, setStardard] = useState("");
    const [section, setSection] = useState("");
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Examination Schedule</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="row studentlist-container">
                        <div className="col-lg-2">
                            <h4>Select Class : </h4>
                        </div>
                        <div className="col-lg-3">
                            <select
                                className="selectPicker3"
                                value={stardard}
                                onChange={(e) => setStardard(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select Class
                                </option>
                                <option value="VII">VII</option>
                                <option value="VIII">VIII</option>
                            </select>
                        </div>
                        <div className="col-lg-2">
                            <h4>Select Class : </h4>
                        </div>
                        <div className="col-lg-3">
                            <select className="selectPicker3" value={section} onChange={(e) => setSection(e.target.value)} >
                                <option value="" disabled>
                                    Select Class
                                </option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <br />
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
                                <td style={{ textAlign: "center" }} colSpan={5}>No Data</td>
                            </tr>
                        </tbody>
                    </Table>

                </div>
            </div>
        </div>
    )
}

export default Exam
