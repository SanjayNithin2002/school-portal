import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Panel, SelectPicker } from 'rsuite';
import './Profile.css';
import { useDispatch, useSelector } from "react-redux";
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { getAttendance } from '../../actions/attendance';
import { getMarks, getMarksByStudentID } from '../../actions/marks';
import { Calendar } from "react-big-calendar";
import { locales, localizer } from "../Attendance/Attendance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateStudentDetails } from '../../actions/students';
import { getUserDetails } from '../../actions/currentUser';

const ViewStudent = ({ status, onLoading, close, id }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [events, setEvents] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [buttonType, setButtonType] = useState("personal");


    const [EditPersonal, setEditPersonal] = useState({
        email: "",
        firstName: "",
        lastName: "",
        applicationNumber: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        aadharNumber: "",
        motherTongue: "",
        address: { line1: '', line2: '', city: '', state: '', pincode: '' },
    })

    const [EditAttendance, setEditAttendance] = useState({
        date: "",
        time: "",
        att: [],
    })

    const [fatherDetails, setFatherDetails] = useState({ name: '', age: null, qualification: '', occupation: '', annualIncome: '', phoneNumber: null, email: '' });
    const [motherDetails, setMotherDetails] = useState({ name: '', age: null, qualification: '', occupation: '', annualIncome: '', phoneNumber: null, email: '' });
    const [guardianDetails, setGaudianDetails] = useState({ name: '', age: null, qualification: '', occupation: '', annualIncome: '', phoneNumber: null, email: '' });

    const [showEdit, setShowEdit] = useState(false);

    const [father, setFather] = useState(true);
    const [mother, setMother] = useState(true);


    const attendances = useSelector((state) => state.attendanceReducer);
    const User = useSelector((state) => state.singleUserReducer);
    const marks = useSelector((state) => state.marksReducer);

    console.log(User)
    console.log(location)
    console.log(id);
    console.log(attendances)
    console.log(marks);
    console.log(EditPersonal);

    useEffect(() => {
        if (fetchStatus && id) {
            dispatch(getUserDetails(`/StudentInfo`, navigate, {type:"student",id}));
            onLoading(true);
        }
    }, [id, fetchStatus, dispatch, navigate])

    useEffect(() => {
        if (User && fetchStatus) {
            dispatch(getAttendance(`/StudentInfo`, navigate, { type: "student", id }))
            dispatch(getMarksByStudentID({ id }))
        }
    }, [User, dispatch, navigate, fetchStatus])

    useEffect(() => {
        if (attendances && marks) {
            onLoading(false);
        }
    }, [attendances && marks])

    useEffect(() => {
        if (attendances) {
            let result = []
            if (attendances.docs && attendances.docs.length > 0) {
                attendances.docs.map((item) => {
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
    }, [attendances])

    const incomeList = [{ value: 0, label: "No Income" }, { value: 50000, label: "0-50000" }, { value: 200000, label: "50000-200000" }, { value: 400000, label: "200000-400000" }, { value: 700000, label: "400000-700000" }, { value: 1000000, label: "More than 700000" }]
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

    const handleDateFormat = (date1) => {
        const date = new Date(date1);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const userLocale = navigator.language || navigator.userLanguage;
        const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(date);
        return formattedDate
    }

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

    const getDates = (day1) => {
        if (day1 === null)
            return null;
        var desiredDate = new Date(day1);
        let date = desiredDate.getDate() < 10 ? "0" + desiredDate.getDate() : desiredDate.getDate();
        let month = desiredDate.getMonth() < 10 ? "0" + (desiredDate.getMonth() + 1) : (desiredDate.getMonth() + 1);
        return desiredDate.getFullYear() + "-" + month + "-" + date;
    }

    const handleUpdate = () => {
        if (showEdit === "personal") {
            let req = [];
            let error = false;
            Object.keys(EditPersonal).map((key1) => {
                if (EditPersonal[key1] || key1 === "aadhaarNumber") {
                    if ((key1 !== "dob" && EditPersonal[key1] !== User.docs[key1]) || (key1 === "dob" && EditPersonal[key1] !== getDates(User.docs[key1]))) {
                        req.push({
                            propName: key1,
                            value: EditPersonal[key1],
                        })
                    }
                }
                else {
                    error = true;
                }
                return true;
            })
            if (error) {
                const message = (
                    <Notification type="warning" header="warning" closable>
                        Kindly please fill all the details.
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
            }
            else {
                console.log(req);
                if (req.length > 0) {
                    onLoading(true);
                    dispatch(updateStudentDetails(`/StudentInfo`, navigate, { id, data: req }));
                }
            }
        }
        else if (showEdit === "parents") {
            let req = [];
            let error = false;
            if (father) {
                Object.keys(fatherDetails).map((key1) => {
                    if (!fatherDetails[key1]) {
                        error = true;
                    }
                    return true;
                })
                if (!error) {
                    req.push({
                        propName: "father",
                        value: fatherDetails,
                    })
                }
            }
            else {
                if (User.docs.father.name !== "NA") {
                    req.push({
                        propName: "father",
                        value: { name: 'NA', age: 0, qualification: 'NA', occupation: 'NA', annualIncome: 0, phoneNumber: "NA", email: 'NA' },
                    })
                }
            }
            if (mother) {
                Object.keys(motherDetails).map((key1) => {
                    if (!motherDetails[key1]) {
                        error = true;
                    }
                    return true;
                })
                if (!error) {
                    req.push({
                        propName: "mother",
                        value: motherDetails,
                    })
                }
            }
            else {
                if (User.docs.mother.name !== "NA") {
                    req.push({
                        propName: "mother",
                        value: { name: 'NA', age: 0, qualification: 'NA', occupation: 'NA', annualIncome: 0, phoneNumber: "NA", email: 'NA' },
                    })
                }
            }
            if (father || mother) {
                if(User.docs.guardian.name !== "NA"){
                    req.push({
                        propName: "guardian",
                        value: { name: 'NA', age: 0, qualification: 'NA', occupation: 'NA', annualIncome: 0, phoneNumber: "NA", email: 'NA' },
                    })
                }
            }
            else {
                Object.keys(guardianDetails).map((key1) => {
                    if (!guardianDetails[key1]) {
                        error = true;
                    }
                    return true;
                })
                if (!error) {
                    req.push({
                        propName: "guardian",
                        value: guardianDetails,
                    })
                }
            }
            if(error){
                const message = (
                    <Notification type="warning" header="warning" closable>
                        Kindly please fill all the details.
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
            }
            else{
                console.log(req);
                if(req.length>0){
                    onLoading(true);
                    dispatch(updateStudentDetails(`/StudentInfo`, navigate, { id, data: req }));
                }
            }
        }
        else if (showEdit === "attendance") {

        }

    }

    const handleEdit = (type) => {
        console.log(type);
        setEditPersonal({
            email: User.docs.email,
            firstName: User.docs.firstName,
            lastName: User.docs.lastName,
            applicationNumber: User.docs.applicationNumber,
            dob: getDates(User.docs.dob),
            gender: User.docs.gender,
            bloodGroup: User.docs.bloodGroup,
            aadhaarNumber: User.docs.aadhaarNumber,
            standard: User.docs.standard,
            motherTongue: User.docs.motherTongue,
            address: User.docs.address,
        })

        setEditAttendance({
            date: "",
            time: "",
            att: [{
                student: User._id,
                status: "Present",
            }],
        })
        if (User.docs.father.name !== "NA") {
            setFather(true);
            setMother(false);
            setFatherDetails({ name: User.docs.father.name, age: User.docs.father.age, qualification: User.docs.father.qualification, occupation: User.docs.father.occupation, annualIncome: User.docs.father.annualIncome, phoneNumber: User.docs.father.phoneNumber, email: User.docs.father.email });
        }
        if (User.docs.mother.name !== "NA") {
            setFather(false);
            setMother(true);
            setMotherDetails({ name: User.docs.mother.name, age: User.docs.mother.age, qualification: User.docs.mother.qualification, occupation: User.docs.mother.occupation, annualIncome: User.docs.mother.annualIncome, phoneNumber: User.docs.mother.phoneNumber, email: User.docs.mother.email });
        }
        if (User.docs.father.name === "NA" && User.docs.mother.name === "NA") {
            setFather(false);
            setMother(false);
            setGaudianDetails({ name: User.docs.guardian.name, age: User.docs.guardian.age, qualification: User.docs.guardian.qualification, occupation: User.docs.guardian.occupation, annualIncome: User.docs.guardian.annualIncome, phoneNumber: User.docs.guardian.phoneNumber, email: User.docs.guardian.email });
        }

        setShowEdit(type);
    }

    const handleBack = () => {
        setShowEdit(false);
    }

    const handleBack1 = () => {
        close();
        dispatch({type:"FETCH_USER_DETAILS",payload:null});
        dispatch({type:"USER_FETCH_ATTENDANCE",payload:null});
        dispatch({type:"FETCH_STUDENT_MARKS",payload:null});
    }

    return (
        User &&
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div className='row justify-content-between' >
                        <h2 className=' col-xl-11 col-lg-11 col-md-10 col-sm-10'>Profile</h2>
                        <button style={{ maxWidth: "100px" }} className='btn btn-warning col-xl-1 col-lg-1 col-md-2 col-sm-2' onClick={() => {handleBack1()}} >Back</button>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='Profile-Container row'>
                        <div className='col-lg-3 col-md-4 Profile-Container-1'>
                            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: "100%", maxWidth: "240px" }}>
                                <img alt="no img" src={User.profile ? User.profile : "https://via.placeholder.com/240x240"} height="200" width="100%" />
                                <table>
                                    <tr>
                                        <td align='left'>First Name</td>
                                        <td align='right'>{User.docs.firstName}</td>
                                    </tr>
                                    <tr>
                                        <td align='left'>Last Name</td>
                                        <td align='right'>{User.docs.lastName}</td>
                                    </tr>
                                    <tr>
                                        <td align='left'>Class</td>
                                        <td align='right'>{standardList[User.docs.standard - 1].label} - {User.docs.section}</td>
                                    </tr>
                                </table>
                            </Panel>
                        </div>
                        <div className='col-lg-9 col-md-8 Profile-Container-2'>
                            <div className='Profile-Container-2-1'>
                                <div className='Profile-tab'>
                                    <div className="Profile-tab-1 ">
                                        <button onClick={() => setButtonType("personal")} className={buttonType === "personal" ? "btn btn-primary" : "btn btn-outline-primary"}>Personal Details</button>&ensp;
                                        <button onClick={() => setButtonType("parents")} className={buttonType === "parents" ? "btn btn-primary" : "btn btn-outline-primary"}>Parents Details</button>&ensp;
                                        <button onClick={() => setButtonType("attendance")} className={buttonType === "attendance" ? "btn btn-primary" : "btn btn-outline-primary"}>Attendance Details</button>&ensp;
                                        <button onClick={() => setButtonType("marks")} className={buttonType === "marks" ? "btn btn-primary" : "btn btn-outline-primary"}>Marks Details</button>&ensp;
                                    </div>
                                </div>
                            </div>
                            <div className='Profile-Container-2-1'>
                                <div className='Profile-content table-responsive'>
                                    {
                                        buttonType === "personal" &&
                                        <>
                                            <h4>Personal Details&emsp;<FontAwesomeIcon onClick={() => handleEdit('personal')} size='sm' icon={solid.faPencil} /></h4>
                                            <div className='table-responsive bdr'>
                                                <Table className='Profile-content-table'>
                                                    <tr>
                                                        <th>Information</th>
                                                        <th>Details</th>
                                                    </tr>
                                                    <tr>
                                                        <td>Application Number</td>
                                                        <td>{User.docs.applicationNumber}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date Of Birth</td>
                                                        <td>{handleDateFormat(User.docs.dob)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Gender</td>
                                                        <td>{User.docs.gender}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Blood Group</td>
                                                        <td>{User.docs.bloodGroup}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Aadhaar No</td>
                                                        <td>{User.docs.aadharNumber}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Tongue</td>
                                                        <td>{User.docs.motherTongue}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email ID</td>
                                                        <td>{User.docs.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address Line1</td>
                                                        <td>{User.docs.address.line1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address Line2</td>
                                                        <td>{User.docs.address.line2}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>City</td>
                                                        <td>{User.docs.address.city}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>State</td>
                                                        <td>{User.docs.address.state}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pincode</td>
                                                        <td>{User.docs.address.pincode}</td>
                                                    </tr>
                                                </Table>


                                            </div>
                                        </>
                                    }
                                    {
                                        buttonType === "parents" &&
                                        <>
                                            <h4>Parents Details&emsp;<FontAwesomeIcon onClick={() => handleEdit('parents')} size='sm' icon={solid.faPencil} /></h4>
                                            <div className='table-responsive bdr'>
                                                <Table className='Profile-content-table'>
                                                    {
                                                        User.docs.father.name !== "NA" &&
                                                        <>
                                                            <tr>
                                                                <th colSpan={2}>Father Details</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>{User.docs.father.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Age</td>
                                                                <td>{User.docs.father.age}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Occupation</td>
                                                                <td>{User.docs.father.occupation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Qualification</td>
                                                                <td>{User.docs.father.qualification}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Annual Income</td>
                                                                <td>{User.docs.father.annualIncome}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone No</td>
                                                                <td>{User.docs.father.phoneNumber}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email ID</td>
                                                                <td>{User.docs.father.email}</td>
                                                            </tr>
                                                        </>
                                                    }
                                                    {
                                                        User.docs.mother.name !== "NA" &&
                                                        <>
                                                            <tr>
                                                                <th colSpan={2}>Mother Details</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>{User.docs.mother.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Age</td>
                                                                <td>{User.docs.mother.age}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Occupation</td>
                                                                <td>{User.docs.mother.occupation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Qualification</td>
                                                                <td>{User.docs.mother.qualification}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Annual Income</td>
                                                                <td>{User.docs.mother.annualIncome}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone No</td>
                                                                <td>{User.docs.mother.phoneNumber}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email ID</td>
                                                                <td>{User.docs.mother.email}</td>
                                                            </tr>
                                                        </>
                                                    }
                                                    {
                                                        User.docs.guardian.name !== "NA" &&
                                                        <>
                                                            <tr>
                                                                <th colSpan={2}>Guardian Details</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>{User.docs.guardian.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Age</td>
                                                                <td>{User.docs.guardian.age}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Occupation</td>
                                                                <td>{User.docs.guardian.occupation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Qualification</td>
                                                                <td>{User.docs.guardian.qualification}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Annual Income</td>
                                                                <td>{User.docs.guardian.annualIncome}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone No</td>
                                                                <td>{User.docs.guardian.phoneNumber}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email ID</td>
                                                                <td>{User.docs.guardian.email}</td>
                                                            </tr>
                                                        </>
                                                    }
                                                </Table>
                                            </div>
                                        </>
                                    }
                                    {
                                        buttonType === "attendance" &&
                                        <>
                                            <h4>Attendance Details&emsp;<FontAwesomeIcon onClick={() => handleEdit('attendance')} size='sm' icon={solid.faPencil} /></h4>
                                            <div className='table-responsive bdr'>
                                                {
                                                    events &&
                                                    <Calendar components={{ event: CustomEvent }} localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, minWidth: 500 }} />
                                                }


                                            </div>
                                        </>
                                    }
                                    {
                                        buttonType === "marks" &&
                                        <>
                                            <h4>Marks Details</h4>
                                            <div className='table-responsive'>
                                                <Table className='Profile-content-table'>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Subject</th>
                                                        <th>Scored Mark</th>
                                                        <th>Weightage Mark</th>
                                                    </tr>
                                                    {
                                                        marks && marks.docs.assessmentMarks.length > 0 &&
                                                        <>
                                                            <tr>
                                                                <th style={{ opacity: "0.8", textAlign: "center" }} colSpan={4}>Assessment Marks</th>
                                                            </tr>
                                                            {
                                                                marks.docs.assessmentMarks.map((mark) => (
                                                                    <tr>
                                                                        <td>{mark.assessment.title}</td>
                                                                        <td>{mark.assessment.class.subject}</td>
                                                                        <td>{mark.scoredMarks}/{mark.assessment.maxMarks}</td>
                                                                        <td>{mark.weightageScoredMarks}/{mark.assessment.weightageMarks}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </>
                                                    }
                                                    {
                                                        marks && marks.docs.examMarks.length > 0 &&
                                                        <>
                                                            <tr>
                                                                <th style={{ opacity: "0.8", textAlign: "center" }} colSpan={4}>Exam Marks</th>
                                                            </tr>
                                                            {
                                                                marks.docs.examMarks.map((mark) => (
                                                                    <tr>
                                                                        <td>{mark.exam.examName.name + "-" + mark.exam.examName.sequence}</td>
                                                                        <td>{mark.exam.class.subject}</td>
                                                                        <td>{mark.scoredMarks}/{mark.exam.maxMarks}</td>
                                                                        <td>{mark.weightageScoredMarks}/{mark.exam.weightageMarks}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </>
                                                    }
                                                    {
                                                        marks && marks.docs.examMarks.length === 0 && marks.docs.assessmentMarks.length === 0 &&
                                                        <tr>
                                                            <td colSpan={4} style={{ textAlign: "center" }}>No Data</td>
                                                        </tr>
                                                    }
                                                </Table>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showEdit !== false} onHide={() => handleBack()}>
                <Modal.Header closeButton>
                    <Modal.Title>{showEdit}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-xl-10 col-lg-8 justify-content-center'>
                            <table>
                                {
                                    showEdit === "personal" &&
                                    <>
                                        <tr>
                                            <th>First Name</th>
                                            <td>:</td>
                                            <td><input value={EditPersonal.firstName} onChange={(e) => setEditPersonal((prev) => ({ ...prev, firstName: e.target.value }))} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <th>Last Name</th>
                                            <td>:</td>
                                            <td><input value={EditPersonal.lastName} onChange={(e) => setEditPersonal((prev) => ({ ...prev, lastName: e.target.value }))} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <th>DOB</th>
                                            <td>:</td>
                                            <td><input value={EditPersonal.dob} onChange={(e) => setEditPersonal((prev) => ({ ...prev, dob: e.target.value }))} type="date" /></td>
                                        </tr>
                                        <tr>
                                            <th>Gender</th>
                                            <td>:</td>
                                            <td>
                                                <select value={EditPersonal.gender} onChange={(e) => setEditPersonal((prev) => ({ ...prev, gender: e.target.value }))}>
                                                    <option value="" disabled>Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Blood Group</th>
                                            <td>:</td>
                                            <td><input value={EditPersonal.bloodGroup} onChange={(e) => setEditPersonal((prev) => ({ ...prev, bloodGroup: e.target.value }))} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <th>Aadhaar No</th>
                                            <td>:</td>
                                            <td><input value={EditPersonal.aadharNumber} onChange={(e) => setEditPersonal((prev) => ({ ...prev, aadharNumber: e.target.value }))} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <th>Standard</th>
                                            <td>:</td>
                                            <td>
                                                <select value={EditPersonal.standard} onChange={(e) => setEditPersonal((prev) => ({ ...prev, standard: e.target.value }))}>
                                                    <option value="" disabled>Select Standard</option>
                                                    {
                                                        standardList.map((item) => (
                                                            <option value={item.value}>{item.label}</option>
                                                        ))
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Mother Tongue</th>
                                            <td>:</td>
                                            <td><input value={EditPersonal.motherTongue} onChange={(e) => setEditPersonal((prev) => ({ ...prev, motherTongue: e.target.value }))} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <th>Email ID</th>
                                            <td>:</td>
                                            <td><input value={EditPersonal.email} onChange={(e) => setEditPersonal((prev) => ({ ...prev, email: e.target.value }))} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <th>Address Line-1</th>
                                            <td>:</td>
                                            <td><textarea value={EditPersonal.address.line1} onChange={(e) => setEditPersonal((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} rows={2} cols={30} /></td>
                                        </tr>
                                        <tr>
                                            <th>Address Line-2</th>
                                            <td>:</td>
                                            <td><textarea value={EditPersonal.address.line2} onChange={(e) => setEditPersonal((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} rows={2} cols={30} /></td>
                                        </tr>
                                        <tr>
                                            <th>City</th>
                                            <td>:</td>
                                            <td><input value={EditPersonal.address.city} onChange={(e) => setEditPersonal((prev) => ({ ...prev, address: { ...prev.address, city: e.target.value } }))} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <th>State</th>
                                            <td>:</td>
                                            <td><input value={EditPersonal.address.state} onChange={(e) => setEditPersonal((prev) => ({ ...prev, address: { ...prev.address, state: e.target.value } }))} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <th>Pincode</th>
                                            <td>:</td>
                                            <td><input value={EditPersonal.address.pincode} onChange={(e) => setEditPersonal((prev) => ({ ...prev, address: { ...prev.address, pincode: e.target.value } }))} type="text" /></td>
                                        </tr>
                                    </>
                                }
                                {
                                    showEdit === "parents" &&
                                    <>
                                        <tr>
                                            <td>Do he/she have a Father?</td>
                                            <td className='radio'><input type="radio" name="father" onClick={() => setFather(true)} checked={father} />Yes &emsp; <input type="radio" name="father" onClick={() => setFather(false)} checked={!father} />No</td>
                                        </tr>
                                        <tr>
                                            <td>Do he/she have a Mother?</td>
                                            <td className='radio'><input type="radio" name="mother" onClick={() => setMother(true)} checked={mother} />Yes &emsp; <input type="radio" name="mother" onClick={() => setMother(false)} checked={!mother} />No</td>
                                        </tr>
                                        {father && <>
                                            <tr>
                                                <td style={{ textAlign: "center" }} colSpan={2} className='newstudent-tilte'>Father Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td><input value={fatherDetails.name} onChange={(e) => setFatherDetails((prev) => ({ ...prev, name: e.target.value }))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Age</td>
                                                <td><input value={fatherDetails.age} onChange={(e) => setFatherDetails((prev) => ({ ...prev, age: e.target.value }))} type="number" /></td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td><input value={fatherDetails.qualification} onChange={(e) => setFatherDetails((prev) => ({ ...prev, qualification: e.target.value }))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Occupation</td>
                                                <td><input value={fatherDetails.occupation} onChange={(e) => setFatherDetails((prev) => ({ ...prev, occupation: e.target.value }))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Annual Income</td>
                                                <td>
                                                    <select value={fatherDetails.annualIncome} onChange={(e) => setFatherDetails((prev) => ({ ...prev, annualIncome: e.target.value }))}>
                                                        <option value="" disabled>Select Annual Income</option>
                                                        {
                                                            incomeList.map((item) => (
                                                                <option value={item.value}>{item.label}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td><input value={fatherDetails.phoneNumber} onChange={(e) => setFatherDetails((prev) => ({ ...prev, phoneNumber: e.target.value }))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Email ID</td>
                                                <td><input value={fatherDetails.email} onChange={(e) => setFatherDetails((prev) => ({ ...prev, email: e.target.value }))} type="text" /></td>
                                            </tr>
                                        </>
                                        }
                                        {mother && <>
                                            <tr>
                                                <td style={{ textAlign: "center" }} colSpan={2} className='newstudent-tilte'>Mother Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td><input value={motherDetails.name} onChange={(e) => setMotherDetails((prev) => ({ ...prev, name: e.target.value }))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Age</td>
                                                <td><input value={motherDetails.age} onChange={(e) => setMotherDetails((prev) => ({ ...prev, age: e.target.value }))} type="number" /></td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td><input value={motherDetails.qualification} onChange={(e) => setMotherDetails((prev) => ({ ...prev, qualification: e.target.value }))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Occupation</td>
                                                <td><input value={motherDetails.occupation} onChange={(e) => setMotherDetails((prev) => ({ ...prev, occupation: e.target.value }))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Annual Income</td>
                                                <td>
                                                    <select value={motherDetails.annualIncome} onChange={(e) => setMotherDetails((prev) => ({ ...prev, annualIncome: e.target.value }))}>
                                                        <option value="" disabled>Select Annual Income</option>
                                                        {
                                                            incomeList.map((item) => (
                                                                <option value={item.value}>{item.label}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td><input value={motherDetails.phoneNumber} onChange={(e) => setMotherDetails((prev) => ({ ...prev, phoneNumber: e.target.value }))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Email ID</td>
                                                <td><input value={motherDetails.email} onChange={(e) => setMotherDetails((prev) => ({ ...prev, email: e.target.value }))} type="text" /></td>
                                            </tr>
                                        </>
                                        }
                                        {!father && !mother && <>
                                            <tr>
                                                <td style={{ textAlign: "center" }} colSpan={2} className='newstudent-tilte'>Guardian Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td><input value={guardianDetails.name} onChange={(e) => setGaudianDetails((prev) => ({ ...prev, name: e.target.value }))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Age</td>
                                                <td><input value={guardianDetails.age} onChange={(e) => setGaudianDetails((prev) => ({ ...prev, age: e.target.value }))} type="number" /></td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td><input value={guardianDetails.qualification} onChange={(e) => setGaudianDetails((prev) => ({ ...prev, qualification: e.target.value }))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Occupation</td>
                                                <td><input value={guardianDetails.occupation} onChange={(e) => setGaudianDetails((prev) => ({ ...prev, occupation: e.target.value }))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Annual Income</td>
                                                <td>
                                                    <select value={guardianDetails.annualIncome} onChange={(e) => setGaudianDetails((prev) => ({ ...prev, annualIncome: e.target.value }))}>
                                                        <option value="" disabled>Select Annual Income</option>
                                                        {
                                                            incomeList.map((item) => (
                                                                <option value={item.value}>{item.label}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td><input value={guardianDetails.phoneNumber} onChange={(e) => setGaudianDetails((prev) => ({ ...prev, phoneNumber: e.target.value }))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Email ID</td>
                                                <td><input value={guardianDetails.email} onChange={(e) => setGaudianDetails((prev) => ({ ...prev, email: e.target.value }))} type="text" /></td>
                                            </tr>
                                        </>
                                        }
                                    </>
                                }
                                {
                                    showEdit === "attendance" &&
                                    <>
                                        <tr>
                                            <th>Date</th>
                                            <td>:</td>
                                            <td><input type="date" /></td>
                                        </tr>
                                        <tr>
                                            <th>Time</th>
                                            <td>:</td>
                                            <td>
                                                <input type="radio" name="time" />Morning&emsp;<input type="radio" name="time" />Afternoon&emsp;
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Attendance Status</th>
                                            <td>:</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <th>New Attendance</th>
                                            <td>:</td>
                                            <td><input type="radio" name="att" />Present&emsp;<input type="radio" name="att" />Absent&emsp; </td>
                                        </tr>
                                    </>
                                }
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => handleUpdate()}>
                        Update
                    </Button>
                    <Button variant="secondary" onClick={() => handleBack()}>
                        Back
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ViewStudent
