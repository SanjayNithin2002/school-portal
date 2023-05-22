import React, { useState } from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from "@fortawesome/free-solid-svg-icons";

import "./Class.css"


function ClassInfo() {
    const stardardList = ['LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    const [standard, setStardard] = useState('');
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Class Info</h2>
                        <Link to='/CreateClass' style={{textDecoration:"none",color:"white",fontWeight:"600",fontSize:"18px"}} className='btn btn-primary d-flex align-items-center'>
                            <FontAwesomeIcon icon={solid.faPlus} />&ensp;Create Class
                        </Link>
                    </div>

                    <hr style={{ border: "1px solid gray" }} />
                    <div className="row ClassInfo-container">
                        <div className="col-lg-2">
                            <h4>Select Stardard : </h4>
                        </div>
                        <div className="col-lg-3">
                            <select
                                className="ClassSelectPicker"
                                value={standard}
                                onChange={(e) => setStardard(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select Stardard
                                </option>
                                {
                                    stardardList.map((item) => (
                                        <option value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <br />
                    <br />

                </div>
            </div>
        </div>
    )
}

export default ClassInfo