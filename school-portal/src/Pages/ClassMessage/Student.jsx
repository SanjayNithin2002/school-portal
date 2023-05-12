import React from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./ClassMessage.css"

const Student = () => {



    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>Class Message</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div>
                        <div className="row classmessage-container-2">
                            <div className='col-lg-10 chat-container'>
                                <div className='row chat-container-1'>
                                    <div className='col-lg-3 Avatar'>
                                        <span className='Avatar-1' title='Teacher Name'>Maths Teacher</span>
                                    </div>
                                    <div className='col-lg-8 message-content'>
                                       <p> **Its a Gental Remainder**<br/>
                                        The Students who are all participating in the tomorrow's event (Drawing) bring the following things:<br/>
                                        -&gt;A4 sheet<br/>
                                        -&gt;Color Pencil<br/>
                                        -&gt;Writing Pad<br/>
                                        </p>
                                        <p className='timer'>a day ago</p>
                                    </div>
                                </div>
                                <div className='row chat-container-1'>
                                    <div className='col-lg-3 Avatar'>
                                        <span className='Avatar-1' title='Teacher Name'>Science Teacher</span>
                                    </div>
                                    <div className='col-lg-8 message-content'>
                                       <p> **Its a Gental Remainder**<br/>
                                        The Students who are all participating in the tomorrow's event (Drawing) bring the following things:<br/>
                                        -&gt;A4 sheet<br/>
                                        -&gt;Color Pencil<br/>
                                        -&gt;Writing Pad<br/>
                                        </p>
                                        <p className='timer'>a day ago</p>
                                    </div>
                                </div>
                                <div className='row chat-container-1'>
                                    <div className='col-lg-3 Avatar'>
                                        <span className='Avatar-1' title='Teacher Name'>Class Teacher</span>
                                    </div>
                                    <div className='col-lg-8 message-content'>
                                       <p> **Its a Gental Remainder**<br/>
                                        The Students who are all participating in the tomorrow's event (Drawing) bring the following things:<br/>
                                        -&gt;A4 sheet<br/>
                                        -&gt;Color Pencil<br/>
                                        -&gt;Writing Pad<br/>
                                        </p>
                                        <p className='timer'>a day ago</p>
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

export default Student

