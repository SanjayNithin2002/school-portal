import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { SelectPicker } from 'rsuite';
import { useDispatch, useSelector } from "react-redux";
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"

import { deleteTeacherAttendance, getTeacherAttendances, postTeacherAttendance, updateTeacherAttendance } from "../../actions/attendance";

const AddTeacher = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const [edit,setEdit] = useState(true);
    const dispatch = useDispatch();
    const [default1, setDefault1] = useState("Present");
    const [attendance, setAttendance] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(true);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const statusType = [{ label: "Present", value: "Present" }, { label: "Absent", value: "Absent" }, { label: "No Attendance", value: "No Attendance" }]

    useEffect(() => {
        if (fetchStatus) {
            props.onLoading(true);
            dispatch(getTeacherAttendances("/PostTeacherAttendance", navigate, { date: props.date }));
        }
    }, [dispatch, fetchStatus, navigate])

    let attendances = useSelector((state) => state.teacherAttendanceReducer)

    console.log(attendances)
    console.log(attendance)
    console.log(props)

    
    const checkDate = (a, b) => {
        let date1 = new Date(a);
        date1.setHours(0, 0, 0, 0);
        let date2 = new Date(b);
        date2.setHours(0, 0, 0, 0);
        return date1.getTime() === date2.getTime();
    }

    useEffect(() => {
        if (location.state && fetchStatus) {
            setFetchStatus(false);
        }
    }, [location.state, fetchStatus])

    const handleInputChange = (value, index) => {
        setAttendance(prev => {
            const updated = [...prev];
            updated[index]["status"] = value;
            return updated;
        });
    }

    const handleBack = () => {
        dispatch({ type: "ALL_TEACHER_FETCH_ATTENDANCE", payload: null })
        props.close()
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

    const handleUpdate = () => {
        let request1 = [];
        let request2 = [];
        let request3 = [];
        attendance.map((teacher) => {
            let status = teacher.status;
            attendances.docs.filter((stu) => checkDate(stu.date, props.date) && stu.teacher._id === teacher.teacher && status !== stu.status).map((stu) => {
                if (status !== "No Attendance") {
                    request1.push({
                        _id: stu._id,
                        status,
                    })
                }
                else {
                    request3.push(stu._id);
                }
                return true;
            })
            if (attendances.docs.filter((stu) => checkDate(stu.date, props.date) && stu.teacher._id === teacher.teacher).length === 0 && teacher.status !== "No Attendance") {
                request2.push({
                    teacher: teacher.teacher,
                    status,
                })
            }
            return true;
        })
        console.log(request1);
        console.log(request2);
        console.log(request3);
        if(request1.length>0 || request2.length>0 || request3.length>0){
            props.onLoading(true);
            handleBack();
        }
        if (request1.length > 0) {
            dispatch(updateTeacherAttendance("/PostTeacherAttendance", navigate, request1));
        }
        if (request2.length > 0) {
            dispatch(postTeacherAttendance("/PostTeacherAttendance", navigate, { date: props.date, attendances: request2 }))
        }
        if (request3.length > 0) {
            dispatch(deleteTeacherAttendance("/PostTeacherAttendance", navigate, request3));
        }
    }

    const handleSubmit = () => {
        if (attendance) {
            props.onLoading(true);
            let att = [];
            attendance.filter((item) => item.status !== "No Attendance").map((item) => {
                att.push({ teacher: item.teacher, status: item.status })
                return true;
            })
            console.log(att);
            dispatch(postTeacherAttendance("/PostTeacherAttendance", navigate,{ date: props.date, attendances: att }))
            handleBack();
        }
    }

        if (props.teachers && !attendance) {
            let att = [];
            props.teachers.docs.map((item) => {
                att.push({ teacher: item._id, status: default1 });
                return true;
            })
            setAttendance(att);
        }

        if (attendances && edit) {
            props.onLoading(false);
        }
        if (attendance && attendances && attendances.docs.length > 0 && edit) {
            let att = [];
            attendances.docs.filter((item) => checkDate(item.date, props.date)).map((item) => {
                att.push({ teacher: item.teacher._id, status: item.status === 'Present' ? "Present" : "Absent" });
                return true;
            })
            attendance.map((item) => {
                if (att.filter((item1) => item1.teacher === item.teacher).length === 0) {
                    att.push({ teacher: item.teacher._id, status: "No Attendance" });
                }
                return true;
            })
            console.log(att);
            setAttendance(att);
            setEdit(false);
        }


    return (
        <div className="Home">
            <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                <h2>Teachers Attendance</h2>
                <hr style={{ border: "1px solid gray" }} />

                <br />
                <div className="row poststudent-container">
                    <div className="col-lg-6 col-md-8 col-sm-10 poststudent-container-1 ">
                        <h5>Default Value<span style={{ color: "white" }}>_</span>: </h5>&ensp;
                        <SelectPicker value={default1} onChange={(value) => { setDefault1(value); setAttendance(null); }} data={statusType} disabled={attendances && attendances.docs.length > 0 ? true : false} />
                    </div>
                </div>
                <br />
                <div className="row poststudent-container">
                    <div className="col-lg-6 col-md-8 col-sm-10 poststudent-container-2">
                        <span style={{ fontWeight: "600" }}>Attendance Date : </span>&ensp; {days[new Date(props.date).getDay()]} {handleDateFormat(new Date(props.date))}
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
                                <th>Employee ID</th>
                                <th>Attendance</th>
                            </tr>
                            {
                                attendance && props.teachers && props.teachers.docs.map((teacher, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{teacher.firstName}</td>
                                        <td>{teacher.lastName}</td>
                                        <td>{teacher.empID}</td>
                                        <td>
                                            {
                                                attendance && attendance.filter((item) => item.teacher === teacher._id).map((item) => (
                                                    <select onChange={(e) => handleInputChange(e.target.value, index)} className={item.status === "Present" ? "green-color" : item.status === "Absent" ? "red-color" : "white-color"} value={item.status}>
                                                        <option style={{ color: "green" }} value="Present">Present</option>
                                                        <option style={{ color: "red" }} value="Absent">Absent</option>
                                                        <option style={{ color: "black" }} value="No Attendance">No Attendance</option>
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
                        <button className="btn btn-danger" onClick={() => handleBack()}>Back</button>
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

export default AddTeacher;