import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Toggle } from 'rsuite';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Solid from "@fortawesome/free-solid-svg-icons";
import * as Regular from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getClass } from "../../actions/class";
import { getTimeTables } from "../../actions/timetable";
import { requestClassStudents } from "../../actions/students";
import { getStudentAttendance } from "../../actions/attendance";

const AddStudent = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [edit, setEdit] = useState(true);
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const [classID, setClassID] = useState(null)
    const [split, setSplit] = useState(null);
    const [default1,setDefault1] = useState(true);
    const [attendance,setAttendance] = useState(null); 
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

    useEffect(() => {
        dispatch(getStudentAttendance({standard:props.standard,section:props.section,date:props.day}));
    }, [dispatch])

    let attendances = useSelector((state) => state.attendanceReducer)

    console.log(attendances);

    if(!attendance && props.students){
        let att = [];
        props.students.map((item)=>{
            att.push({student:item._id,status:default1});
        })
        setAttendance(att);
    }

    if(attendances && attendances.length>0 && edit){

    }

    const handleInputChange = (value, index) => {
        setAttendance(prev => {
            const updated = [...prev];
            updated[index]["status"] = value;
            return updated;
        });
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
        if (time === props.split[0]) {
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
        if(currentDate.getDay()>desiredDay)
            daysAgo = -1*(currentDate.getDay()-desiredDay);
        else
            daysAgo = (desiredDay - currentDate.getDay() - 7) % 7;
        var desiredDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + daysAgo);
        return handleDateFormat(desiredDate);
    }

    return (
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>{standardList[props.standard-1].label} {props.section} Class Attendance</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    
                    <br/>
                    <div className="row poststudent-container">
                        <div className="col-lg-3" style={{ margin: "0px auto", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                            <h5>Default Value : </h5>
                            <Toggle checked={default1} onChange={()=>setDefault1(!default1)} size="lg" checkedChildren="Present" unCheckedChildren="Absent" />
                        </div>
                    </div>
                    <br />
                    <div className="row poststudent-container">
                        <div className="col-lg-5" style={{ fontSize:"16px",margin: "0px auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{fontWeight:"600"}}>Attendance Date</span>&nbsp;: {getDate(props.day)} {getTimings(props.time)}
                        </div>
                    </div>
                    <br/>
                    <div className="row" style={{justifyContent:"center"}}>
                        <div className="col-lg-10 table-responsive">
                            <Table bordered striped >
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.students && props.students.docs.map((student,index)=>(
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{student.firstName}</td>
                                            <td>{student.lastName}</td>
                                            <td>
                                                <select onChange={(e)=>handleInputChange(e.target.value,index)} className={default1 ? "green-color" : "red-color"} value={default1 ? "Present" : "Absent"}>
                                                    <option style={{color:"green"}} value="Present">Present</option>
                                                    <option style={{color:"red"}} value="Absent">Absent</option>
                                                </select>
                                            </td>
                                        </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="row poststudent-container" style={{justifyContent:'center'}}>
                        <div className="col-lg-6" style={{ margin: "0px auto", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                            <button className="btn btn-danger" onClick={()=>props.close()}>Back</button>
                            <button className="btn btn-success">Post</button>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default AddStudent;