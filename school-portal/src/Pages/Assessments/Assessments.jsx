import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import "./Assessments.css"
import { useDispatch, useSelector } from 'react-redux'
import { getAnswers, getAssessments } from '../../actions/assessments'
import { Link, useNavigate, useLocation } from "react-router-dom"
import * as Solid from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Student from './Student'
import Teacher from './Teacher'
import { Notification, useToaster } from 'rsuite';

function Assessments({ status, onLoading }) {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [display, setDisplay] = useState(false);
    const [assessmentID, setAssessmentID] = useState(false);
    const [teacherID, setTeacherID] = useState(false);
    const [fetchStatus, setFetchStatus] = useState(true);
    console.log(fetchStatus)
    useEffect(() => {
        if (fetchStatus) {
            onLoading(true);
            dispatch(getAssessments("/Assessment", navigate, { type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
            if (localStorage.getItem('type') === "student") {
                dispatch(getAnswers("/Assessment", navigate, { type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
            }
        }
    }, [dispatch, fetchStatus, navigate])

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];
    const assessments = useSelector((state) => state.assessmentsReducer)
    const answers = useSelector((state) => state.answersReducer)

    console.log(answers);
    console.log(assessments)

    useEffect(() => {
        if (assessments !== null || answers !== null) {
            onLoading(false);
        }
    }, [assessments, answers])

    useEffect(() => {
        if (location.state) {
            if (location.state.status === 200) {
                onLoading(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                        {location.state.message}
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
                navigate('/Assessment', { state: null });
            }
            else {
                onLoading(false);
                setFetchStatus(false);
                const message = (
                    <Notification type="error" header="error" closable>
                        Error Code: {location.state.status},<br />{location.state.message}
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
                navigate('/Assessment', { state: null });
            }
        }
    }, [location.state, navigate, toaster])

    const handleDateFormat = (date1) => {
        const date = new Date(date1);
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

    const checkDueDate = (date1) => {
        const startDate = new Date();
        const endDate = new Date(date1);
        if (endDate.getTime() - startDate.getTime() > 0)
            return true;
        else
            return false;
    }

    const handleClick = (aID, tID) => {
        setTeacherID(tID);
        setAssessmentID(aID);
        setDisplay(true);
        onLoading(true);
        if (localStorage.getItem("type") === "teacher") {
            dispatch({ type: 'FETCH_MARKS', payload: null })
            dispatch({ type: "FETCH_CLASS_STUDENTS", payload: null })
            dispatch({ type: "FETCH_ASSESSMENT_ANSWERS", payload: null })
        }
    }

    const close = () => {
        setDisplay(false);
    }

    return (
        <div className='Main'>
            <div className="Home">
                {!display ?
                    <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                        <div className="btnmove" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <h2>Assessments</h2>
                            <div className="btn-group">
                                <Link to='/PostAssessment' className='btn btn-primary'><FontAwesomeIcon icon={Solid.faPlus} />Add</Link>
                            </div>
                        </div>
                        <hr style={{ border: "1px solid gray" }} />
                        <div style={{ width: "100%" }} className="AddStudent-container">
                            <div style={{ minWidth: "600px" }}>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header style={{ padding: "initial" }}>Ongoing Assessments</Accordion.Header>
                                        <Accordion.Body>
                                            {
                                                assessments && assessments.docs.filter((item1) => { return checkDueDate(item1.lastDate) }).length === 0 &&
                                                <div>No data</div>
                                            }
                                            {
                                                assessments && assessments.docs.filter((item) => { return checkDueDate(item.lastDate) }).map((item) => (
                                                    <div onClick={() => handleClick(item._id, item.class.teacher)} style={{ color: 'inherit', textDecoration: "none" }}>
                                                        <div className='Assessment-tab'>
                                                            <div className='Assessment-tab-1'>
                                                                <h4>{item.title}</h4>
                                                                <h5>{item.class.subject}</h5>
                                                            </div>
                                                            <div className='Assessment-tab-1'>
                                                                <div style={{ fontWeight: "800" }}>
                                                                    {
                                                                        localStorage.getItem("type") === "student" && <>
                                                                            Status :&nbsp;
                                                                            {
                                                                                answers && answers.docs.filter((item1) => item1.assessment._id === item._id).length !== 0 ? answers.docs.filter((item1) => item1.assessment._id === item._id).map((item1) => (
                                                                                    item1.answerFile !== null ?
                                                                                        <span style={{ color: "green" }}>

                                                                                            File Uploaded
                                                                                        </span>
                                                                                        :
                                                                                        <span style={{ color: "orange" }}>
                                                                                            File Not Uploaded
                                                                                        </span>
                                                                                ))
                                                                                    :
                                                                                    <span style={{ color: "orange" }}>
                                                                                        File Not Uploaded
                                                                                    </span>
                                                                            }
                                                                        </>
                                                                    }
                                                                    {
                                                                        localStorage.getItem('type') === "teacher" && <>
                                                                            Class :&nbsp;
                                                                            <span style={{ color: "green" }}>
                                                                                {
                                                                                    standardList.filter((item1) => item1.value === item.class.standard).map((standard) => (<>{standard.label}</>))
                                                                                }
                                                                                th Standard {item.class.section} Section
                                                                            </span>
                                                                        </>
                                                                    }
                                                                </div>
                                                                <div>{handleDateFormat(item.lastDate)}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Completed Assessments</Accordion.Header>
                                        <Accordion.Body>
                                            {
                                                assessments && assessments.docs.filter((item1) => { return !checkDueDate(item1.lastDate) }).length === 0 &&
                                                <div>No data</div>
                                            }
                                            {
                                                assessments && assessments.docs.filter((item) => { return !checkDueDate(item.lastDate) }).map((item) => (
                                                    <div onClick={() => handleClick(item._id, item.class.teacher)} style={{ color: 'inherit', textDecoration: "none" }}>
                                                        <div className='Assessment-tab'>
                                                            <div className='Assessment-tab-1'>
                                                                <h4>{item.title}</h4>
                                                                <h5>{item.class.subject}</h5>
                                                            </div>
                                                            <div className='Assessment-tab-1'>
                                                                <div style={{ fontWeight: "800" }}>
                                                                    {
                                                                        localStorage.getItem("type") === "student" && <>
                                                                            Status :&nbsp;
                                                                            {
                                                                                answers && answers.docs.filter((item1) => item1.assessment._id === item._id).length !== 0 ? answers.docs.filter((item1) => item1.assessment._id === item._id).map((item1) => (
                                                                                    item1.answerFile !== null ?
                                                                                        <span style={{ color: "green" }}>
                                                                                            File Uploaded
                                                                                        </span>
                                                                                        :
                                                                                        <span style={{ color: "red" }}>
                                                                                            File Not Uploaded
                                                                                        </span>
                                                                                ))
                                                                                    :
                                                                                    <span style={{ color: "red" }}>
                                                                                        File Not Uploaded
                                                                                    </span>
                                                                            }
                                                                        </>
                                                                    }
                                                                    {
                                                                        localStorage.getItem('type') === "teacher" && <>
                                                                            Class :&nbsp;
                                                                            <span style={{ color: "green" }}>
                                                                                {
                                                                                    standardList.filter((item1) => item1.value === item.class.standard).map((standard) => (<>{standard.label}</>))
                                                                                }
                                                                                th Standard {item.class.section} Section
                                                                            </span>
                                                                        </>
                                                                    }
                                                                </div>
                                                                <div>{handleDateFormat(item.lastDate)}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        {
                            localStorage.getItem("type") === "student" ?
                                <Student onLoading={(status1) => onLoading(status1)} assessments={assessments} answers={answers} teacherID={teacherID} assessmentID={assessmentID} close={() => close()} />
                                :
                                <Teacher onLoading={(status1) => onLoading(status1)} assessments={assessments} assessmentID={assessmentID} close={() => close()} />
                        }
                    </>

                }
            </div>
        </div>
    )
}

export default Assessments
