import React, { useState,useEffect } from 'react'
import { Accordion } from 'react-bootstrap';

import "./Fees.css"
import { Checkbox, Dropdown } from 'rsuite';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from "@fortawesome/free-solid-svg-icons"
import * as regular from "@fortawesome/free-regular-svg-icons"
import { Input, Notification, SelectPicker, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { deleteFees, getFees, postFees, updateFees } from '../../actions/fees';

const Admin = ({status,onLoading}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [feesID,setFeesID] = useState(null)
    const [request,setRequest] = useState({standard:"",due:"",description:"",amount:0});
    const [showPostFees,setShowPostFees] = useState(false);
    const [showEditFees,setShowEditFees] = useState(false);
    const [fetchStatus,setFetchStatus] = useState(true);
    const [buttonType, setButtonType] = useState("feesStructure");

    useEffect(() => {
        if(fetchStatus){
            onLoading(true);
            dispatch(getFees("/payment",navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        }
    }, [dispatch,navigate,fetchStatus])

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];
    const fees = useSelector((state) => state.feesReducer)
    console.log(fees);

    useEffect(()=>{
        if(fees){
            onLoading(false);
        }
    },[fees])

    useEffect(()=>{
        if (location.state && fetchStatus) {
            if (location.state.status === 200) {
                handleClose();
                onLoading(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                      {location.state.message}
                    </Notification>
                );
                toaster.push(message, {placement:'topCenter'})
                navigate('/payment',{state:null});
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
                navigate('/payment',{state:null});
            }
        }
    },[location.state,toaster,navigate])

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
        var desiredDate = new Date(day1);
        let date = desiredDate.getDate() < 10 ? "0" + desiredDate.getDate() : desiredDate.getDate();
        let month = desiredDate.getMonth() < 10 ? "0" + (desiredDate.getMonth() + 1) : (desiredDate.getMonth() + 1);
        return desiredDate.getFullYear() + "-" + month + "-" + date ;
    }

    const handleShowPost = () => {
        setRequest({standard:"",due:"",description:"",amount:0});
        setShowPostFees(true);
    }

    const handleShowEdit = (feeID) => {
        fees.docs.filter((fee)=>fee._id===feeID).map((fee)=>{
            setRequest({standard:fee.standard,due:getDates(fee.due),description:fee.description,amount:fee.amount});
        })
        setFeesID(feeID)
        setShowEditFees(true);
    }

    const handleClose = () =>{
        setShowPostFees(false);
        setShowEditFees(false);
        setRequest({standard:"",due:"",description:"",amount:0});
    }

    const handleSubmit = () => {
        onLoading(true);
        dispatch(postFees("/payment",navigate,request))
    }

    const handleDelete = (deleteID) => {
        onLoading(true);
        dispatch(deleteFees("/payment",navigate,deleteID))
    }

    const handleUpdate = () => {
        onLoading(true);
        let req = [];
        req.push({
            propName:"due",
            value:request.due,
        })
        console.log({id:feesID,data:req})
        dispatch(updateFees("/payment",navigate,{id:feesID,data:req}));
    }

    console.log(request)

    return (
        <div className='Main'>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h2>Fees Structure</h2>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='Profile-Container-2-1'>
                        <div className='Profile-tab'>
                            <div className="Profile-tab-1 ">
                                <button onClick={() => setButtonType("feesStructure")} className={buttonType === "feesStructure" ? "btn btn-primary" : "btn btn-outline-primary"}>Fees Structure</button>&ensp;
                                <button onClick={() => setButtonType("payment")} className={buttonType === "payment" ? "btn btn-primary" : "btn btn-outline-primary"}>Payment Details</button>&ensp;
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xl-8 col-lg-10 table-responsive'>
                            <Table style={{minWidth:"500px"}} className='Bonafide-content-table'>
                                <tr>
                                    <th>S No</th>
                                    <th>Standard</th>
                                    <th>Term</th>
                                    <th>Fees</th>
                                    <th>Due Date</th>
                                    <th>Action</th>
                                </tr>
                                {
                                    fees && fees.docs.length>0 &&
                                    fees.docs.map((fee,index)=>(
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{standardList[fee.standard-1].label}</td>
                                            <td>{fee.description}</td>
                                            <td>{fee.amount}</td>
                                            <td>{fee.due ? handleDateFormat(fee.due) : "-"}</td>
                                            <td>
                                                <span onClick={()=>handleShowEdit(fee._id)}><FontAwesomeIcon icon={solid.faPencil}/></span> / 
                                                <span onClick={()=>handleDelete(fee._id)} ><FontAwesomeIcon icon={regular.faTrashAlt}/></span>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <th colSpan={6} style={{textAlign:"right"}}>
                                        <button className='btn btn-primary btn-sm' onClick={()=>handleShowPost()}>
                                            <FontAwesomeIcon icon={solid.faPlus} /> Add
                                        </button>
                                    </th>
                                </tr>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showPostFees} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Fees</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='table-responsive'>
                    <table className='fees-post'>
                        <tr>
                            <th>Standard</th>
                            <td>:</td>
                            <td><SelectPicker data={standardList} value={request.standard} onChange={(value)=>setRequest((prev)=>({...prev,standard:value}))} /></td>
                        </tr>
                        <tr>
                            <th>Term</th>
                            <td>:</td>
                            <td><SelectPicker value={request.description} onChange={(value)=>setRequest((prev)=>({...prev,description:value}))} data={[{label:"Term-1",value:"Term-1"},{label:"Term-2",value:"Term-2"}]} /></td>
                        </tr>
                        <tr>
                            <th>Due Date</th>
                            <td>:</td>
                            <td><input type="date" value={request.due} onChange={(e)=>setRequest((prev)=>({...prev,due:e.target.value}))} /></td>
                        </tr>
                        <tr>
                            <th>Amount</th>
                            <td>:</td>
                            <td><Input type="number" value={request.amount} onChange={(value)=>setRequest((prev)=>({...prev,amount:value}))} /></td>
                        </tr>
                    </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => handleSubmit()}>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditFees} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Fees</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='table-responsive'>
                    <table className='fees-post'>
                        <tr>
                            <th>Standard</th>
                            <td>:</td>
                            <td>{request.standard}</td>
                        </tr>
                        <tr>
                            <th>Term</th>
                            <td>:</td>
                            <td>{request.description}</td>
                        </tr>
                        <tr>
                            <th>Amount</th>
                            <td>:</td>
                            <td>{request.amount}</td>
                        </tr>
                        <tr>
                            <th>Due Date</th>
                            <td>:</td>
                            <td><input type="date" value={request.due} onChange={(e)=>setRequest((prev)=>({...prev,due:e.target.value}))} /></td>
                        </tr>
                    </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => handleUpdate()}>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Admin
