import React, { useState } from "react";
import {Link } from "react-router-dom"

import SideNavBar from "../../components/SideNavBar/SideNavBar";
import Table from "react-bootstrap/Table";

function StudentList() {
    const [stardard, setStardard] = useState("");
    const [section, setSection] = useState("");
    const data = [
        {
            rollno: 1,
            fname: "Arvind",
            lname: "M M",
            gender: "Male",
        },
        {
            rollno: 2,
            fname: "Dharan",
            lname: "Kumar",
            gender: "Male",
        },
        {
            rollno: 3,
            fname: "Keerthy",
            lname: "Suresh",
            gender: "Female",
        },
        {
            rollno: 4,
            fname: "Muthu",
            lname: "Kumar",
            gender: "Male",
        },
        {
            rollno: 5,
            fname: "Ramya",
            lname: "Pandian",
            gender: "Female",
        },
        {
            rollno: 6,
            fname: "Yeshwanth",
            lname: "J D",
            gender: "Male",
        },
    ];

    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>Student List</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="">
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
                        <div className="row studentlist-container">
                            <div className="col-lg-8">
                                <Table striped className="tablestyle4">
                                    <thead>
                                        <tr>
                                            <th>Roll No</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Gender</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stardard !== "" && section !== "" ? (
                                            data.map((item) => (
                                                <tr key={item}>
                                                    <td>{item.rollno}</td>
                                                    <td>{item.fname}</td>
                                                    <td>{item.lname}</td>
                                                    <td>{item.gender}</td>
                                                    <td>
                                                        <Link to='/Home' style={{textDecoration:'none',color:"white"}} className="btn btn-primary">View</Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} align="center">
                                                    No Data
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentList;
