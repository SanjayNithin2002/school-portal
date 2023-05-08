import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { Link } from "react-router-dom"
import * as Solid from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TagPicker } from 'rsuite';

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Assessments.css"



function Teacher() {
    const [length,setlength] = React.useState(100);
    const data = [{
          label: "Xth",
          value: "Xth",
          role: 'Stardard'
        },{
            label: "IXth",
            value: "IXth",
            role: 'Stardard'
        },{
            label: "XIth",
            value: "XIth",
            role: 'Stardard'
        },{
            label: "XIIth",
            value: "XIIth",
            role: 'Stardard'
        },{
            label: "A",
            value: "A",
            role: 'Section'
        },{
            label: "B",
            value: "B",
            role: 'Section'
        },{
            label: "C",
            value: "C",
            role: 'Section'
        }]
        const handleSelect = (value, item, event) => {
            setlength(100+60*value.length)
        };
    return (
        
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <h2>Assessments</h2>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                        <TagPicker style={{width:length}} data={data} onChange={handleSelect} placeholder={<><FontAwesomeIcon icons={Solid.faFilter}/>Filter</>} groupBy="role" />&emsp;
                        <Link to='/PostAssessment' className='btn btn-primary'><FontAwesomeIcon icon={Solid.faPlus}/>Add</Link>
                    </div>
                    </div>
                    
                    <hr style={{border:"1px solid gray"}}/>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header style={{ padding: "initial" }}>Upcoming/Ongoing Assessments</Accordion.Header>
                            <Accordion.Body>
                                <Link to='/PostAssessment/1' style={{color:'inherit',textDecoration:"none"}}>
                                <div className='Assessment-tab'>
                                    <div className='Assessment-tab-1'>
                                        <h4>Assessement - 1</h4>
                                        <h5>Physcics</h5>
                                    </div>
                                    <div className='Assessment-tab-1'>
                                        <div style={{ fontWeight: "800" }}>Class :<span style={{ color: "green" }}> Xth Standard C Section</span></div>
                                        <div>30 March, 2023 11:59pm </div>
                                    </div>
                                </div>
                                </Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Completed Assessments</Accordion.Header>
                            <Accordion.Body>
                                <div className='Assessment-tab'>
                                    <div className='Assessment-tab-1'>
                                        <h4>Assessement - 1</h4>
                                        <h5>Maths</h5>
                                    </div>
                                    <div className='Assessment-tab-1'>
                                    <div style={{ fontWeight: "800" }}>Class :<span style={{ color: "green" }}> Xth Standard C Section</span></div>
                                        <div>20 March, 2023 11:59pm </div>
                                    </div>
                                </div>
                                <div className='Assessment-tab'>
                                    <div className='Assessment-tab-1'>
                                        <h4>Assessement - 1</h4>
                                        <h5>English</h5>
                                    </div>
                                    <div className='Assessment-tab-1'>
                                    <div style={{ fontWeight: "800" }}>Class :<span style={{ color: "green" }}> Xth Standard C Section</span></div>
                                        <div>20 March, 2023 11:59pm </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default Teacher
