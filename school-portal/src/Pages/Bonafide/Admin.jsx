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

    const handleView = (studentID,bonafideID) =>{
        const stu = allStudents.docs.filter((item)=>item._id===studentID)
        const bon = allBonafides.bonafides.filter((item)=>item._id===bonafideID)
        navigate('/ViewBonafide',{state:{student:stu,bonafide:bon}})
    }
    
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>Bonafide Applications</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <br/>
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
                            allBonafides.bonafides.map((bonafide,index) => (
                            allStudents && allStudents.docs.filter((item)=>item._id===bonafide.student).map((student)=>(
                            <tr>
                                <td>{index+1}</td>
                                <td>{student.firstName+" "+student.lastName}</td>
                                <td>{student.standard+" "+student.section}</td>
                                <td>{bonafide.service}</td>
                                <td>{bonafide.postedOn}</td>
                                <td>{bonafide.requestedFile!==null ? <>Uploaded</>  : <>Not Uploaded</> }</td>
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
    )
}

export default AdminBonafide