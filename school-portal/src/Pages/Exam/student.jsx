import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Exam.css"
import { useDispatch, useSelector } from 'react-redux'
import { getStudentExam } from '../../actions/exam'


function Student() {
    const dispatch = useDispatch();
    const [examList,setExamList] = useState(null);
    useEffect(()=>{
        dispatch(getStudentExam({type:localStorage.getItem('type'),id:localStorage.getItem('id')}))
    },[dispatch])

    const exam  = useSelector((state) => state.examReducer);
    console.log(exam)

    if(exam && !examList){
        setExamList(Array.from(new Set(exam.exams.map(obj => obj.examName))));
    }

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

    const handleTimeFormat = (time1) => {
        const date = new Date();
        date.setHours(parseInt(time1.split(":")[0]));
        date.setMinutes(parseInt(time1.split(":")[1]));
        date.setSeconds(0);
        date.setMilliseconds(0);
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const userLocale = navigator.language || navigator.userLanguage;
        const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(date);
        return formattedDate
    }

    const duration = (start,end) => {
        const sdate = new Date();
        const edate = new Date();
        sdate.setHours(parseInt(start.split(":")[0]));
        sdate.setMinutes(parseInt(start.split(":")[1]));
        sdate.setSeconds(0);
        sdate.setMilliseconds(0);
        edate.setHours(parseInt(end.split(":")[0]));
        edate.setMinutes(parseInt(end.split(":")[1]));
        edate.setSeconds(0);
        edate.setMilliseconds(0);
        return (edate.getTime() - sdate.getTime())/(1000*60)

    }

    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Examination Schedule</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <br />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Subject Name</th>
                                <th>Exam Date</th>
                                <th>Exam Time</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {examList ? examList.map((examName)=>(
                                <>
                                <tr>
                                    <td style={{backgroundColor:"lightgray"}} colSpan={5} align='center'>{examName}</td>
                                </tr>
                                {
                                exam.exams.filter((item) => item.examName === examName).map((item,index)=>(
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.subject}</td>
                                        <td>{handleDateFormat(item.date)}</td>
                                        <td>{handleTimeFormat(item.startTime)} to {handleTimeFormat(item.endTime)}</td>
                                        <td>{duration(item.startTime,item.endTime)} min</td>

                                    </tr>
                                ))
                                }
                                </>
                            ))
                            :
                            <tr>
                                <td style={{ textAlign: "center" }} colSpan={5}>No Data</td>
                            </tr>
                            
                            }
                        </tbody>
                    </Table>

                </div>
            </div>
        </div>
    )
}

export default Student