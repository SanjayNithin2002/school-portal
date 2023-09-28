import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Solid from "@fortawesome/free-solid-svg-icons";
import * as Regular from "@fortawesome/free-regular-svg-icons";
import * as api from "../../api"
import { useDispatch, useSelector } from "react-redux";
import { getClass } from "../../actions/class";
import { getTimeTable } from "../../actions/timetable";
import { requestClassStudents } from "../../actions/students";
import AddStudent from "./AddStudent";
import { deleteStudentAttendance } from "../../actions/attendance";
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"

const PostStudent = ({ status, onLoading }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const [classID, setClassID] = useState(null)
    const [split, setSplit] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [editDisplay, setEditDisplay] = useState(false);
    const [day, setDay] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

    let classes = useSelector((state) => state.allClassReducer)
    let timetable = useSelector((state) => state.timeTableReducer)
    let students = useSelector((state) => state.allStudentsReducer)

    useEffect(() => {
        if (fetchStatus) {
            onLoading(true)
            dispatch(getClass("/PostStudentAttendance", navigate, { type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        }
    }, [dispatch, navigate, fetchStatus])

    useEffect(() => {
        if (standard && section && fetchStatus && classes) {
            console.log(section);
            classes.docs.map((item) => {
                if (item.standard === parseInt(standard)) {
                    if (item.section === section) {
                        if (item.subject !== "Class Teacher") {
                            console.log(standard);
                            setClassID(item._id)
                            dispatch({ type: "FETCH_ALL_TIMETABLE", payload: null });
                            dispatch({ type: "STUDENT_FETCH_ATTENDANCE", payload: null });
                            dispatch({ type: 'FETCH_CLASS_STUDENTS', payload: null });
                            dispatch(getTimeTable("/PostStudentAttendance", navigate, standard))
                            setSplit(null);
                        }
                    }
                }
                return true;
            })
        }
    }, [dispatch, fetchStatus, classes, standard, section, navigate])

    useEffect(() => {
        if (classID && fetchStatus) {
            dispatch(requestClassStudents("/PostStudentAttendance", navigate, classID))
        }
    }, [dispatch, classID, navigate, fetchStatus])

    useEffect(() => {
        if (classes && timetable===null) {
            onLoading(false);
        }
    }, [classes,timetable])

    useEffect(() => {
        if (timetable !== null && timetable.docs.length > 0) {
            let time = [];
            time.push(timetable.docs[0].startTime);
            console.log(timetable.docs[0].break);
            if (timetable.docs[0].break) {
                timetable.docs[0].break.filter((slot) => slot.title === "Lunch").map((slot) => {
                    time.push(slot.endTime);
                    return true;
                })
                setSplit(time)
            }
        }
    }, [timetable])

    useEffect(()=>{
        if (location.state && fetchStatus) {
            if (location.state.status === 200) {
                onLoading(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                      {location.state.message}
                    </Notification>
                );
                toaster.push(message, {placement:'topCenter'})
                navigate('/PostStudentAttendance',{state:null});
            }
            else{
                onLoading(false);
                setFetchStatus(false);
                const message = (
                    <Notification type="error" header="error" closable>
                      Error Code: {location.state.status},<br/>{location.state.message}
                    </Notification>
                );
                toaster.push(message, {placement:'topCenter'})
                navigate('/PostStudentAttendance',{state:null});
            }
        }
    },[location.state,toaster,navigate])

    console.log(split)
    console.log(classes)
    console.log(timetable)
    console.log(students)
    console.log(classID)

    const close = () => {
        setEditDisplay(false);
    }

    const handleDateFormat = (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const userLocale = navigator.language || navigator.userLanguage;
        const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(date);
        return formattedDate
    }

    const handleDelete = async (date) => {
        const { data } = await api.getStudentAttendances({ standard, section, date });
        console.log(data);
        let request = [];
        if (data.docs.length>0) {
            data.docs.map((item) => {
                request.push(item._id);
                return true;
            })
            console.log(request);
            dispatch(deleteStudentAttendance("/PostStudentAttendance",navigate,{deleteArray:request}));
        }
        else {
            const message = (
                <Notification type="warning" header="Warning" closable>
                    No Attendance is taken at this particular date.
                </Notification>
            );
            toaster.push(message, {placement:'topCenter'})
        }
    }

    const getTimings = (time) => {
        if (time === split[0]) {
            return "Morning";
        }
        else {
            return "Afternoon";
        }
    }

    const getDate = (day1) => {
        var currentDate = new Date();
        var desiredDay = days.indexOf(day1);
        var daysAgo = 0;
        if (currentDate.getDay() > desiredDay)
            daysAgo = -1 * (currentDate.getDay() - desiredDay);
        else
            daysAgo = (desiredDay - currentDate.getDay() - 7) % 7;
        var desiredDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + daysAgo);
        return handleDateFormat(desiredDate);
    }

    const getDates = (day1) => {
        var currentDate = new Date();
        var desiredDay = days.indexOf(day1);
        var daysAgo = 0;
        if (currentDate.getDay() > desiredDay)
            daysAgo = -1 * (currentDate.getDay() - desiredDay);
        else
            daysAgo = (desiredDay - currentDate.getDay() - 7) % 7;
        var desiredDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + daysAgo);
        let date = desiredDate.getDate() < 10 ? "0" + desiredDate.getDate() : desiredDate.getDate();
        let month = desiredDate.getMonth() < 10 ? "0" + (desiredDate.getMonth() + 1) : (desiredDate.getMonth() + 1);
        return month + "-" + date + "-" + desiredDate.getFullYear();
    }

    const handleClose = (type) =>{
        close(); 
        console.log(type);
        if(type==="loading")
            onLoading(false)
    }

    return (
        <div className="Main">
            {
                editDisplay === false ?
                    <div className="Home">
                        <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                            <h2>Students Attendance</h2>
                            <hr style={{ border: "1px solid gray" }} />
                            <div className="">
                                <div className="row poststudent-container">
                                    <div className='col-lg-6 row' style={{ justifyContent: "center" }}>
                                        <div className="col-lg-7 col-md-5 col-sm-6 studentlist-filter">
                                            <h4>Select Standard : </h4>
                                        </div>
                                        <div className="col-lg-5 col-md-5 col-sm-6">
                                            <select
                                                className="selectPicker3"
                                                value={standard}
                                                onChange={(e) => setStandard(e.target.value)}
                                            >
                                                <option value="" disabled>
                                                    Select Standard
                                                </option>
                                                {
                                                    classes &&
                                                    Array.from(new Set(classes.docs.map((element) => element.standard))).map((item) => (
                                                        standardList.filter((class1) => class1.value === item).map((class1) => (
                                                            <option value={class1.value}>{class1.label}</option>
                                                        ))
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 row' style={{ justifyContent: "center" }}>
                                        <div className="col-lg-7 col-md-5 col-sm-6 studentlist-filter">
                                            <h4>Select Section : </h4>
                                        </div>
                                        <div className="col-lg-5 col-md-5 col-sm-6">
                                            <select
                                                className="selectPicker3"
                                                value={section}
                                                onChange={(e) => setSection(e.target.value)}
                                            >
                                                <option value="" disabled>
                                                    Select Section
                                                </option>
                                                {
                                                    classes &&
                                                    Array.from(new Set(classes.docs.filter((item) => parseInt(standard) === item.standard).map((element) => element.section))).map((item) => (
                                                        <option value={item}>{item}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="row" style={{ justifyContent: "center" }}>
                                    <div className="col-lg-8">
                                        <Table className="StudentList-content-table">
                                            <tr>
                                                <th>S.No</th>
                                                <th>Date</th>
                                                <th>Slot</th>
                                                <th>Strength</th>
                                                <th>Action</th>
                                            </tr>
                                            {
                                                standard !== '' && section !== '' && classes ?
                                                    classes.docs.filter((item) => item._id === classID).map((item) => (
                                                        students && split && item.timings.filter((slot) => split.includes(slot.startTime)).length > 0 ?
                                                            item.timings.filter((slot) => split.includes(slot.startTime)).map((slot, index) => (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>{getDate(slot.day)}<br />{slot.day}</td>
                                                                    <td>{getTimings(slot.startTime)}</td>
                                                                    <td>{students.docs.length}</td>
                                                                    <td>
                                                                        <div style={{ display: "contents" }} onClick={() => { onLoading(true); setEditDisplay(true); setDate(getDates(slot.day)); setDay(slot.day); setTime(getTimings(slot.startTime) === "Morning" ? "FN" : "AN") }}>
                                                                            <FontAwesomeIcon icon={Regular.faPenToSquare} />
                                                                        </div>
                                                                        &nbsp;/&nbsp;
                                                                        <div style={{ display: "contents" }} onClick={() => handleDelete(getDates(slot.day))}>
                                                                            <FontAwesomeIcon icon={Solid.faTrashAlt} />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                            :
                                                            <tr>
                                                                <td style={{ textAlign: "center" }} colSpan={5}>No Data</td>
                                                            </tr>
                                                    ))

                                                    :
                                                    <tr>
                                                        <td style={{ textAlign: "center" }} colSpan={5}>No Data</td>
                                                    </tr>
                                            }
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <AddStudent standard={standard} section={section} students={students} close={(type) => handleClose(type) } day={day} date={date} time={time} split={split} onLoading={(status1)=>onLoading(status1)} status={status} />
            }
        </div>
    );
};

export default PostStudent;
