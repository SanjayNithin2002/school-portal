import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
// import {useSelector} from "react-redux"
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css"

import "./Attendance.css"
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import { useDispatch, useSelector } from "react-redux";
import { getStudentAttendance } from "../../actions/attendance";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function Attendance() {

    const dispatch = useDispatch();
    const [events, setEvents] = useState(null);

    useEffect(() => {
        dispatch(getStudentAttendance({ id: localStorage.getItem('id'), type: localStorage.getItem('type') }))
    }, [dispatch])

    const event = useSelector(state => state.attendanceReducer)
    console.log(event)

    if (!events && event) {
        let result = []
        if (event.docs && event.docs.length > 0) {
            event.docs.map((item) => {
                result.push({
                    title1: item.count !== 0 ? "Present" : "Absent",
                    count: item.count,
                    start: item.date,
                    end: item.date
                })
            })
        }
        console.log(result);
        setEvents(result);
    }

    // const events = [{
    //     title1: "present",
    //     count:1,
    //     start: "2023-05-22",
    //     end: "2023-05-22",
    // }, {
    //     title1: "absent",
    //     count:0,
    //     start: "2023-05-21",
    //     end: "2023-05-21",
    // }, {
    //     title1: "present",
    //     count:2,
    //     start: "2023-05-20",
    //     end: "2023-05-20",
    // }]

    const CustomEvent = ({ event }) => {
        return (
            <>{
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
                }</>
        )
    }

    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Attendance</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="">
                        Total No of Working Days : {events ? events.length : 0}
                        &emsp;
                        No of Present Days : {events !== null ? events.filter((item) => item.count === 2).length : 0}
                        &emsp;
                        No of Half Day Present : {events !== null ? events.filter((item) => item.count === 1).length : 0}
                        &emsp;
                        No of Absent Days : {events !== null ? events.filter((item) => item.count === 0).length : 0}
                    </div>
                    {events &&
                        <Calendar components={{ event: CustomEvent }} localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
                    }
                </div>
            </div >
        </div>
    );
}

export default Attendance;
