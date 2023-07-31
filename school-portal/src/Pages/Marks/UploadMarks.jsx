import React, { useEffect, useState } from 'react'
import { Steps, ButtonGroup, Button } from 'rsuite';
import Table from 'react-bootstrap/Table'

import "./Marks.css"
import { useDispatch, useSelector } from 'react-redux';
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { getMarks } from '../../actions/marks';
import { useNavigate } from 'react-router-dom';


const UploadMarks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const [subject, setSubject] = useState("");
    const [exam, setExam] = useState("");
    const [assessment, setAssessment] = useState("");
    const [step, setStep] = useState(0);
    useEffect(() => {
        dispatch(getMarks({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }));
    }, [dispatch])

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }]
    const m = useSelector((state) => state.marksReducer)
    console.log(m)
    const handleSubmit = () => {
        console.log("asd")
    }
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
    };

    
    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2>Upload Marks</h2>
                        {step === 2 ? <button className='btn btn-primary' onClick={() => handleSubmit()}>Submit</button> : <></>}
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div>
                        <Steps current={step}>
                            <Steps.Item title="General" />
                            <Steps.Item title="Subjects" />
                            <Steps.Item title="Review" />
                        </Steps>
                        <br /><br />
                        {step === 0 &&
                            <div className='row'>
                                <div className='col-lg-7 justify-content-center'>
                                    {m?
                                    <Table className='AddStudent-Table-List-1'>
                                        <tbody>
                                            <tr>
                                                <td>Assessment Title</td>
                                                <td>
                                                    <select className="selectPicker3" value={assessment} onChange={(e) => {setAssessment(e.target.value); setExam("")}}>
                                                        <option value="" disabled>Select Assessment</option>
                                                        {
                                                            Array.from(new Set(m.docs.assessmentMarks.map((i) => i.assessment.title))).map((i) => {
                                                                return <option value={i}>{i}</option>
                                                              })
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </Table>
                                    :<></>}
                                </div>
                            </div>
                        }
                        {step === 1 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table className='AddStudent-Table-List-1'>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Subject</th>
                                                <th>Exam Date</th>
                                                <th>Start Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {
                                                timetable.length>0 && subjectList && subjectList.map((item,index)=>(
                                                    <tr>
                                                        <td>{item.Sno}</td>
                                                        <td>{item.subject}</td>
                                                        <td><input type='date' value={item.date} onChange={(e)=>handleInputChange(e.target.value,index,"date")}/></td>
                                                        <td>
                                                            <select value={item.time} onChange={(e)=>handleInputChange(e.target.value,index,"time")} >
                                                                <option value=''>Select Time Slot</option>
                                                                <option value={timetable.docs[0].startTime}>Morning {timetable.docs[0].startTime}</option>
                                                                <option value={timetable.docs[0].break.filter((item)=>item.title==="Lunch").map((item)=>(item.endTime))}>Afternoon {timetable.docs[0].break.filter((item)=>item.title==="Lunch").map((item)=>(item.endTime))}</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                ))
                                            } */}

                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {step === 2 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table className='AddStudent-Table-List-1'>
                                        <tbody>
                                            <tr>
                                                <td colSpan={2} style={{ textAlign: "center", fontWeight: "bold" }}>
                                                    Exam Details
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Exam Title</td>
                                                <td>{exam}</td>
                                            </tr>
                                            <tr>
                                                <td>Duration</td>
                                                <td>{} min</td>
                                            </tr>
                                            <tr>
                                                <td>Class</td>
                                                <td>{standardList[standard - 1]} th</td>
                                            </tr>
                                            <tr>
                                                <td>Do student have class during exam ?</td>
                                                <td>{}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} style={{ textAlign: "center", fontWeight: "bold" }}>
                                                    Subject Details
                                                </td>
                                            </tr>
                                            {/* {
                                                subjectList && subjectList.map((item)=>(
                                                    <tr>
                                                        <td>{item.subject}</td>
                                                        <td>{handleDateFormat(item.date,item.time)}</td>
                                                    </tr>
                                                ))
                                            } */}

                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }

                        <br /><br />
                        <ButtonGroup>
                            <Button onClick={onPrevious} disabled={step === 0}>
                                Previous
                            </Button>
                            <Button onClick={onNext} disabled={step === 2}>
                                Next
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UploadMarks
