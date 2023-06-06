import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Toggle } from 'rsuite';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Solid from "@fortawesome/free-solid-svg-icons";
import * as Regular from "@fortawesome/free-regular-svg-icons";

import SideNavBar from "../../components/SideNavBar/SideNavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClass } from "../../actions/class";
import { getTimeTables } from "../../actions/timetable";
import { requestClassStudents } from "../../actions/students";

const PostStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [edit,setEdit] = useState(true);
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const [classID, setClassID] = useState(null)
    const [split,setSplit] = useState(null);
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

    useEffect(() => {
        dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        if (standard && section)
            dispatch(getTimeTables(standard))
        if (classID)
            dispatch(requestClassStudents(classID))
    }, [dispatch, classID, section, standard])

    const classes = useSelector((state) => state.singleClassReducer)
    const timetable = useSelector((state) => state.timeTableReducer)
    const students = useSelector((state)=> state.allStudentsReducer)

    if(classes && classID && edit){
        classes.classes.map((item) => {
            if(item._id===classID){
                item.timings.map((slot)=>{
                    return true;
                })
            }
            return true;
        })
    }

    if(!split && edit && timetable!==null){
        let time = [];
        time.push(timetable[0].startTime);
        console.log(timetable[0].break);
        if(timetable[0].break){
        timetable[0].break.filter((slot)=>slot.title==="Lunch").map((slot)=>{
            time.push(slot.endTime);
            return true;
        })
        setSplit(time)
        }
    }

    console.log(split)
    console.log(classes)
    console.log(timetable)
    console.log(students)

    if (!classID && standard && section) {
        classes.classes.map((item) => {
            if (item.standard === parseInt(standard)) {
                if (item.section === section) {
                    setClassID(item._id)
                }
            }
            return true;
        })
    }
    

    return (
        <div className="Main">
            <SideNavBar />
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
                                onChange={(e) => setStandard(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select Standard
                                </option>
                                {
                                    classes !== null &&
                                    classes.classes.map((item) => (
                                        standardList.filter((class1) => class1.value === item.standard).map((class1) => (
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
                                onChange={(e) => setSection(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select Section
                                </option>
                                {
                                    classes !== null &&
                                    classes.classes.filter((item) => parseInt(standard) === item.standard).map((item) => (
                                        <option value={item.section}>{item.section}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                        <br />
                        <br />

                        <div className="row poststudent-container">
                            <div className="col-lg-3" style={{ margin: "0px auto", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                <h5>Default Value : </h5>
                                <Toggle size="lg" checkedChildren="Present" unCheckedChildren="Absent" />
                            </div>
                        </div>
                        <br /><br />
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
                                            classes.classes.filter((item)=>item._id===classID).map((item)=>(
                                                split && item.timings.filter((slot)=>split.includes(slot.startTime)).map((slot)=>(
                                                    <tr>
                                                        <td>1</td>
                                                        <td>1st April, 2023</td>
                                                        <td>Afternoon</td>
                                                        <td>35</td>
                                                        <td>
                                                            <FontAwesomeIcon icon={Solid.faPlus} />
                                                            &nbsp;/&nbsp;
                                                            <FontAwesomeIcon icon={Regular.faPenToSquare} />
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
        </div>
    );
};

export default PostStudent;
