import React from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./ClassMessage.css"

const Student = () => {

    const stardard = "VII";
    const section = "D";

    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>Class Message</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div>
                        { stardard && section && <>
                        {/* <div className="row classmessage-container-2">
                            <div className='col-lg-2 message-box'>
                                <h4>Message : </h4>
                            </div>
                            <div className='col-lg-8'>
                                <textarea rows={5} cols={83}></textarea>    
                            </div>
                        </div>
                        <div className="row classmessage-container-2">
                            <div className='col-lg-2'></div>
                            <div className='col-lg-3' style={{display:"flex",alignItems:"center"}}>
                                <button className='btn btn-primary'><Attach style={{color:"white", fontSize: '20px' }}/>Attach</button>
                            </div>
                            <div className='col-lg-2'></div>
                            <div className='col-lg-3' style={{display:"flex",alignItems:"center"}}>
                                <button className='btn btn-success'><Icon as={Send} style={{color:"white", fontSize: '20px' }}/>send</button>
                            </div>
                        </div>  
                        <div style={{ display:"flex",justifyContent:"center",width:"100%"}}>
                            <hr style={{ display:"flex",justifyContent:"center",width:"80%",border: "1px solid gray" }} />
                        </div> */}
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
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Student

