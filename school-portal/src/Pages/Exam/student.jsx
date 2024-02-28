import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import "./Exam.css"
import { useDispatch, useSelector } from 'react-redux'
import { getStudentExam } from '../../actions/exam'
import { useLocation, useNavigate } from "react-router-dom";
import { Checkbox, Dropdown, Notification, useToaster } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from '@fortawesome/free-solid-svg-icons'


function Student({ status, onLoading }) {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [filter, setFilter] = useState([]);
    const [examList, setExamList] = useState(null);
    const [filterItems, setFilterItems] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(true);

    useEffect(() => {
        if (fetchStatus) {
            onLoading(true);
            dispatch(getStudentExam('/Exam', navigate, { type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        }
    }, [dispatch, onLoading, fetchStatus, navigate])

    const exam = useSelector((state) => state.examReducer);
    console.log(exam)
    useEffect(() => {
        if (exam) {
            setExamList(Array.from(new Set(exam.docs.map(obj => obj.examName.name + "-" + obj.examName.sequence))));           
            let temp = Array.from(new Set(exam.docs.map((obj) => obj.examName.name))).map((l) => ({ label: l, value: l }))
            setFilterItems(temp);
            onLoading(false);
        }
    }, [onLoading, exam])

    useEffect(() => {
        if (location.state) {
            onLoading(false);
            setFetchStatus(false)
            const message = (
                <Notification type="error" header="error" closable>
                    Error Code: {location.state.status},<br />{location.state.message}
                </Notification>
            );
            toaster.push(message, { placement: 'topCenter' })
            navigate('/Exam', { state: null });
        }
    }, [location.state, navigate, toaster, onLoading])

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
        console.log(a.startTime);
        const date1 = new Date();
        date1.setHours(parseInt(a.startTime.split(":")[0]));
        date1.setMinutes(parseInt(a.startTime.split(":")[1]));
        date1.setSeconds(0);
        date1.setMilliseconds(0);
        const date2 = new Date();
        date2.setHours(parseInt(b.startTime.split(":")[0]));
        date2.setMinutes(parseInt(b.startTime.split(":")[1]));
        date2.setSeconds(0);
        date2.setMilliseconds(0);
        return date1.getTime() - date2.getTime();
    }

    const handleSelect = (itemValue) => {
        console.log(itemValue)
        if (itemValue === "Clear") {
            setFilter([])
        }
        else {
            if (filter.includes(itemValue))
                setFilter(filter.filter((value) => value !== itemValue));
            else
                setFilter([...filter, itemValue]);
        }
    };

    const handleFilter = (item) => {
        if (filter.length > 0) {
            let result = false;
            filter.map((fil) => {
                if (item.includes(fil)) {
                    result = true;
                }
            })
            return result;
        }
        else
            return true
    }

    return (
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div className='row justify-content-between align-items-start'>
                        <h2 className='col-xl-10 col-lg-8 col-md-8 col-sm-9'>Examination Schedule</h2>
                        <div className=' col-xl-1 col-lg-2 col-md-2 col-sm-3'>
                            <Dropdown className="custome-filter" placement="bottom-end" title="Filter" multiple onSelect={handleSelect}>
                                {filterItems.map((item) => (
                                    <Dropdown.Item eventKey={item.value}>
                                        <Checkbox checked={filter.includes(item.value)}>
                                            {item.label}
                                        </Checkbox>
                                    </Dropdown.Item>
                                ))}
                                <Dropdown.Item style={{ textAlign: "center" }} eventKey={"Clear"}> <FontAwesomeIcon icon={solid.faTimes} />&emsp;Clear</Dropdown.Item>
                            </Dropdown>
                        </div>

                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <br />
                    <div className='table-responsive'>

                        <Table style={{ minWidth: "500px" }} className='StudentList-content-table'>
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
                                {examList ? examList.filter((examName) => handleFilter(examName)).map((examName) => (
                                    <>
                                        <tr>
                                            <td style={{ backgroundColor: "#add0ed", textAlign: "center" }} colSpan={5}>{examName}</td>
                                        </tr>
                                        {
                                            exam.docs.filter((item) => item.examName.name + "-" + item.examName.sequence === examName).sort((a, b) => (new Date(a.date).getTime()) === (new Date(b.date).getTime()) ? compareTime(a, b) : (new Date(a.date).getTime()) - (new Date(b.date).getTime())).map((item, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.subject}</td>
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

export default Student