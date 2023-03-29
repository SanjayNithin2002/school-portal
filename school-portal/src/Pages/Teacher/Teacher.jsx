import React from 'react'
import Table from 'react-bootstrap/Table';

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Teacher.css"

function Teacher() {
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Teachers</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <Table bordered className='tablestyle1'>
                        <tbody>
                            <tr>
                                <td style={{width:"30%"}} rowSpan={4}><img src="" alt="No img" style={{width:"10%"}}/></td>
                                <th style={{width:"30%"}}>Name</th>
                                <td style={{width:"40%"}}>-</td>
                            </tr>
                            <tr>
                                <th>EMP ID</th>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>Subject</th>
                                <td>-</td>
                            </tr>
                            <tr>
                                <th>Email ID</th>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>

    )
}

export default Teacher
