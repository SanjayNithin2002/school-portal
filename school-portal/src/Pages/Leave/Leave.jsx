import React from "react"
import { useNavigate } from "react-router-dom";

import SideNavBar from "../../components/SideNavBar/SideNavBar";
import "./Leave.css";

function Leave() {
    const navigate = useNavigate();
    return (
        localStorage.getItem("type")==="teacher" ?
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <SideNavBar/>
            <div className="Home" style={{ width: "90%", margin: "10px auto" }}>
                <div class="container rounded bg-white" style={{ padding: "10px" }}>
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
                            <table class="table table-bordered tablestyle"  cellspacing="0">
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
        :<>{navigate('/Error')}</>
    )
}

export default Leave;