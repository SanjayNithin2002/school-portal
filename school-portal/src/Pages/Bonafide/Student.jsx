import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table"
import { DatePicker, Stack } from 'rsuite'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'

import "./Bonafide.css"
import { requestBonafide,viewBonafide } from '../../actions/bonafide';
import SideNavBar from '../../components/SideNavBar/SideNavBar';
import { setCurrentUser } from '../../actions/currentUser';
import { StudentBonafide } from "../../actions/bonafide";

function Student() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [Passport, setPassport] = useState({ description: "" });
    const [busPass, setBusPass] = useState({ description: "" });
    const [NCC, setNCC] = useState({ description: "" });
    const [tc, setTc] = useState({ description: "" });
    const [visa, setVisa] = useState({ description: "", fromDate: "", toDate: "", place: "" });
    const [incomeTax, setIncomeTax] = useState({ description: "", employee: "" });
    const [certificate, setCertificate] = React.useState('select');
    const data = ['Passport', 'Visa', 'BusPass', 'Income Tax', 'NCC Bonafide', 'TC'].map(
        item => ({ label: item, value: item })
    );

    useEffect(() => {
        dispatch(setCurrentUser({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }));
        dispatch(StudentBonafide(navigate));
    }, [dispatch])

    const currentUser = useSelector(state => state.currentUserReducer);
    const bonafide = useSelector(state => state.bonafideReducer);

    console.log(bonafide)
    console.log(location)

    if(location.state && certificate!=='select'){
        if(location.state.message==="success"){
            setPassport({ description: "" });
            setBusPass({ description: "" });
            setNCC({ description: "" });
            setTc({ description: "" });
            setVisa({ description: "", fromDate: "", toDate: "", place: "" });
            setIncomeTax({ description: "", employee: "" });
            setCertificate('select');
            navigate('/Bonafide');
        }
    }

    const handleSubmit = () => {
        if (currentUser)
            var req = {
                student: currentUser.docs._id,
            };
        if (certificate === "Passport") {
            req.service = 'passport';
            req.passport = Passport;
        }
        else if (certificate === "Visa") {
            req.service = 'visa';
            req.visa = visa;
        }
        else if (certificate === "Income Tax") {
            req.service = 'incomeTax';
            req.incomeTax = incomeTax;
        }
        else if (certificate === "BusPass") {
            req.service = 'buspass';
            req.buspass = busPass;
        }
        else if (certificate === "NCC Bonafide") {
            req.service = 'NCCBonafide';
            req.NCCBonafide = NCC;
        }
        else if (certificate === "TC") {
            req.service = 'tc';
            req.tc = tc;
        }
        dispatch(requestBonafide(req, navigate));
    }

    const handleFromDate = date => {
        let from = new Date(date)
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const paddedDay = day < 10 ? `0${day}` : day;
        const paddedMonth = month < 10 ? `0${month}` : month;
        setVisa((prev) => ({ ...prev, fromDate: `${paddedDay}/${paddedMonth}/${year}` }));
    }
    const handleToDate = date => {
        let from = new Date(date)
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const paddedDay = day < 10 ? `0${day}` : day;
        const paddedMonth = month < 10 ? `0${month}` : month;
        setVisa((prev) => ({ ...prev, toDate: `${paddedDay}/${paddedMonth}/${year}` }));
    }

    const handleFile = (request) =>{
        dispatch(viewBonafide(request));
    }

    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>Bonafide Application</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='bonafide-content'>
                        <div className='row bonafide-content-1'>
                            <div className='col-lg-3'>
                                <h4>Select Service : </h4>
                            </div>
                            <div className='col-lg-4'>
                                <select value={certificate} className="selectPicker" onChange={(e) => setCertificate(e.target.value)} required>
                                    <option value='select' disabled>Select Service</option>
                                    {
                                        data.map((item) => (
                                            <option value={item.value}>{item.value}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='bonafide-content-2'>
                            <br /><br />
                            {certificate !== 'select' &&
                                <Table className='tablestyle3'>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'center' }} colSpan={2}>Bonafide Application(All fields are mandatory)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            certificate === "Income Tax" && <>
                                                <tr>
                                                    <td>Who is Employee<span style={{ color: "red" }}>*</span></td>
                                                    <td>
                                                        <select value={incomeTax.employee} onChange={(e) => setIncomeTax((prev) => ({ ...prev, employee: e.target.value }))} className="selectPicker1" required>
                                                            <option value='' disabled>Select one option</option>
                                                            <option value='Father'>Father</option>
                                                            <option value='Mother'>Mother</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                    <td><textarea value={incomeTax.description} onChange={(e) => setIncomeTax((prev) => ({ ...prev, description: e.target.value }))} rows="5" cols="60" ></textarea></td>
                                                </tr>
                                            </>
                                        }
                                        {
                                            certificate === "Visa" && <>
                                                <tr>
                                                    <td>From Date{visa.fromDate}<span style={{ color: "red" }}>*</span></td>
                                                    <td>
                                                        <Stack direction="column" alignItems="flex-start" spacing={6}>
                                                            <DatePicker defaultValue={visa.fromDate} onChange={handleFromDate} editable={false} />
                                                        </Stack>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>To Date<span style={{ color: "red" }}>*</span></td>
                                                    <td>
                                                        <Stack direction="column" alignItems="flex-start" spacing={6}>
                                                            <DatePicker defaultValue={visa.toDate} onChange={handleToDate} editable={false} />
                                                        </Stack>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Enter Visa Place<span style={{ color: "red" }}>*</span></td>
                                                    <td>
                                                        <input value={visa.place} onChange={(e) => setVisa((prev) => ({ ...prev, place: e.target.value }))} type="text" className="selectPicker1" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                    <td><textarea value={visa.description} onChange={(e) => setVisa((prev) => ({ ...prev, description: e.target.value }))} rows="5" cols="60" ></textarea></td>
                                                </tr>
                                            </>
                                        }
                                        {
                                            certificate === "Passport" &&
                                            <tr>
                                                <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                <td><textarea value={Passport.description} onChange={(e) => setPassport((prev) => ({ ...prev, description: e.target.value }))} rows="5" cols="60" ></textarea></td>
                                            </tr>
                                        }
                                        {
                                            certificate === "BusPass" &&
                                            <tr>
                                                <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                <td><textarea value={busPass.description} onChange={(e) => setBusPass((prev) => ({ ...prev, description: e.target.value }))} rows="5" cols="60" ></textarea></td>
                                            </tr>
                                        }
                                        {
                                            certificate === "NCC Bonafide" &&
                                            <tr>
                                                <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                <td><textarea value={NCC.description} onChange={(e) => setNCC((prev) => ({ ...prev, description: e.target.value }))} rows="5" cols="60" ></textarea></td>
                                            </tr>
                                        }
                                        {
                                            certificate === "TC" &&
                                            <tr>
                                                <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                <td><textarea value={tc.description} onChange={(e) => setTc((prev) => ({ ...prev, description: e.target.value }))} rows="5" cols="60" ></textarea></td>
                                            </tr>
                                        }
                                        <tr>
                                            <td style={{ textAlign: "center" }} colSpan={2}>
                                                <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            }
                        </div>
                        <div className='bonafide-content-2'>
                            <div className='col-lg-12'>
                            <Accordion style={{width:"100%"}} defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header style={{ padding: "initial" }}>Requested Bonafide Certificate</Accordion.Header>
                                    <Accordion.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>Bonafide Service</th>
                                                    <th>Posted Date</th>
                                                    <th>Status</th>
                                                    <th>Certificate</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { (!bonafide || bonafide.bonafides.length===0) ?
                                                <tr>
                                                    <td style={{ textAlign: "center" }} colSpan={6}>No Data</td>
                                                </tr>  
                                                :
                                                bonafide.bonafides.map((item,index)=>(
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{item.service}</td>
                                                    <td>-</td>
                                                    <td>
                                                        {
                                                            item.requestedFile===null ? <span style={{color:"orange"}}>Pending</span> : <span style={{color:"green"}}>Approved</span>
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            item.requestedFile===null ? <span>no File</span> : <button type="button" className='btn btn-primary' onClick={()=>handleFile(item.requestedFile)}>Download</button>
                                                        }
                                                    </td>
                                                </tr>  
                                                ))
                                                }
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Student