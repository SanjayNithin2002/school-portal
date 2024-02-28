import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import "./Teacher.css"
import { useDispatch, useSelector } from 'react-redux';
import { getClass } from '../../actions/class';
import {Notification,useToaster} from 'rsuite';
import { useLocation, useNavigate } from "react-router-dom"

function Teacher({status,onLoading}) {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [fetchStatus,setFetchStatus] = useState(true);
    const [teacherList, setTeacherList] = useState(null);
    useEffect(() => {
        if(fetchStatus){
            onLoading(true);
            dispatch(getClass("/Teachers",navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        }
    }, [dispatch,onLoading,fetchStatus,navigate])

    useEffect(()=>{
        if(location.state){
            onLoading(false);
            setFetchStatus(false);
            const message = (
                <Notification type="error" header="error" closable>
                  Error Code: {location.state.status},<br/>{location.state.message}
                </Notification>
            );
            toaster.push(message, {placement:'topCenter'})
            navigate('/Teachers',{state:null});
        }
      },[location.state,navigate,toaster,onLoading])

    const class1 = useSelector((state) => state.allClassReducer);
    console.log(class1);
    console.log(teacherList);
    useEffect(()=>{
        if (class1!==null) {
            let id = "";
            let teachers = [];
            class1.docs.filter((item) => item.subject === "Class Teacher" && item.teacher!==null).map((item) => {
                id = item.teacher._id;
                return true;
            })
            if (class1.docs.filter((item) => item.teacher !== null && (item.teacher._id === id || id==="") && item.subject !== "Class Teacher").length === 0) {
                let empID, name, email
                class1.docs.filter((item) => item.teacher !== null && item.teacher._id === id && item.subject === "Class Teacher").map((item) => {
                    empID = item.teacher.empID
                    name = item.teacher.firstName + " " + item.teacher.lastName
                    email = item.teacher.email
                    return true;
                })
                teachers.push({
                    subject: "Class Teacher",
                    empID,
                    name,
                    email,
                })
            }
            class1.docs.filter((item) => item.teacher !== null && item.subject !== "Class Teacher").map((item) => {
                teachers.push({
                    subject: item.teacher._id === id ? "Class Teacher$" + item.subject : item.subject,
                    empID: item.teacher.empID,
                    name: item.teacher.firstName + " " + item.teacher.lastName,
                    email: item.teacher.email,
                })
                return true;
            })
            setTeacherList(teachers);
            onLoading(false);
        }
    },[class1,onLoading])

    return (
        <div className='Main'>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Teachers</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    {
                        teacherList && teacherList.length > 0 ?
                            teacherList.map((item) => (
                                <div className='table-responsive'>
                                <Table bordered className='tablestyle1'>
                                    <tbody>
                                        {console.log(item.subject.split("$")[0])}
                                        {
                                            item.subject.split("$")[0] === "Class Teacher" ?
                                                <tr>
                                                    <td style={{ backgroundColor: "#9bd4e4", textAlign: "center", fontWeight: "600", fontSize: "18px" }} colSpan={3}>Class Teacher</td>
                                                </tr>
                                                :
                                                <></>
                                        }
                                        <tr>
                                            <th style={{ width: "30%" }}>Name</th>
                                            <td style={{ width: "40%" }}>{item.name}</td>
                                        </tr>
                                        <tr>
                                            <th>EMP ID</th>
                                            <td>{item.empID}</td>
                                        </tr>
                                        <tr>
                                            <th>{item.subject === "Class Teacher" ? "Role" : "Subject"}</th>
                                            <td>
                                                {
                                                    item.subject === "Class Teacher" ? "Class Teacher" :
                                                        item.subject.split("$")[0] === "Class Teacher" ? item.subject.split("$")[1] : item.subject
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Email ID</th>
                                            <td>{item.email}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                </div>
                            ))
                            :
                            <div className='row' style={{ justifyContent: 'center' }}>
                                <div className='col-lg-10' style={{ backgroundColor: "rgb(155, 212, 228)", padding:"5px", fontSize:"18px", fontWeight:"bolder", justifyContent: "center", display: "flex" }}>
                                    No Data
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default Teacher
