import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css"

import "./Attendance.css"
import { Notification, useToaster } from 'rsuite';
import { useDispatch, useSelector } from "react-redux";
import { getAttendance } from "../../actions/attendance";
import { useLocation, useNavigate } from "react-router-dom";

export const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function Attendance({ status, onLoading }) {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [events, setEvents] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(true);

    useEffect(() => {
        if (fetchStatus) {
            onLoading(true);
            dispatch(getAttendance('/Attendance', navigate, { id: localStorage.getItem('id'), type: localStorage.getItem('type') }))
        }
    }, [dispatch, fetchStatus])

    const event = useSelector(state => state.attendanceReducer)
    console.log(event)

    useEffect(() => {
        if (event) {
            let result = []
            if(event && event.docs){
                onLoading(false);
            }
            if (event.docs && event.docs.length > 0) {
                event.docs.map((item) => {
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
    }, [event])

    useEffect(() => {
        if (location.state && fetchStatus) {
            onLoading(false);
            setFetchStatus(false)
            const message = (
                <Notification type="error" header="error" closable>
                    Error Code: {location.state.status},<br />{location.state.message}
                </Notification>
            );
            toaster.push(message, { placement: 'topCenter' })
            navigate('/Attendance', { state: null });
        }
    }, [location.state, navigate, toaster])

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
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Attendance</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    {/* <div className="">
                        Total No of Working Days : {events ? events.length : 0}
                        &emsp;
                        No of Present Days : {events !== null ? events.filter((item) => item.count === 2).length : 0}
                        &emsp;
                        No of Half Day Present : {events !== null ? events.filter((item) => item.count === 1).length : 0}
                        &emsp;
                        No of Absent Days : {events !== null ? events.filter((item) => item.count === 0).length : 0}
                    </div> */}
                    <div className="Attendance-Container">
                        {
                            events &&
                            <Calendar components={{ event: CustomEvent }} localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
                        }
                    </div>
                </div>
            </div >
        </div>
    );
}

export default Attendance;
