import React from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css"

import "./Attendance.css"
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
        <div className="Main">
            
            <SideNavBar/>
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Attendance</h2>
                    <hr style={{border:"1px solid gray"}}/>
                    <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
                </div>
            </div >
        </div>
    );
}

export default Attendance;
