import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import Table from "react-bootstrap/Table"
import { Stack,Divider } from 'rsuite'

import "./Spotlight.css"
import { useDispatch } from 'react-redux'
import { postSpotlight } from '../../actions/spotlight'

const Spotlight = () => {

    const dispatch = useDispatch();
    
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [users,setUser] = useState('All Students & Staffs')

    const handleTitle = (value) => {
        if(value.length>=100){
            alert("Title can't exceed 100 letters");
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

    const handleSubmit = () =>{
        dispatch(postSpotlight({title,users,description:content}))
    }

    const handleFormat = (command) => {
        document.execCommand(command, false, null);
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
                                            <div className="text-area-editor" style={{ border: "1px solid black" }}>
                                                <div className="format-buttons">
                                                    <Stack divider={<Divider vertical />}>
                                                        <button onClick={() => handleFormat('insertUnorderedList')}> <FontAwesomeIcon icon={solid.faListUl} /> </button>
                                                        <button onClick={() => handleFormat('bold')}><b>B</b></button>
                                                        <button onClick={() => handleFormat('italic')}><i>I</i></button>
                                                        <button onClick={() => handleFormat('underline')}><u>U</u></button>
                                                        <button onClick={() => handleFormat('insertOrderedList')}> <FontAwesomeIcon icon={solid.faListOl} /></button>
                                                    </Stack>

                                                </div>
                                                <div
                                                    className="editor"
                                                    contentEditable
                                                    onInput={(e) => setContent(e.target.innerHTML)}
                                                >
                                                    <bdo dir="rtl">{content}</bdo>

                                                </div>
                                                {console.log(content)}
                                            </div>
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
