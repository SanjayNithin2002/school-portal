import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Exam.css"
import { Link } from 'react-router-dom'


function Teacher() {
    const [stardard, setStardard] = useState("");
    const [section, setSection] = useState("");
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Examination Schedule</h2>
                        <Link to="/AddSchedule" className='btn btn-primary'><FontAwesomeIcon icon={solid.faPlus}/> Add Schedule</Link>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="row studentlist-container">
                        <div className="col-lg-2">
                            <h4>Select Stardard : </h4>
                        </div>
                        <div className="col-lg-3">
                            <select
                                className="selectPicker3"
                                value={stardard}
                                onChange={(e) => setStardard(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select Stardard
                                </option>
                                <option value="VII">VII</option>
                                <option value="VIII">VIII</option>
                            </select>
                        </div>
                        <div className="col-lg-2">
                            <h4>Select Section : </h4>
                        </div>
                        <div className="col-lg-3">
                            <select className="selectPicker3" value={section} onChange={(e) => setSection(e.target.value)} >
                                <option value="" disabled>
                                    Select Section
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

export default Teacher
