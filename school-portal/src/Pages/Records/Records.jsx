import React, { useState, useEffect } from 'react'
import { Input } from 'rsuite';
import Table from "react-bootstrap/Table"
import Accordion from 'react-bootstrap/Accordion'
import "./Records.css"
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Notification, useToaster } from 'rsuite';
import { deleteRecords, getRecords, postRecords } from '../../actions/records';
import { viewFile } from '../../actions/bonafide';
const Records = ({ status, onLoading }) => {

    const [title, setTitle] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const [fetchStatus, setFetchStatus] = useState(true);

    useEffect(() => {
        if (fetchStatus) {
            onLoading(true)
            dispatch(getRecords("/Records", navigate))
        }
    }, [fetchStatus, navigate, dispatch])

    const records = useSelector((state) => state.recordsReducer);
    console.log(records)

    useEffect(() => {
        if (records) {
            onLoading(false);
        }
    }, [records])

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        if (location.state && fetchStatus) {
            if (location.state.status === 200) {
                setTitle(null);
                setSelectedFile(null)
                onLoading(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                        {location.state.message}
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
                navigate('/Records', { state: null });
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
                navigate('/Records', { state: null });
            }
        }
    }, [location.state, toaster, navigate])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile && title) {
            const formData = new FormData();
            if (selectedFile) {
                formData.append('document', selectedFile, selectedFile.name);
            }
            formData.append('title', title);
            formData.append('date', new Date());
            console.log(formData);
            onLoading(true);
            dispatch(postRecords("/Records", navigate, formData))
        }
        else {
            const message = (
                <Notification type="warning" header="Warning" closable>
                    Kindly fill all the details.
                </Notification>
            );
            toaster.push(message, { placement: 'topCenter' })
        }
    };

    if(records && records.docs.length>0){
        records.docs.map((rec,index)=>{
            console.log(rec)
        });
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
    
    const handleFile = (request) => {
        dispatch(viewFile(request));
    }

    const handleDelete = (deleteID) => {
        onLoading(true);
        dispatch(deleteRecords("/Records",navigate,deleteID));
    }

    return (
        <div className='Main'>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Records</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <form encType='multipart/form-data' onSubmit={(e) => handleSubmit(e)}>
                        <div className='row'>
                            <div className='col-lg-8 justify-content-center table-responsive'>
                                <Table className='AddStudent-Table-List'>
                                    <tbody>
                                        <tr>
                                            <td>Title</td>
                                            <td><Input value={title} onChange={(value) => setTitle(value)} /></td>
                                        </tr>
                                        <tr>
                                            <td>Document</td>
                                            <td><input name="document" type="file" onChange={(e) => handleFileChange(e)} /></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} style={{ textAlign: "right" }}>
                                                <button className='btn btn-success' type="submit">Submit</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </form>
                    <br />
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header style={{ padding: "initial" }}>Records Document</Accordion.Header>
                            <Accordion.Body>
                                <div className='table-responsive'>
                                <Table className='StudentList-content-table'>
                                    <tr>
                                        <th>Sno No</th>
                                        <th>Title</th>
                                        <th>PostedOn</th>
                                        <th>Document</th>
                                        <th>Action</th>
                                    </tr>
                                    {
                                        records && records.docs.length>0 &&
                                        records.docs.map((rec,index) =>(
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{rec.title}</td>
                                                <td>{handleDateFormat(new Date(rec.date))}</td>
                                                <td><button type="button" className='btn btn-primary btn-sm' onClick={() => handleFile(rec.document)}>View</button></td>
                                                <td><button className='btn btn-danger btn-sm' onClick={() => handleDelete(rec._id)} type="button">Delete</button></td>
                                            </tr>
                                        ))
                                    }
                                </Table>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>

    )
}

export default Records
