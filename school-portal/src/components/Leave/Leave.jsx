import React from "react" 

function Leave(){
    return (
        <div className="rows">

            <div className="col-md-5">
                <h3>Reason</h3>
            </div>
            <div className="col-md-7">
                <input type="text" name="reason"/>
            </div>
            <div className="col-md-5">
                <h3>Start Date</h3>
            </div>
            <div className="col-md-7">
                <input type="date" name="start"/>
            </div>
            <div className="col-md-5">
                <h3>End Date</h3>
            </div>
            <div className="col-md-7">
                <input type="date" name="end"/>
            </div>
            <div className="col-md-5">
                <h3>Type</h3>
            </div>
            <div className="col-md-7">
                <select>
                    <option>CL</option>
                    <option>EL</option>
                    <option>Medical Leave</option>
                    <option>Other</option>
                </select>
            </div>
            <div>
                <h2>History</h2>
                <table border="1" style={{width:"100%",borderCollapse:"collapse"}}>
                    <tr>
                        <th>Sno</th>
                        <th>Applied Date</th>
                        <th>Reason</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Status</th>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Leave;