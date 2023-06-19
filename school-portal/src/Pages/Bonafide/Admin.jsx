import React, { useEffect } from 'react'
import Table from "react-bootstrap/Table"
import { DatePicker, Stack } from 'rsuite'

import "./Bonafide.css"
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllBonafide } from '../../actions/bonafide'
import { requestStudents } from '../../actions/students'

function AdminBonafide() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getAllBonafide());
        dispatch(requestStudents());
    },[dispatch])

    const allBonafides = useSelector((state)=>state.bonafideReducer)
    const allStudents = useSelector((state)=>state.allStudentsReducer) 
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];


    const handleView = (studentID,bonafideID) =>{
        const stu = allStudents.docs.filter((item)=>item._id===studentID)
        const bon = allBonafides.bonafides.filter((item)=>item._id===bonafideID)
        navigate('/ViewBonafide',{state:{student:stu,bonafide:bon}})
    }

    const handleDateFormat = (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const userLocale = navigator.language || navigator.userLanguage;
        const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(date);
        return formattedDate
    }
    
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>Bonafide Applications</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <br/>
                    <div className='table-responsive'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Student Name</th>
                                <th>Class</th>
                                <th>Bonafide Service</th>
                                <th>Requested On</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            (!allBonafides || allBonafides.bonafides.length===0) ? 
                            <tr>
                                <td style={{ textAlign: "center" }} colSpan={7}>No Data</td>
                            </tr> 
                            : 
                            allBonafides.bonafides.sort((a, b) => a.postedOn > b.postedOn ? -1 : 1 ).map((bonafide,index) => (
                            allStudents && allStudents.docs.filter((item)=>item._id===bonafide.student).map((student)=>(
                            <tr>
                                <td>{index+1}</td>
                                <td>{student.firstName+" "+student.lastName}</td>
                                <td>{standardList[student.standard-1].label+" "+student.section}</td>
                                <td>{bonafide.service}</td>
                                <td>{handleDateFormat(new Date(bonafide.postedOn))}</td>
                                <td>{bonafide.status}</td>
                                <td><button className='btn btn-primary' onClick={()=>handleView(student._id,bonafide._id)}>View</button></td>
                            </tr>
                            ))
                            ))
                            }
                            
                        </tbody>
                    </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminBonafide