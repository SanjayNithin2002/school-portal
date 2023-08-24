import React, { useEffect, useState } from "react"
import { Header } from 'rsuite';
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import "./Leave.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeave } from "../../actions/leave";
import Table from "react-bootstrap/Table";
import ViewLeave from "./ViewLeave"

function UpdateLeave() {

    const dispatch = useDispatch();
    const [display,setDisplay] = useState(false);
    const [leaveID,setLeaveID] = useState('');

    useEffect(() => {
        dispatch(getAllLeave({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])

    const leave = useSelector((state) => state.allLeaveReducer)
    console.log(leave)

    const countDays = (start,end) => {
        const sdate = new Date(start);
        const edate = new Date(end);
        return ((edate.getTime()-sdate.getTime())/(1000*60*60*24)+1);
    }

    const close = () => {
        setDisplay(false);
    }

    return (
        <div className="Main">
        <div className="Home">
            {!display ?
            <div style={{padding:"20px 40px"}} class="container1 container rounded bg-white">
                    <Header>
                        <h2>Leave Request</h2>
                        <hr style={{ border: "1px solid gray" }} />
                    </Header>
                    <br /><br />
                    <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="cols-lg-10 table-responsive">
                            <Table className="UpdateLeave-content-table">
                                <tr>
                                    <th>S.No</th>
                                    <th>Staff Name</th>
                                    <th>Staff ID</th>
                                    <th>Leave Type</th>
                                    <th>No of Days</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                    {
                                        leave && leave.docs.length>0 ? 
                                        leave.docs.map((item,index)=>(
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{item[item.user]}</td>
                                                <td>{item[item.user]}</td>
                                                <td>{item.type==="sickLeave" ? "Medical Leave" : item.type==="earnedLeave" ? "EL" : "CL"}</td>
                                                <td>{countDays(item.startDate,item.endDate)}</td>
                                                <td><span style={{color:item.status==="Pending" ? "orange" : item.status==="Approved" ? "Green" : "Red"}}>{item.status}</span></td>
                                                <td>
                                                    <button onClick={()=>{setLeaveID(item._id);setDisplay(true);}} className="btn btn-primary">View</button>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td colSpan={9}>No Data</td>
                                        </tr>
                                    }
                            </Table>
                        </div>
                    </div>
                </div>
                :
                <ViewLeave close={()=>close()} leave={leave} leaveID={leaveID} />
                }
            </div>
        </div>
    )
}

export default UpdateLeave;