import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Toggle } from 'rsuite';
import { useDispatch, useSelector } from "react-redux";
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"

import { getStudentAttendances, postStudentAttendance, updateStudentAttendance } from "../../actions/attendance";

const AddStudent = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(true);
    const [default1, setDefault1] = useState(true);
    const [attendance, setAttendance] = useState(null);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

    useEffect(() => {
        dispatch(getStudentAttendances("/PostStudentAttendance", navigate, { standard: props.standard, section: props.section, date: props.date }));
        
    }, [dispatch, navigate])

    useEffect(()=>{
        if (props.students) {
            let att = [];
            props.students.docs.map((item) => {
                att.push({ student: item._id, status: default1 });
                return true;
            })
            setAttendance(att);
        }
    },[default1])

    let attendances = useSelector((state) => state.studentAttendanceReducer)

    useEffect(() => {
        if (location.state) {
            const message = (
                <Notification type="error" header="error" closable>
                    Error Code: {location.state.status},<br />{location.state.message}
                </Notification>
            );
            toaster.push(message, { placement: 'topCenter' })
            dispatch({ type: "ALL_STUDENT_FETCH_ATTENDANCE", payload: null })
            props.close()
            navigate('/PostStudentAttendance', { state: null });
        }
    }, [location.state, toaster, navigate, dispatch])

    console.log(attendances)
    console.log(attendance)
    console.log(props)


    useEffect(() => {
        if (attendances && attendances.docs) {
            props.onLoading(false);
        }
        if (attendances && attendances.docs.length > 0) {
            let att = [];
            attendances.docs.map((item) => {
                att.push({ student: item.student._id, status: item.status === 'Present' ? true : false });
                return true;
            })
            console.log(att);
            setAttendance(att);
        }
    }, [attendances])


    const handleInputChange = (value, index) => {
        let values = value === 'false' ? false : true;
        setAttendance(prev => {
            const updated = [...prev];
            updated[index]["status"] = values;
            return updated;
        });
    }

    const handleBack = (type) => {
        dispatch({ type: "ALL_STUDENT_FETCH_ATTENDANCE", payload: null })
        props.onLoading(true)
        props.close(type)
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

    const getTimings = (time) => {
        if (time === "FN") {
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

    const handleUpdate = () => {
        let request = [];
        attendance.map((student) => {
            let status = student.status ? "Present" : "Absent";
            attendances.docs.filter((stu) => stu.student._id === student.student && status !== stu.status).map((stu) => {
                request.push({
                    _id: stu._id,
                    status,
                })
                return true;
            })
            return true;
        })
        console.log(request);
        if (request.length > 0) {
            dispatch(updateStudentAttendance("/PostStudentAttendance",navigate,request, { standard: props.standard, section: props.section, date: props.date }));
            handleBack("noLoading");
        }
        else {
            const message = (
                <Notification type="warning" header="Warning" closable>
                    No Record is been modified.
                </Notification>
            );
            toaster.push(message, { placement: 'topCenter' })
        }
    }

    const handleSubmit = () => {
        if (attendance) {
            let att = [];
            attendance.map((item) => {
                att.push({ student: item.student, status: item.status ? "Present" : "Absent" })
                return true;
            })
            dispatch(postStudentAttendance("/PostStudentAttendance", navigate, { date: props.date, time: props.time, attendances: att }))
            handleBack("noLoading");
        }
    }

    return (
        <div className="Home">
            <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                <h2>{standardList[props.standard - 1].label} {props.section} Class Attendance</h2>
                <hr style={{ border: "1px solid gray" }} />

                <br />
                <div className="row poststudent-container">
                    <div className="col-lg-6 col-md-8 col-sm-10 poststudent-container-1 ">
                        <h5>Default Value<span style={{ color: "white" }}>_</span>: </h5>&ensp;
                        <Toggle checked={default1} onChange={() => { setDefault1(!default1); setAttendance(null); }} size="lg" checkedChildren="Present" unCheckedChildren="Absent" disabled={attendances && attendances.docs.length > 0 ? true : false} />
                    </div>
                </div>
                <br />
                <div className="row poststudent-container">
                    <div className="col-lg-6 col-md-8 col-sm-10 poststudent-container-2">
                        <span style={{ fontWeight: "600" }}>Attendance Date : </span>&ensp; {getDate(props.day)} {getTimings(props.time)}
                    </div>
                </div>
                <br />
                <div className="row" style={{ justifyContent: "center" }}>
                    <div className="col-lg-10 table-responsive">
                        <Table className="PostStudent-content-table">
                            <tr>
                                <th>S.No</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Attendance</th>
                            </tr>
                            {
                                props.students && props.students.docs.map((student, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>
                                            {
                                                attendance && attendance.filter((item) => item.student === student._id).map((item) => (
                                                    <select onChange={(e) => handleInputChange(e.target.value, index)} className={item.status ? "green-color" : "red-color"} value={item.status ? 'true' : 'false'}>
                                                        <option style={{ color: "green" }} value={true}>Present</option>
                                                        <option style={{ color: "red" }} value={false}>Absent</option>
                                                    </select>
                                                ))
                                            }

                                        </td>
                                    </tr>
                                ))
                            }
                        </Table>
                    </div>
                </div>
                <div className="row poststudent-container" style={{ justifyContent: 'center' }}>
                    <div className="col-lg-6" style={{ margin: "0px auto", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                        <button className="btn btn-danger" onClick={() => handleBack("loading")}>Back</button>
                        {
                            attendances && attendances.docs.length > 0 ?
                                <button className="btn btn-success" onClick={() => handleUpdate()}>Update</button>
                                :
                                <button className="btn btn-success" onClick={() => handleSubmit()}>Post</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStudent;