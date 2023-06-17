
import React, { useEffect, useState } from 'react'
import { Steps, ButtonGroup, Button } from 'rsuite';
import Table from 'react-bootstrap/Table'

import "./Exam.css"
import { getAllClass } from '../../actions/class';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeTable } from '../../actions/timetable';
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { createExam } from '../../actions/exam';
import { useNavigate } from 'react-router-dom';

const AddExam = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [title, setTitle] = useState('');
    const [edit1,setEdit1] = useState(false);
    const [maxMark, setMaxMark] = useState('');
    const [duration, setDuration] = useState('');
    const [standard, setStandard] = useState("");
    const [classExam, setClassExam] = useState(false);
    const [subjectList,setSubjectList] = useState(null);

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }]
    const examTitle = ["Monthly Exam", "Revision Exam", "Quarterly Exam", "Half Yearly Exam", "Annual Exam"];
    const durationList = [45, 50, 60, 75, 90, 120, 150, 180];

    useEffect(()=>{
        dispatch(getAllClass());
    },[dispatch])

    const class1 = useSelector((state)=>state.allClassReducer);
    const timetable = useSelector((state)=>state.timeTableReducer);
    
    if(standard && edit1){
        dispatch(getTimeTable(standard));
        setSubjectList(null);
        setEdit1(false);
    }

    if(class1 && !subjectList && standard){
        const updatedList = []
        Array.from(new Set(class1.docs.filter((item) => parseInt(standard) === item.standard).map(obj => obj.subject))).map((item,index)=>{
            let subjects = {
                Sno:index+1,
                subject:item,
                date:'',
                time:'',
            };
            updatedList.push(subjects);
            return true;
        })
        setSubjectList(updatedList);
    }

    const handleDateFormat = (date1,time1) => {
        const date = new Date(date1);
        date.setHours(parseInt(time1.split(":")[0]));
        date.setMinutes(parseInt(time1.split(":")[1]));
        date.setSeconds(0);
        date.setMilliseconds(0);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const userLocale = navigator.language || navigator.userLanguage;
        const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(date);
        return formattedDate
    }

    const handleInputChange = (value, index, field) => {
        setSubjectList(prev => {
            const items = [...prev];
            items[index][field] = value;
            return items;
        });
    }

    const handleSubmit = () => {
        let request = [];
        subjectList.map((item)=>{

            let date1 = new Date(item.date);
            date1.setHours(parseInt(item.time.split(":")[0]))
            date1.setMinutes(parseInt(item.time.split(":")[1]))
            date1.setSeconds(0);
            date1.setMilliseconds(0);

            date1.setTime(date1.getTime()+parseInt(duration)*1000*60);
            let endTime = parseInt(date1.getHours())<10 ? "0" + date1.getHours() + ":" : date1.getHours() + ":"
            endTime += parseInt(date1.getMinutes())<10 ? "0" + date1.getMinutes() : date1.getMinutes() 

            class1.docs.filter((item1)=>item1.standard===parseInt(standard) && item.subject===item1.subject).map((item1)=>{
                let list = {
                    examName:title,
                    maxMarks:maxMark,
                    date:item.date,
                    startTime:item.time,
                    endTime,
                    class:item1._id,
                }
                request.push(list);
                return true;
            })
            return true;            
        })
        dispatch(createExam(request,navigate));
    }

    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
    };
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
    
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <h2>Add Examination Schedule</h2>
                        { step===2 ? <button className='btn btn-primary' onClick={()=>handleSubmit()}>Submit</button> : <></> }
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
                                    <Table className='AddStudent-Table-List-1'>
                                        <tbody>
                                            <tr>
                                                <td>Exam Title</td>
                                                <td>
                                                    <select className="selectPicker3" value={title} onChange={(e) => setTitle(e.target.value)}>
                                                        <option value="" disabled>Select Exam</option>
                                                        {
                                                            examTitle.map((item) => (
                                                                <option value={item}>{item}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Duration<br />(in min)</td>
                                                <td>
                                                    <select className="selectPicker3" value={duration} onChange={(e) => setDuration(e.target.value)}>
                                                        <option value="" disabled>Select Duration</option>
                                                        {
                                                            durationList.map((item) => (
                                                                <option value={item}>{item} min</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Class</td>
                                                <td>
                                                    <select className="selectPicker3" value={standard} onChange={(e) => {setStandard(e.target.value);setEdit1(true);}}>
                                                        <option value="" disabled>
                                                            Select Standard
                                                        </option>
                                                        {
                                                            class1 !== null &&
                                                            Array.from(new Set(class1.docs.map(obj => obj.standard))).map((item) => (
                                                                standardList.filter((class1) => class1.value === item).map((class1) => (
                                                                    <option value={class1.value}>{class1.label}</option>
                                                                ))
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Max Mark</td>
                                                <td><input type="number" min={10} max={100} value={maxMark} onChange={(e)=>setMaxMark(e.target.value)} /></td>
                                            </tr>
                                            <tr>
                                                <td>Do student have class during exam ?</td>
                                                <td><input type="radio" name="class" onClick={()=>setClassExam(true)} checked={classExam} />Yes &emsp; <input type="radio" name="class" onClick={()=>setClassExam(false)} checked={!classExam} />No</td>
                                            </tr>
                                        </tbody>
                                    </Table>
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
                                            {
                                                timetable.length>0 && subjectList && subjectList.map((item,index)=>(
                                                    <tr>
                                                        <td>{item.Sno}</td>
                                                        <td>{item.subject}</td>
                                                        <td><input type='date' value={item.date} onChange={(e)=>handleInputChange(e.target.value,index,"date")}/></td>
                                                        <td>
                                                            <select value={item.time} onChange={(e)=>handleInputChange(e.target.value,index,"time")} >
                                                                <option value=''>Select Time Slot</option>
                                                                <option value={timetable[0].startTime}>Morning {timetable[0].startTime}</option>
                                                                <option value={timetable[0].break.filter((item)=>item.title==="Lunch").map((item)=>(item.endTime))}>Afternoon {timetable[0].break.filter((item)=>item.title==="Lunch").map((item)=>(item.endTime))}</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            
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
                                                <td>{title}</td>
                                            </tr>
                                            <tr>
                                                <td>Duration</td>
                                                <td>{duration} min</td>
                                            </tr>
                                            <tr>
                                                <td>Class</td>
                                                <td>{standardList[standard-1].label} th</td>
                                            </tr>
                                            <tr>
                                                <td>Do student have class during exam ?</td>
                                                <td>{classExam ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} style={{ textAlign: "center", fontWeight: "bold" }}>
                                                    Subject Details
                                                </td>
                                            </tr>
                                            {
                                                subjectList && subjectList.map((item)=>(
                                                    <tr>
                                                        <td>{item.subject}</td>
                                                        <td>{handleDateFormat(item.date,item.time)}</td>
                                                    </tr>
                                                ))
                                            }
                                            
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

export default AddExam
    