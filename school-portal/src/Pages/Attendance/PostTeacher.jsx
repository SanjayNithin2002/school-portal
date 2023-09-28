import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Solid from "@fortawesome/free-solid-svg-icons";
import * as Regular from "@fortawesome/free-regular-svg-icons";
import * as api from "../../api"

import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { deleteAdminAttendance, deleteTeacherAttendance } from "../../actions/attendance";
import { requestTeachers } from "../../actions/teachers";
import { requestAdmins } from "../../actions/admins";
import AddTeacher from "./AddTeacher";
import AddAdmin from "./AddAdmin";

const PostTeacher = ({ status, onLoading }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [userType, setUserType] = useState("");
    const [fetchStatus, setFetchStatus] = useState(true);
    const [editDisplay, setEditDisplay] = useState(false);
    const [Date1, setDate1] = useState(null);
    const [dateList, setDateList] = useState([]);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        if (fetchStatus) {
            onLoading(true);
            dispatch(requestTeachers("/PostTeacherAttendance", navigate))
            dispatch(requestAdmins("PostTeacherAttendance", navigate))
        }
    }, [dispatch, fetchStatus, navigate])

    let teachers = useSelector((state) => state.teacherReducer)
    let admins = useSelector((state) => state.adminReducer)

    console.log(teachers)
    console.log(admins)
    console.log(dateList)

    useEffect(() => {
        if (teachers && admins) {
            let dates = [];
            for (let i = 0; i < 7; i++) {
                let date = new Date();
                date.setDate(date.getDate() - i);
                if (date.getDay() !== 0) {
                    dates.push(date);
                }
            }
            onLoading(false);
            setDateList(dates)
        }
    }, [teachers, admins])

    useEffect(() => {
        if (location.state && fetchStatus) {
            if (location.state.status === 200) {
                onLoading(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                        {location.state.message}
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
                navigate('/PostTeacherAttendance', { state: null });
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
                navigate('/PostTeacherAttendance', { state: null });
            }
        }
    }, [location.state, toaster, navigate, fetchStatus])

    const close = () => {
        setEditDisplay(false);
        setUserType("");
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

    const handleTeacherDelete = async (date) => {
        onLoading(true);
        const { data } = await api.getTeacherAttendances({ date });
        let request = [];
        console.log(data);
        if (data && data.docs.length > 0) {
            data.docs.map((item) => {
                request.push(item._id);
                return true;
            })
            onLoading(true);
            console.log(request)
            dispatch(deleteTeacherAttendance("/PostTeacherAttendance", navigate, request));
        }
        else {
            
            onLoading(false);
            const message = (
                <Notification type="warning" header="Warning" closable>
                    No Attendance is taken at this particular date.
                </Notification>
            );
            toaster.push(message, { placement: 'topCenter' })
        }
    }

    const handleAdminDelete = async (date) => {
        onLoading(true);
        const { data } = await api.getAdminAttendances({ date });
        let request = [];
        console.log(data);
        if (data && data.docs.length > 0) {
            data.docs.map((item) => {
                request.push(item._id);
                return true;
            })
            dispatch(deleteAdminAttendance("/PostTeacherAttendance", navigate, request));
        }
        else {
            onLoading(false);
            const message = (
                <Notification type="warning" header="Warning" closable>
                    No Attendance is taken at this particular date.
                </Notification>
            );
            toaster.push(message, { placement: 'topCenter' })
        }
    }
    const getDates = (day1) => {
        var desiredDate = new Date(day1);
        let date = desiredDate.getDate() < 10 ? "0" + desiredDate.getDate() : desiredDate.getDate();
        let month = desiredDate.getMonth() < 10 ? "0" + (desiredDate.getMonth() + 1) : (desiredDate.getMonth() + 1);
        return month + "-" + date + "-" + desiredDate.getFullYear();
    }

    return (
        <div className="Main">
            {
                editDisplay === false ?
                    <div className="Home">
                        <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                            <h2>Staff Attendance</h2>
                            <hr style={{ border: "1px solid gray" }} />
                            <div className="">
                                <div className="row" style={{ justifyContent: "center" }}>
                                    <div className="col-lg-8 table-responsive">
                                        <Table className="StudentList-content-table">
                                            <tr>
                                                <th>S.No</th>
                                                <th>Date</th>
                                                <th>Staff</th>
                                                <th>Action</th>
                                            </tr>
                                            {
                                                dateList &&
                                                dateList.map((date, index) => (
                                                    <>
                                                        <tr>
                                                            <td>{index * 2 + 1}</td>
                                                            <td>{handleDateFormat(date)}<br />{days[date.getDay()]}</td>
                                                            <td>Teachers</td>
                                                            <td>
                                                                <div style={{ display: "contents" }} onClick={() => { onLoading(true); setEditDisplay(true); setDate1(getDates(date)); setUserType("Teacher"); }}>
                                                                    <FontAwesomeIcon icon={Regular.faPenToSquare} />
                                                                </div>
                                                                &nbsp;/&nbsp;
                                                                <div style={{ display: "contents" }} onClick={() => handleTeacherDelete(getDates(date))}>
                                                                    <FontAwesomeIcon icon={Solid.faTrashAlt} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>{index * 2 + 2}</td>
                                                            <td>{handleDateFormat(date)}<br />{days[date.getDay()]}</td>
                                                            <td>Admins</td>
                                                            <td>
                                                                <div style={{ display: "contents" }} onClick={() => { onLoading(true); setEditDisplay(true); setDate1(getDates(date)); setUserType("Admin"); }}>
                                                                    <FontAwesomeIcon icon={Regular.faPenToSquare} />
                                                                </div>
                                                                &nbsp;/&nbsp;
                                                                <div style={{ display: "contents" }} onClick={() => handleAdminDelete(getDates(date))}>
                                                                    <FontAwesomeIcon icon={Solid.faTrashAlt} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))
                                            }
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    userType === "Teacher" ?
                        <AddTeacher onLoading={(status1) => onLoading(status1)} teachers={teachers} close={() => close()} date={Date1} />
                        :
                        <AddAdmin onLoading={(status1) => onLoading(status1)} admins={admins} close={() => close()} date={Date1} />
            }
        </div>
    );
};

export default PostTeacher;
