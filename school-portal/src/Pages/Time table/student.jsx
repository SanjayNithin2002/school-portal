import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeTable } from '../../actions/timetable';
import { getClass } from '../../actions/class';
import { setCurrentUser } from '../../actions/currentUser';
import {Table} from "react-bootstrap";

const Student = () => {

    const dispatch = useDispatch();

    const timetableData = [];
    const timetable = useSelector((state) => state.timeTableReducer);
    const class1 = useSelector((state) => state.allClassReducer);
    const currentUser = useSelector((state) => state.currentUserReducer);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    useEffect(() => {

        dispatch(setCurrentUser({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])

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

    if (timetableData.length === 0 && class1 && timetable && currentUser ) {

        let sec = Array.from(new Set(class1.docs.filter((item1) => item1.standard === currentUser.docs.standard).map((obj) => obj.section)));
        sec.map((item1) => {
            let subjectList1 = {standard:currentUser.docs.standard,section:item1};
            class1.docs.filter((class2)=>class2.standard===currentUser.docs.standard && class2.section===item1 && class2.subject!=="Class Teacher").map((class2)=>{
                subjectList1[class2.subject]=class2.teacher;
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
                                subTeacher = class1.docs.filter((class2)=> class2.standard===currentUser.docs.standard && class2.section===item1 && class2.timings.filter((slot1)=>slot1.startTime===startTime && slot1.day===day1 && slot1.endTime===addMin(startTime, item2.duration)).length>0)
                                startTime = addMin(startTime, item2.duration);
                                slot["endTime"] = startTime;
                                slot["subject"] = subTeacher.length!==0 ? subTeacher[0].subject : "-";
                                slot["teacher"] = subTeacher.length!==0 ? subTeacher[0].teacher : "-";
                            }
                            temp1.push(slot);
                        }
                        return true;
                    })
                    let result = {};
                    result["standard"] = currentUser.docs.standard;
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

    if (currentUser && currentUser.docs.standard && !timetable) {
        dispatch(getTimeTable(currentUser.docs.standard))
    }
    console.log(timetable);
    console.log(class1);



    return (
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Time Table</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <br />
                    <div className='table-responsive table-preview'>
                        <Table className='timetable-preview'>
                            <tr>
                                <td>From</td>
                                {
                                    timetableData && currentUser &&
                                    timetableData.filter((item) => item.standard === currentUser.docs.standard && item.section === currentUser.docs.section)[0]["slot"].map((slot) => (
                                        <td>{slot.startTime}</td>
                                    ))
                                }
                            </tr>
                            <tr>
                                <td>To</td>
                                {
                                    timetableData && currentUser &&
                                    timetableData.filter((item) => item.standard === currentUser.docs.standard && item.section === currentUser.docs.section)[0]["slot"].map((slot) => (
                                        <td>{slot.endTime}</td>
                                    ))
                                }
                            </tr>
                            {
                                timetableData && currentUser &&
                                timetableData.filter((item) => item.standard === currentUser.docs.standard && item.section === currentUser.docs.section).map((item, index) => (
                                    <tr>
                                        <td className='preview-sideHeader'>{days[index]}</td>
                                        {
                                            item.slot.map((slot, index1) => (

                                                slot.teacher === "Break" && index === 0 ?
                                                    <>
                                                        <td rowSpan={timetableData.filter((item) => item.standard === currentUser.docs.standard && item.section === currentUser.docs.section).length}>{slot.subject}</td>
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
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Student
