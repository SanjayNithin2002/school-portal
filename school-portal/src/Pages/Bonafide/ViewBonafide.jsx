import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table"
import "./Bonafide.css"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Notification, useToaster } from 'rsuite';
import { deleteBonafide, postBonafideFile, rejectBonafide, viewFile } from '../../actions/bonafide'
import ViewStudent from '../Profile/ViewStudent'
const ViewBonafide = ({status,onLoading}) => {

    const [message, setMessage] = useState(null);
    const [display,setDisplay] = useState(true);
    const [studentID,setStudentID] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();

    const [bonafide, setBonafide] = useState([])

    useEffect(() => {
        if (location.state) {
            setBonafide(location.state.bonafide);
        }
    }, [location.state])

    useEffect(()=>{
        if(!location.state && bonafide.length===0){
            navigate('/Bonafide');
        }
    },[location.state,bonafide])

    console.log(location.state)
    console.log(bonafide);

    useEffect(()=>{
        if (location.state) {
            if(location.state.status){
                onLoading(false);
                const message = (
                    <Notification type="error" header="error" closable>
                      Error Code: {location.state.status},<br/>{location.state.message}
                    </Notification>
                );
                toaster.push(message, {placement:'topCenter'})
                navigate('/ViewBonafide',{state:null});
            }
        }
    },[location.state,toaster,navigate])

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile || (!selectedFile && message)) {
            const formData = new FormData();
            if(selectedFile){
                formData.append('bonafide', selectedFile, selectedFile.name);
            }
            formData.append('status', "Approved");
            formData.append('message', message ? message : "No Message");
            console.log(formData);
            onLoading(true);
            dispatch(postBonafideFile("/Bonafide",navigate,bonafide[0]._id, formData))
        }
        else {
            const message = (
                <Notification type="warning" header="Warning" closable>
                    Upload the certificate or mention the message for approving. 
                </Notification>
            );
            toaster.push(message, {placement:'topCenter'})
        }
    };

    const handleFile = (request) => {
        dispatch(viewFile(request));
    }

    const handleReject = () => {
        if (message) {
            onLoading(true);
            dispatch(rejectBonafide("/Bonafide",navigate,{ status: "Rejected", message }, bonafide[0]._id))
        }
        else {
            const message = (
                <Notification type="warning" header="Warning" closable>
                    Message box is to be filled while rejecting the bonafide request.
                </Notification>
            );
            toaster.push(message, {placement:'topCenter'})
        }
    }

    const handleDelete = () => {
        onLoading(true);
        dispatch(deleteBonafide("/Bonafide",navigate,bonafide[0]._id))
    }

    return (
        display ?
        <div className='Main'>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>View Bonafide Info</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <br />
                    <br />
                    <form encType='multipart/form-data' onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-lg-8 justify-content-center table-responsive'>
                                {
                                    bonafide.length !== 0 &&
                                    bonafide.map((item) => (
                                        <Table className='AddStudent-Table-List'>
                                            <tbody>
                                                <tr>
                                                    <td>Student Profile</td>
                                                    <td><button className='btn btn-primary' onClick={()=>{setStudentID(item._id);setDisplay(false);}}>View</button></td>
                                                </tr>
                                                <tr>
                                                    <td>Bonafide Service</td>
                                                    <td>{item.service}</td>
                                                </tr>
                                                {
                                                    item.service === "incomeTax" && <>
                                                        <tr>
                                                            <td>Employee</td>
                                                            <td>{item.incomeTax.employee}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Description</td>
                                                            <td>{item.incomeTax.description}</td>
                                                        </tr>
                                                    </>
                                                }
                                                {
                                                    item.service === "visa" && <>
                                                        <tr>
                                                            <td>From Date</td>
                                                            <td>{item.visa.fromDate}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>To Date</td>
                                                            <td>{item.visa.toDate}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Visa Place</td>
                                                            <td>{item.visa.place}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Description</td>
                                                            <td>{item.visa.description}</td>
                                                        </tr>
                                                    </>
                                                }
                                                {
                                                    item.service === "passport" &&
                                                    <tr>
                                                        <td>Description</td>
                                                        <td>{item.passport.description}</td>
                                                    </tr>
                                                }
                                                {
                                                    item.service === "buspass" &&
                                                    <tr>
                                                        <td>Description</td>
                                                        <td>{item.buspass.description}</td>
                                                    </tr>
                                                }
                                                {
                                                    item.service === "NCCBonafide" &&
                                                    <tr>
                                                        <td>Description</td>
                                                        <td>{item.NCCBonafide.description}</td>
                                                    </tr>
                                                }
                                                {
                                                    item.service === "tc" &&
                                                    <tr>
                                                        <td>Description</td>
                                                        <td>{item.tc.description}</td>
                                                    </tr>
                                                }
                                                {
                                                    item.status === "Pending" ?
                                                        <>
                                                            <tr>
                                                                <td>Upload Certificate</td>
                                                                <td><input name="bonafide" type="file" onChange={(e) => handleFileChange(e)} /></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Message<br /><span style={{ fontSize: "14px", fontWeight: "600" }}>(To reject this request, reason should be filed in the message box)</span></td>
                                                                <td><textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} cols={30}></textarea></td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ textAlign: "center" }} colSpan={2}>
                                                                    <button className='btn btn-success' type="submit">Submit</button>
                                                                    &emsp;
                                                                    <button className='btn btn-danger' onClick={() => handleReject()} type="button">Reject</button>
                                                                </td>
                                                            </tr>
                                                        </>
                                                        :
                                                        <>
                                                            <tr>
                                                                <td>Posted Message</td>
                                                                <td>{item.message ? item.message : "No Message"}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>View Certificate</td>
                                                                <td>
                                                                    {item.requestedFile !== null ? <button type="button" className='btn btn-primary' onClick={() => handleFile(item.requestedFile)}>View</button>
                                                                        :
                                                                        <>No File</>
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={2} style={{ textAlign: "center" }}>
                                                                    <button className='btn btn-danger' onClick={() => handleDelete()} type="button">Delete</button>
                                                                </td>
                                                            </tr>
                                                        </>
                                                }
                                            </tbody>
                                        </Table>
                                    ))}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        :
        <ViewStudent id={studentID} onLoading={(status1)=>onLoading(status1)} status={status} close={()=>setDisplay(true)} />

    )
}

export default ViewBonafide
