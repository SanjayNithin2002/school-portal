import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllClass } from '../../actions/class';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { getTimeTable } from '../../actions/timetable';
import { Table } from "react-bootstrap"
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"

const Admin = ({status,onLoading1}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const [fetchStatus,setFetchStatus] = useState(true);
    const [timetableData, setTimetableData] = useState([]);

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        if(fetchStatus){
            onLoading1(true);
            dispatch(getAllClass("/TimeTable",navigate));
        }
    }, [dispatch,fetchStatus,navigate])

    const class1 = useSelector((state) => state.allClassReducer);
    const timetable = useSelector((state) => state.timeTableReducer);
    console.log(class1);
    console.log(timetable);
    console.log(timetableData);

    useEffect(()=>{
        if(class1){
            onLoading1(false);
        }
    },[class1])

    useEffect(()=>{
        if(timetable){
            onLoading1(false);
        }
    },[timetable])

    useEffect(()=>{
        if(fetchStatus && standard){
            onLoading1(true);
            dispatch(getTimeTable("/TimeTable",navigate,standard));
        }
    },[standard,dispatch,fetchStatus,navigate])

    useEffect(()=>{
        if (location.state && fetchStatus) {
            if (location.state.status === 200) {
                onLoading1(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                      {location.state.message}
                    </Notification>
                );
                toaster.push(message, {placement:'topCenter'})
                navigate('/TimeTable',{state:null});
            }
            else{
                onLoading1(false);
                setFetchStatus(false);
                const message = (
                    <Notification type="error" header="Error" closable>
                      Error Code: {location.state.status},<br/>{location.state.message}
                    </Notification>
                );
                toaster.push(message, {placement:'topCenter'})
                navigate('/TimeTable',{state:null});
            }
        }
    },[location.state,toaster,navigate])

    const addMin = (time1, duration) => {
        const sdate = new Date();
        sdate.setHours(parseInt(time1.split(":")[0]));
        sdate.setMinutes(parseInt(time1.split(":")[1]));
        sdate.setSeconds(0);
        sdate.setMilliseconds(0);
        sdate.setTime(sdate.getTime() + parseInt(duration) * 1000 * 60);
        let result = "";
        result += sdate.getHours() >= 10 ? sdate.getHours() : "0" + sdate.getHours();
        result += sdate.getMinutes() >= 10 ? ":" + sdate.getMinutes() : ":0" + sdate.getMinutes();
        return result;
    }

    const handleStandard = (value) => {
        setStandard(value);
        dispatch({ type: "FETCH_CLASS_TIMETABLE", payload: null });
        setTimetableData([]);
    }

    if (timetableData.length === 0 && class1 && timetable) {

        let sec = Array.from(new Set(class1.docs.filter((item1) => item1.standard === parseInt(standard)).map((obj) => obj.section)));
        sec.map((item1) => {
            let subjectList1 = { standard, section: item1 };
            class1.docs.filter((class2) => class2.standard === parseInt(standard) && class2.section === item1 && class2.subject !== "Class Teacher").map((class2) => {
                subjectList1[class2.subject] = class2.teacher;
                return true;
            })
            days.map((day1, index1) => {
                if (index1 < parseInt(timetable.docs[0].workingDays)) {
                    var temp1 = [];
                    timetable.docs.map((item2) => {
                        let startTime = item2.startTime;
                        while (startTime !== item2.endTime) {
                            let slot = {};
                            let flag = 0;
                            if (item2.break.filter((item3) => item3.startTime === startTime).length > 0) {
                                flag = 1;
                                let temp = item2.break.filter((item3) => item3.startTime === startTime);
                                slot["startTime"] = startTime
                                startTime = temp[0]["endTime"];
                                slot["endTime"] = startTime;
                                slot["subject"] = temp[0]["title"];
                                slot["teacher"] = "Break";
                            }
                            if (flag === 0) {
                                let subTeacher = [];
                                slot["startTime"] = startTime;
                                subTeacher = class1.docs.filter((class2) => class2.standard === parseInt(standard) && class2.section === item1 && class2.timings.filter((slot1) => slot1.startTime === startTime && slot1.day === day1 && slot1.endTime === addMin(startTime, item2.duration)).length > 0)
                                startTime = addMin(startTime, item2.duration);
                                slot["endTime"] = startTime;
                                slot["subject"] = subTeacher.length !== 0 ? subTeacher[0].subject : "-";
                                slot["teacher"] = subTeacher.length !== 0 ? subTeacher[0].teacher : "-";
                            }
                            temp1.push(slot);
                        }
                        return true;
                    })
                    let result = {};
                    result["standard"] = parseInt(standard);
                    result["section"] = item1;
                    result["day"] = day1;
                    result["slot"] = temp1;
                    timetableData.push(result);
                }
                return true;
            })
            return true;
        })
    }



    return (
        <div className='Main'>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div className='d-flex justify-content-between align-items-center' >
                        <h2>TimeTable</h2>
                        <Link to="/AddTimeTable" className='btn btn-primary'><FontAwesomeIcon icon={solid.faPlus} /> Create</Link>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <br />
                    <div className="row studentlist-container">
                        <div className='col-lg-6 row classmessage-1'>
                            <div className="col-lg-7 col-md-5 col-sm-6">
                                <h4>Select Standard : </h4>
                            </div>
                            <div className="col-lg-5 col-md-6 col-sm-6">
                                <select className="selectPicker3" value={standard} onChange={(e) => handleStandard(e.target.value)} >
                                    <option value="" disabled>
                                        Select Standard
                                    </option>
                                    {
                                        class1 !== null && class1.docs.length > 0 &&
                                        Array.from(new Set(class1.docs.map(obj => obj.standard))).map((item) => (
                                            standardList.filter((class1) => class1.value === item).map((class1) => (
                                                <option value={class1.value}>{class1.label}</option>
                                            ))
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='col-lg-6 row classmessage-1'>
                            <div className="col-lg-7 col-md-5 col-sm-6">
                                <h4>Select Section : </h4>
                            </div>
                            <div className="col-lg-5 col-md-6 col-sm-6">
                                <select className="selectPicker3" value={section} onChange={(e) => setSection(e.target.value)}>
                                    <option value="" disabled>
                                        Select Section
                                    </option>
                                    {
                                        class1 !== null &&
                                        Array.from(new Set(class1.docs.filter((item) => parseInt(standard) === item.standard).map((obj) => obj.section))).map((item) => (
                                            <option value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div>
                        <div className='table-responsive table-preview'>
                            {
                                timetableData && standard && section &&
                                <Table className='timetable-preview'>
                                    <tr>
                                        <td>From</td>
                                        {
                                            timetableData.filter((item) => item.standard === parseInt(standard) && item.section === section)[0]["slot"].map((slot) => (
                                                <td>{slot.startTime}</td>
                                            ))
                                        }
                                    </tr>
                                    <tr>
                                        <td>To</td>
                                        {
                                            timetableData.filter((item) => item.standard === parseInt(standard) && item.section === section)[0]["slot"].map((slot) => (
                                                <td>{slot.endTime}</td>
                                            ))
                                        }
                                    </tr>
                                    {
                                        timetableData.filter((item) => item.standard === parseInt(standard) && item.section === section).map((item, index) => (
                                            <tr>
                                                <td className='preview-sideHeader'>{days[index]}</td>
                                                {
                                                    item.slot.map((slot, index1) => (

                                                        slot.teacher === "Break" && index === 0 ?
                                                            <>
                                                                <td rowSpan={timetableData.filter((item) => item.standard === standard && item.section === section).length}>{slot.subject}</td>
                                                            </>
                                                            :
                                                            <>
                                                                {
                                                                    slot.teacher !== "-" ? slot.teacher !== "Break" ? <td><span style={{ cursor: "pointer" }} title={slot.teacher.firstName + " " + slot.teacher.lastName + " - " + slot.teacher.empID}>{slot.subject}</span></td> : <></> : <td><span style={{ cursor: "pointer" }} title="No Teacher">{slot.subject}</span></td>
                                                                }
                                                            </>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }
                                </Table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
