import React from 'react'
import Table from "react-bootstrap/Table"
import { DatePicker, Stack } from 'rsuite'

import "./Bonafide.css"
import SideNavBar from '../../components/SideNavBar/SideNavBar'


function AdminBonafide() {
    
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>Bonafide Applications</h2>
                    <hr style={{ border: "1px solid gray" }} />

                </div>
            </div>
        </div>
    )
}

export default AdminBonafide