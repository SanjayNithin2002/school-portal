import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import Table from "react-bootstrap/Table"
import { Stack,Divider } from 'rsuite'
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Spotlight.css"
import { useDispatch } from 'react-redux'
import { postSpotlight } from '../../actions/spotlight'

const Spotlight = ({status,onLoading}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [users,setUser] = useState('All Students & Staffs')

    const handleTitle = (value) => {
        if(value.length>=100){
            const message = (
                <Notification type="warning" header="Warning" closable>
                  Title can't exceed 100 letters
                </Notification>
            );
            toaster.push(message, {placement:'topCenter'})
        }
        else{
            setTitle(value);
        }
    }

    const handleClear = () =>{
        setContent('');
        setTitle('');
        setUser('');
    }

    useEffect(()=>{
        if (location.state) {
            if (location.state.status === 200) {
                handleClear();
                onLoading(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                      {location.state.message}
                    </Notification>
                );
                toaster.push(message, {placement:'topCenter'})
                navigate('/Spotlight',{state:null});
            }
            else{
                onLoading(false);
                const message = (
                    <Notification type="error" header="error" closable>
                      Error Code: {location.state.status},<br/>{location.state.message}
                    </Notification>
                );
                toaster.push(message, {placement:'topCenter'})
                navigate('/Spotlight',{state:null});
            }
        }
    },[location.state,toaster,navigate])

    const handleSubmit = () =>{
        if(!title || !users || !content){
            const message = (
                <Notification type="warning" header="Warning" closable>
                    Kindly fill all the details.
                </Notification>
            );
            toaster.push(message, {placement:'topCenter'})
        }else{
        onLoading(true);
        dispatch(postSpotlight('/Spotlight',navigate,{title,users,description:content}))
        }
    }
    var toolbarOptions = [[{ 'list': 'bullet' }, 'bold', 'italic', 'underline', { 'list': 'ordered' }, 'link']];
    const module = {
        toolbar: toolbarOptions,
    };

    return (
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Spotlight</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div style={{ width: "100%" }} className="AddStudent-container">
                        <div className='row' style={{ minWidth: "600px" }}>
                            <div className='spotlight-message col-xl-8 table-responsive'>
                                <Table className='AddStudent-Table-List'>
                                    <tr>
                                        <td>Title</td>
                                        <td><input type="text" value={title} onChange={(e)=>handleTitle(e.target.value)} /><br/><span style={{fontSize:"12px",opacity:"0.5"}}>(Max 100 letters)</span></td>
                                    </tr>
                                    <tr>
                                        <td style={{verticalAlign:"top"}}>Message</td>
                                        <td>
                                        <ReactQuill style={{backgroundColor:"white"}} onChange={(value)=>setContent(value)} theme="snow" modules={module} value={content} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>To Specific User</td>
                                        <td><input value={users} onChange={(e)=>setUser(e.target.value)} type="text" /></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} style={{textAlign:"center"}}>
                                            <button onClick={()=>handleSubmit()} className='btn btn-success'>Post</button>&emsp;&emsp;
                                            <button onClick={()=>handleClear()} className='btn btn-warning'>Clear</button>
                                        </td>
                                    </tr>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Spotlight
