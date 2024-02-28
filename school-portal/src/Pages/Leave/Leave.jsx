import React, { useEffect, useState } from "react"
import { Popover, Whisper, Button, Header, SelectPicker, Input, DatePicker } from 'rsuite';
import "./Leave.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";
import { deleteLeave, getLeave, postLeave } from "../../actions/leave";
import Table from "react-bootstrap/Table"
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"

function Leave({status,onLoading}) {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [reason, setReason] = useState('');
    const [type, setType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [fetchStatus,setFetchStatus] = useState(true);
    const leaveData = [{label:"CL",value:"casualLeave"},{label:"EL",value:"earnedLeave"},{label:"Medical",value:"sickLeave"}]

    useEffect(() => {
        if(fetchStatus){
            onLoading(true);
            dispatch(setCurrentUser("/Leave",navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
            dispatch(getLeave("/Leave",navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        }
    }, [dispatch,navigate,fetchStatus])

    const currentUser = useSelector((state) => state.currentUserReducer)
    const leave = useSelector((state) => state.userLeaveReducer)
    console.log(currentUser);
    console.log(leave)

    useEffect(()=>{
        if(currentUser && leave){
            onLoading(false);
        }
    },[currentUser,leave])

    console.log(location.state);
    useEffect(()=>{
        if (location.state) {
            console.log(location.state);
            if (location.state.status === 200) {
                setReason("");
                setType("")
                setStartDate("")
                setEndDate("")
                onLoading(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                      {location.state.message}
                    </Notification>
                );
                toaster.push(message, {placement:'topCenter'})
                navigate('/Leave',{state:null});
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
                navigate('/Leave',{state:null});
            }
        }
    },[location.state,toaster,navigate])

    const checkDate = (ExistStartDate,ExistEndDate,NewStartDate,NewEndDate) => {
        let es = new Date(ExistStartDate);
        let ed = new Date(ExistEndDate);
        let ns = new Date(NewStartDate);
        let nd = new Date(NewEndDate);
        if(es.getTime()-ns.getTime()<0 && es.getTime()-nd.getTime()<0 && ed.getTime()-ns.getTime()<0 && ed.getTime()-nd.getTime()<0){
            return false;
        } 
        else if(es.getTime()-ns.getTime()>0 && es.getTime()-nd.getTime()>0 && ed.getTime()-ns.getTime()>0 && ed.getTime()-nd.getTime()>0){
            return false;
        }
        else  
            return true;
    }

    const handleSubmit = () => {
        if(startDate && endDate && type && reason && leave.docs.filter((lev)=>checkDate(lev.startDate,lev.endDate,startDate,endDate)).length==0)
        {         
            if (localStorage.getItem('type') === "teacher") {
                onLoading(true);
                console.log({
                    user: "teacher",
                    teacher: currentUser.docs._id,
                    startDate,
                    endDate,
                    type,
                    reason
                })
                dispatch(postLeave(navigate,{
                    user: "teacher",
                    teacher: currentUser.docs._id,
                    startDate,
                    endDate,
                    type,
                    reason
                }))
            }
            else{
                onLoading(true);
                console.log({
                    user: "admin",
                    admin: currentUser.docs._id,
                    startDate,
                    endDate,
                    type,
                    reason
                })
                dispatch(postLeave(navigate,{
                    user: "admin",
                    admin: currentUser.docs._id,
                    startDate,
                    endDate,
                    type,
                    reason
                }))
            }
        }
        else if(leave.docs.filter((lev)=>checkDate(lev.startDate,lev.endDate,startDate,endDate)).length!=0){
            const message = (
                <Notification type="warning" header="Warning" closable>
                    Already Leave Request is Exist in the Same Date.
                </Notification>
            );
            toaster.push(message, {placement:'topCenter'})
        }
        else{
            const message = (
                <Notification type="warning" header="Warning" closable>
                  Kindly fill all the data
                </Notification>
            );
            toaster.push(message, {placement:'topCenter'})
        }
    }

    const handleDelete = (leaveID) => {
        onLoading(true);
        dispatch(deleteLeave("/Leave",navigate,{user:localStorage.getItem('type'),id:leaveID}));
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

    const getDates = (day1) => {
        if (day1 === null)
            return null;
        var desiredDate = new Date(day1);
        let date = desiredDate.getDate() < 10 ? "0" + desiredDate.getDate() : desiredDate.getDate();
        let month = desiredDate.getMonth() < 10 ? "0" + (desiredDate.getMonth() + 1) : (desiredDate.getMonth() + 1);
        return desiredDate.getFullYear() + "-" + month + "-" + date;
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

    const minDate = (date) =>{
        let min_date = new Date(startDate);
        min_date.setHours(0,0,0,0);
        return date <= min_date;
    }

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
                            <Input value={reason} onChange={(value) => setReason(value)} type="text" name="reason" />
                        </div>
                        <div className="col-lg-2 col-md-5 col-sm-6 col-xs-6">
                            <h3>Type</h3>
                        </div>
                        <div className="col-lg-4 col-md-7 col-sm-6 col-xs-6">
                            <SelectPicker searchable={false} value={type} data={leaveData} onChange={(value) => setType(value)} placeholder="Select the type"/>
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
                            <DatePicker oneTap onChange={(value) => setStartDate(getDates(value))} value={startDate ? new Date(startDate) : null} placement='auto'  />
                        </div>
                        <div className="col-lg-2 col-md-5 col-sm-6 col-xs-6">
                            <h3>End Date</h3>
                        </div>
                        <div className="col-lg-4 col-md-7 col-sm-6 col-xs-6">
                            <DatePicker shouldDisableDate={minDate} oneTap onChange={(value) => setEndDate(getDates(value))} value={endDate ? new Date(endDate) : null} placement='auto'  />
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
                                <Table className='UpdateLeave-content-table'>
                                    <tr>
                                        <th>Sno</th>
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
                                                    <td style={{minWidth:"200px"}}>{item.reason}</td>
                                                    <td>{item.type === "sickLeave" ? "Medical Leave" : item.type === "earnedLeave" ? "EL" : "CL"}</td>
                                                    <td>{handleDateFormat(item.startDate)}</td>
                                                    <td>{handleDateFormat(item.endDate)}</td>
                                                    <td>{item.status}</td>
                                                    <td><button onClick={()=>handleDelete(item._id)} style={{backgroundColor:"#DC3545"}} className="btn btn-danger">Delete</button></td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td style={{ textAlign: "center", fontSize: "20px" }} colSpan={8}>No Data</td>
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