import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from 'react-redux'
import { getAllClass, updateClassDetails } from '../../actions/class'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SelectPicker } from 'rsuite';
import { Steps, ButtonGroup, Button as Button1 } from 'rsuite';

import "./timetable.css";
import { getTimeTables } from '../../actions/timetable'
import { requestTeachers } from '../../actions/teachers'
import { useNavigate } from 'react-router-dom'

const AddTimeTable = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [edit, setEdit] = useState(false);
    const [day, setDay] = useState("Monday");
    const [section, setSection] = useState("");
    const [showClassTeacher, setShowClassTeacher] = useState(false);
    const [showTimeTable, setShowTimeTable] = useState(false);
    const [standard, setStandard] = useState("");
    const [subjectList, setSubjectList] = useState([]);
    const [displaySubject, setDisplaySubject] = useState([]);
    const [teachersList, setTeachersList] = useState([]);
    const [timetableData2, setTimetableData2] = useState([]);

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        dispatch(getAllClass());
        dispatch(getTimeTables());
        dispatch(requestTeachers());
    }, [dispatch])

    const class1 = useSelector((state) => state.allClassReducer);
    const timetable = useSelector((state) => state.timeTableReducer);
    const teacher1 = useSelector((state) => state.teacherReducer);
    console.log(class1);
    console.log(timetable);
    console.log(teacher1);

    const onChange = nextStep => setStep(nextStep < 0 ? 0 : nextStep > 1 ? 1 : nextStep);

    const onNext = () => onChange(step + 1)
    const onPrevious = () => onChange(step - 1)

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

    let temp = [];
    if (timetableData2.length > 0)
        temp = [...timetableData2];

    const updateSlotDetails = (dayIndex, slotIndex, subject, teacher) => {
        const updatedSlot = { ...temp[dayIndex].slot[slotIndex], subject, teacher };
        const updatedSlots = [...temp[dayIndex].slot];
        updatedSlots[slotIndex] = updatedSlot;

        const updatedDaySchedule = { ...temp[dayIndex], slot: updatedSlots };
        const updatedSchedules = [...temp];
        updatedSchedules[dayIndex] = updatedDaySchedule;
        console.log("result");
        temp = [...updatedSchedules];
        setTimetableData2(temp);
    };

    const removeSlotDetails = (subject) => {
        let temp1 = [...timetableData2];
        temp1.map((info, index) => {
            if (info.standard === standard && info.section === section) {
                info.slot.map((slot, index1) => {
                    if (slot.subject === subject) {
                        console.log(info.day);
                        updateSlotDetails(index, index1, null, null);
                    }
                    return true;
                })
            }
            return true;
        })
    }

    const updateClassTeacher = (std1, sec1, value) => {
        const indexes = [];
        for (let i = 0; i < timetableData2.length; i++) {
            if (timetableData2[i]["standard"] === std1 && timetableData2[i]["section"] === sec1) {
                indexes.push(i);
            }
        }
        indexes.map((item) => {
            setTimetableData2(prev => {
                const updated = [...prev];
                updated[item]["classTeacher"] = value;
                return updated;
            });
            return true;
        })

    }

    const checkTimeSlot = (old_startTime, old_endTime, new_startTime, new_endTime) => {
        const old_sdate = new Date().setHours(...old_startTime.split(":").map(Number), 0, 0);
        const old_edate = new Date().setHours(...old_endTime.split(":").map(Number), 0, 0);
        const new_sdate = new Date().setHours(...new_startTime.split(":").map(Number), 0, 0);
        const new_edate = new Date().setHours(...new_endTime.split(":").map(Number), 0, 0);


        return ((old_sdate < new_sdate && old_sdate < new_edate &&
            old_edate <= new_sdate && old_edate < new_edate) ||
            (old_sdate > new_sdate && old_sdate >= new_edate &&
                old_edate > new_sdate && old_edate > new_edate))

    }

    const checkTeacher = (index, index1, subject) => {
        let day1 = timetableData2[index].day;
        let flag = true;
        let teacher = subjectList.filter((sub) => sub.standard === standard && sub.section === section)[0][subject];
        timetableData2.filter((item) => item.day === day1).map((item) => {
            console.log({ i: "item", item });
            item.slot.filter((slot) => slot.teacher !== null && slot.teacher._id === teacher._id).map((slot) => {
                console.log({ i: "slot", slot });
                if (!checkTimeSlot(slot.startTime, slot.endTime, timetableData2[index].slot[index1].startTime, timetableData2[index].slot[index1].endTime)) {
                    flag = false;
                    alert("Class Clashes with \nStandard=" + item.standard + "\nSection=" + item.section + "\nClass Day=" + item.day + ":" + day1 + "\nClass Start Time=" + slot.startTime + "\nCLass End Time=" + slot.endTime);
                }
                return true;
            })
            return true;
        })
        if (flag) {
            updateSlotDetails(index, index1, subject, teacher);
        }
    }

    const updateSubjectList = (std, sec, subject, teacher) => {
        let flag = -1;
        subjectList.map((subject1, index) => { if (subject1.standard === std && subject1.section === sec) { flag = index } return true; })
        if (flag !== -1) {
            setSubjectList(prev => {
                const updated = [...prev];
                updated[flag][subject] = teacher;
                return updated;
            });
        }
    }

    const handleSubmit = () => {

        let request1 = [];
        class1.docs.map((class2) => {
            let req = { _id: "", teacher: "", timings: [] };
            timetableData2.filter((info) => class2.standard === info.standard && class2.section === info.section).map((info) => {
                if (class2.subject.includes("Class Teacher")) {
                    if (info.classTeacher !== null && (class2.teacher === null || class2.teacher._id !== info.classTeacher._id)) {
                        req._id = class2._id;
                        req["teacher"] = info.classTeacher._id;
                    }
                    else {
                        console.log("error");
                    }
                }
                else {
                    info.slot.filter((slot) => class2.subject === slot.subject).map((slot) => {
                        if (class2.teacher === null || slot.teacher._id !== class2.teacher._id) {
                            req._id = class2._id;
                            req["teacher"] = slot.teacher._id;
                        }
                        if (class2.timings.length === 0 || class2.timings.filter((timing) => timing.day === info.day && timing.startTime === slot.startTime && timing.endTime === slot.endTime).length === 0) {
                            req._id = class2._id;
                            req.timings.push({
                                startTime: slot.startTime,
                                endTime: slot.endTime,
                                day: info.day,
                            })
                        }
                    })
                }
            })
            console.log(req);
            if (req._id !== "")
                request1.push(req);
        })

        console.log(request1);
        dispatch(updateClassDetails(request1, navigate));
    }

    if (class1 && timetableData2.length === 0 && timetable !== null) {
        let timetableData = [];
        let subjectList1 = [];
        let std = Array.from(new Set(class1.docs.map((obj) => obj.standard)));
        std.map((item) => {
            let sec = Array.from(new Set(class1.docs.filter((item1) => item1.standard === item).map((obj) => obj.section)));
            sec.map((item1) => {
                subjectList1.push({ standard: item, section: item1 });
                timetable.docs.filter((item2) => item2.standard === item).map((item2) => {
                    let temp1 = [];
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
                            slot["startTime"] = startTime;
                            startTime = addMin(startTime, item2.duration);
                            slot["endTime"] = startTime;
                            slot["subject"] = null;
                            slot["teacher"] = null;
                        }
                        temp1.push(slot);
                    }
                    let classTeacher = null;
                    class1.docs.filter((class2) => class2.standard === item && class2.section === item1 && class2.subject === "Class Teacher").map((class2) => classTeacher = class2.teacher)
                    for (let i = 0; i < item2.workingDays; i++) {
                        let result = {};
                        result["standard"] = item;
                        result["section"] = item1;
                        result["classTeacher"] = classTeacher;
                        result["day"] = days[i];
                        result["slot"] = temp1;
                        timetableData.push(result);
                    }
                    return true;
                })
                return true;
            })
            return true;
        })
        setTimetableData2(timetableData);
        setSubjectList(subjectList1);
        setEdit(true);
    }
    if (edit) {
        temp = [...timetableData2];
        let std = Array.from(new Set(class1.docs.map((obj) => obj.standard)));
        std.map((item) => {
            let sec = Array.from(new Set(class1.docs.filter((item1) => item1.standard === item).map((obj) => obj.section)));
            sec.map((item1) => {
                timetableData2.map((item2, index2) => {
                    if(item2.standard === item && item2.section === item1){
                    item2.slot.map((slot, index3) => {
                        class1.docs.filter((item3) => item3.standard === item && item3.section === item1).map((item3) => {
                            if (item3.teacher !== null) {
                                item3.timings.filter((item4) => item4.day === item2.day && item4.startTime === slot.startTime).map((item4) => {
                                    updateSlotDetails(index2, index3, item3.subject, item3.teacher);
                                    console.log(temp);
                                })
                            }
                            if (item3.subject !== "Class Teacher" || (item3.subject === "Class Teacher" && item3.timings.length > 0))
                                updateSubjectList(item, item1, item3.subject, item3.teacher);
                            return true;
                        })
                        return true;
                    })
                    }
                    return true;
                })
                return true;
            })
            return true;
        })
        setTimetableData2(temp);
        setEdit(false);
    }

    if (subjectList && displaySubject.length === 0 && standard && section) {
        let subList = [];
        Object.keys(subjectList.filter((sub) => sub.standard === standard && sub.section === section)[0]).filter((item) => item !== "standard" && item !== "section").map((item) => {
            if (subjectList.filter((sub) => sub.standard === standard && sub.section === section)[0][item] !== null) {
                subList.push({ label: item, value: item });
            }
        })
        console.log(subList);
        if (subList.length === 0)
            setDisplaySubject([{ label: "No Subject", value: null }]);
        else
            setDisplaySubject(subList);

    }

    if (teacher1 && teachersList.length <= 0) {
        setTeachersList(teacher1.docs.map(item => ({ label: item.firstName + " " + item.lastName + " - " + item.empID, value: item._id })))
    }

    console.log(timetableData2);
    console.log(subjectList);

    return (
        <div className="Main">
            <div className="Home">
                <div class="container1 container rounded bg-white">
                    <div className='d-flex justify-content-between align-items-center' >
                        <h2>Create TimeTable</h2>
                        <button onClick={() => handleSubmit()} className='btn btn-primary'>Submit</button>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div style={{ width: "105%" }} className="AddStudent-container">
                        <div style={{ width:"100%", minWidth: "400px" }} className=' row justify-content-evenly'>
                            <Steps className='col-lg-12' current={step}>
                                <Steps.Item title="Subject & Teachers" />
                                <Steps.Item title="Timings" />
                            </Steps>
                            <br />
                            <br />
                            <div className='col-lg-12 row'>

                                <div className='col-lg-8'>
                                    {
                                        standard && section ?
                                            <div>
                                                <div className='d-flex justify-content-center' style={{ fontSize: "30px" }}>
                                                    Standard:<b>{standardList[standard - 1].label}</b> &emsp;&emsp; Section:<b>{section}</b>
                                                </div>
                                                <br />
                                                {step === 1 ?
                                                    <>
                                                        <div className='TimeTable-Menu d-flex justify-content-center'>
                                                            <span onClick={() => setShowTimeTable(true)}><FontAwesomeIcon icon={solid.faEye} /> Preview</span>&emsp;&emsp;
                                                            <span onClick={() => setShowClassTeacher(true)}><FontAwesomeIcon icon={solid.faPencil} />Class Teacher</span>
                                                        </div>
                                                        <div className='timetable-main-content'>
                                                            <div className='timetable-main-content-1' >
                                                                {days.map((day1, index1) => (
                                                                    index1 < timetable.docs.filter((item) => item.standard === standard)[0]["workingDays"] &&
                                                                    <><button className={day === day1 && "active1"} onClick={() => setDay(day1)}>{day1}</button>&emsp;</>
                                                                ))}
                                                            </div>
                                                            <div className='timetable-main-content-2 table-responsive'>
                                                                <Table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Sno</th>
                                                                            <th>Start Time</th>
                                                                            <th>End Time</th>
                                                                            <th>Subject</th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            timetableData2.filter((item) => item.day === day && item.standard === standard && item.section === section).map((item, index) => (

                                                                                item.slot.map((slot, index1) => (
                                                                                    <tr>
                                                                                        <td>{index1 + 1}</td>
                                                                                        <td>{slot.startTime}</td>
                                                                                        <td>{slot.endTime}</td>
                                                                                        <>
                                                                                            {
                                                                                                slot.subject ?
                                                                                                    <td>{slot.subject}</td>
                                                                                                    :
                                                                                                    <td>
                                                                                                        {
                                                                                                            displaySubject.length > 0 &&
                                                                                                            <SelectPicker value="" onChange={(value) => { checkTeacher(timetableData2.findIndex((item3) => item3.day === day && item3.standard === standard && item3.section === section), index1, value); }} data={displaySubject} />
                                                                                                        }
                                                                                                    </td>
                                                                                            }
                                                                                        </>
                                                                                        <td>
                                                                                            {
                                                                                                ((slot.subject || slot.teacher) && slot.teacher !== "Break") ? <button className='btn btn-primary btn-sm' onClick={() => { updateSlotDetails(timetableData2.findIndex((item3) => item3.day === day && item3.standard === standard && item3.section === section), index1, null, null);}}>Clear</button> : <>No Action</>
                                                                                            }
                                                                                        </td>
                                                                                    </tr>
                                                                                ))
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className='row justify-content-center '>
                                                            <div className='col-lg-8 table-responsive d-flex justify-content-center'>
                                                                <Table className='ExamSchedule-content-table'>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th>S.No</th>
                                                                            <th>Subject List</th>
                                                                            <th>Teacher List</th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                        {
                                                                            subjectList.filter((sub) => sub.standard === standard && sub.section === section).map((sub) => (
                                                                                Object.keys(sub).filter((item) => item !== "standard" && item !== "section").map((item, index) => (
                                                                                    <tr>
                                                                                        <td>{index + 1}</td>
                                                                                        <td>{item}</td>
                                                                                        <td>
                                                                                            {
                                                                                                sub[item] !== null ?
                                                                                                    sub[item].firstName + " " + sub[item].lastName + " - " + sub[item].empID : <>
                                                                                                        {
                                                                                                            teachersList.length > 0 &&
                                                                                                            <SelectPicker value="" onChange={(value) => { updateSubjectList(standard, section, item, teacher1.docs.filter(teacher => teacher._id === value)[0]); setDisplaySubject([]); }} data={teachersList} />
                                                                                                        }</>
                                                                                            }
                                                                                        </td>
                                                                                        <td>
                                                                                            {
                                                                                                sub[item] !== null ?
                                                                                                    <Button onClick={() => { updateSubjectList(standard, section, item, null); setDisplaySubject([]); removeSlotDetails(item); }} className='btn btn-primary btn-sm'>Clear</Button> : <>No Action</>
                                                                                            }
                                                                                        </td>
                                                                                    </tr>
                                                                                ))
                                                                            ))
                                                                        }
                                                                        <tr>

                                                                        </tr>
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </div> :
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', height: "30vh" }} ><span style={{ borderRadius: "8px", backgroundColor: "#cadeef", padding: "10px 5px", fontSize: "18px", fontWeight: "bold" }}><FontAwesomeIcon icon={solid.faExclamationTriangle} />&emsp;Select the class to edit the timetables</span></div>
                                    }
                                </div>
                                <div className='col-lg-4'>
                                    <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                                        <ButtonGroup>
                                            <Button1 onClick={onPrevious} disabled={step === 0}>
                                                Previous
                                            </Button1>
                                            <Button1 onClick={onNext} disabled={step === 3}>
                                                Next
                                            </Button1>
                                        </ButtonGroup>
                                    </div>
                                    <br />
                                    <div className='d-flex justify-content-center' style={{ borderRadius: "10px", padding: "10px", boxShadow: "0px 0px 5px rgba(0,0,0,.5)" }}>
                                        <div style={{ width: "100%", overflowY: "auto", height: "350px" }}>
                                            <Accordion defaultActiveKey="0">
                                                {
                                                    class1 && Array.from(new Set(class1.docs.map((obj) => obj.standard))).map((item) => (
                                                        <Accordion.Item eventKey={item}>
                                                            <Accordion.Header style={{ padding: "initial" }}>{standardList[item - 1].label} Standard</Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className='row'>
                                                                    <table className='col-lg-12 col-xl-8 col-md-6 col-sm-6 timetable-table' cellSpacing="20px">
                                                                        {
                                                                            Array.from(new Set(class1.docs.filter((item1) => item1.standard === item).map((obj) => obj.section))).map((item2) => (
                                                                                <tr onClick={() => { setStandard(item); setSection(item2); setDisplaySubject([]) }} className='timetable-row'>
                                                                                    <td><FontAwesomeIcon icon={solid.faPlus} /></td>
                                                                                    <td></td>
                                                                                    <td className='timetable-col'>{item2} Section</td>
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </table>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    ))
                                                }
                                            </Accordion>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showClassTeacher} onHide={() => setShowClassTeacher(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Class Teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        <tr>
                            <td>Standard</td>
                            <td>&emsp;:&emsp;</td>
                            <td>{standard}</td>
                        </tr>
                        <tr>
                            <td>Section</td>
                            <td>&emsp;:&emsp;</td>
                            <td>{section}</td>
                        </tr>
                        <tr>
                            <td>Class Teacher</td>
                            <td>&emsp;:&emsp;</td>
                            <td>
                                {
                                    standard && section && timetableData2.length > 0 && timetableData2.filter((item) => item.standard === standard && item.section === section)[0]["classTeacher"] !== null ?
                                        <>
                                            {timetableData2.filter((item) => item.standard === standard && item.section === section)[0]["classTeacher"].firstName + " " + timetableData2.filter((item) => item.standard === standard && item.section === section)[0]["classTeacher"].lastName + " - " + timetableData2.filter((item) => item.standard === standard && item.section === section)[0]["classTeacher"].empID}
                                            &emsp;
                                            <span><button className='btn btn-primary btn-sm' onClick={() => updateClassTeacher(standard, section, null)}>Clear</button></span>
                                        </>
                                        :
                                        <>
                                            {
                                                teachersList.length > 0 &&
                                                <SelectPicker className='custom-rs-select' onChange={(value) => updateClassTeacher(standard, section, teacher1.docs.filter((teacher) => teacher._id === value)[0])} data={teachersList} />
                                            }
                                        </>
                                }
                            </td>
                        </tr>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowClassTeacher(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showTimeTable} size="lg" onHide={() => setShowTimeTable(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{standard && section && standardList[standard - 1].label + " " + section} TimeTable</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='table-responsive table-preview'>
                        <Table className='timetable-preview'>
                            <tr>
                                <td>From</td>
                                {
                                    timetableData2 && standard && section &&
                                    timetableData2.filter((item) => item.standard === standard && item.section === section)[0]["slot"].map((slot) => (
                                        <td>{slot.startTime}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td>To</td>
                                {
                                    timetableData2 && standard && section &&
                                    timetableData2.filter((item) => item.standard === standard && item.section === section)[0]["slot"].map((slot) => (
                                        <td>{slot.endTime}</td>
                                    ))
                                }
                            </tr>
                            {
                                timetableData2 && standard && section &&
                                timetableData2.filter((item) => item.standard === standard && item.section === section).map((item, index) => (
                                    <tr>
                                        <td className='preview-sideHeader'>{days[index]}</td>
                                        {
                                            item.slot.map((slot, index1) => (

                                                slot.teacher === "Break" && index === 0 ?
                                                    <>
                                                        <td rowSpan={timetableData2.filter((item) => item.standard === standard && item.section === section).length}>{slot.subject}</td>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            slot.teacher !== null ? slot.teacher !== "Break" ? <td><span style={{ cursor: "pointer" }} title={slot.teacher.firstName + " " + slot.teacher.lastName + " - " + slot.teacher.empID}>{slot.subject}</span></td> : <></> : <td><span title="No Teacher">{slot.subject}</span></td>
                                                        }
                                                    </>
                                            ))
                                        }
                                    </tr>
                                ))
                            }

                        </Table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTimeTable(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddTimeTable

// timetableData2.map((item, i) => {
            //     item.slot.filter((slot) => slot.teacher !== null && slot.subject !== null && slot.teacher !== "Break").map((slot) => {
            //         let flag = null;
            //         request1.map((item2, index2) => {
            //             if (item2.standard === item.standard && item2.section === item.section && item2.teacher === slot.teacher._id && item2.subject === slot.subject) {
            //                 flag = index2;
            //             }
            //         })
            //         if (flag !== null) {
            //             request1[flag].timings.push({ startTime: slot.startTime, endTime: slot.endTime, day: item.day });
            //         }
            //         else {
            //             let temp = {};
            //             temp.standard = item.standard;
            //             temp.section = item.section;
            //             temp.subject = slot.subject;
            //             temp.teacher = slot.teacher._id;
            //             temp.timings = [];
            //             temp.timings.push({ startTime: slot.startTime, endTime: slot.endTime, day: item.day });
            //             request1.push(temp);
            //         }
            //     })
            //     if (item.classTeacher !== null && i === 0) {
            //         let temp = {};
            //         temp.standard = item.standard;
            //         temp.section = item.section;
            //         temp.subject = "Class Teacher";
            //         temp.teacher = item.classTeacher._id;
            //         temp.timings = [];
            //         request1.push(temp);
            //     }
            // })
            // class1.docs.filter((class2) => class2.teacher !== null).map((class2) => {
            //     request2.push(class2._id);
            // })
            // console.log(request1);
            // console.log(request2);