import React, { useEffect, useState } from 'react'
import { Checkbox, Dropdown } from 'rsuite';
import Table from "react-bootstrap/Table"
import "./Bonafide.css"
import { useDispatch, useSelector } from 'react-redux'
import { getAllBonafide } from '../../actions/bonafide'
import { requestStudents } from '../../actions/students'
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons"

function AdminBonafide({ status, onLoading }) {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [filter, setFilter] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(true);

    useEffect(() => {
        if (fetchStatus) {
            onLoading(true);
            dispatch(getAllBonafide("/Bonafide", navigate));
        }
    }, [dispatch])

    const allBonafides = useSelector((state) => state.bonafideReducer)
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

    console.log(allBonafides)

    useEffect(() => {
        if (allBonafides) {
            let temp = Array.from(new Set(allBonafides.docs.map((l) => l.status))).map((l) => ({ label: l, value: l }))
            setFilterItems(temp);
            onLoading(false);
        }
    }, [allBonafides])

    useEffect(() => {
        if (location.state && fetchStatus) {
            if (location.state.status === 200) {
                navigate('/Bonafide', { state: null });
                onLoading(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                        {location.state.message}
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
            }
            else if (location.state.status) {
                onLoading(false);
                setFetchStatus(false);
                const message = (
                    <Notification type="error" header="error" closable>
                        Error Code: {location.state.status},<br />{location.state.message}
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
                navigate('/Bonafide', { state: null });
            }
        }
    }, [location.state])

    const handleView = (bonafideID) => {
        const bon = allBonafides.docs.filter((item) => item._id === bonafideID)
        navigate('/ViewBonafide', { state: { bonafide: bon } })
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

    return (
        <div className='Main'>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div className="row justify-content-between">
                        <h2 className="col-xl-11 col-lg-10 col-md-10 col-sm-9">Bonafide Applications</h2>
                        <div className="col-xl-1 col-lg-2 col-md-2 col-sm-3">
                            <Dropdown className="custome-filter" placement="bottom-end" title="Filter" multiple onSelect={handleSelect}>
                                {filterItems.map((item) => (
                                    <Dropdown.Item eventKey={item.value}>
                                        <Checkbox checked={filter.includes(item.value)}>
                                            {item.label}
                                        </Checkbox>
                                    </Dropdown.Item>
                                ))}
                                <Dropdown.Item style={{ textAlign: "center" }} eventKey={"Clear"}> <FontAwesomeIcon icon={solid.faTimes} />&emsp;Clear</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>

                    <hr style={{ border: "1px solid gray" }} />
                    <br />
                    <div className='table-responsive'>
                        <Table className='AdminBonafide-content-table'>
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
                                    (!allBonafides || allBonafides.docs.length === 0) ?
                                        <tr>
                                            <td style={{ textAlign: "center" }} colSpan={7}>No Data</td>
                                        </tr>
                                        :
                                        allBonafides.docs.sort((a, b) => a.postedOn > b.postedOn ? -1 : 1).map((bonafide, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{bonafide.student.firstName + " " + bonafide.student.lastName}</td>
                                                <td>{standardList[bonafide.student.standard - 1].label + " " + bonafide.student.section}</td>
                                                <td>{bonafide.service}</td>
                                                <td>{handleDateFormat(new Date(bonafide.postedOn))}</td>
                                                <td>{bonafide.status}</td>
                                                <td><button className='btn btn-primary' onClick={() => handleView(bonafide._id)}>View</button></td>
                                            </tr>
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