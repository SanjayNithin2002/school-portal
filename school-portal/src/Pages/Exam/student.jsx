import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Exam.css"


function Student() {
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Examination Schedule</h2>
                    <hr style={{ border: "1px solid gray" }} />
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

export default Student