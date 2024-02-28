import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import "./Exam.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getAllClass, getClass } from "../../actions/class"
import { deleteExamDetails, getExam, updateExamDetails } from '../../actions/exam'
import { DatePicker, Input, Notification, SelectPicker, useToaster, Dropdown, Checkbox } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getTimeTable } from '../../actions/timetable'


function Admin({ status, onLoading }) {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [filter, setFilter] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [filterItems, setFilterItems] = useState([]);
    const [examID, setExamID] = useState(null);
    const [request, setRequest] = useState([]);
    const [standard, setStandard] = useState("");
    const [examList, setExamList] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(true);
    const durationList = [45, 50, 60, 75, 90, 120, 150, 180];
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];


    useEffect(() => {
        if (fetchStatus) {
            onLoading(true);
            if (localStorage.getItem('type') === "admin")
                dispatch(getAllClass("/Exam", navigate));
            else
                dispatch(getClass("/Exam", navigate, { id: localStorage.getItem("id"), type: localStorage.getItem("type") }));
        }
    }, [dispatch, navigate, fetchStatus])

    const class1 = useSelector((state) => state.allClassReducer);
    const exam = useSelector((state) => state.examReducer);
    const timetable = useSelector((state) => state.timeTableReducer);


    console.log(exam);
    console.log(class1);
    console.log(examList);
    console.log(timetable);
    console.log(examID);
    console.log(request);


    useEffect(() => {
        if (class1) {
            onLoading(false);
        }
    }, [class1])

    useEffect(() => {
        if (standard) {
            onLoading(true);
            dispatch(getExam("/Exam", navigate, { standard }));
        }
        if (standard && localStorage.getItem("type") === "admin") {
            dispatch(getTimeTable("/Exam", navigate, standard));
        }
    }, [standard])

    useEffect(() => {
        if (exam) {
            console.log(Array.from(new Set(exam.docs.map(obj => obj.examName.name + "-" + obj.examName.sequence))))
            setExamList(Array.from(new Set(exam.docs.map(obj => obj.examName.name + "-" + obj.examName.sequence))));
            let temp = Array.from(new Set(exam.docs.map((obj) => obj.examName.name))).map((l) => ({ label: l, value: l }))
            setFilterItems(temp);
            onLoading(false);
        }
    }, [exam])

    useEffect(() => {
        if (location.state && fetchStatus) {
            if (location.state.status === 200) {
                onLoading(false);
                handleClose();
                const message = (
                    <Notification type="success" header="Success" closable>
                        {location.state.message}
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
                navigate('/Exam', { state: null });
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
                navigate('/Exam', { state: null });
            }
        }
    }, [location.state, toaster, navigate])

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
        date.setHours(parseInt(time1.split(":")[0]), parseInt(time1.split(":")[1]), 0, 0);
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const userLocale = navigator.language || navigator.userLanguage;
        const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(date);
        return formattedDate
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

    const duration = (start, end) => {
        const sdate = new Date();
        const edate = new Date();
        sdate.setHours(parseInt(start.split(":")[0]), parseInt(start.split(":")[1]), 0, 0);
        edate.setHours(parseInt(end.split(":")[0]), parseInt(end.split(":")[1]), 0, 0);
        return (edate.getTime() - sdate.getTime()) / (1000 * 60)

    }

    const getDates = (day1) => {
        if (day1 === null)
            return null;
        var desiredDate = new Date(day1);
        let date = desiredDate.getDate() < 10 ? "0" + desiredDate.getDate() : desiredDate.getDate();
        let month = desiredDate.getMonth() < 10 ? "0" + (desiredDate.getMonth() + 1) : (desiredDate.getMonth() + 1);
        return desiredDate.getFullYear() + "-" + month + "-" + date;
    }

    const getEndTime = (startTime, duration) => {
        let date1 = new Date();
        console.log(startTime.split(":")[0], startTime.split(":")[1]);
        date1.setHours(parseInt(startTime.split(":")[0]), parseInt(startTime.split(":")[1]), 0, 0);
        console.log(date1)
        date1.setTime(date1.getTime() + parseInt(duration) * 1000 * 60);
        console.log(date1)
        let endTime = parseInt(date1.getHours()) < 10 ? "0" + date1.getHours() + ":" : date1.getHours() + ":"
        endTime += parseInt(date1.getMinutes()) < 10 ? "0" + date1.getMinutes() : date1.getMinutes()
        return endTime;
    }

    const compareTime = (a, b) => {
        const date1 = new Date();
        date1.setHours(parseInt(a.startTime.split(":")[0]), parseInt(a.startTime.split(":")[1]), 0, 0);
        const date2 = new Date();
        date2.setHours(parseInt(b.startTime.split(":")[0]), parseInt(b.startTime.split(":")[1]), 0, 0);
        return date1.getTime() - date2.getTime();
    }

    const handleInputChange = (value, index, field) => {
        console.log(value);
        setRequest(prev => {
            const updated = [...prev];
            if (index === -1) {
                for (let i = 0; i < updated.length; i++) {
                    updated[i][field] = value;
                }
            }
            else
                updated[index][field] = value;
            return updated;
        });
    }

    const handleEdit = (examName) => {
        let req = [];
        setExamID(examName);
        exam.docs.filter((item) => item.examName.name + "-" + item.examName.sequence === examName && item.class.section === 'A' && item.class.subject !== "Class Teacher").sort((a, b) => (new Date(a.date).getTime()) === (new Date(b.date).getTime()) ? compareTime(a, b) : (new Date(a.date).getTime()) - (new Date(b.date).getTime())).map((item, index) => {
            req.push({
                examName: item.examName,
                duration: duration(item.startTime, item.endTime),
                startTime: item.startTime,
                endTime: item.endTime,
                subject: item.class.subject,
                date: getDates(item.date),
                maxMarks: item.maxMarks,
                weightageMarks: item.weightageMarks,
            })
            return true;
        })
        setRequest(req);
        setShowEdit(true);
    }

    const handleClose = () => {
        setRequest([]);
        setExamID(null);
        setShowEdit(false);
    }

    const handleUpdate = () => {
        console.log(request);
        let error = "";
        for (let i = 0; i < request.length; i++) {
            if (Object.values(request[i]).includes(null)) {
                const message = (
                    <Notification type="warning" header="warning" closable>
                        Kindly fill all the details.
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
                error = "error";
                break;
            }
        }
        console.log(error);
        if (error === "") {
            let req1 = [];
            exam.docs.filter((item) => item.examName.name + "-" + item.examName.sequence === examID && item.class.standard === parseInt(standard) && item.class.subject !== "Class Teacher").map((item, index) => {
                request.filter((req) => item.class.subject === req.subject).map((req) => {
                    let req2 = { _id: item._id };
                    if(req.maxMarks !== item.maxMarks){
                        req2["maxMarks"] = req.maxMarks;
                    }
                    if(req.weightageMarks !== item.weightageMarks){
                        req2["weightageMarks"] = req.weightageMarks;
                    }
                    if (req.duration !== duration(item.startTime, item.endTime)) {
                        req2["endTime"] = getEndTime(req.startTime, req.duration);
                    }
                    if (req.startTime !== item.startTime) {
                        req2["startTime"] = req.startTime
                        req2["endTime"] = getEndTime(req.startTime, req.duration);
                    }
                    if (req.date !== getDates(item.date)) {
                        req2["date"] = req.date;
                    }
                    if (Object.keys(req2).length > 1) {
                        req1.push(req2);
                    }
                    return true;
                })
                return true;
            })
            if (req1.length > 0) {
                onLoading(true);
                dispatch(updateExamDetails("/Exam",navigate,req1,{ standard }));
                console.log(req1);
            }
        }
    }

    const handleDelete = () => {
        if(window.confirm("Do you want to delete this exam schedule")){
            let req1 = [];
            exam.docs.filter((item) => item.examName.name + "-" + item.examName.sequence === examID && item.class.standard === parseInt(standard) && item.class.subject !== "Class Teacher").map((item, index) => {
                req1.push(item._id);
            })
            onLoading(true);
            dispatch(deleteExamDetails("/Exam",navigate,req1,{ standard }))
        }        
    }

    return (
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div className='row justify-content-between align-items-center'>
                        <h2 className='col-xl-7 col-lg-6 col-md-5 col-sm-5'>Examination Schedule</h2>

                        <div className="col-xl-4 col-lg-6 col-md-7 col-sm-7 row" style={{textAlign:"right"}}>
                            <div className='col-sm-4'>
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
                            {
                                localStorage.getItem("type") === "admin" ?
                                    <div className='col-sm-8'>
                                        <Link style={{ textDecoration: "none" }} to="/AddSchedule" className='btn btn-primary'><FontAwesomeIcon icon={solid.faPlus} /> Add Schedule</Link>
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="row studentlist-container">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <h4>Select Standard : </h4>
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            < select className="selectPicker3" value={standard} onChange={(e) => setStandard(e.target.value)} >
                                <option value="" disabled>
                                    Select Standard
                                </option>
                                {
                                    class1 && class1.docs.length > 0 &&
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
                        <Table className='AdminBonafide-content-table'>
                            <tr>
                                <th>S.No.</th>
                                <th>Subject Name</th>
                                <th>Exam Date</th>
                                <th>Exam Time</th>
                                <th>Duration</th>
                                <th>Max Marks</th>
                                <th>Weightage Marks</th>
                            </tr>
                            {examList && standard ? examList.filter((examName) => handleFilter(examName)).map((examName) => (
                                <>
                                    <tr>
                                        <td style={{ backgroundColor: "#add0ed", textAlign: "center" }} colSpan={7} align='center'>
                                            {examName}&emsp;
                                            {localStorage.getItem("type") === "admin" ?
                                                <span onClick={() => handleEdit(examName)}><FontAwesomeIcon style={{ padding: "0px", cursor: "pointer" }} icon={solid.faPencil} /></span>
                                                :
                                                <></>
                                            }
                                        </td>
                                    </tr>
                                    {
                                        exam.docs.filter((item) => item.examName.name + "-" + item.examName.sequence === examName && item.class.section === 'A' && item.class.subject !== "Class Teacher").sort((a, b) => (new Date(a.date).getTime()) === (new Date(b.date).getTime()) ? compareTime(a, b) : (new Date(a.date).getTime()) - (new Date(b.date).getTime())).map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.class.subject}</td>
                                                <td>{handleDateFormat(item.date)}</td>
                                                <td>{handleTimeFormat(item.startTime)} to {handleTimeFormat(item.endTime)}</td>
                                                <td>{duration(item.startTime, item.endTime)} min</td>
                                                <td>{item.maxMarks}</td>
                                                <td>{item.weightageMarks}</td>

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
                            {
                                examList && standard && examList.length === 0 &&
                                <tr>
                                    <td style={{ textAlign: "center" }} colSpan={5}>No Data</td>
                                </tr>
                            }
                        </Table>
                    </div>
                </div>
            </div>
            <Modal show={showEdit} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit {examID}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='table-responsive'>
                        {standard && exam && request && request.length > 0 &&
                            <table className='exam-edit'>
                                <tr>
                                    <th>Duration</th>
                                    <td>:</td>
                                    <td><SelectPicker value={request[0].duration} onChange={(value) => handleInputChange(value, -1, "duration")} data={durationList.map((item) => ({ label: item + "min", value: item }))} /></td>
                                </tr>
                                <tr>
                                    <th>Max Mark</th>
                                    <td>:</td>
                                    <td><Input value={request[0].maxMarks} onChange={(value) => handleInputChange(value, -1, "maxMarks")}/></td>
                                </tr>
                                <tr>
                                    <th>Weightage Mark</th>
                                    <td>:</td>
                                    <td><Input value={request[0].weightageMarks} onChange={(value) => handleInputChange(value, -1, "weightageMarks")}/></td>
                                </tr>
                                {
                                    request.map((item, index) => (
                                        <tr>
                                            <th>{item.subject}</th>
                                            <td>:</td>
                                            <td>
                                                <DatePicker oneTap onChange={(value) => handleInputChange(getDates(value), index, "date")} value={item.date ? new Date(item.date) : null} placement='auto' />
                                                <SelectPicker value={item.startTime} onChange={(value) => handleInputChange(value, index, "startTime")}
                                                    data={[
                                                        {
                                                            label: "Morning " + timetable.docs[0].startTime,
                                                            value: timetable.docs[0].startTime,
                                                        },
                                                        {
                                                            label: "Afternoon " + timetable.docs[0].break.filter((item) => item.title === "Lunch").map((item) => (item.endTime)),
                                                            value: timetable.docs[0].break.filter((item) => item.title === "Lunch").map((item) => (item.endTime))[0],
                                                        }
                                                    ]}
                                                    searchable={false}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </table>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => handleUpdate()}>
                        Update
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Admin
