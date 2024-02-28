import React, { useEffect, useState } from "react"
import { Checkbox, Dropdown, Header } from 'rsuite';
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import "./Leave.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeave } from "../../actions/leave";
import Table from "react-bootstrap/Table";
import ViewLeave from "./ViewLeave"
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons"

function UpdateLeave({ status, onLoading }) {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [filter, setFilter] = useState([]);
    const [display, setDisplay] = useState(false);
    const [leaveID, setLeaveID] = useState('');
    const [fetchStatus, setFetchStatus] = useState(true);
    const [filterItems,setFilterItems] = useState([]);

    useEffect(() => {
        if (fetchStatus) {
            onLoading(true);
            dispatch(getAllLeave("/PostLeave", navigate))
        }
    }, [dispatch, fetchStatus, navigate])

    const leave = useSelector((state) => state.allLeaveReducer)
    console.log(leave)

    useEffect(() => {
        if (leave) {
            let temp = Array.from(new Set(leave.docs.map((l)=>l.status))).map((l)=>({label:l,value:l}))
            setFilterItems(temp);
            onLoading(false);
        }
    }, [leave])

    useEffect(() => {
        if (location.state && fetchStatus) {
            if (location.state.status === 200) {
                onLoading(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                        {location.state.message}
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
                navigate('/PostLeave', { state: null });
            }
            else {
                onLoading(false);
                setFetchStatus(false);
                const message = (
                    <Notification type="error" header="error" closable>
                        Error Code: {location.state.status},<br />{location.state.message}
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
                navigate('/PostLeave', { state: null });
            }
        }
    }, [location.state, toaster, navigate])

    const countDays = (start, end) => {
        const sdate = new Date(start);
        const edate = new Date(end);
        return ((edate.getTime() - sdate.getTime()) / (1000 * 60 * 60 * 24) + 1);
    }

    const close = () => {
        setDisplay(false);
    }

    const handleSelect = (itemValue) => {
        console.log(itemValue)
        if (itemValue==="Clear") {
            setFilter([])
        }
        else {
            if (filter.includes(itemValue)) 
                setFilter(filter.filter((value) => value !== itemValue));
            else
                setFilter([...filter, itemValue]);
        }
    };

    const handleFilter = (item) => {
        if (filter.length > 0)
            return filter.includes(item.status)
        else
            return true
    }
    console.log(filter)

    return (
        <div className="Main">
            <div className="Home">
                {!display ?
                    <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                        <Header>
                            <div className="row justify-content-between">
                                <h2 className="col-xl-11 col-lg-10 col-md-10 col-sm-9">Leave Request</h2>
                                <div className="col-xl-1 col-lg-2 col-md-2 col-sm-3">
                                    <Dropdown className="custome-filter" placement="bottom-end" title="Filter" multiple onSelect={handleSelect}>
                                        {filterItems.map((item) => (
                                            <Dropdown.Item eventKey={item.value}>
                                                <Checkbox checked={filter.includes(item.value)}>
                                                    {item.label}
                                                </Checkbox>
                                            </Dropdown.Item>
                                        ))}
                                        <Dropdown.Item style={{textAlign:"center"}} eventKey={"Clear"}> <FontAwesomeIcon icon={solid.faTimes} />&emsp;Clear</Dropdown.Item>
                                    </Dropdown>
                                </div>
                            </div>

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
                                        leave && leave.docs.filter((item) => handleFilter(item)).length > 0 ?
                                            leave.docs.filter((item) => handleFilter(item)).map((item, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item[item.user].firstName + " " + item[item.user].lastName}</td>
                                                    <td>{item[item.user].empID}</td>
                                                    <td>{item.type === "sickLeave" ? "Medical Leave" : item.type === "earnedLeave" ? "EL" : "CL"}</td>
                                                    <td>{countDays(item.startDate, item.endDate)}</td>
                                                    <td><span style={{ color: item.status === "Pending" ? "orange" : item.status === "Approved" ? "Green" : "Red" }}>{item.status}</span></td>
                                                    <td>
                                                        <button onClick={() => { setLeaveID(item._id); setDisplay(true); }} className="btn btn-primary">View</button>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td style={{ textAlign: "center" }} colSpan={9}>No Data</td>
                                            </tr>
                                    }
                                </Table>
                            </div>
                        </div>
                    </div>
                    :
                    <ViewLeave onLoading={(status1) => onLoading(status1)} close={() => close()} leave={leave} leaveID={leaveID} />
                }
            </div>
        </div>
    )
}

export default UpdateLeave;