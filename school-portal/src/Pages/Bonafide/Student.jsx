import React, { useEffect, useState, useRef } from 'react'
import Table from "react-bootstrap/Table"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion'

import "./Bonafide.css"
import { requestBonafide, viewBonafide } from '../../actions/bonafide';
import { setCurrentUser } from '../../actions/currentUser';
import { StudentBonafide } from "../../actions/bonafide";
import { DatePicker, Input, SelectPicker } from 'rsuite';
import {Notification,useToaster} from 'rsuite';

function Student({status,onLoading}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const [fetchStatus,setFetchStatus] = useState(true);
    const selectPickerRef = useRef(null);
    const [Passport, setPassport] = useState({ description: "" });
    const [busPass, setBusPass] = useState({ description: "" });
    const [NCC, setNCC] = useState({ description: "" });
    const [tc, setTc] = useState({ description: "" });
    const [visa, setVisa] = useState({ description: "", fromDate: null, toDate: "", place: "" });
    const [incomeTax, setIncomeTax] = useState({ description: "", employee: "" });
    const [certificate, setCertificate] = React.useState(null);
    const data = ['Passport', 'Visa', 'BusPass', 'Income Tax', 'NCC Bonafide', 'TC'].map(
        item => ({ label: item, value: item })
    );

    useEffect(() => {
        if(fetchStatus){
            onLoading(true);
            dispatch(setCurrentUser("/Bonafide",navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }));
            dispatch(StudentBonafide("/Bonafide",navigate));
        }
    }, [dispatch,navigate,fetchStatus])

    const currentUser = useSelector(state => state.currentUserReducer);
    const bonafide = useSelector(state => state.bonafideReducer);

    useEffect(()=>{
        if(currentUser!==null && bonafide!==null){
            onLoading(false);
        }
    },[currentUser,bonafide])

    const handleScroll = () => {
        if (selectPickerRef.current) {
            selectPickerRef.current.close(); // Assuming a close() method is available for SelectPicker
        }
    };  

    console.log(bonafide)
    console.log(certificate)

    useEffect(()=>{
        if (location.state) {
            if (location.state.message === "success") {
                setPassport({ description: "" });
                setBusPass({ description: "" });
                setNCC({ description: "" });
                setTc({ description: "" });
                setVisa({ description: "", fromDate: "", toDate: "", place: "" });
                setIncomeTax({ description: "", employee: "" });
                setCertificate(null);
                onLoading(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                      Your request has been sent to the Admin.
                    </Notification>
                );
                toaster.push(message, {placement:'topCenter'})
                navigate('/Bonafide',{state:null});
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
                navigate('/Bonafide',{state:null});
            }
        }
    },[location.state,toaster,navigate])
    

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
        dispatch(requestBonafide("/Bonafide",navigate,req));
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

    const formatDateToString = (date) => {
        console.log(date instanceof Date)
        if (date instanceof Date) {
            console.log(date.toISOString());
          return date.toISOString().split('T')[0];
        }
        return '';
      };

    const handleFile = (request) => {
        dispatch(viewBonafide(request));
    }
    console.log(visa);
    return (
        <div className='Main' onScroll={()=>handleScroll()}>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Bonafide Application</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div style={{ width: "100%" }} className='container bonafide-content AddStudent-container'>
                        <div style={{ minWidth: "500px" }}>
                            <div className='row bonafide-content-1'>
                                <div className='col-lg-3 col-md-4 col-sm-5'>
                                    <h4>Select Service : </h4>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-5'>
                                    <SelectPicker ref={selectPickerRef} style={{width:"100%"}} data={data.map((item) => ({label:item.value,value:item.value}))} value={certificate} onChange={(value) => setCertificate(value)} />
                                </div>
                            </div>

                            <div className='bonafide-content-2'>
                                <br /><br />
                                {certificate !== null &&
                                    <div className='table-responsive'>
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
                                                                <SelectPicker ref={selectPickerRef} style={{width:"100%"}} data={[{label:"Father",value:"Father"},{label:"Mother",value:"Mother"}]} value={incomeTax.employee} onChange={(value) => setIncomeTax((prev) => ({ ...prev, employee: value }))}  />
                                                                
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                            <td>
                                                                <Input as="textarea" value={incomeTax.description} onChange={(value) => setIncomeTax((prev) => ({ ...prev, description: value }))} rows="5" cols="60" />
                                                            </td>
                                                        </tr>
                                                    </>
                                                }
                                                {
                                                    certificate === "Visa" && <>
                                                        <tr>
                                                            <td>From Date{visa.fromDate}<span style={{ color: "red" }}>*</span></td>
                                                            <td>
                                                                <input type="date" value={visa.fromDate} onChange={(e) => setVisa((prev) => ({ ...prev, fromDate: e.target.value }))} />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>To Date<span style={{ color: "red" }}>*</span></td>
                                                            <td>
                                                                <input type="date" value={visa.toDate} onChange={(e) => setVisa((prev) => ({ ...prev, toDate: e.target.value }))} />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Enter Visa Place<span style={{ color: "red" }}>*</span></td>
                                                            <td>
                                                                <Input value={visa.place} onChange={(value) => setVisa((prev) => ({ ...prev, place: value }))} type="text" style={{width:"60%"}} />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                            <td>
                                                                <Input as="textarea" value={visa.description} onChange={(value) => setVisa((prev) => ({ ...prev, description: value }))} rows="5" cols="60" />
                                                            </td>
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
                                    </div>
                                }
                            </div>

                            <div className='bonafide-content-2'>
                                <div className='col-lg-12'>
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header style={{ padding: "initial" }}>Requested Bonafide Certificate</Accordion.Header>
                                            <Accordion.Body>
                                                <div className='table-responsive'>
                                                    <Table className='Bonafide-content-table'>
                                                        <thead>
                                                            <tr>
                                                                <th>S.No.</th>
                                                                <th>Bonafide Service</th>
                                                                <th>Posted Date</th>
                                                                <th>Status</th>
                                                                <th>Message</th>
                                                                <th>Certificate</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(!bonafide || bonafide.docs.length === 0) ?
                                                                <tr>
                                                                    <td style={{ textAlign: "center" }} colSpan={6}>No Data</td>
                                                                </tr>
                                                                :
                                                                bonafide.docs.sort((a, b) => a.postedOn > b.postedOn ? -1 : 1).map((item, index) => (
                                                                    <tr>
                                                                        <td>{index + 1}</td>
                                                                        <td>{item.service}</td>
                                                                        <td>{item.postedOn && handleDateFormat(new Date(item.postedOn))}</td>
                                                                        <td>{item.status}</td>
                                                                        <td>{item.message ? item.message : "No Message"}</td>
                                                                        <td>
                                                                            {
                                                                                item.requestedFile === null ? <span>no File</span> : <button type="button" className='btn btn-primary' onClick={() => handleFile(item.requestedFile)}>Download</button>
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Student

