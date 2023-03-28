import React, { useState } from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css"

import "./Attendance.css"
import Leave from "../../components/Leave/Leave";
import SideNavBar from "../../components/SideNavBar/SideNavBar";

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
    const [attendance, setAttendance] = useState(true)

    const events = [{
        title: "present",
        start: "2023-03-22",
        end: "2023-03-22",
    }, {
        title: "absent",
        start: "2023-03-21",
        end: "2023-03-21",
    }, {
        title: "present",
        start: "2023-03-20",
        end: "2023-03-20",
    }]

    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            
            <SideNavBar eventKey='2'/>
            <div className="Home" style={{ width: "90%", margin: "10px auto" }}>
                <div class="container rounded bg-white" style={{ padding: "10px" }}>
                    <div>
                        <button onClick={() => setAttendance(true)} className={attendance ? "btn left-btn btn-primary" : "btn left-btn btn-outline-primary"}>Attendance</button>
                        <button onClick={() => setAttendance(false)} className={!attendance ? "btn right-btn btn-primary" : "btn right-btn btn-outline-primary"}>Leave</button>
                    </div>
                    {
                        attendance ?
                            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
                            :
                            <Leave />
                    }
                </div>
            </div >
        </div>
    );
}

export default Attendance;
