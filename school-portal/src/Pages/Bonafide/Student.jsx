import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table"
import { DatePicker, Stack } from 'rsuite'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import "./Bonafide.css"
import { requestBonafide } from '../../actions/bonafide';
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { setCurrentUser } from '../../actions/currentUser';

function Student() {
    const [Passport, setPassport] = useState({description:""});
    const [busPass, setBusPass] = useState({description:""});
    const [NCC, setNCC] = useState({description:""});
    const [visa, setVisa] = useState({description:"",fromDate:"",toDate:"",place:""});
    const [incomeTax, setIncomeTax] = useState({description:"",employee:""});
    const [certificate, setCertificate] = React.useState('select');
    const data = ['Passport', 'Visa', 'BusPass', 'Income Tax', 'NCC Bonafide'].map(
        item => ({ label: item, value: item })
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state=>state.currentUserReducer);
    console.log(localStorage.getItem('type'),localStorage.getItem('id'));
    useEffect(()=>{
        dispatch(setCurrentUser({type:localStorage.getItem('type'),id:localStorage.getItem('id')}));
    },[dispatch])
    console.log(currentUser);

    const handleSubmit = () =>{
        if(currentUser)
        var req = {
            student:currentUser.docs._id,
        };
        if(certificate==="Passport"){
            req.service='passport';
            req.passport=Passport;
        }
        else if(certificate==="Visa"){
            req.service='visa';
            req.visa=visa;
        }
        else if(certificate==="Income Tax"){
            req.service='incomeTax';
            req.incomeTax=incomeTax;
        }
        else if(certificate==="BusPass"){
            req.service='buspass';
            req.buspass=busPass;
        }
        else if(certificate==="NCC Bonafide"){
            req.service='NCCBonafide';
            req.NCCBonafide=NCC;
        }
        dispatch(requestBonafide(req,navigate));
    }

    const handleFromDate = date => {
        let from = new Date(date)
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        const paddedDay = day < 10 ? `0${day}` : day;
        const paddedMonth = month < 10 ? `0${month}` : month;
        setVisa((prev)=>({...prev,fromDate:`${paddedDay}/${paddedMonth}/${year}`}));
    }
    const handleToDate = date => {
        let from = new Date(date)
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        const paddedDay = day < 10 ? `0${day}` : day;
        const paddedMonth = month < 10 ? `0${month}` : month;
        setVisa((prev)=>({...prev,toDate:`${paddedDay}/${paddedMonth}/${year}`}));
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
                                                        <select value={incomeTax.employee} onChange={(e) => setIncomeTax((prev) => ({...prev,employee:e.target.value}))} className="selectPicker1" required>
                                                            <option value='' disabled>Select one option</option>
                                                            <option value='Father'>Father</option>
                                                            <option value='Mother'>Mother</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                    <td><textarea value={incomeTax.description} onChange={(e) => setIncomeTax((prev) => ({...prev,description:e.target.value}))}  rows="5" cols="60" ></textarea></td>
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
                                                            <input value={visa.place} onChange={(e)=>setVisa((prev)=>({...prev,place:e.target.value}))} type="text" className="selectPicker1"/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                        <td><textarea value={visa.description} onChange={(e)=>setVisa((prev)=>({...prev,description:e.target.value}))} rows="5" cols="60" ></textarea></td>
                                                    </tr>
                                                </>
                                            }
                                            {
                                                certificate === "Passport" && 
                                                <tr>
                                                    <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                    <td><textarea value={Passport.description} onChange={(e)=>setPassport((prev)=>({...prev,description:e.target.value}))} rows="5" cols="60" ></textarea></td>
                                                </tr>
                                            }
                                            {
                                                certificate === "BusPass" && 
                                                <tr>
                                                    <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                    <td><textarea value={busPass.description} onChange={(e)=>setBusPass((prev)=>({...prev,description:e.target.value}))} rows="5" cols="60" ></textarea></td>
                                                </tr>
                                            }
                                            {
                                                certificate === "NCC Bonafide" && 
                                                <tr>
                                                    <td>Description (about certificate which you are applying..)<span style={{ color: "red" }}>*</span></td>
                                                    <td><textarea value={NCC.description} onChange={(e)=>setNCC((prev)=>({...prev,description:e.target.value}))} rows="5" cols="60" ></textarea></td>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Student