import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Solid from "@fortawesome/free-solid-svg-icons";
import * as Regular from "@fortawesome/free-regular-svg-icons";
import * as api from "../../api"

import SideNavBar from "../../components/SideNavBar/SideNavBar";
import { useDispatch, useSelector } from "react-redux";
import { getClass } from "../../actions/class";
import { getTimeTable } from "../../actions/timetable";
import { requestClassStudents } from "../../actions/students";
import AddStudent from "./AddStudent";
import { deleteStudentAttendance } from "../../actions/attendance";

const PostStudent = () => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(true);
    const [edit1, setEdit1] = useState(true);
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const [classID, setClassID] = useState(null)
    const [split, setSplit] = useState(null);
    const [editDisplay, setEditDisplay] = useState(false);
    const [day,setDay] = useState(null);
    const [date,setDate] = useState(null);
    const [time,setTime] = useState(null);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

    useEffect(() => {
        dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        if (classID)
            dispatch(requestClassStudents(classID))
    }, [dispatch, classID, section, standard])

    let classes = useSelector((state) => state.allClassReducer)
    let timetable = useSelector((state) => state.timeTableReducer)
    let students = useSelector((state) => state.allStudentsReducer)

    if (!split && edit1 && timetable !== null && timetable.docs.length>0) {
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
        setEdit1(false);
    }

    console.log(split)
    console.log(classes)
    console.log(timetable)
    console.log(students)
    console.log(classID)

    if (edit && standard && section) {
        classes.docs.map((item) => {
            if (item.standard === parseInt(standard)) {
                if (item.section === section) {
                    if(item.subject !== "Class Teacher"){
                        console.log(standard);
                        setClassID(item._id)
                        dispatch({type:"FETCH_ALL_TIMETABLE",payload:null});
                        dispatch({type:"STUDENT_FETCH_ATTENDANCE",payload:null});
                        dispatch({type:'FETCH_CLASS_STUDENTS',payload:null});
                        dispatch(getTimeTable(standard))
                        setSplit(null);
                    }
                }
            }
            return true;
        })
        setEdit(false);
        setEdit1(true);
    }

    const close = () =>{
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
    
    const handleDelete = async(date) => {
        const { data } = await api.getStudentAttendances({standard,section,date});
        let request = [];
        if(data){
        data.docs.map((item)=>{
            request.push(item._id);
            return true;
        })
        dispatch(deleteStudentAttendance(request));
        }
        else{
            console.log("error");
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
        if(currentDate.getDay()>desiredDay)
            daysAgo = -1*(currentDate.getDay()-desiredDay);
        else
            daysAgo = (desiredDay - currentDate.getDay() - 7) % 7;
        var desiredDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + daysAgo);
        return handleDateFormat(desiredDate);
    }

    const getDates = (day1) => {
        var currentDate = new Date();
        var desiredDay = days.indexOf(day1);
        var daysAgo = 0;
        if(currentDate.getDay()>desiredDay)
            daysAgo = -1*(currentDate.getDay()-desiredDay);
        else
            daysAgo = (desiredDay - currentDate.getDay() - 7) % 7;
        var desiredDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + daysAgo);
        let date = desiredDate.getDate()<10 ? "0"+desiredDate.getDate() : desiredDate.getDate();
        let month = desiredDate.getMonth()<10 ? "0"+(desiredDate.getMonth()+1) : (desiredDate.getMonth()+1);
        return month+"-"+date+"-"+desiredDate.getFullYear();
    }
        
    return (
        <div className="Main">
            <SideNavBar />
            {
            editDisplay===false ? 
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>Students Attendance</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className=""><div className="row poststudent-container">
                        <div className="col-lg-2">
                            <h4>Select Standard : </h4>
                        </div>
                        <div className="col-lg-3">
                            <select
                                className="selectPicker3"
                                value={standard}
                                onChange={(e) => {setStandard(e.target.value);setEdit(true);}}
                            >
                                <option value="" disabled>
                                    Select Standard
                                </option>
                                {
                                    classes &&
                                    Array.from(new Set(classes.docs.map((element)=>element.standard))).map((item) => (
                                        standardList.filter((class1) => class1.value === item).map((class1) => (
                                            <option value={class1.value}>{class1.label}</option>
                                        ))
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-lg-2">
                            <h4>Select Section : </h4>
                        </div>
                        <div className="col-lg-3">
                            <select
                                className="selectPicker3"
                                value={section}
                                onChange={(e) => {setSection(e.target.value);setEdit(true);}}
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
                        <br />
                        <br />
                        {
                            standard !== '' && section !== '' && classes &&
                            <div className="row poststudent-container">
                                <div className="col-lg-8">
                                    <Table striped bordered className="tablestyle2">
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Date</th>
                                                <th>Slot</th>
                                                <th>Strength</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                classes.docs.filter((item) => item._id === classID).map((item) => (
                                                    students && split && item.timings.filter((slot) => split.includes(slot.startTime)).map((slot, index) => (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{getDate(slot.day)}<br />{slot.day}</td>
                                                            <td>{getTimings(slot.startTime)}</td>
                                                            <td>{students.docs.length}</td>
                                                            <td>
                                                                <div style={{ display: "contents" }} onClick={() => {setEditDisplay(true);setDate(getDates(slot.day));setDay(slot.day);setTime(getTimings(slot.startTime)==="Morning"? "FN" : "AN" )}}>
                                                                    <FontAwesomeIcon icon={Regular.faPenToSquare} />
                                                                </div>
                                                                &nbsp;/&nbsp;
                                                                <div style={{ display: "contents" }} onClick={() => handleDelete(getDates(slot.day))}>
                                                                    <FontAwesomeIcon icon={Solid.faTrashAlt} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            :
            <AddStudent standard={standard} section={section} students={students} close={()=>close()} day={day} date={date} time={time} split={split}/>
            }
        </div>
    );
};

export default PostStudent;
