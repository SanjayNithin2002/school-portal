import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'

import "./Student.css"
import { requestStudents } from '../../actions/students'
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"
import Student from '../Profile/Student'
import ViewStudent from '../Profile/ViewStudent'

function StudentInfo({ status, onLoading }) {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const [display,setDisplay] = useState(true);
    const [studentID,setStudentID] = useState('');
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const [fetchStatus, setFetchStatus] = useState(true);

    useEffect(() => {
        if (fetchStatus) {
            onLoading(true);
            dispatch(requestStudents("/StudentInfo", navigate));
        }
    }, [dispatch, fetchStatus])

    const allStudents = useSelector((state) => state.allStudentsReducer)

    useEffect(() => {
        if (allStudents) {
            onLoading(false);
        }
    }, [allStudents])

    useEffect(() => {
        if (location.state && fetchStatus) {
            if (location.state.status === 200) {
                onLoading(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                      {location.state.message}
                    </Notification>
                );
                toaster.push(message, {placement:'topCenter'})
                navigate('/StudentInfo',{state:null});
            }
            else{
                onLoading(false);
                setFetchStatus(false);
                const message = (
                    <Notification type="error" header="error" closable>
                      Error Code: {location.state.status},<br/>{location.state.message}
                    </Notification>
                );
                toaster.push(message, {placement:'topCenter'})
                navigate('/StudentInfo',{state:null});
            }
        }
    }, [location.state,toaster])

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }]

    console.log(allStudents);

    return (
        display ? 
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Student Info</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='studentinfo-container'>
                        <div className='row' style={{ alignItems: "center" }}>
                            <div className='col-xl-3 col-lg-5 col-md-5 col-sm-6 col-xs-6'><h5>Search by Student Name&ensp;:&ensp;</h5></div>
                            <div className='col-xl-9 col-lg-7 col-md-7 col-sm-6 col-xs-6'><input value={search} onChange={(e) => setSearch(e.target.value)} type="search" className='selectPicker2' /></div>
                        </div>
                        <br /><br />
                        <div className='row' style={{ justifyContent: "center" }}>
                            <div className='col-lg-10'>
                                <div className='table-responsive'>
                                    <Table className='StudentInfo-content-table'>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Name</th>
                                            <th>Gender</th>
                                            <th>Stardard</th>
                                            <th>Section</th>
                                            <th>Action</th>
                                        </tr>
                                        {
                                            search === '' ?
                                                <tr>
                                                    <td style={{ textAlign: "center" }} colSpan={6}>
                                                        No Data
                                                    </td>
                                                </tr> : <>{
                                                    allStudents && allStudents.docs.filter((item) => (item.firstName.toLowerCase() + " " + item.lastName.toLowerCase()).includes(search.toLowerCase())).map((item, i) => (
                                                        <tr key={item}>
                                                            <td>{i + 1}</td>
                                                            <td>{item.firstName.toLowerCase() + " " + item.lastName.toLowerCase()}</td>
                                                            <td>{item.gender}</td>
                                                            <td>
                                                                {
                                                                    standardList.filter((standard) => standard.value === item.standard).map((standard) => (<>{standard.label}</>))}
                                                            </td>
                                                            <td>{item.section}</td>
                                                            <td><button onClick={()=>{setStudentID(item._id);setDisplay(false);}} className='btn btn-primary'>View</button></td>
                                                        </tr>
                                                    ))}
                                                </>
                                        }
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :
        <ViewStudent id={studentID} onLoading={(status1)=>onLoading(status1)} status={status} close={()=>setDisplay(true)} />

    )
}

export default StudentInfo