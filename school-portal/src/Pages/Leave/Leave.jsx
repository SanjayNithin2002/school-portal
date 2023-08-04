import React, { useEffect, useState } from "react"
import { Popover, Whisper, Button, Header } from 'rsuite';
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import "./Leave.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";
import { deleteLeave, getLeave, postLeave } from "../../actions/leave";
import Table from "react-bootstrap/Table"
function Leave() {

    const dispatch = useDispatch();
    const [reason, setReason] = useState('');
    const [type, setType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        dispatch(setCurrentUser({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(getLeave({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])

    const currentUser = useSelector((state) => state.currentUserReducer)
    const leave = useSelector((state) => state.userLeaveReducer)
    console.log(currentUser);
    console.log(leave)

    const handleSubmit = () => {
        if (localStorage.getItem('type') === "teacher") {
            dispatch(postLeave({
                user: "teacher",
                teacher: currentUser.docs._id,
                startDate,
                endDate,
                type,
                reason
            }))
        }
    }

    const handleDelete = (leaveID) => {
        dispatch(deleteLeave({
            user:localStorage.getItem('type'),
            id:leaveID
        }))
    }

    const DefaultPopover = React.forwardRef(({ ...props }, ref) => {
        return (
            currentUser &&
            <Popover ref={ref} title="Leave Status" {...props}>
                <hr style={{ position: "relative", top: "-20px", borderTop: "2px solid black" }} />
                <table style={{ position: "relative", top: "-30px" }}>
                    <tr>
                        <th>CL</th>
                        <th>&ensp;:&ensp;</th>
                        <td>Remaining {currentUser.docs.casualLeave} Leaves</td>
                    </tr>
                    <tr>
                        <th>EL</th>
                        <th>&ensp;:&ensp;</th>
                        <td>Remaining {currentUser.docs.earnedLeave} Leaves</td>
                    </tr>
                    <tr>
                        <th>Medical</th>
                        <th>&ensp;:&ensp;</th>
                        <td>Remaining {currentUser.docs.sickLeave} Leaves</td>
                    </tr>
                </table>
            </Popover>
        );
    });
    return (
        <div className="Main">
            <div className="Home">
                <div style={{padding:"20px 40px"}} class="container1 container rounded bg-white">
                    <Header>
                        <h2>Leave Request</h2>
                        <hr style={{ border: "1px solid gray" }} />
                    </Header>
                    <br /><br />
                    <div className="Leave-Container">
                    <div className="row Leave-Container-1">
                        <div className="col-lg-2 col-md-5 col-sm-6 col-xs-6">
                            <h3>Reason</h3>
                        </div>
                        <div className="col-lg-4 col-md-7 col-sm-6 col-xs-6">
                            <input value={reason} onChange={(e) => setReason(e.target.value)} type="text" name="reason" />
                        </div>
                        <div className="col-lg-2 col-md-5 col-sm-6 col-xs-6">
                            <h3>Type</h3>
                        </div>
                        <div className="col-lg-4 col-md-7 col-sm-6 col-xs-6">
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value='' disabled>Select Type</option>
                                <option value="casualLeave">CL</option>
                                <option value="earnedLeave">EL</option>
                                <option value="sickLeave">Medical Leave</option>
                            </select>
                            &emsp;
                            <Whisper placement="auto" controlId="control-id-hover-enterable" trigger="hover" speaker={<DefaultPopover />} enterable>
                                <Button appearance="subtle"><FontAwesomeIcon style={{ fontSize: "20px", cursor: "pointer" }} icon={solid.faExclamationCircle} /></Button>
                            </Whisper>

                        </div>
                    </div>
                    <br />
                    <div className="row Leave-Container-1">
                        <div className="col-lg-2 col-md-5 col-sm-6 col-xs-6">
                            <h3>Start Date</h3>
                        </div>
                        <div className="col-lg-4 col-md-7 col-sm-6 col-xs-6">
                            <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" name="start" />
                        </div>
                        <div className="col-lg-2 col-md-5 col-sm-6 col-xs-6">
                            <h3>End Date</h3>
                        </div>
                        <div className="col-lg-4 col-md-7 col-sm-6 col-xs-6">
                            <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" name="end" />
                        </div>
                    </div>
                    <br />
                    <div className="row Leave-Container-1">
                        <div className="col-lg-6"></div>
                        <div style={{ textAlign: "center" }} className="col-lg-1">
                            <button onClick={() => handleSubmit()} className="btn btn-primary">Apply</button>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>History</h2>
                            <br />
                            <div className="table-responsive">
                                <Table className='Leave-content-table'>
                                    <tr>
                                        <th>Sno</th>
                                        <th>Applied Date</th>
                                        <th>Reason</th>
                                        <th>Type</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    {
                                        leave && leave.docs.length > 0 ?
                                            leave.docs.map((item, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>-</td>
                                                    <td>{item.reason}</td>
                                                    <td>{item.type === "sickLeave" ? "Medical Leave" : item.type === "earnedLeave" ? "EL" : "CL"}</td>
                                                    <td>{item.startDate}</td>
                                                    <td>{item.endDate}</td>
                                                    <td>{item.status}</td>
                                                    <td><button onClick={()=>handleDelete(item._id)} style={{backgroundColor:"#DC3545"}} className="btn btn-danger">Delete</button></td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td style={{ textAlign: "center", fontSize: "20px" }} colSpan={7}>No Data</td>
                                            </tr>
                                    }

                                </Table>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leave;