import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { Link, useNavigate } from "react-router-dom"
import * as Solid from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TagPicker } from 'rsuite';

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Assessments.css"
import { useDispatch, useSelector } from 'react-redux'
import { getAssessments } from '../../actions/assessments'
import { getAnswers } from '../../actions/assessments'
import PostAssessment from './PostAssessment'


function Teacher() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [display, setDisplay] = useState(false);
    const [assessmentID, setAssessmentID] = useState(false);

    useEffect(() => {
        dispatch(getAssessments({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(getAnswers({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];
    const assessments = useSelector((state) => state.assessmentsReducer)
    const answers = useSelector((state) => state.answersReducer)
    console.log(assessments)

    const [length, setlength] = React.useState(100);
    const data = [{
        label: "Xth",
        value: "Xth",
        role: 'Stardard'
    }, {
        label: "IXth",
        value: "IXth",
        role: 'Stardard'
    }, {
        label: "XIth",
        value: "XIth",
        role: 'Stardard'
    }, {
        label: "XIIth",
        value: "XIIth",
        role: 'Stardard'
    }, {
        label: "A",
        value: "A",
        role: 'Section'
    }, {
        label: "B",
        value: "B",
        role: 'Section'
    }, {
        label: "C",
        value: "C",
        role: 'Section'
    }]

    const handleSelect = (value, item, event) => {
        setlength(100 + 60 * value.length)
    };

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

    const handleClick = (aID) => {
        setAssessmentID(aID);
        setDisplay(true);
    }

    const close = () => {
        setDisplay(false);
    }

    return (
        <div className='Main'>
            <SideNavBar />
            {
                !display ?
                    <div className="Home">
                        <div class="container rounded bg-white">
                            <div className="btnmove" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <h2>Assessments</h2>
                                <div className="btn-group">
                                    <TagPicker data={data} onChange={handleSelect} placeholder={<><FontAwesomeIcon icons={Solid.faFilter} />Filter</>} groupBy="role" />&emsp;
                                    <Link to='/PostAssessment' className='btn btn-primary'><FontAwesomeIcon icon={Solid.faPlus} />Add</Link>
                                </div>
                            </div>


                            <hr style={{ border: "1px solid gray" }} />
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header style={{ padding: "initial" }}>Upcoming/Ongoing Assessments</Accordion.Header>
                                    <Accordion.Body>
                                        {
                                            assessments && assessments.docs.filter((item) => { return checkDueDate(item.lastDate) }).map((item) => (

                                                <div onClick={() => handleClick(item._id)} style={{ color: 'inherit', textDecoration: "none" }}>
                                                    <div className='Assessment-tab'>
                                                        <div className='Assessment-tab-1'>
                                                            <h4>{item.title}</h4>
                                                            <h5>{item.class.subject}</h5>
                                                        </div>
                                                        <div className='Assessment-tab-1'>
                                                            <div style={{ fontWeight: "800" }}>
                                                                Class :&nbsp;
                                                                <span style={{ color: "green" }}>
                                                                    {
                                                                        standardList.filter((item1) => item1.value === item.class.standard).map((standard) => (<>{standard.label}</>))
                                                                    }
                                                                    th Standard {item.class.section} Section
                                                                </span>
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
                                            assessments && assessments.docs.filter((item) => { return !checkDueDate(item.lastDate) }).map((item) => (

                                                <div onClick={() => handleClick(item._id)} style={{ color: 'inherit', textDecoration: "none" }}>
                                                    <div className='Assessment-tab'>
                                                        <div className='Assessment-tab-1'>
                                                            <h4>{item.title}</h4>
                                                            <h5>{item.class.subject}</h5>
                                                        </div>
                                                        <div className='Assessment-tab-1'>
                                                            <div style={{ fontWeight: "800" }}>
                                                                Class :&nbsp;
                                                                <span style={{ color: "green" }}>
                                                                    {
                                                                        standardList.filter((item1) => item1.value === item.class.standard).map((standard) => (<>{standard.label}</>))
                                                                    }
                                                                    th Standard {item.class.section} Section
                                                                </span>
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
                    :
                    <PostAssessment assessments={assessments} answers={answers} assessmentID={assessmentID} close={() => close()} />
            }
        </div>
    )
}

export default Teacher
