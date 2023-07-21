import React, { useEffect, useState } from 'react'

import "./Class.css"
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { Steps, ButtonGroup, Button } from 'rsuite';
import Table from 'react-bootstrap/esm/Table';
import { useDispatch, useSelector } from "react-redux";
import { requestStudents, updateSection } from '../../actions/students';
import { createClass } from "../../actions/class"
import { useNavigate } from 'react-router-dom';
import { postTimeTable } from '../../actions/timetable';

function CreateClass() {
    const [request1, setRequest1] = useState([])
    const [request2, setRequest2] = useState([])
    const [request3, setRequest3] = useState([])
    const [timings, setTimings] = useState([])
    const [edit1, setEdit1] = useState(false);
    const [edit2, setEdit2] = useState(false);
    const [step, setStep] = useState(0);
    const [standard, setStandard] = useState('')
    const [workingDays, setWorkingDay] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [duration, setDuration] = useState('')
    const [noClass, setNoClass] = useState(0)
    const [noBreak, setNoBreak] = useState(0)
    const [noSubject, setNoSubject] = useState(0)
    const [break1, setBreak1] = useState([])
    const [subject, setSubject] = useState([])
    const [noSections, setNoSections] = useState(0);
    const [sections, setSection] = useState([]);
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }]
    const [auto, setAuto] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    var students = [{}]
    const allStudents = useSelector(state => state.allStudentsReducer);
    useEffect(() => {
        dispatch(requestStudents());
    }, [dispatch])

    if (allStudents && standard) {
        students = allStudents.docs.filter((item) => item.standard == standard);
    }

    const onChange = nextStep => setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
    const onNext = () => {
        if (step === 1) {
            sections.map((section, index) => {
                subject.map((subject) => {
                    request1.push({
                        teacher: null,
                        standard,
                        section,
                        subject,
                        timings: [{
                            startTime: new Date(),
                            endTime: new Date(),
                            day: ""
                        }]
                    })
                    return true
                })
                boys[index].map((student) => {
                    request2.push({
                        student,
                        request: [{

                            propName: "section",
                            value: section

                        }]
                    })
                    return true
                })
                girls[parseInt(noSections) - index - 1].map((student) => {
                    request2.push({
                        student,
                        request: [{

                            propName: "section",
                            value: section

                        }]
                    })
                    return true
                })
                return true
            })
            let break2 = [];
            timings.filter((item1)=>item1.type==="Break").map((slot)=>{
                break2.push({
                    title:slot.title,
                    startTime:slot.startTime,
                    endTime:slot.endTime
                })
            })
            
            setRequest3({
                standard,
                startTime,
                endTime,
                duration,
                break: break2,
                workingDays,
            })

            onChange(step + 1);
        }

        onChange(step + 1);
    }
    const onPrevious = () => {
        if (step === 2) {
            setRequest1([])
            setRequest2([])
        }
        onChange(step - 1);
    }

    const [boys, setBoys] = useState([]);
    const [girls, setGirls] = useState([])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function divideListIntoGroups(list, n, gender) {
        const lists = list.filter((item) => item.gender === gender)
        const shuffledList = [...lists];
        shuffleArray(shuffledList);

        const groups = [];
        for (let i = 0; i < n; i++) {
            groups.push([]);
        }

        let currentIndex = 0;
        shuffledList.forEach(item => {
            groups[currentIndex].push(item);
            currentIndex = (currentIndex + 1) % n;
        });

        return groups;
    }

    const generateAutomatically = () => {
        setAuto(!auto);
        if (noSections) {
            setBoys(divideListIntoGroups(students, noSections, "male"))
            setGirls(divideListIntoGroups(students, noSections, "female"))
            console.log(boys);
            console.log(girls);
        }
        else {

        }
    }

    const handleBreak = (value1) => {
        setNoBreak(value1)
        let value = parseInt(value1);
        let breakLen = break1.length
        if (breakLen > value) {
            let diff = breakLen - value
            for (let i = 0; i < diff; i++) {
                break1.pop();
            }
        }
        else {
            let diff = value - breakLen
            for (let i = 0; i < diff; i++) {
                break1.push({ title: '', startTime: '', endTime: '', content: "New", type: "Break" });
            }
        }
    }

    const handleSubject = (e) => {
        setNoSubject(e.target.value)
        let value = parseInt(e.target.value);
        let SubjectLen = subject.length
        if (SubjectLen > value) {
            let diff = SubjectLen - value
            for (let i = 0; i < diff; i++) {
                subject.pop();
            }
        }
        else {
            let diff = value - SubjectLen
            for (let i = 0; i < diff; i++) {
                subject.push('');
            }
        }
    }

    const handleSection = (e) => {
        setAuto(false);
        setNoSections(e.target.value)
        let value = parseInt(e.target.value);
        let SectionLen = sections.length
        if (SectionLen > value) {
            let diff = SectionLen - value
            for (let i = 0; i < diff; i++) {
                sections.pop();
            }
        }
        else {
            let diff = value - SectionLen
            for (let i = 0; i < diff; i++) {
                let ascii = 65 + SectionLen + i;
                sections.push(String.fromCharCode(ascii));
            }
        }
    }

    const handleInputChange = (value, index, field) => {
        setBreak1(prevBreaks => {
            const updatedBreaks = [...prevBreaks];
            updatedBreaks[index][field] = value;
            return updatedBreaks;
        });
        if(break1[index].content==="New"){
            setEdit2(index);
        }
    }

    const handleSubjectChange = (event, index) => {
        const { value } = event.target;

        setSubject(prevSubjects => {
            const updatedSubjects = [...prevSubjects];
            updatedSubjects[index] = value;
            return updatedSubjects;
        });
    }

    const getCount = (gender) => {
        let count = 0;
        if (students.length !== 0) {
            students.map((item) => {
                if (item.gender === gender)
                    count++
                return true;
            })
            return count;
        }
        else {
            return 0;
        }
    }

    const handleSubmit = () => {
        console.log(request1)
        console.log(request2)
        console.log(request3)
        dispatch(createClass(request1,navigate))
        dispatch(updateSection(request2,navigate))
        dispatch(postTimeTable(request3,navigate))
    }

    const durationList = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
    const breakDuration = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

    if (noClass !== 0 && break1.length === 0 && duration !== 0 && startTime && edit1 === true) {
        setTimings([]);
        let updatedTime = [];
        let date = new Date();
        date.setHours(parseInt(startTime.split(":")[0]));
        date.setMinutes(parseInt(startTime.split(":")[1]));
        date.setSeconds(0);
        date.setMilliseconds(0);
        for (let i = 0; i < noClass; i++) {
            let time = { startTime: "", endTime: "", title: "", type: "Class", index: null };
            console.log()
            time.startTime = parseInt(date.getHours()) < 10 ? "0" + date.getHours() + ":" : +date.getHours() + ":"
            time.startTime += parseInt(date.getMinutes()) < 10 ? "0" + date.getMinutes() : date.getMinutes()
            time.title = "class" + (i + 1);
            date.setTime(date.getTime() + duration * 60 * 1000);
            time.endTime = parseInt(date.getHours()) < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":"
            time.endTime += parseInt(date.getMinutes()) < 10 ? "0" + date.getMinutes() : date.getMinutes()
            updatedTime.push(time);
            if (i === noClass - 1) {
                console.log(time.endTime);
                setEndTime(time.endTime)
            }
        }
        setTimings(updatedTime);
        setEdit1(false);
    }

    if (noClass !== 0 && break1.length !== 0 && duration !== 0 && startTime && edit1 === true) {
        if (startTime !== timings[0].startTime) {
            console.log(startTime);
            let updatedTime = [];
            let newStartTime = new Date();
            newStartTime.setHours(parseInt(startTime.split(":")[0]));
            newStartTime.setMinutes(parseInt(startTime.split(":")[1]));
            newStartTime.setSeconds(0);
            newStartTime.setMilliseconds(0);
            timings.map((slot, index) => {
                let sTime = new Date();
                let eTime = new Date();
                sTime.setHours(parseInt(slot.startTime.split(":")[0]));
                sTime.setMinutes(parseInt(slot.startTime.split(":")[1]));
                sTime.setSeconds(0);
                sTime.setMilliseconds(0);
                eTime.setHours(parseInt(slot.endTime.split(":")[0]));
                eTime.setMinutes(parseInt(slot.endTime.split(":")[1]));
                eTime.setSeconds(0);
                eTime.setMilliseconds(0);
                let dur = eTime.getTime() - sTime.getTime()
                let startTime = parseInt(newStartTime.getHours()) < 10 ? "0" + newStartTime.getHours() + ":" : newStartTime.getHours() + ":"
                startTime += parseInt(newStartTime.getMinutes()) < 10 ? "0" + newStartTime.getMinutes() : newStartTime.getMinutes()
                newStartTime.setTime(newStartTime.getTime() + dur)
                let endTime = parseInt(newStartTime.getHours()) < 10 ? "0" + newStartTime.getHours() + ":" : newStartTime.getHours() + ":"
                endTime += parseInt(newStartTime.getMinutes()) < 10 ? "0" + newStartTime.getMinutes() : newStartTime.getMinutes()
                if (slot.type === "Break") {
                    handleInputChange(startTime, slot.index, "startTime");
                }
                let time = {
                    startTime,
                    endTime,
                    title: slot.title,
                    type: slot.type,
                    index: slot.index,
                }
                if (index == timings.length - 1) {
                    setEndTime(endTime);
                }
                updatedTime.push(time);
                return true;
            })
            console.log(updatedTime);
            setTimings(updatedTime);
        }
        let sTime = new Date();
        let eTime = new Date();
        sTime.setHours(parseInt(timings[0].startTime.split(":")[0]));
        sTime.setMinutes(parseInt(timings[0].startTime.split(":")[1]));
        sTime.setSeconds(0);
        sTime.setMilliseconds(0);
        eTime.setHours(parseInt(timings[0].endTime.split(":")[0]));
        eTime.setMinutes(parseInt(timings[0].endTime.split(":")[1]));
        eTime.setSeconds(0);
        eTime.setMilliseconds(0);
        let dur = (eTime.getTime() - sTime.getTime()) / (1000 * 60);
        if (parseInt(duration) !== dur) {
            console.log("Duration changed");
            let updatedTime = [];
            let newStartTime = new Date();
            newStartTime.setHours(parseInt(startTime.split(":")[0]));
            newStartTime.setMinutes(parseInt(startTime.split(":")[1]));
            newStartTime.setSeconds(0);
            newStartTime.setMilliseconds(0);
            timings.map((slot, index) => {
                let sTime1 = new Date();
                let eTime1 = new Date();
                sTime1.setHours(parseInt(slot.startTime.split(":")[0]));
                sTime1.setMinutes(parseInt(slot.startTime.split(":")[1]));
                sTime1.setSeconds(0);
                sTime1.setMilliseconds(0);
                eTime1.setHours(parseInt(slot.endTime.split(":")[0]));
                eTime1.setMinutes(parseInt(slot.endTime.split(":")[1]));
                eTime1.setSeconds(0);
                eTime1.setMilliseconds(0);
                let dur1 = eTime1.getTime() - sTime1.getTime()
                let startTime = parseInt(newStartTime.getHours()) < 10 ? "0" + newStartTime.getHours() + ":" : newStartTime.getHours() + ":"
                startTime += parseInt(newStartTime.getMinutes()) < 10 ? "0" + newStartTime.getMinutes() : newStartTime.getMinutes()
                if(slot.type==="Class")
                newStartTime.setTime(newStartTime.getTime() + parseInt(duration)*1000*60)
                else
                newStartTime.setTime(newStartTime.getTime() + dur1)
                let endTime = parseInt(newStartTime.getHours()) < 10 ? "0" + newStartTime.getHours() + ":" : newStartTime.getHours() + ":"
                endTime += parseInt(newStartTime.getMinutes()) < 10 ? "0" + newStartTime.getMinutes() : newStartTime.getMinutes()
                if (slot.type === "Break") {
                    //(startTime, slot.index, "startTime");
                }
                let time = {
                    startTime,
                    endTime,
                    title: slot.title,
                    type: slot.type,
                    index: slot.index,
                }
                if (index == timings.length - 1) {
                    //setEndTime(endTime);
                }
                updatedTime.push(time);
                return true;
            })
            console.log(updatedTime);
            setTimings(updatedTime);
        }
        setEdit1(false);
    }

    const clearBreak = (break2, index) => {
        let updatedTime = [];
        let newStartTime = new Date();
        let flag = 0;
        newStartTime.setHours(parseInt(break2.startTime.split(":")[0]));
        newStartTime.setMinutes(parseInt(break2.startTime.split(":")[1]));
        newStartTime.setSeconds(0);
        newStartTime.setMilliseconds(0);
        timings.map((slot, index) => {
            let sTime = new Date();
            let eTime = new Date();
            sTime.setHours(parseInt(slot.startTime.split(":")[0]));
            sTime.setMinutes(parseInt(slot.startTime.split(":")[1]));
            sTime.setSeconds(0);
            sTime.setMilliseconds(0);
            eTime.setHours(parseInt(slot.endTime.split(":")[0]));
            eTime.setMinutes(parseInt(slot.endTime.split(":")[1]));
            eTime.setSeconds(0);
            eTime.setMilliseconds(0);
            let dur = eTime.getTime() - sTime.getTime()
            if (sTime.getTime() < newStartTime.getTime() && flag === 0) {
                updatedTime.push(slot);
            }
            else if (sTime.getTime() === newStartTime.getTime() && flag === 0) {
                flag = 1;
            }
            else if (flag === 1) {
                let startTime = parseInt(newStartTime.getHours()) < 10 ? "0" + newStartTime.getHours() + ":" : newStartTime.getHours() + ":"
                startTime += parseInt(newStartTime.getMinutes()) < 10 ? "0" + newStartTime.getMinutes() : newStartTime.getMinutes()
                newStartTime.setTime(newStartTime.getTime() + dur)
                let endTime = parseInt(newStartTime.getHours()) < 10 ? "0" + newStartTime.getHours() + ":" : newStartTime.getHours() + ":"
                endTime += parseInt(newStartTime.getMinutes()) < 10 ? "0" + newStartTime.getMinutes() : newStartTime.getMinutes()
                if (slot.type === "Break") {
                    handleInputChange(startTime, slot.index, "startTime");
                }
                let time = {
                    startTime,
                    endTime,
                    title: slot.title,
                    type: slot.type,
                    index: slot.index,
                }
                if (index == timings.length - 1) {
                    setEndTime(endTime);
                }
                updatedTime.push(time);
            }
            return true;
        })
        console.log(updatedTime);
        setTimings(updatedTime);
        handleInputChange("", index, "startTime");
        handleInputChange("New", index, "content");
    }

    if (break1.length !== 0 && timings.length !== 0 && edit2 !== false) {
        if (break1[edit2].title && break1[edit2].startTime && break1[edit2].endTime) {
            let updatedTime = [];
            let newStartTime = new Date();
            let flag = 0;
            newStartTime.setHours(parseInt(break1[edit2].startTime.split(":")[0]));
            newStartTime.setMinutes(parseInt(break1[edit2].startTime.split(":")[1]));
            newStartTime.setSeconds(0);
            newStartTime.setMilliseconds(0);
            timings.map((slot, index) => {
                let sTime = new Date();
                let eTime = new Date();
                sTime.setHours(parseInt(slot.startTime.split(":")[0]));
                sTime.setMinutes(parseInt(slot.startTime.split(":")[1]));
                sTime.setSeconds(0);
                sTime.setMilliseconds(0);
                eTime.setHours(parseInt(slot.endTime.split(":")[0]));
                eTime.setMinutes(parseInt(slot.endTime.split(":")[1]));
                eTime.setSeconds(0);
                eTime.setMilliseconds(0);
                let dur = eTime.getTime() - sTime.getTime()
                if (eTime.getTime() < newStartTime.getTime() && flag === 0) {
                    updatedTime.push(slot);
                }
                else if (eTime.getTime() === newStartTime.getTime() && flag === 0) {
                    updatedTime.push(slot);
                    newStartTime.setTime(newStartTime.getTime() + parseInt(break1[edit2].endTime) * 60 * 1000)
                    let endTime = parseInt(newStartTime.getHours()) < 10 ? "0" + newStartTime.getHours() + ":" : newStartTime.getHours() + ":"
                    endTime += parseInt(newStartTime.getMinutes()) < 10 ? "0" + newStartTime.getMinutes() : newStartTime.getMinutes()
                    updatedTime.push({
                        startTime: break1[edit2].startTime,
                        endTime: endTime,
                        title: break1[edit2].title,
                        type: "Break",
                        index: edit2,
                    })
                    flag = 1;
                }
                else if (flag === 1) {
                    let startTime = parseInt(newStartTime.getHours()) < 10 ? "0" + newStartTime.getHours() + ":" : newStartTime.getHours() + ":"
                    startTime += parseInt(newStartTime.getMinutes()) < 10 ? "0" + newStartTime.getMinutes() : newStartTime.getMinutes()
                    newStartTime.setTime(newStartTime.getTime() + dur)
                    let endTime = parseInt(newStartTime.getHours()) < 10 ? "0" + newStartTime.getHours() + ":" : newStartTime.getHours() + ":"
                    endTime += parseInt(newStartTime.getMinutes()) < 10 ? "0" + newStartTime.getMinutes() : newStartTime.getMinutes()
                    if (slot.type === "Break") {
                        handleInputChange(startTime, slot.index, "startTime");
                    }
                    let time = {
                        startTime,
                        endTime,
                        title: slot.title,
                        type: slot.type,
                        index: slot.index,
                    }
                    if (index == timings.length - 1) {
                        setEndTime(endTime);
                    }
                    updatedTime.push(time);
                }
                return true;
            })
            console.log(updatedTime);
            setTimings(updatedTime);
            handleInputChange("old", edit2, "content");
        }
        setEdit2(false);
    }

    console.log(break1);
    console.log(timings);

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Create Class</h2>
                        {
                            step === 2 && <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                        }
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="">
                        <Steps current={step}>
                            <Steps.Item title="Class" />
                            <Steps.Item title="Students" />
                            <Steps.Item title="Review" />
                        </Steps>
                        <br />
                        {
                            step === 0 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='CreateClass-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td>Standard</td>
                                                <td>
                                                    <select value={standard} onChange={(e) => setStandard(e.target.value)}>
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
                                                <td>No of Working Days<br />(per Week)</td>
                                                <td>
                                                    <select value={workingDays} onChange={(e) => setWorkingDay(e.target.value)}>
                                                        <option value="" disabled>Select Standard</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Day Start Time</td>
                                                <td><input type="time" min="07:00" max="18:00" value={startTime} onChange={(e) => { setStartTime(e.target.value); setEdit1(true); }} /></td>
                                            </tr>
                                            <tr>
                                                <td>Day End Time</td>
                                                <td><input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td>Duration per Class<br />(in min)</td>
                                                <td>
                                                    <select value={duration} onChange={(e) => { setDuration(e.target.value); setEdit1(true); }}>
                                                        <option value="">Select Duration</option>
                                                        {
                                                            durationList.map((item) => (
                                                                <option value={item}>{item} min</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>No of Classes Per Day ?</td>
                                                <td><input type="number" min={0} value={noClass} onChange={(e) => { setNoClass(e.target.value); setEdit1(true); handleBreak(0); }} /></td>
                                            </tr>
                                            <tr>
                                                <td>No of Break or Lunch per Day ?</td>
                                                <td><input type="number" min={0} value={noBreak} onChange={(e) => handleBreak(e.target.value)} /></td>
                                            </tr>
                                            <tr>
                                                <td>No of Subjects ?</td>
                                                <td><input type="number" min={0} value={noSubject} onChange={(e) => handleSubject(e)} /></td>
                                            </tr>
                                            {
                                                timings.length !== 0 && break1.length !== 0 &&
                                                <tr>
                                                    <td colSpan={2} style={{ textAlign: "center", fontWeight: "600" }}>Break List</td>
                                                </tr>
                                            }
                                            {
                                                timings.length !== 0 && break1.map((item, index) => (
                                                    <>
                                                        <tr>
                                                            <td>Break {index + 1} Name</td>
                                                            <td><input type="text" value={item.title} onChange={event => handleInputChange(event.target.value, index, 'title')} disabled={item.content === "old" ? true : false} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Start Time</td>
                                                            <td>
                                                                <select value={item.startTime} onChange={event => handleInputChange(event.target.value, index, 'startTime')} disabled={item.content === "old" ? true : false} >
                                                                    <option value="">Select Start Time</option>
                                                                    {
                                                                        timings.map((item) => (
                                                                            <option value={item.endTime}>{item.endTime} min</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Duration</td>
                                                            <td>
                                                                <select value={item.endTime} onChange={event => handleInputChange(event.target.value, index, 'endTime')} disabled={item.content === "old" ? true : false}>
                                                                    <option value="">Select Duration</option>
                                                                    {
                                                                        breakDuration.map((item) => (
                                                                            <option value={item}>{item} min</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                                {item.content === "old" && <button onClick={() => clearBreak(item, index)}>Clear</button>}
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))
                                            }
                                            {
                                                subject.length !== 0 &&
                                                <tr>
                                                    <td colSpan={2} style={{ textAlign: "center", fontWeight: "600" }}>Subject List{noSubject}</td>
                                                </tr>
                                            }
                                            {
                                                subject.map((item, index) => (
                                                    <>
                                                        <tr>
                                                            <td>Subject {index + 1} Name</td>
                                                            <td><input type="text" value={item} onChange={event => handleSubjectChange(event, index)} /></td>
                                                        </tr>
                                                    </>
                                                ))
                                            }
                                            <tr>
                                                <td style={{ backgroundColor: "white" }} colSpan={2}>
                                                    <h4>Preview</h4>
                                                    {
                                                        workingDays && timings.length !== 0 &&
                                                        <Table className='CreateClass-subTable'>
                                                            <tr>
                                                                <td>From</td>
                                                                {
                                                                    timings.map((item) => (
                                                                        <td>{item.startTime}</td>
                                                                    ))
                                                                }
                                                            </tr>
                                                            <tr>
                                                                <td>To</td>
                                                                {
                                                                    timings.map((item) => (
                                                                        <td>{item.endTime}</td>
                                                                    ))
                                                                }
                                                            </tr>
                                                            {
                                                                days.map((item, index) => (
                                                                    <tr>
                                                                        <td>{item}</td>
                                                                        {
                                                                            index + 1 <= workingDays ?
                                                                                timings.map((item1) => (
                                                                                    <>{
                                                                                        item1.type === "Break" && index === 0 && <td rowSpan={workingDays}></td>
                                                                                    }
                                                                                        {
                                                                                            item1.type !== "Break" && <td></td>
                                                                                        }</>
                                                                                ))
                                                                                :
                                                                                <td colSpan={timings.length}>Holiday</td>
                                                                        }
                                                                    </tr>
                                                                ))
                                                            }
                                                        </Table>
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {
                            step === 1 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='CreateClass-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td>No of Boys </td>
                                                <td>{getCount('male')}</td>
                                            </tr>
                                            <tr>
                                                <td>No of Girls</td>
                                                <td>{getCount('female')}</td>
                                            </tr>
                                            <tr>
                                                <td>No of Sections</td>
                                                <td>
                                                    <input type="number" min={0} value={noSections} onChange={(e) => handleSection(e)} />
                                                    <br />
                                                    {noSections && <>
                                                        Eg,
                                                        {sections.length !== 0 &&
                                                            sections.map((item) => (
                                                                <>{item},</>
                                                            ))
                                                        }
                                                    </>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Generate Automatically</td>
                                                <td><button className='btn btn-primary' onClick={generateAutomatically}>Click</button></td>
                                            </tr>
                                            {auto &&
                                                <tr>
                                                    <td style={{ textAlign: "center", backgroundColor: "white" }} colSpan={2}>
                                                        <p>Preview</p>
                                                        <div className='row'>
                                                            <div className='col-lg-6'>

                                                                <Table className='CreateClass-subTable'>
                                                                    <thead>
                                                                        <th>Sections</th>
                                                                        <th>No of Boys</th>
                                                                        <th>No of Girls</th>
                                                                        <th>Total Strength</th>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            sections.map((item, index) => (
                                                                                <tr>
                                                                                    <td>{item}</td>
                                                                                    <td>{boys[index].length}</td>
                                                                                    <td>{girls[parseInt(noSections) - index - 1].length}</td>
                                                                                    <td>{boys[index].length + girls[parseInt(noSections) - index - 1].length}</td>
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            }

                                            <tr>
                                                <td>Manual Entry<br /><a href='/Home'>Download</a></td>
                                                <td><input type="file" onChange={() => setAuto(false)} /></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {
                            step === 2 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td colSpan={4} style={{ textAlign: "center", fontWeight: "bold" }}>Class Details</td>
                                            </tr>
                                            <tr>
                                                <td>Standard</td>
                                                <td>{standard}</td>
                                                <td>No of Working Days</td>
                                                <td>{workingDays}</td>
                                            </tr>
                                            <tr>
                                                <td>Day Start Time</td>
                                                <td>{startTime}</td>
                                                <td>Day End Time</td>
                                                <td>{endTime}</td>
                                            </tr>
                                            <tr>
                                                <td>Duration</td>
                                                <td>{duration} min</td>
                                                <td>No of Classes per Day</td>
                                                <td>{noClass} classes</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4} style={{ fontWeight: "bold" }}>Break Details</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>No of Break or Lunch per Day ?</td>
                                                <td colSpan={2}>{noBreak}</td>
                                            </tr>
                                            {break1.map((item) => (
                                                <>
                                                    <tr>
                                                        <td>Break Name</td>
                                                        <td>{item.title}</td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Start Time</td>
                                                        <td>{item.startTime}</td>
                                                        <td>End Time</td>
                                                        <td>{item.endTime}</td>
                                                    </tr>
                                                </>
                                            ))
                                            }
                                            <tr>
                                                <td colSpan={4} style={{ fontWeight: "bold" }}>Subject Details</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>No of Subjects ?</td>
                                                <td colSpan={2}>{noSubject}</td>
                                            </tr>
                                            <tr>
                                                <td>Subject List</td>
                                                <td colSpan={3}>
                                                    {
                                                        subject.map((item) => (
                                                            <>{item},</>
                                                        ))
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4} style={{ textAlign: "center", fontWeight: "bold" }}>Students Details</td>
                                            </tr>
                                            <tr>
                                                <td>No of Boys</td>
                                                <td>{getCount('male')}</td>
                                                <td>No of Girls</td>
                                                <td>{getCount('female')}</td>
                                            </tr>
                                            <tr>
                                                <td>No of Sections</td>
                                                <td>{noSections}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {auto && <>
                                                <tr>
                                                    <td colSpan={4} style={{ fontWeight: "bold" }}>Generated Automatically</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ backgroundColor: "white" }} colSpan={4}>
                                                        <h4>Preview</h4>
                                                        <div style={{ textAlign: "center" }} className='row'>
                                                            <div className='col-lg-6 d-flex justify-content-center'>
                                                                <Table className='CreateClass-subTable'>
                                                                    <thead>
                                                                        <th>Sections</th>
                                                                        <th>No of Boys</th>
                                                                        <th>No of Girls</th>
                                                                        <th>Total Strength</th>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            sections.map((item, index) => (
                                                                                <tr>
                                                                                    <td>{item}</td>
                                                                                    <td>{boys[index].length}</td>
                                                                                    <td>{girls[parseInt(noSections) - index - 1].length}</td>
                                                                                    <td>{boys[index].length + girls[parseInt(noSections) - index - 1].length}</td>
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                            }
                                            {!auto && <>
                                                <tr>
                                                    <td colSpan={4} style={{ fontWeight: "bold" }}>Manual Entry</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>Student List (Section Wise)</td>
                                                    <td colSpan={2}><input type="file" onChange={() => setAuto(false)} /></td>
                                                </tr>
                                            </>
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        <ButtonGroup>
                            <Button onClick={onPrevious} disabled={step === 0}>
                                Previous
                            </Button>
                            <Button onClick={onNext} disabled={step === 3}>
                                Next{step}
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateClass

// {
//     class:"VII",
//     sections:[{
//         section:"A",
//         Boys:[students._id],
//         Girls:[students._id],
//     }],
//     subject:[
//         "English",
//         "Tamil",
//         "Maths",
//         "Science",
//         "Social",
//         "Computer",
//         "Hindi",
//     ],
//     startTime:"9:00am",
//     endTime:"4:15pm",
//     duration:"45min",
//     break:[{
//         title:"break1"
//         startTime:"10:30am",
//         endTime:"10:45am",
//     },{
//         title:"Lunch"
//         startTime:"1:00pm",
//         endTime:"1:45pm",
//     }],
//     workingDays:5
//     }