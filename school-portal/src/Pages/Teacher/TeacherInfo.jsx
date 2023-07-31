import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from "react-redux"

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { requestAdmins } from '../../actions/admins'
import { requestTeachers } from '../../actions/teachers'

function TeacherInfo() {

    const [search, setSearch] = useState('');
    const [records, setRecords] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestAdmins());
        dispatch(requestTeachers());
    }, [dispatch])

    const allTeachers = useSelector((state) => state.teacherReducer);
    const allAdmins = useSelector((state) => state.adminReducer);

    if (allTeachers && allAdmins && records.length === 0) {
        let temp = [];
        allTeachers.docs.map((item) => {
            temp.push(item);
            return true;
        });
        allAdmins.docs.map((item) => {
            temp.push(item);
            return true;
        })
        setRecords(temp);
    }

    return (
        <div className="Main">
            <div className="Home">
                <div style={{padding:"20px 40px"}} class="container1 container rounded bg-white">
                    <h2>Staff Info</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='studentinfo-container'>
                        <div className='row' style={{ alignItems: "center" }}>
                            <div className='col-lg-3'><h5>Search by Staff Name/ID&ensp;:&ensp;</h5></div>
                            <div className='col-lg-9'><input value={search} onChange={(e) => setSearch(e.target.value)} type="search" className='selectPicker2' /></div>
                        </div>
                        <br /><br />
                        <div className='row' style={{ justifyContent: "center" }}>
                            <div className='col-lg-10'>
                                <Table striped className='tablestyle4'>
                                    <thead>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Staff ID</th>
                                        <th>Designation</th>
                                        <th>Action</th>
                                    </thead>
                                    <tbody>
                                        {
                                            search === '' ?
                                                <tr>
                                                    <td align='center' colSpan={6}>
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
                                                                <td><button className='btn btn-primary'>View</button></td>
                                                            </tr>
                                                        ))
                                                        :
                                                        <tr>
                                                            <td align='center' colSpan={6}>
                                                                No Data
                                                            </td>
                                                        </tr>
                                                }
                                                </>
                                        }

                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TeacherInfo