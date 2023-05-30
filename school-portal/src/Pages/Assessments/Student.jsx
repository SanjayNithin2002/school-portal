import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Assessments.css"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAnswers, getAssessments } from '../../actions/assessments'
import ViewAssessment from './ViewAssessment'

function Student() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [display, setDisplay] = useState(false);
    const [assessmentID, setAssessmentID] = useState(false);
    const [teacherID, setTeacherID] = useState(false);

    useEffect(() => {
        dispatch(getAssessments({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(getAnswers({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];
    const assessments = useSelector((state) => state.assessmentsReducer)
    const answers = useSelector((state) => state.answersReducer)

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
    }

    const close = () => {
        setDisplay(false);
    }

    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                {!display ?
                    <div class="container rounded bg-white">
                        <h2>Assessments</h2>
                        <hr style={{ border: "1px solid gray" }} />
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header style={{ padding: "initial" }}>Ongoing Assessments</Accordion.Header>
                                <Accordion.Body>
                                    {
                                        assessments && assessments.assessments.filter((item1) => { return checkDueDate(item1.lastDate) }).length === 0 &&
                                        <div>No data</div>
                                    }
                                    {
                                        assessments && assessments.assessments.filter((item) => { return checkDueDate(item.lastDate) }).map((item) => (

                                            <div onClick={() => handleClick(item._id, item.class.teacher)} style={{ color: 'inherit', textDecoration: "none" }}>
                                                <div className='Assessment-tab'>
                                                    <div className='Assessment-tab-1'>
                                                        <h4>{item.title}</h4>
                                                        <h5>{item.class.subject}</h5>
                                                    </div>
                                                    <div className='Assessment-tab-1'>
                                                        <div style={{ fontWeight: "800" }}>
                                                            Status :&nbsp;
                                                            {
                                                                answers && answers.answers.length !== 0 ? answers.answers.filter((item1) => item1.assessment._id === item._id).map((item1) => (
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
                                        assessments && assessments.assessments.filter((item1) => { return !checkDueDate(item1.lastDate) }).length === 0 &&
                                        <div>No data</div>
                                    }
                                    {
                                        assessments && assessments.assessments.filter((item) => { return !checkDueDate(item.lastDate) }).map((item) => (
                                            <div onClick={() => handleClick(item._id, item.class.teacher)} style={{ color: 'inherit', textDecoration: "none" }}>
                                                <div className='Assessment-tab'>
                                                    <div className='Assessment-tab-1'>
                                                        <h4>{item.title}</h4>
                                                        <h5>{item.class.subject}</h5>
                                                    </div>
                                                    <div className='Assessment-tab-1'>
                                                        <div style={{ fontWeight: "800" }}>
                                                            Status :&nbsp;
                                                            {
                                                                answers && answers.answers.filter((item1) => item1.assessment._id === item._id).map((item1) => (
                                                                    item1.answerFile !== null ?
                                                                        <span style={{ color: "green" }}>
                                                                            File Uploaded
                                                                        </span>
                                                                        :
                                                                        <span style={{ color: "red" }}>
                                                                            File Not Uploaded
                                                                        </span>
                                                                ))
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
                    :
                    <ViewAssessment assessments={assessments} answers={answers} teacherID={teacherID} assessmentID={assessmentID} close={() => close()} />
                }
            </div>
        </div>
    )
}

export default Student
