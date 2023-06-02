import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./Student.css"
import { requestClassStudents, requestStudents } from '../../actions/students'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { getClass } from '../../actions/currentUser'

function StudentList() {
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const [classID, setClassID] = useState(null);
    const [students, setStudents] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const class1 = useSelector((state) => state.subjectTeacherReducer)
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }]

    useEffect(() => {
        dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])

    if (classID !== null && students === null) {
        dispatch(requestClassStudents(classID, navigate));
    }

    if (classID !== null && location.state && (students === null || location.state.students !== students)) {
        setStudents(location.state.students);
    }

    const handleClass = (field, value) => {
        let std = field === "standard" ? value : standard;
        let sec = field === "section" ? value : section;
        if (std !== null && sec !== null) {
            class1.classes.map((item) => {
                if (item.standard === parseInt(std) && item.section === sec) {
                    setClassID(item._id);
                }
                return true;
            })
        }
        field === "standard" ? setStandard(std) : setSection(sec);
        setStudents(null);
    }

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
                                <h4>Select Standard : </h4>
                            </div>
                            <div className="col-lg-3">
                                <select
                                    className="selectPicker3"
                                    value={standard}
                                    onChange={(e) => handleClass("standard", e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Standard
                                    </option>
                                    {
                                        class1 &&
                                        class1.classes.map((item) => (
                                            standardList.filter((class1) => class1.value === item.standard).map((class1) => (
                                                <option value={class1.value}>{class1.label}</option>
                                            ))
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-lg-2">
                                <h4>Select Section : </h4>
                            </div>
                            <div className="col-lg-3">
                                <select className="selectPicker3" value={section} onChange={(e) => { handleClass("section", e.target.value); }} >
                                    <option value="" disabled>
                                        Select Section
                                    </option>
                                    {
                                        class1 &&
                                        class1.classes.filter((item) => parseInt(standard) === item.standard).map((item) => (
                                            <option value={item.section}>{item.section}</option>
                                        ))
                                    }
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
                                        {standard !== "" && section !== "" ? (
                                            students && students.map((item, index) => (
                                                <tr key={item}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.firstName}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>{item.gender}</td>
                                                    <td>
                                                        <Link to='/Home' style={{ textDecoration: 'none', color: "white" }} className="btn btn-primary">View</Link>
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
