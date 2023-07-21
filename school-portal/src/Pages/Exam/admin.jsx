import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Exam.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getAllClass, getClass } from "../../actions/class"
import { getExam } from '../../actions/exam'


function Admin() {

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [standard, setStandard] = useState("");
    const [examList, setExamList] = useState(null);
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];


    useEffect(() => {
        if(localStorage.getItem('type')==="admin")
        dispatch(getAllClass());
        else    
        dispatch(getClass({id:localStorage.getItem("id"),type:localStorage.getItem("type")}));
    }, [dispatch])

    const class1 = useSelector((state) => state.allClassReducer);
    const exam = useSelector((state) => state.examReducer);

    console.log(exam);
    console.log(class1);
    console.log(examList);

    if (standard && edit) {
        dispatch(getExam({ standard }));
        setEdit(false);
    }

    if (exam && !examList) {

        setExamList(Array.from(new Set(exam.docs.map(obj => obj.examName))));
    }

    const handleDateFormat = (date1) => {
        const date = new Date(date1);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const userLocale = navigator.language || navigator.userLanguage;
        const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(date);
        return formattedDate
    }

    const handleTimeFormat = (time1) => {
        const date = new Date();
        date.setHours(parseInt(time1.split(":")[0]));
        date.setMinutes(parseInt(time1.split(":")[1]));
        date.setSeconds(0);
        date.setMilliseconds(0);
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const userLocale = navigator.language || navigator.userLanguage;
        const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(date);
        return formattedDate
    }

    const duration = (start, end) => {
        const sdate = new Date();
        const edate = new Date();
        sdate.setHours(parseInt(start.split(":")[0]));
        sdate.setMinutes(parseInt(start.split(":")[1]));
        sdate.setSeconds(0);
        sdate.setMilliseconds(0);
        edate.setHours(parseInt(end.split(":")[0]));
        edate.setMinutes(parseInt(end.split(":")[1]));
        edate.setSeconds(0);
        edate.setMilliseconds(0);
        return (edate.getTime() - sdate.getTime()) / (1000 * 60)

    }

    const compareTime = (a, b) => {
        const date1 = new Date();
        date1.setHours(parseInt(a.StartTime.split(":")[0]));
        date1.setMinutes(parseInt(a.StartTime.split(":")[1]));
        date1.setSeconds(0);
        date1.setMilliseconds(0);
        const date2 = new Date();
        date2.setHours(parseInt(b.StartTime.split(":")[0]));
        date2.setMinutes(parseInt(b.StartTime.split(":")[1]));
        date2.setSeconds(0);
        date2.setMilliseconds(0);
        return date1.getTime() - date2.getTime();
    }

    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Examination Schedule</h2>
                        <Link to="/AddSchedule" className='btn btn-primary'><FontAwesomeIcon icon={solid.faPlus} /> Add Schedule</Link>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="row studentlist-container">
                        <div className="col-lg-2"> 
                            <h4>Select Standard : </h4>
                        </div>
                        <div className="col-lg-3">
                            < select className="selectPicker3" value={standard} onChange={(e) => { setStandard(e.target.value); setEdit(true); }} >
                                <option value="" disabled>
                                    Select Standard
                                </option>
                                {
                                    class1 !== null && class1.docs.length>0 &&
                                    Array.from(new Set(class1.docs.map(obj => obj.standard))).map((item) => (
                                        standardList.filter((class1) => class1.value === item).map((class1) => (
                                            <option value={class1.value}>{class1.label}</option>
                                        ))
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className='table-responsive'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Subject Name</th>
                                    <th>Exam Date</th>
                                    <th>Exam Time</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {examList ? examList.map((examName) => (
                                    <>
                                        <tr>
                                            <td style={{ backgroundColor: "lightgray" }} colSpan={5} align='center'>{examName}&emsp;<FontAwesomeIcon icon={solid.faPencil} /></td>
                                        </tr>
                                        {
                                            exam.docs.filter((item) => item.examName === examName && item.class.section === 'A' && item.class.subject!=="Class Teacher").sort((a, b) => (new Date(a.date).getTime()) === (new Date(b.date).getTime()) ? compareTime(a, b) : (new Date(a.date).getTime()) - (new Date(b.date).getTime())).map((item, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.class.subject}</td>
                                                    <td>{handleDateFormat(item.date)}</td>
                                                    <td>{handleTimeFormat(item.startTime)} to {handleTimeFormat(item.endTime)}</td>
                                                    <td>{duration(item.startTime, item.endTime)} min</td>

                                                </tr>
                                            ))
                                        }
                                    </>
                                ))
                                    :
                                    <tr>
                                        <td style={{ textAlign: "center" }} colSpan={5}>No Data</td>
                                    </tr>

                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
