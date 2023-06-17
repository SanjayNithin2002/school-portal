import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Teacher.css"
import { useDispatch, useSelector } from 'react-redux';
import { getClass } from '../../actions/class';

function Teacher() {

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(true);
    const [handleSubject,setHandleSubject] = useState(false);
    const [classTeacher, setClassTeacher] = useState(null);
    useEffect(() => {
        dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])

    const class1 = useSelector((state) => state.singleClassReducer);
    console.log(class1);

    if (class1 && !classTeacher && edit) {
        let id = null;
        class1.classes.filter((item) => item.subject === "Class Teacher").map((item) => {
            id = item.teacher._id;
            return true;
        })
        class1.classes.filter((item) => item.teacher!==null && item.teacher._id===id && item.subject!=="Class Teacher").map((item) => {
            setHandleSubject(true);
        })
        setClassTeacher(id);
        set
        setEdit(false);
    }

    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Teachers</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    {
                        class1 && class1.classes.length > 0 &&
                        class1.classes.filter((item) => item.teacher !== null && item.teacher._id===classTeacher ).map((item) => (
                            <Table bordered className='tablestyle1'>
                                <tbody>
                                    {
                                        handleSubject && item.subject==="Class Teacher" ? <></>:<></>
                                    }
                                    <tr>
                                        <td style={{ backgroundColor:"lightgrey",textAlign:"center",fontWeight:"600",fontSize:"18px" }} colSpan={3}>Class Teacher</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "30%" }} rowSpan={4}><img src="" alt="No img" style={{ width: "10%" }} /></td>
                                        <th style={{ width: "30%" }}>Name</th>
                                        <td style={{ width: "40%" }}>{item.teacher.firstName + " " + item.teacher.lastName}</td>
                                    </tr>
                                    <tr>
                                        <th>EMP ID</th>
                                        <td>{item.teacher.empID}</td>
                                    </tr>
                                    <tr>
                                        <th>Subject</th>
                                        <td>{item.teacher.subject}</td>
                                    </tr>
                                    <tr>
                                        <th>Email ID</th>
                                        <td>{item.teacher.email}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default Teacher
