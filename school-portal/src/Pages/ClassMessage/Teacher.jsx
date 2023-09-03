import React, { useEffect, useState } from 'react'
import { Icon } from '@rsuite/icons';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getClass } from '../../actions/class';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TagPicker } from 'rsuite';
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"

import "./ClassMessage.css"
import { deleteClassMessage, getClassMessage, postClassMessage, postClassMessage1 } from '../../actions/classMessage';
import { requestClassStudents } from '../../actions/students';

const Send = React.forwardRef((props, ref) => (
    <svg {...props} ref={ref} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" class="svg-inline--fa fa-paper-plane " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"></path>
    </svg>
));

const Teacher = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [classID, setClassID] = useState(null)
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const [message, setMessage] = useState("");
    const [deleteID, setDeleteID] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

    useEffect(() => {
        dispatch(getClassMessage({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))

    }, [dispatch])

    const class1 = useSelector((state) => state.allClassReducer)
    const messages = useSelector((state) => state.classmessageReducer)
    const studentlist = useSelector((state) => state.allStudentsReducer)

    if (!studentlist && classID) {
        dispatch(requestClassStudents(classID))
    }

    console.log(class1);
    console.log(classID)
    console.log(messages)
    console.log(studentlist)
    console.log(selectedValues)

    const handleTagChange = (newSelectedValues) => {
        setSelectedValues(newSelectedValues);
    };

    if (standard && section && classID === null) {
        if (class1.docs.filter((item) => item.standard === parseInt(standard) && item.section === section).length > 1) {
            class1.docs.map((item) => {
                if (item.standard === parseInt(standard) && item.section === section && item.subject !== "Class Teacher") {
                    setClassID(item._id);
                }
                return true;
            })
        }
        else if (class1.docs.filter((item) => item.standard === parseInt(standard) && item.section === section).length === 1) {
            setClassID(class1.docs.filter((item) => item.standard === parseInt(standard) && item.section === section)[0]._id);
        }
    }

    const handleSubmit = () => {
        if(selectedValues.length===0){
            let ClassID = null;
            class1.docs.map((item) => {
                if (item.standard === parseInt(standard) && item.section === section) {
                    ClassID = item._id;
                }
                return true;
            })
            dispatch(postClassMessage({ class: ClassID, message, postedBy: localStorage.getItem('id'),postedOn:new Date() }, navigate));
        }
        else{
            dispatch(postClassMessage1({student:selectedValues,postedBy:localStorage.getItem("id"),message,postedOn:new Date()}, navigate));
        }
        
    }

    const handleConfirm = () => {
        dispatch(deleteClassMessage(deleteID));
        setShowDialog(false);
    };

    const checkDate = (a,b) =>{
        let date1 = new Date(a.postedOn);
        let date2 = new Date(b.postedOn);
        return date2 - date1;
    }

    return (
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Class Message</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='AddStudent-container'>

                        <div style={{ minWidth: "500px" }} className='timetable-main-content'>
                            <div className="row classmessage-container-1">
                                <div className='col-lg-6 row classmessage-1'>
                                    <div className="col-lg-7 col-md-5 col-sm-6">
                                        <h4>Select Standard : </h4>
                                    </div>
                                    <div className="col-lg-5 col-md-6 col-sm-6">
                                        <select className="selectPicker3" value={standard} onChange={(e) => { setStandard(e.target.value); setClassID(null); }}>
                                            <option value="" disabled>
                                                Select Standard
                                            </option>
                                            {
                                                class1 !== null &&
                                                Array.from(new Set(class1.docs.map((obj) => obj.standard))).map((item) => (
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
                                        <select className="selectPicker3" value={section} onChange={(e) => { setSection(e.target.value); setClassID(null); }}>
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
                            <div className="row classmessage-container-1">
                                {
                                    classID && studentlist &&
                                    <>
                                        <div className='col-lg-7 row classmessage-1' >
                                            <div className="col-lg-6 col-md-5 col-sm-6">
                                                <h4>Select Students : </h4>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <TagPicker
                                                    placement='bottom'
                                                    data={studentlist.docs.map((student) => ({ label: student.firstName + " " + student.lastName, value: student._id }))}
                                                    value={selectedValues}
                                                    onChange={handleTagChange}
                                                    searchable={true}
                                                    menuMaxHeight="200px"
                                                    className="stu-list"
                                                />
                                            </div>
                                        </div>
                                    </>

                                }
                            </div>
                            <br />
                            <br />
                            {standard && section && <>
                                <div className="row classmessage-container-1">
                                <div className='col-lg-7 row classmessage-1' >
                                            <div className="col-lg-6 col-md-5 col-sm-6">
                                        <h4>Message : </h4>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <textarea className="msg-textarea" value={message} onChange={(e) => setMessage(e.target.value)} ></textarea>
                                    </div>
                                </div>
                                </div>
                                <br />
                                <div className="row classmessage-container-3">
                                    <div className='col-lg-3 col-md-3 col-sm-4'>
                                        <button className='btn btn-success' onClick={() => handleSubmit()}><Icon as={Send} style={{ color: "white", fontSize: '20px' }} />send</button>
                                    </div>
                                </div>

                                <hr style={{ display: "flex", justifyContent: "center", width: "100%", border: "1px solid gray" }} />

                                <div className="row classmessage-container-2">
                                    <div className='col-lg-10 chat-container'>
                                        {
                                            messages && classID && messages.docs.filter((item) => (item.class && item.class._id === classID) || (item.student && item.student[0].standard===parseInt(standard) && item.student[0].section===section)).sort((a,b)=>checkDate(a,b)).map((item) => <>
                                                <div className=" chat-container-2">
                                                    <div className='col-xl-2 col-lg-2 col-md-3 col-sm-4 Avatar'>
                                                        <span className='Avatar-1' title={class1.docs.filter((item) => item._id === classID)[0].subject + " Teacher"}>You</span>
                                                    </div>
                                                    <div className='col-xl-10 col-lg-10 col-md-9 col-sm-8 message-content'>
                                                        {
                                                            item.student && item.student.length>0 ?
                                                            <p className='Avatar-2-1'>
                                                            To : {
                                                                item.student.map((student,index)=>(
                                                                    index===0 ?
                                                                    <>
                                                                    {student.firstName+" "+student.lastName}
                                                                    </>
                                                                    :
                                                                    <>
                                                                    {", "+student.firstName+" "+student.lastName}
                                                                    </>
                                                                    
                                                                ))
                                                            }
                                                            </p>
                                                            :
                                                            <p className='Avatar-2-1'>
                                                            To : All Students
                                                            </p>
                                                        }
                                                        
                                                        <p className='Avatar-2'>{item.message}</p>
                                                        <div className='message-content-1'>
                                                            <span onClick={() => { setDeleteID(item._id); setShowDialog(true); }} className='class-message-delete'>Delete</span>
                                                            <span className='timer'>{moment(new Date(item.postedOn), "YYYYMMDD").fromNow()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {
                                            messages && classID && messages.docs.filter((item) => (item.class && item.class._id === classID) || (item.student && item.student[0].standard===parseInt(standard) && item.student[0].section===section)).length===0 &&
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }} ><span style={{ borderRadius: "8px", backgroundColor: "#cadeef", padding: "10px 5px", fontSize: "18px", fontWeight: "bold" }}><FontAwesomeIcon icon={solid.faExclamationTriangle} />&emsp;You have not yet sent or receive the message.</span></div>
                                                
                                        }
                                    </div>

                                </div>

                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showDialog} onHide={() => setShowDialog(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to proceed?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDialog(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Teacher

