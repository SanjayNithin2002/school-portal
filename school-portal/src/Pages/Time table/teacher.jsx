import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClass } from '../../actions/class';
import { setCurrentUser } from '../../actions/currentUser';
import { Table } from "react-bootstrap";

const Teacher = () => {

    const dispatch = useDispatch();
    const [day, setDay] = useState("");
    const [timetableData, setTimetableData] = useState([]);
    const class1 = useSelector((state) => state.allClassReducer);
    const currentUser = useSelector((state) => state.currentUserReducer);
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    useEffect(() => {
        dispatch(setCurrentUser({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])

    const checkDate = (a, b) => {
        const startTimeA = new Date(`2000-01-01T${a.startTime}`);
        const startTimeB = new Date(`2000-01-01T${b.startTime}`);
        return startTimeA - startTimeB;
    }

    console.log(timetableData);
    if (class1 && timetableData.length === 0) {
        let day = []
        let slot = {};
        let days1 = Array.from(new Set(class1.docs.map((obj) => obj.timings.map((obj1) => obj1.day))));
        days1.map((item) => {
            item.map((item1) => {
                if (!day.includes(item1)) {
                    day.push(item1);
                    slot[item1] = [];
                }
                return true;
            })
            return true;
        })
        class1.docs.map((class2) => {
            class2.timings.map((slot1) => {
                slot[slot1.day].push({
                    standard: class2.standard,
                    section: class2.section,
                    subject: class2.subject,
                    startTime: slot1.startTime,
                    endTime: slot1.endTime,
                })
                return true;
            })
            return true;
        })

        console.log(day);
        console.log(slot);
        setTimetableData(slot);
    }




    return (
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} className="container1 container rounded bg-white">
                    <h2>Time Table</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <br />
                    <div className='row AddStudent-container justify-content-center'>
                    {
                        timetableData && class1 &&
                        <div style={{minWidth:"400px"}} className='col-xl-7 col-lg-8 col-md-10 col-sm-12 timetable-main-content'>
                        <div className='timetable-main-content-1' >
                            {days.map((day1, index1) => (
                                timetableData[day1] &&
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
                                        <th>Class</th>
                                        <th>Subject</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        timetableData && day &&
                                        timetableData[day].sort((a, b) => checkDate(a, b)).map((slot, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{slot.startTime}</td>
                                                <td>{slot.endTime}</td>
                                                <td>{standardList[slot.standard-1].label + " " + slot.section}</td>
                                                <td>{slot.subject}</td>
                                            </tr>
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
    )
}

export default Teacher
