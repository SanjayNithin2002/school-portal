import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Panel } from 'rsuite';
import './Profile.css';
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table"
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { getAttendance } from '../../actions/attendance';
import { getMarks, getMarksByStudentID } from '../../actions/marks';
import { Calendar } from "react-big-calendar";

import { locales, localizer } from "../Attendance/Attendance";

const ViewStudent = ({ status, onLoading }) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [events, setEvents] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [buttonType, setButtonType] = useState("personal");
    const [User, setUser] = useState(null);

    const attendances = useSelector((state) => state.attendanceReducer);
    const marks = useSelector((state) => state.marksReducer);

    console.log(User)
    console.log(location)
    console.log(id);
    console.log(attendances)
    console.log(marks);

    useEffect(() => {
        if (User && fetchStatus) {
            dispatch(getAttendance(`/Student/${id}`, navigate, { type: "student", id }))
            dispatch(getMarksByStudentID({ id }))
            onLoading(true);
        }
    }, [User, dispatch, navigate, fetchStatus])

    useEffect(() => {
        if (attendances && marks) {
            onLoading(false);
        }
    }, [attendances, marks])

    useEffect(() => {
        if (attendances) {
            let result = []
            if (attendances.docs && attendances.docs.length > 0) {
                attendances.docs.map((item) => {
                    result.push({
                        title1: item.count !== 0 ? "Present" : "Absent",
                        count: item.count,
                        start: item.date,
                        end: item.date
                    })
                    return true;
                })
            }
            console.log(result);
            setEvents(result);
        }
    }, [attendances])

    useEffect(() => {
        if (location.state && fetchStatus && id) {
            if (location.state.status) {
                onLoading(false);
                setFetchStatus(false);
                const message = (
                    <Notification type="error" header="error" closable>
                        Error Code: {location.state.status},<br />{location.state.message}
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
                navigate(`/Student/${id}`, { state: null });
            }
            else if (location.state.student && User === null) {
                console.log()
                setUser(location.state.student);
            }
        }
    }, [location.state, toaster, navigate, id])

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

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

    const CustomEvent = ({ event }) => {
        return (
            <>
                {
                    event.count === 0 &&
                    <div className="attendance-status-view" style={{ backgroundColor: "red" }}>{event.title1}</div>
                }
                {
                    event.count === 1 &&
                    <div className="attendance-status-view" style={{ backgroundColor: "orange" }}>{event.title1}</div>
                }
                {
                    event.count === 2 &&
                    <div className="attendance-status-view" style={{ backgroundColor: "green" }}>{event.title1}</div>
                }
            </>
        )
    }

    return (
        User &&
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div className='row justify-content-between' >
                        <h2 className=' col-xl-11 col-lg-11 col-md-10 col-sm-10'>Profile</h2>
                        <button style={{maxWidth:"100px"}} className='btn btn-warning col-xl-1 col-lg-1 col-md-2 col-sm-2' onClick={() => navigate(-1)} >Back</button>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='Profile-Container row'>
                        <div className='col-lg-3 col-md-4 Profile-Container-1'>
                            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: "100%", maxWidth: "240px" }}>
                                <img alt="no img" src="https://via.placeholder.com/240x240" height="240" />
                                <table>
                                    <tr>
                                        <td align='left'>First Name</td>
                                        <td align='right'>{User.firstName}</td>
                                    </tr>
                                    <tr>
                                        <td align='left'>Last Name</td>
                                        <td align='right'>{User.lastName}</td>
                                    </tr>
                                    <tr>
                                        <td align='left'>Class</td>
                                        <td align='right'>{standardList[User.standard - 1].label} - {User.section}</td>
                                    </tr>
                                </table>
                            </Panel>
                        </div>
                        <div className='col-lg-9 col-md-8 Profile-Container-2'>
                            <div className='Profile-Container-2-1'>
                                <div className='Profile-tab'>
                                    <div className="Profile-tab-1 ">
                                        <button onClick={() => setButtonType("personal")} className={buttonType === "personal" ? "btn btn-primary" : "btn btn-outline-primary"}>Personal Details</button>&ensp;
                                        <button onClick={() => setButtonType("parents")} className={buttonType === "parents" ? "btn btn-primary" : "btn btn-outline-primary"}>Parents Details</button>&ensp;
                                        <button onClick={() => setButtonType("attendance")} className={buttonType === "attendance" ? "btn btn-primary" : "btn btn-outline-primary"}>Attendance Details</button>&ensp;
                                        <button onClick={() => setButtonType("marks")} className={buttonType === "marks" ? "btn btn-primary" : "btn btn-outline-primary"}>Marks Details</button>&ensp;
                                    </div>
                                </div>
                            </div>
                            <div className='Profile-Container-2-1'>
                                <div className='Profile-content table-responsive'>
                                    {
                                        buttonType === "personal" &&
                                        <>
                                            <h4>Personal Details</h4>
                                            <div className='table-responsive bdr'>
                                                <Table className='Profile-content-table'>
                                                    <tr>
                                                        <th>Information</th>
                                                        <th>Details</th>
                                                    </tr>
                                                    <tr>
                                                        <td>Application Number</td>
                                                        <td>{User.applicationNumber}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date Of Birth</td>
                                                        <td>{handleDateFormat(User.dob)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Gender</td>
                                                        <td>{User.gender}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Blood Group</td>
                                                        <td>{User.bloodGroup}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Aadhaar No</td>
                                                        <td>{User.bloodGroup}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Tongue</td>
                                                        <td>{User.motherTongue}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email ID</td>
                                                        <td>{User.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address Line1</td>
                                                        <td>{User.address.line1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address Line2</td>
                                                        <td>{User.address.line2}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>City</td>
                                                        <td>{User.address.city}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>State</td>
                                                        <td>{User.address.state}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pincode</td>
                                                        <td>{User.address.pincode}</td>
                                                    </tr>
                                                </Table>


                                            </div>
                                        </>
                                    }
                                    {
                                        buttonType === "parents" &&
                                        <>
                                            <h4>Parents Details</h4>
                                            <div className='table-responsive bdr'>
                                                <Table className='Profile-content-table'>
                                                    {
                                                        User.father.name !== "NA" &&
                                                        <>
                                                            <tr>
                                                                <th colSpan={2}>Father Details</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>{User.father.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Age</td>
                                                                <td>{User.father.age}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Occupation</td>
                                                                <td>{User.father.occupation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Qualification</td>
                                                                <td>{User.father.qualification}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Annual Income</td>
                                                                <td>{User.father.annualIncome}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone No</td>
                                                                <td>{User.father.phoneNumber}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email ID</td>
                                                                <td>{User.father.email}</td>
                                                            </tr>
                                                        </>
                                                    }
                                                    {
                                                        User.mother.name !== "NA" &&
                                                        <>
                                                            <tr>
                                                                <th colSpan={2}>Mother Details</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>{User.mother.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Age</td>
                                                                <td>{User.mother.age}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Occupation</td>
                                                                <td>{User.mother.occupation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Qualification</td>
                                                                <td>{User.mother.qualification}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Annual Income</td>
                                                                <td>{User.mother.annualIncome}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone No</td>
                                                                <td>{User.mother.phoneNumber}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email ID</td>
                                                                <td>{User.mother.email}</td>
                                                            </tr>
                                                        </>
                                                    }
                                                    {
                                                        User.guardian.name !== "NA" &&
                                                        <>
                                                            <tr>
                                                                <th colSpan={2}>Guardian Details</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>{User.guardian.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Age</td>
                                                                <td>{User.guardian.age}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Occupation</td>
                                                                <td>{User.guardian.occupation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Qualification</td>
                                                                <td>{User.guardian.qualification}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Annual Income</td>
                                                                <td>{User.guardian.annualIncome}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone No</td>
                                                                <td>{User.guardian.phoneNumber}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email ID</td>
                                                                <td>{User.guardian.email}</td>
                                                            </tr>
                                                        </>
                                                    }
                                                </Table>
                                            </div>
                                        </>
                                    }
                                    {
                                        buttonType === "attendance" &&
                                        <>
                                            <h4>Attendance Details</h4>
                                            <div className='table-responsive bdr'>
                                                {
                                                    events &&
                                                    <Calendar components={{ event: CustomEvent }} localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, minWidth:500 }} />
                                                }


                                            </div>
                                        </>
                                    }
                                    {
                                        buttonType === "marks" &&
                                        <>
                                            <h4>Marks Details</h4>
                                            <div className='table-responsive'>
                                                <Table className='Profile-content-table'>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Subject</th>
                                                        <th>Scored Mark</th>
                                                        <th>Weightage Mark</th>
                                                    </tr>
                                                    {
                                                        marks && marks.docs.assessmentMarks.length>0 && 
                                                        <>
                                                            <tr>
                                                                <th style={{opacity:"0.8",textAlign:"center"}} colSpan={4}>Assessment Marks</th>
                                                            </tr>
                                                            {
                                                                marks.docs.assessmentMarks.map((mark)=>(
                                                                    <tr>
                                                                        <td>{mark.assessment.title}</td>
                                                                        <td>{mark.assessment.class.subject}</td>
                                                                        <td>{mark.scoredMarks}/{mark.assessment.maxMarks}</td>
                                                                        <td>{mark.weightageScoredMarks}/{mark.assessment.weightageMarks}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </>
                                                    }
                                                    {
                                                        marks && marks.docs.examMarks.length>0 && 
                                                        <>
                                                            <tr>
                                                                <th style={{opacity:"0.8",textAlign:"center"}} colSpan={4}>Exam Marks</th>
                                                            </tr>
                                                            {
                                                                marks.docs.examMarks.map((mark)=>(
                                                                    <tr>
                                                                        <td>{mark.exam.examName.name+"-"+mark.exam.examName.sequence}</td>
                                                                        <td>{mark.exam.class.subject}</td>
                                                                        <td>{mark.scoredMarks}/{mark.exam.maxMarks}</td>
                                                                        <td>{mark.weightageScoredMarks}/{mark.exam.weightageMarks}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </>
                                                    }
                                                </Table>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewStudent
