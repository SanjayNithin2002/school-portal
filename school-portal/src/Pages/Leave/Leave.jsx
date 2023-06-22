import React from "react"
import { Popover, Whisper, Button, Header } from 'rsuite';
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import "./Leave.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
function Leave() {
    const DefaultPopover = React.forwardRef(({...props}, ref) => {
        return (
          <Popover ref={ref} title="Leave Status" {...props}>
            <hr style={{position:"relative",top:"-20px",borderTop:"2px solid black"}}/>
            <table style={{position:"relative",top:"-30px"}}>
                    <tr>
                        <th>CL</th>
                        <th>:&ensp;</th>
                        <td>5/12</td>
                    </tr>
                    <tr>
                        <th>EL</th>
                        <th>:</th>
                        <td>5/12</td>
                    </tr>
                    <tr>
                        <th>Medical</th>
                        <th>:</th>
                        <td>5/50</td>
                    </tr>
                </table>
          </Popover>
        );
    });
    return (
        <div className="Main">
            <SideNavBar/>
            <div className="Home">
                <div class="container rounded bg-white">
                <Header>
            <h2>Leave Request</h2>
            <hr style={{ border: "1px solid gray" }} />
          </Header>
                    <br/><br/>
                    <div className="row" style={{display:"flex",justifyContent: "center",alignItems:"center"}}>
                        <div className="col-lg-2 col-md-5">
                            <h3>Reason</h3>
                        </div>
                        <div className="col-lg-3 col-md-7">
                            <input style={{width:"90%"}} type="text" name="reason" />
                        </div>
                        <div className="col-lg-2 col-md-5">
                            <h3>Type</h3>
                        </div>
                        <div className="col-lg-3 col-md-7">
                            <select>
                                <option>CL</option>
                                <option>EL</option>
                                <option>Medical Leave</option>
                                <option>Other</option>
                            </select>
                            &emsp;
                            <Whisper placement="auto" controlId="control-id-hover-enterable" trigger="hover" speaker={<DefaultPopover/>} enterable>
                                <Button appearance="subtle"><FontAwesomeIcon style={{fontSize:"20px",cursor:"pointer"}} icon={solid.faExclamationCircle}/></Button>
                            </Whisper>
                            
                        </div>
                    </div>
                    <br/>
                    <div className="row" style={{display:"flex",justifyContent: "center",alignItems:"center"}}>    
                        <div className="col-lg-2 col-md-5">
                            <h3>Start Date</h3>
                        </div>
                        <div className="col-lg-3 col-md-7">
                            <input type="date" name="start" />
                        </div>
                        <div className="col-lg-2 col-md-5">
                            <h3>End Date</h3>
                        </div>
                        <div className="col-lg-3 col-md-7">
                            <input type="date" name="end" />
                        </div>
                    </div>
                    <br/>
                    <div className="row" style={{display:"flex",justifyContent: "center",alignItems:"center"}}>
                        <div className="col-lg-6"></div>
                        <div style={{textAlign:"center"}} className="col-lg-1">
                            <button className="btn btn-primary">Apply</button> 
                        </div>
                    </div>
                    <br/>
                    <div className="row">  
                        <div className="col-lg-12">
                            <h2>History</h2>
                            <br/>
                            <div className="table-responsive">
                            <table class="table table-bordered  tablestyle"  cellspacing="0">
                                <tr>
                                    <th>Sno</th>
                                    <th>Applied Date</th>
                                    <th>Reason</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                <tr>
                                    <td style={{textAlign:"center",fontSize:"20px"}} colSpan={7}>No Data</td>
                                </tr>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leave;