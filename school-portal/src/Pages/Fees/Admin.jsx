import React, { useState } from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'

import "./Fees.css"
import Table from 'react-bootstrap/esm/Table';

const Admin = () => {
    const [active, setActive] = useState("school");
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h2>Fees Structure</h2>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='fees-main-content'>
                        <div className='fees-tab'>
                            <button onClick={() => setActive("school")} className={active === "school" ? 'btn btn-primary Normal1' : 'btn btn-outline-primary Normal1'}>School Fees</button>
                            <button onClick={() => setActive("bus")} className={active === "bus" ? 'btn btn-primary Normal2 ' : 'btn btn-outline-primary Normal2'}>School Bus</button>
                            <button onClick={() => setActive("hostel")} className={active === "hostel" ? 'btn btn-primary Normal2' : 'btn btn-outline-primary Normal2'}>Hostel</button>
                            <button onClick={() => setActive("extra")} className={active === "extra" ? 'btn btn-primary Normal3' : 'btn btn-outline-primary Normal3'}>Extracircular Activities</button>
                        </div>
                        <br /><br />
                        {active === "school" &&
                            <div className='row fees-tab-content'>
                                <div className='col-lg-4'>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>Standard</td>
                                                <td>Fees</td>
                                                <td>Due Date</td>
                                            </tr>
                                            <tr>
                                                <td>I Stardard</td>
                                                <td>: &#8377;100000</td>
                                            </tr>
                                            <tr>
                                                <td>II Stardard</td>
                                                <td>: &#8377;100000</td>
                                            </tr>
                                            <tr>
                                                <td>III Stardard</td>
                                                <td>: &#8377;100000</td>
                                            </tr>
                                            <tr>
                                                <td>IV Stardard</td>
                                                <td>: &#8377;150000</td>
                                            </tr>
                                            <tr>
                                                <td>V Stardard</td>
                                                <td>: &#8377;150000</td>
                                            </tr>
                                            <tr>
                                                <td>VI Stardard</td>
                                                <td>: &#8377;150000</td>
                                            </tr>
                                            <tr>
                                                <td>VII Stardard</td>
                                                <td>: &#8377;200000</td>
                                            </tr>
                                            <tr>
                                                <td>VIII Stardard</td>
                                                <td>: &#8377;200000</td>
                                            </tr>
                                            <tr>
                                                <td>IX Stardard</td>
                                                <td>: &#8377;200000</td>
                                            </tr>
                                            <tr>
                                                <td>X Stardard</td>
                                                <td>: &#8377;300000</td>
                                            </tr>
                                            <tr>
                                                <td>XI Stardard</td>
                                                <td>: &#8377;300000</td>
                                            </tr>
                                            <tr>
                                                <td>XII Stardard</td>
                                                <td>: &#8377;300000</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <button className='btn btn-warning'>Edit</button>
                                </div>
                            </div>
                        }
                        {active === "bus" &&
                            <div className='row fees-tab-content'>
                                <div className='col-lg-5'>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>Chittor Bus Stop, Dharapadavedu</td>
                                                <td>: &#8377;10000</td>
                                            </tr>
                                            <tr>
                                                <td>Gandhi Nager, Kangeyanallur,Sevoor</td>
                                                <td>: &#8377;13000</td>
                                            </tr>
                                            <tr>
                                                <td>Green Circle, CMC</td>
                                                <td>: &#8377;17000</td>
                                            </tr>
                                            <tr>
                                                <td>Kalpudur, Pallikuppam</td>
                                                <td>: &#8377;14000</td>
                                            </tr>
                                            <tr>
                                                <td>Thiruvalam,Bagayam</td>
                                                <td>: &#8377;20000</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <button className='btn btn-success'>Add Stopping</button>&emsp;&emsp;
                                    <button className='btn btn-warning'>Edit</button>
                                </div>
                            </div>
                        }
                        {active === "hostel" &&
                            <div className='row fees-tab-content'>
                                <div className='col-lg-5'>
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>Veg Food + AC room</td>
                                                <td>: &#8377;60000</td>
                                            </tr>
                                            <tr>
                                                <td>Veg Food + Non AC room</td>
                                                <td>: &#8377;50000</td>
                                            </tr>
                                            <tr>
                                                <td>Non Veg Food + AC room</td>
                                                <td>: &#8377;70000</td>
                                            </tr>
                                            <tr>
                                                <td>Non Veg Food + Non AC room</td>
                                                <td>: &#8377;65000</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <button className='btn btn-warning'>Edit</button>
                                </div>
                            </div>
                        }
                        {active === "extra" &&
                            <div className='row fees-tab-content'>
                            <div className='col-lg-5'>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>Swimming Class</td>
                                            <td>Per month</td>
                                            <td>: &#8377;3000</td>
                                        </tr>
                                        <tr>
                                            <td>Karate Class</td>
                                            <td>3 months</td>
                                            <td>: &#8377;4000</td>
                                        </tr>
                                        <tr>
                                            <td>Drawing Class</td>
                                            <td>per month</td>
                                            <td>: &#8377;2000</td>
                                        </tr>
                                        <tr>
                                            <td>Tennis Class</td>
                                            <td>3 month</td>
                                            <td>: &#8377;8000</td>
                                        </tr>
                                        
                                    </tbody>
                                </Table>
                                <button className='btn btn-success'>Add Activity</button>&emsp;&emsp;
                                <button className='btn btn-warning'>Edit</button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
