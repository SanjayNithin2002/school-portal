import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table"

import "./Class.css"
import { useDispatch, useSelector } from 'react-redux';
import { getAllClass, getStandardClass } from '../../actions/class';
import { getTimeTable } from '../../actions/timetable';
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"

function ClassInfo({ status, onLoading }) {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [edit1, setEdit1] = useState(false);
    const [standard, setStandard] = useState('');
    const [fetchStatus, setFetchStatus] = useState(true);

    useEffect(() => {
        if (fetchStatus && standard) {
            onLoading(true);
            dispatch(getStandardClass("/ClassInfo", navigate, standard));
            dispatch(getTimeTable("/ClassInfo", navigate, standard));
        }
    }, [fetchStatus, standard, dispatch, navigate])

    const class1 = useSelector((state) => state.standardClassReducer);
    const timetable = useSelector((state) => state.timeTableReducer);

    useEffect(() => {
        if (class1 && timetable) {
            onLoading(false);
        }
    }, [class1, timetable])

    console.log(class1);
    console.log(timetable);

    const getCount = (type) => {
        let count = 0;
        class1.sections.filter((item) => item !== "" && item !== null).map((item) => {
            if (item && item !== null) {
                console.log(item);
                count += class1.count[item][type];

                console.log(count);
            }
        })
        return count;
    }

    const getClassCount = () => {
        let SDate = new Date();
        SDate.setHours(timetable.docs[0].startTime.split(":")[0], timetable.docs[0].startTime.split(":")[1], 0, 0)
        let EDate = new Date();
        EDate.setHours(timetable.docs[0].endTime.split(":")[0], timetable.docs[0].endTime.split(":")[1], 0, 0)
        let totalTime = EDate.getTime() - SDate.getTime();
        timetable.docs[0].break.map((breaks) => {
            let breakSTime = new Date()
            breakSTime.setHours(breaks.startTime.split(":")[0], breaks.startTime.split(":")[1], 0, 0)
            let breakETime = new Date()
            breakETime.setHours(breaks.endTime.split(":")[0], breaks.endTime.split(":")[1], 0, 0)
            totalTime = totalTime - breakETime.getTime() + breakSTime.getTime();
        })
        return Math.round(totalTime / (1024 * 60 * timetable.docs[0].duration));

    }

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];
    return (
        <div className='Main'>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div className='d-flex justify-content-between' style={{ alignItems: "flex-start" }}>
                        <h2>Class Info</h2>
                        <Link to='/CreateClass' style={{ textDecoration: "none", color: "white", fontWeight: "600", fontSize: "18px" }} className='btn btn-primary d-flex align-items-center'>
                            <FontAwesomeIcon icon={solid.faPlus} />&ensp;Create Class
                        </Link>
                    </div>

                    <hr style={{ border: "1px solid gray" }} />
                    <div className='row ClassInfo-container'>
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            <h4>Select Standard : </h4>
                        </div>
                        <div className="col-lg-3 col-md-5 col-sm-6">
                            <select className="selectPicker3" value={standard} onChange={(e) => { setStandard(e.target.value); setEdit(true); }}>
                                <option value="" disabled>
                                    Select Standard
                                </option>
                                {
                                    standardList.map((class1) => (
                                        <option value={class1.value}>{class1.label}</option>
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
                                {
                                    timetable.docs.length > 0 ?
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td colSpan={4} style={{ textAlign: "center", fontWeight: "bold" }}>Class Details</td>
                                                </tr>
                                                <tr>
                                                    <td>Standard</td>
                                                    <td>{standardList[standard-1].label}</td>
                                                    <td>No of Working Days</td>
                                                    <td>{timetable.docs[0].workingDays[0]}</td>
                                                </tr>
                                                <tr>
                                                    <td>Day Start Time</td>
                                                    <td>{timetable.docs[0].startTime}</td>
                                                    <td>Day End Time</td>
                                                    <td>{timetable.docs[0].endTime}</td>
                                                </tr>
                                                <tr>
                                                    <td>Duration</td>
                                                    <td>{timetable.docs[0].duration} min</td>
                                                    <td>No of Classes per Day</td>
                                                    <td>{getClassCount()} classes</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4} style={{ fontWeight: "bold" }}>Break Details</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>No of Break or Lunch per Day ?</td>
                                                    <td colSpan={2}>{timetable.docs[0].break.length}</td>
                                                </tr>
                                                {timetable.docs[0].break.map((item) => (
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
                                                    <td>No of Subjects ?</td>
                                                    <td>{class1.subjects.length}</td>
                                                    <td></td>
                                                    <td></td>
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
                                                                            class1.sections.filter((item) => item !== "" && item !== null).map((item, index) => (
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
                                        :
                                        <div style={{ textAlign: "center" }}><span style={{ borderRadius: "8px", backgroundColor: "#cadeef", padding: "10px 5px", fontSize: "18px", fontWeight: "bold" }}><FontAwesomeIcon icon={solid.faExclamationTriangle} />&emsp;No class details exist</span></div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ClassInfo