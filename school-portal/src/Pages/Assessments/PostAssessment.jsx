import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as Solid from "@fortawesome/free-solid-svg-icons"
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PostAssessment() {
    const { id } = useParams();
    const [show, setShow] = useState(false);
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div className='Assessment-tab-1'>
                        <h2>Assessment - {id}</h2>
                        <h4>Physics</h4>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='row'>
                        <div className='col-lg-8'>
                            <Table striped bordered >
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Roll No</th>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Mark</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </Table>
                        </div>
                        <div className='col-lg-4' style={{ borderLeft: "1px solid gray" }}>
                            <table className='tablestyle2'>
                                <tr>
                                    <td colSpan={3}>Assessments Description</td>
                                </tr>
                                <tr>
                                    <td>Class</td>
                                    <td>:</td>
                                    <td>Xth C</td>
                                </tr>
                                <tr>
                                    <td>Posted on</td>
                                    <td>:</td>
                                    <td>Timings</td>
                                </tr>
                                <tr>
                                    <td>Due Date</td>
                                    <td>:</td>
                                    <td>Timings</td>
                                </tr>
                                <tr>
                                    <td style={{ verticalAlign: "top" }}>Uploaded file</td>
                                    <td style={{ verticalAlign: "top" }}>:</td>
                                    <td>File1<br />File2</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} align='left'>
                                        <Button className='btn btn-warning' onClick={() => setShow(true)}>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Editing Assessment 1 (for class XIIth D)
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tr>
                            <td className='edit-title'>
                                Assessment<br/>
                                Description
                            </td>
                            <td  className='edit-title'>:</td>
                            <td>
                                <textarea cols={30} rows={4}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td  className='edit-title'>Due Date</td>
                            <td className='edit-title'>:&emsp;</td>
                            <td><input type="datetime-local"/></td>
                        </tr>
                        <tr>
                            <td className='edit-title'>Uploaded<br/>Files</td>
                            <td className='edit-title'>:</td>
                            <td>
                                <ul className='edit-file-list'>
                                    <li>File 1<span style={{float:"right"}}><FontAwesomeIcon color="red" icon={Solid.faTrash}/></span></li>
                                    <li>File 2<span style={{float:"right"}}><FontAwesomeIcon color="red" icon={Solid.faTrash}/></span></li>
                                </ul>
                                <button className='btn custom-btn' style={{padding:0}}><FontAwesomeIcon icon={Solid.faPlus}/></button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} align='center'><button style={{backgroundColor:"#0d6efd"}} className='btn btn-primary'>Save</button></td>
                        </tr>
                    </Table>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default PostAssessment
