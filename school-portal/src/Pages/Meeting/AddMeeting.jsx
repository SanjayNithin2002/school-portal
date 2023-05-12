import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'

import { TagPicker } from 'rsuite';

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from "@fortawesome/free-solid-svg-icons"

const AddMeeting = () => {
    const data = ['Jaya', 'Lakshmi', 'Ramu', 'Siva', 'Ram', 'Krishna', 'Govindha', 'Kumar'].map(
        item => ({ label: item, value: item })
      );
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Meetings Schedule</h2>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <br />
                    <div className='row'>
                        <div className='col-lg-8'>

                    <Table striped bordered hover>
                        <tr>
                            <td className='edit-title'>
                                Meeting Subject
                            </td>
                            <td  className='edit-title'>:</td>
                            <td>
                                <input style={{borderRadius:"5px",width:"90%",padding:"5px",margin:"2px",border:"2px solid gray"}} type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td className='edit-title'>
                                Meeting <br/>Description
                            </td>
                            <td  className='edit-title'>:</td>
                            <td>
                                <textarea style={{borderRadius:"5px",width:"90%",padding:"5px",margin:"2px",border:"2px solid gray"}} cols={30} rows={4}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td  className='edit-title'>Date</td>
                            <td className='edit-title'>:&emsp;</td>
                            <td><input style={{borderRadius:"5px",width:"90%",padding:"5px",margin:"2px",border:"2px solid gray"}} type="datetime-local"/></td>
                        </tr>
                        <tr>
                            <td className='edit-title'>Members</td>
                            <td className='edit-title'>:</td>
                            <td>
                                <TagPicker style={{borderRadius:"5px",width:300,padding:"5px",margin:"2px",border:"2px solid gray"}} data={data} />
                            </td>
                        </tr>
                        <tr>
                            <td  className='edit-title'>Mode</td>
                            <td className='edit-title'>:&emsp;</td>
                            <td><input style={{borderRadius:"5px",width:"90%",padding:"5px",margin:"2px",border:"2px solid gray"}} type="text"/></td>
                        </tr>
                        <tr>
                            <td  className='edit-title'>Venue/Link</td>
                            <td className='edit-title'>:&emsp;</td>
                            <td><input style={{borderRadius:"5px",width:"90%",padding:"5px",margin:"2px",border:"2px solid gray"}} type="text"/></td>
                        </tr>
                        <tr>
                            <td colSpan={3} align='center'><button style={{backgroundColor:"#0d6efd"}} className='btn btn-primary'>Save</button></td>
                        </tr>
                    </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMeeting