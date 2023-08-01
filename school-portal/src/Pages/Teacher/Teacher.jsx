import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Teacher.css"
import { useDispatch, useSelector } from 'react-redux';
import { getClass } from '../../actions/class';

function Teacher() {

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(true);
    const [handleSubject, setHandleSubject] = useState(false);
    const [classTeacher, setClassTeacher] = useState(null);
    const [teacherList, setTeacherList] = useState(null);
    useEffect(() => {
        dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])

    const class1 = useSelector((state) => state.allClassReducer);
    console.log(class1);
    console.log(teacherList);

    if (class1 && !teacherList && edit) {
        let id = null;
        let teachers = [];
        class1.docs.filter((item) => item.subject === "Class Teacher").map((item) => {
            id = item.teacher._id;
            return true;
        })
        if (class1.docs.filter((item) => item.teacher !== null && item.teacher._id === id && item.subject !== "Class Teacher").length === 0) {
            let empID, name, email
            class1.docs.filter((item) => item.teacher !== null && item.teacher._id === id && item.subject === "Class Teacher").map((item) => {
                empID = item.teacher.empID
                name = item.teacher.firstName + " " + item.teacher.lastName
                email = item.teacher.email
            })
            teachers.push({
                subject: "Class Teacher",
                empID,
                name,
                email,
            })
        }
        class1.docs.filter((item) => item.teacher !== null && item.subject !== "Class Teacher").map((item) => {
            teachers.push({
                subject: item.teacher._id === id ? "Class Teacher$" + item.subject : item.subject,
                empID: item.teacher.empID,
                name: item.teacher.firstName + " " + item.teacher.lastName,
                email: item.teacher.email,
            })
            return true;
        })
        setTeacherList(teachers);
        setClassTeacher(id);
        setEdit(false);
    }

    return (
        <div className='Main'>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Teachers</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    {
                        teacherList && teacherList.length > 0 ?
                            teacherList.map((item) => (
                                <div className='table-responsive'>
                                <Table bordered className='tablestyle1'>
                                    <tbody>
                                        {console.log(item.subject.split("$")[0])}
                                        {
                                            item.subject.split("$")[0] === "Class Teacher" ?
                                                <tr>
                                                    <td style={{ backgroundColor: "#9bd4e4", textAlign: "center", fontWeight: "600", fontSize: "18px" }} colSpan={3}>Class Teacher</td>
                                                </tr>
                                                :
                                                <></>
                                        }
                                        <tr>
                                            <td style={{ width: "30%" }} rowSpan={4}><img src="" alt="No img" width="100px" /></td>
                                            <th style={{ width: "30%" }}>Name</th>
                                            <td style={{ width: "40%" }}>{item.name}</td>
                                        </tr>
                                        <tr>
                                            <th>EMP ID</th>
                                            <td>{item.empID}</td>
                                        </tr>
                                        <tr>
                                            <th>{item.subject === "Class Teacher" ? "Role" : "Subject"}</th>
                                            <td>
                                                {
                                                    item.subject === "Class Teacher" ? "Class Teacher" :
                                                        item.subject.split("$")[0] === "Class Teacher" ? item.subject.split("$")[1] : item.subject
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Email ID</th>
                                            <td>{item.email}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                </div>
                            ))
                            :
                            <div className='row' style={{ justifyContent: 'center' }}>
                                <div className='col-lg-10' style={{ backgroundColor: "rgb(155, 212, 228)", padding:"5px", fontSize:"18px", fontWeight:"bolder", justifyContent: "center", display: "flex" }}>
                                    No Data
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default Teacher
