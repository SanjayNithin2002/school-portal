import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Exam.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getAllClass } from "../../actions/class"
import { getExam } from '../../actions/exam'
import EditExam from './EditExam'


function Admin() {

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [standard, setStandard] = useState("");
    const [display, setDisplay] = useState(false);
    //const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];


    useEffect(() => {
        dispatch(getAllClass());
    }, [dispatch])

    const class1 = useSelector((state) => state.allClassReducer);
    const exam = useSelector((state) => state.examReducer);
    console.log(exam);
    console.log(class1);

    if (standard && edit) {
        dispatch(getExam({ standard }));
        setEdit(false);
    }

    const handleDateFormat = (date1,time1) => {
        const date = new Date(date1);
        date.setHours(parseInt(time1.split(":")[0]));
        date.setMinutes(parseInt(time1.split(":")[1]));
        date.setSeconds(0);
        date.setMilliseconds(0);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const userLocale = navigator.language || navigator.userLanguage;
        const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(date);
        return formattedDate
    }

    return (
        <div className='Main'>
            <SideNavBar />
            {
                !display ?
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
                                            class1 !== null &&
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
                            {
                            exam && exam.docs && exam.docs.length>0 ?
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table className='AddStudent-Table-List-1'>
                                        <tbody>
                                            <tr>
                                                <td colSpan={2} style={{ textAlign: "center", fontWeight: "bold" }}>
                                                    Exam Details
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Exam Title</td>
                                                <td>{exam.docs[0].examName}</td>
                                            </tr>
                                            <tr>
                                                <td>Duration</td>
                                                <td>60 min</td>
                                            </tr>
                                            <tr>
                                                <td>Class</td>
                                                <td>{standardList[exam.docs[0].class.standard - 1].label} th</td>
                                            </tr>
                                            <tr>
                                                <td>Do student have class during exam ?</td>
                                                <td>No</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} style={{ textAlign: "center", fontWeight: "bold" }}>
                                                    Subject Details
                                                </td>
                                            </tr>
                                            {
                                                exam && exam.docs.map((item) => (
                                                    <tr>
                                                        <td>{item.class.subject}</td>
                                                        <td>{handleDateFormat(item.date, item.startTime)}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            :
                            <div className='row'>
                                <div style={{padding:"10px",margin:"0px auto",backgroundColor:"lightgray"}} className='col-lg-10 justify-content-center'>
                                    <div style={{textAlign:"center"}}>
                                    No Data
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                    :
                    <EditExam standard={standard} class={class1.docs.filter((item) => item.standard === parseInt(standard))} />
            }
        </div>
    )
}

export default Admin
