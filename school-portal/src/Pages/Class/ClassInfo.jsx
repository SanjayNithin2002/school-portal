import React, { useEffect, useState } from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table"

import "./Class.css"
import { useDispatch, useSelector } from 'react-redux';
import { getAllClass, getClass, getStandardClass } from '../../actions/class';
import { getTimeTable } from '../../actions/timetable';
import { requestClassStudents } from '../../actions/students';

function ClassInfo() {

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [edit1, setEdit1] = useState(false);
    const [standard, setStardard] = useState('');

    if (standard && edit) {
        dispatch(getStandardClass(standard));
        dispatch(getTimeTable(standard));
        setEdit(false);
    }

    const class1 = useSelector((state) => state.allClassReducer);
    const timetable = useSelector((state) => state.timeTableReducer);

    console.log(class1);
    console.log(timetable);

    const getCount = (type) => {
        let count  = 0;
        class1.sections.map((item)=>{
            count+=class1.count[item][type];
        })
        return count;
    }

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Class Info</h2>
                        <Link to='/CreateClass' style={{ textDecoration: "none", color: "white", fontWeight: "600", fontSize: "18px" }} className='btn btn-primary d-flex align-items-center'>
                            <FontAwesomeIcon icon={solid.faPlus} />&ensp;Create Class
                        </Link>
                    </div>

                    <hr style={{ border: "1px solid gray" }} />
                    <div className="row ClassInfo-container">
                        <div className="col-lg-2">
                            <h4>Select Stardard : </h4>
                        </div>
                        <div className="col-lg-3">
                            <select
                                className="ClassSelectPicker"
                                value={standard}
                                onChange={(e) => { setStardard(e.target.value); setEdit(true); }}
                            >
                                <option value="" disabled>
                                    Select Stardard
                                </option>
                                {
                                    standardList.map((item) => (
                                        <option value={item.value}>{item.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <br />
                    <br />
                    {
                        standard && timetable && class1 &&
                        <div className='row'>
                            <div className='col-lg-8 justify-content-center'>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: "center", fontWeight: "bold" }}>Class Details</td>
                                        </tr>
                                        <tr>
                                            <td>Standard</td>
                                            <td>{standard}</td>
                                            <td>No of Working Days</td>
                                            <td>{timetable[0].workingDays[0]}</td>
                                        </tr>
                                        <tr>
                                            <td>Day Start Time</td>
                                            <td>{timetable[0].startTime}</td>
                                            <td>Day End Time</td>
                                            <td>{timetable[0].endTime}</td>
                                        </tr>
                                        <tr>
                                            <td>Duration</td>
                                            <td>{timetable[0].duration} min</td>
                                            <td>No of Classes per Day</td>
                                            <td>8 classes</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4} style={{ fontWeight: "bold" }}>Break Details</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>No of Break or Lunch per Day ?</td>
                                            <td colSpan={2}>{timetable[0].break.length}</td>
                                        </tr>
                                        {timetable[0].break.map((item) => (
                                            <>
                                                <tr>
                                                    <td>Break Name</td>
                                                    <td>{item.title}</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Start Time</td>
                                                    <td>{item.startTime}</td>
                                                    <td>End Time</td>
                                                    <td>{item.endTime}</td>
                                                </tr>
                                            </>
                                        ))
                                        }
                                        <tr>
                                            <td colSpan={4} style={{ fontWeight: "bold" }}>Subject Details</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>No of Subjects ?</td>
                                            <td colSpan={2}>{class1.subjects.length}</td>
                                        </tr>
                                        <tr>
                                            <td>Subject List</td>
                                            <td colSpan={3}>
                                                {
                                                    class1.subjects.map((item) => (
                                                        <>{item},</>
                                                    ))
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: "center", fontWeight: "bold" }}>Students Details</td>
                                        </tr>
                                        <tr>
                                            <td>No of Boys</td>
                                            <td>{getCount("male")}</td>
                                            <td>No of Girls</td>
                                            <td>{getCount("female")}</td>
                                        </tr>
                                        <tr>
                                            <td>No of Sections</td>
                                            <td>{class1.sections.length}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                            <tr>
                                                <td colSpan={4} style={{ fontWeight: "bold" }}>Students count (Section Wise)</td>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: "white" }} colSpan={4}>
                                                    <div style={{ textAlign: "center" }} className='row'>
                                                        <div className='col-lg-6 d-flex justify-content-center'>
                                                            <Table className='CreateClass-subTable'>
                                                                <thead>
                                                                    <th>Sections</th>
                                                                    <th>No of Boys</th>
                                                                    <th>No of Girls</th>
                                                                    <th>Total Strength</th>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        class1.sections.map((item, index) => (
                                                                            <tr>
                                                                                <td>{item}</td>
                                                                                <td>{
                                                                                    class1.count[item]["male"]
                                                                                }</td>
                                                                                <td>{
                                                                                    class1.count[item]["female"]
                                                                                }</td>
                                                                                <td>{class1.count[item]["male"] + class1.count[item]["female"]}</td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default ClassInfo