import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css"
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import Table from "react-bootstrap/Table";
import { useState } from "react";



function Timetable() {
    const data = [
        {
            Day: "Monday",
            p1: "Physics",
            p2: "Geometry",
            p3: "Biology",
            p4: "English",
            p5: "Algebra",
            p6: "Chemistry",
            p7: "Tamil",
            p8: "Hindi"
        },
        {
            Day: "Tuesday",
            p1: "Physics",
            p2: "Geometry",
            p3: "Biology",
            p4: "English",
            p5: "Algebra",
            p6: "Chemistry",
            p7: "Tamil",
            p8: "Hindi"
        },
        {
            Day: "Wednesday",
            p1: "Physics",
            p2: "Geometry",
            p3: "Biology",
            p4: "English",
            p5: "Algebra",
            p6: "Chemistry",
            p7: "Tamil",
            p8: "Hindi"
        },
        {
            Day: "Thursday",
            p1: "Physics",
            p2: "Geometry",
            p3: "Biology",
            p4: "English",
            p5: "Algebra",
            p6: "Chemistry",
            p7: "Tamil",
            p8: "Hindi"
        },
        {
            Day: "Friday",
            p1: "Physics",
            p2: "Geometry",
            p3: "Biology",
            p4: "English",
            p5: "Algebra",
            p6: "Chemistry",
            p7: "Tamil",
            p8: "Hindi"
        },
        {
            Day: "Saturday",
            p1: "Physics",
            p2: "Geometry",
            p3: "Biology",
            p4: "English",
            p5: "Algebra",
            p6: "Chemistry",
            p7: "Tamil",
            p8: "Hindi"
        },
    ];

    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Time Table</h2>
                    <hr style={{ border: "1px solid gray" }} />

                    <div class="table-responsive">
                        <Table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Days/Time</th>
                                    <th>8-8:45</th>
                                    <th>9-9:45</th>
                                    <th>10-10:45</th>
                                    <th>11-11:45</th>
                                    <th>12-12:45</th>
                                    <th>2-2:45</th>
                                    <th>3-3:45</th>
                                    <th>4-4:45</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(
                                    data.map((item) => (
                                        <tr key={item}>
                                            <th>{item.Day}</th>
                                            <td>{item.p1}</td>
                                            <td>{item.p2}</td>
                                            <td>{item.p3}</td>
                                            <td>{item.p4}</td>
                                            <td>{item.p5}</td>
                                            <td>{item.p6}</td>
                                            <td>{item.p7}</td>
                                            <td>{item.p8}</td>

                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>

                </div>
            </div >
        </div>
    );
}

export default Timetable;
