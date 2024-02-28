import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from "react-redux"
import { requestAdmins } from '../../actions/admins'
import { requestTeachers } from '../../actions/teachers'
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"
import ViewTeacher from '../Profile/ViewTeacher'

function TeacherInfo({ status, onLoading }) {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const [search, setSearch] = useState('');
    const [records, setRecords] = useState([]);
    const [display, setDisplay] = useState(true);
    const [userID, setUserID] = useState('');
    const [userType, setUserType] = useState('');
    const dispatch = useDispatch();
    const [fetchStatus, setFetchStatus] = useState(true);

    useEffect(() => {
        if (fetchStatus) {
            onLoading(true);
            dispatch(requestAdmins("/StaffInfo", navigate));
            dispatch(requestTeachers("/StaffInfo", navigate));
        }
    }, [dispatch, fetchStatus])

    const allTeachers = useSelector((state) => state.teacherReducer);
    const allAdmins = useSelector((state) => state.adminReducer);

    useEffect(() => {
        if (allTeachers && allAdmins) {
            let temp = [];
            allTeachers.docs.map((item) => {
                let item1=item;
                item1.type="teacher";
                temp.push(item1);
                return true;
            });
            allAdmins.docs.map((item) => {
                let item1=item;
                item1.type="admin";
                temp.push(item1);
                return true;
            })
            setRecords(temp);
            onLoading(false);
        }
    }, [allTeachers, allAdmins])

    useEffect(() => {
        if (location.state && fetchStatus) {
            navigate('/StaffInfo', { state: null });
            onLoading(false);
            setFetchStatus(false);
            const message = (
                <Notification type="error" header="error" closable>
                    Error Code: {location.state.status},<br />{location.state.message}
                </Notification>
            );
            toaster.push(message, { placement: 'topCenter' })
        }
    }, [location.state, toaster])

    console.log(records);

    return (
        display ?
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Staff Info</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='StaffInfo-container'>
                        <div className='row' style={{ alignItems: "center" }}>
                            <div className='col-xl-3 col-lg-5 col-md-5 col-sm-6'><h5>Search by Staff Name/ID&ensp;:&ensp;</h5></div>
                            <div className='col-xl-9 col-lg-7 col-md-7 col-sm-6'><input value={search} onChange={(e) => setSearch(e.target.value)} type="search" className='selectPicker2' /></div>
                        </div>
                        <br /><br />
                        <div className='row' style={{ justifyContent: "center" }}>
                            <div className='col-lg-10 table-responsive'>
                                <Table className='TeacherInfo-content-table'>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Staff ID</th>
                                        <th>Designation</th>
                                        <th>Action</th>
                                    </tr>
                                    {
                                        search === '' ?
                                            <tr>
                                                <td style={{ textAlign: "center" }} colSpan={6}>
                                                    No Data
                                                </td>
                                            </tr> : <>{
                                                records.filter((item) => { return ((item.firstName.toLowerCase() + " " + item.lastName.toLowerCase()).includes(search.toLowerCase()) || item.empID.toLowerCase().includes(search.toLowerCase())) }).length !== 0 ?
                                                    records.filter((item) => { return ((item.firstName.toLowerCase() + " " + item.lastName.toLowerCase()).includes(search.toLowerCase()) || item.empID.toLowerCase().includes(search.toLowerCase())) }).map((item, i) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{item.firstName + " " + item.lastName}</td>
                                                            <td>{item.empID}</td>
                                                            <td>{item.designation}</td>
                                                            <td><button onClick={()=>{setUserID(item._id);setUserType(item.type);setDisplay(false);}} className='btn btn-primary'>View</button></td>
                                                        </tr>
                                                    ))
                                                    :
                                                    <tr>
                                                        <td style={{ textAlign: "center" }} colSpan={6}>
                                                            No Data
                                                        </td>
                                                    </tr>
                                            }
                                            </>
                                    }
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :
        <ViewTeacher type={userType} location1="/StaffInfo" id={userID} onLoading={(status1)=>onLoading(status1)} status={status} close={()=>setDisplay(true)} />
    );
}

export default TeacherInfo