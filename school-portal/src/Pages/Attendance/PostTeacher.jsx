import React from "react";
import Table from "react-bootstrap/Table";
import { Toggle } from 'rsuite';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Solid from "@fortawesome/free-solid-svg-icons";
import * as Regular from "@fortawesome/free-regular-svg-icons";

import SideNavBar from "../../components/SideNavBar/SideNavBar";

const PostStudent = () => {
    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>Students Attendance</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="">
                        <div className="row poststudent-container">
                            <div className="col-lg-3" style={{ margin: "0px auto", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                <h5>Default Value : </h5>
                                <Toggle size="lg" checkedChildren="Present" unCheckedChildren="Absent" />
                            </div>
                        </div>
                        <br /><br />
                        <div className="row poststudent-container">
                            <div className="col-lg-8">
                                <Table striped bordered className="tablestyle2">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Stardard</th>
                                            <th>Section</th>
                                            <th>Date</th>
                                            <th>Slot</th>
                                            <th>Strength</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>VIII</td>
                                            <td>D</td>
                                            <td>1st April, 2023</td>
                                            <td>Afternoon</td>
                                            <td>35</td>
                                            <td>
                                                <FontAwesomeIcon icon={Solid.faPlus} />
                                                &nbsp;/&nbsp;
                                                <FontAwesomeIcon icon={Regular.faPenToSquare} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>VII</td>
                                            <td>C</td>
                                            <td>1st April, 2023</td>
                                            <td>Morning</td>
                                            <td>35</td>
                                            <td>
                                                <FontAwesomeIcon icon={Solid.faPlus} />
                                                &nbsp;/&nbsp;
                                                <FontAwesomeIcon icon={Regular.faPenToSquare} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostStudent;
