import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal';
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from "@fortawesome/free-solid-svg-icons"

const Meeting = () => {
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Meetings Schedule</h2>
                        <Link style={{textDecoration:"none",padding:"5px",display:"flex",alignItems:"center"}} to='/AddMeeting' className='btn btn-primary'><FontAwesomeIcon icon={solid.faPlus}/>Add Meeting</Link> 
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <br />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Meeting Subject</th>
                                <th>Meeting Description</th>
                                <th>Memebers</th>
                                <th>Mode</th>
                                <th>Venue/Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: "center" }} colSpan={6}>No Data</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Meeting