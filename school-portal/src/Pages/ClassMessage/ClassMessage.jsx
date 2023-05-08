import React, { useState } from 'react'
import { Icon } from '@rsuite/icons';
import Attach from "@rsuite/icons/Attachment"

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./ClassMessage.css"

const Send = React.forwardRef((props, ref) => (
    <svg {...props} ref={ref} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" class="svg-inline--fa fa-paper-plane " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="currentColor" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"></path>
    </svg>
  ));

const ClassMessage = () => {

    const [stardard, setStardard] = useState("");
    const [section, setSection] = useState("");

    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>Class Message</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="">
                        <div className="row classmessage-container">
                            <div className="col-lg-2">
                                <h4>Select Class : </h4>
                            </div>
                            <div className="col-lg-3">
                                <select
                                    className="selectPicker3"
                                    value={stardard}
                                    onChange={(e) => setStardard(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Class
                                    </option>
                                    <option value="VII">VII</option>
                                    <option value="VIII">VIII</option>
                                </select>
                            </div>
                            <div className="col-lg-2">
                                <h4>Select Class : </h4>
                            </div>
                            <div className="col-lg-3">
                                <select
                                    className="selectPicker3"
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Class
                                    </option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="row classmessage-container">
                            <div className='col-lg-10 chat-container'>
                                <div className='chat-container-1'>
                                    
                                </div>
                                <div className='chat-container-2'>
                                    <div style={{ width:"75%",display:"flex",alignItems:"center"}}>
                                        <textarea className='textarea' rows={2} cols={30}></textarea>
                                    </div>
                                    <div style={{display:"flex",alignItems:"center"}}>
                                        <Attach style={{ padding:"7.5px", backgroundColor:"gray",color:"white", fontSize: '46px' }}/>
                                    </div>
                                    <div style={{display:"flex",alignItems:"center",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                                        <Icon as={Send} style={{padding:"7.5px", backgroundColor:"gray",color:"white", fontSize: '31px',borderTopRightRadius:"10px",borderBottomRightRadius:"10px" }}/>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassMessage
