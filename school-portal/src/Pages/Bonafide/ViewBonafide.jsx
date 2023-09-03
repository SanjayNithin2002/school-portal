import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table"
import { DatePicker, Stack } from 'rsuite'

import "./Bonafide.css"
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteBonafide, postBonafideFile,rejectBonafide,viewBonafide } from '../../actions/bonafide'
const ViewBonafide = () => {

    const [data, setData] = useState(true)
    const [message,setMessage] = useState(null);
    const [selectedFile,setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [student, setStudent] = useState([])
    const [bonafide, setBonafide] = useState([])

    if (location.state && data) {
        setStudent(location.state.student);
        setBonafide(location.state.bonafide);
        setData(false)
    }
    console.log(location.state)
    console.log(student);
    console.log(bonafide);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (selectedFile) {
        const formData = new FormData();
        formData.append('bonafide', selectedFile, selectedFile.name);
        formData.append('status', "Approved");
        formData.append('message', message ? message : "No Message");
        console.log(formData);
        dispatch(postBonafideFile(bonafide[0]._id,formData,navigate))
      }
      else{
        alert('error')
      }
    };

    const handleFile = (request) =>{
        dispatch(viewBonafide(request));
    }

    const handleReject = () =>{
        if(message){
            dispatch(rejectBonafide({status:"Rejected",message},bonafide[0]._id))
        }
        else{
            alert("Message box is to be filled while rejecting the bonafide request");
        }
    }

    const handleDelete = () =>{
            dispatch(deleteBonafide(bonafide[0]._id))
    }

    return (
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
                                student.length !== 0 && bonafide.length !== 0 &&
                                bonafide.map((item) => (
                                    <Table className='AddStudent-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td>Student Profile</td>
                                                <td><button className='btn btn-primary'>View</button></td>
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
                                            item.status==="Pending" ?
                                            <>
                                            <tr>
                                                <td>Upload Certificate</td>
                                                <td><input name="bonafide" type="file" onChange={(e)=>handleFileChange(e)} /></td>
                                            </tr>
                                            <tr>
                                                <td>Message<br/><span style={{fontSize:"14px",fontWeight:"600"}}>(To reject this request, reason should be filed in the message box)</span></td>
                                                <td><textarea value={message} onChange={(e)=>setMessage(e.target.value)} rows={4} cols={30}></textarea></td>
                                            </tr>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2}>
                                                    <button className='btn btn-success' type="submit">Submit</button>
                                                    &emsp;
                                                    <button className='btn btn-danger' onClick={()=>handleReject()} type="button">Reject</button>
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
                                                   {item.requestedFile!==null ? <button type="button" className='btn btn-primary' onClick={()=>handleFile(item.requestedFile)}>View</button>
                                                   :
                                                   <>No File</>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} style={{textAlign:"center"}}>
                                                    <button className='btn btn-danger' onClick={()=>handleDelete()} type="button">Delete</button>
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
    )
}

export default ViewBonafide
