import SideNavBar from "../../components/SideNavBar/SideNavBar";
import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Panel, Table, Steps, Tag, TagGroup, ButtonGroup, Button } from 'rsuite';
import './Home.css';
const { Column, HeaderCell, Cell } = Table;

const data = [
    {
        "email": "sanjaynithin1910@gmail.com",
        "firstName": "Jane",
        "lastName": "Smith",
        "empID": "T123456",
        "dob": "1980-05-01",
        "gender": "Female",
        "bloodGroup": "A+",
        "aadharNumber": "123456789012",
        "motherTongue": "English",
        "address": {
            "line1": "456 Elm Street",
            "line2": "Apartment 2C",
            "city": "Los Angeles",
            "state": "CA",
            "pincode": 90001
        },
        "phoneNumber": "555-123-4567",
        "qualification": "Master's Degree",
        "experience": 8,
        "salaryDetails": {
            "basic": 50000,
            "hra": 15000,
            "conveyance": 5000,
            "pa": 2000,
            "pf": 5000,
            "pt": 200
        },
        "busDetails": {
            "isNeeded": true,
            "busStopArea": "Main Street",
            "busStop": "Bus Stop 1",
            "availableBus": "Bus A"
        },
        "hostelDetails": {
            "isNeeded": false,
            "roomType": "",
            "foodType": ""
        }
    }
];

function TeacherDashboard() {
    const [step, setStep] = React.useState(0);
    const [father, setFather] = useState(true);
    const [mother, setMother] = useState(true);
    const [bus, setBus] = useState(true);
    const [hostel, setHostel] = useState(false);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Welcome Back!</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div>
                        <div className="PersonalDetails">
                            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                                <img src="https://via.placeholder.com/240x240" height="240" />
                                <Panel header="TEACHER NAME">
                                    <p>
                                        <small>
                                            A suite of React components, sensible UI design, and a friendly development experience.
                                        </small>
                                    </p>
                                </Panel>
                            </Panel>
                            {(
                                data.map((item) => (
                                    <div className="col">
                                        <div className='leftcol' >
                                            <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                <Tag size="lg">First Name</Tag>
                                                <Tag size="lg">{item.firstName}</Tag>
                                            </TagGroup>
                                            <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                <Tag size="lg">Last Name</Tag>
                                                <Tag size="lg">{item.lastName}</Tag>
                                            </TagGroup>
                                            <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                <Tag size="lg">Phone Number</Tag>
                                                <Tag size="lg">{item.phoneNumber}</Tag>
                                            </TagGroup>
                                            <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                <Tag size="lg">Email ID</Tag>
                                                <Tag size="lg">{item.email}</Tag>
                                            </TagGroup>
                                            <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                <Tag size="lg">Employee ID</Tag>
                                                <Tag size="lg">{item.empID}</Tag>
                                            </TagGroup>
                                            <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                <Tag size="lg">Date of Birth</Tag>
                                                <Tag size="lg">{item.dob}</Tag>
                                            </TagGroup>
                                            <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                <Tag size="lg">Gender</Tag>
                                                <Tag size="lg">{item.gender}</Tag>
                                            </TagGroup>
                                            <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                <Tag size="lg">Blood Group</Tag>
                                                <Tag size="lg">{item.bloodGroup}</Tag>
                                            </TagGroup>
                                            <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                <Tag size="lg">Aadhar Number</Tag>
                                                <Tag size="lg">{item.aadharNumber}</Tag>
                                            </TagGroup>
                                            <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                <Tag size="lg">Mother Tongue</Tag>
                                                <Tag size="lg">{item.motherTongue}</Tag>
                                            </TagGroup>
                                            <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                <Tag size="lg">Address</Tag>
                                                <Tag size="lg">{item.address.line1 + " " + item.address.line2 + " " + item.address.city + " " + item.address.state + " " + item.address.pincode}</Tag>
                                            </TagGroup> 
                                        </div>

                                        <div className='rightcol'>
                                            

                                            <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                <Tag size="lg">Qualification</Tag>
                                                <Tag size="lg">{item.qualification}</Tag>
                                            </TagGroup>         
                                        <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                            <Tag size="lg">Experience</Tag>
                                            <Tag size="lg">{item.experience}</Tag>
                                        </TagGroup>
                                        <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                            <Tag size="lg">Basic Salary</Tag>
                                            <Tag size="lg">{item.salaryDetails.basic}</Tag>
                                        </TagGroup>
                                        <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                            <Tag size="lg">HRA</Tag>
                                            <Tag size="lg">{item.salaryDetails.hra}</Tag>
                                        </TagGroup>
                                        <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                            <Tag size="lg">Conveyance</Tag>
                                            <Tag size="lg">{item.salaryDetails.conveyance}</Tag>
                                        </TagGroup>
                                        <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                            <Tag size="lg">PA</Tag>
                                            <Tag size="lg">{item.salaryDetails.pa}</Tag>
                                        </TagGroup>
                                        <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                            <Tag size="lg">PF</Tag>
                                            <Tag size="lg">{item.salaryDetails.pf}</Tag>
                                        </TagGroup>
                                        <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                            <Tag size="lg">PT</Tag>
                                            <Tag size="lg">{item.salaryDetails.pt}</Tag>
                                        </TagGroup>
                                        <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                            <Tag size="lg">Bus Stop Area</Tag>
                                            <Tag size="lg">{item.busDetails.busStopArea}</Tag>
                                        </TagGroup>
                                        <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                            <Tag size="lg">Bus Stop</Tag>
                                            <Tag size="lg">{item.busDetails.busStop}</Tag>
                                        </TagGroup>
                                        <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                            <Tag size="lg">Bus Stop Area</Tag>
                                            <Tag size="lg">{item.busDetails.busStopArea}</Tag>
                                        </TagGroup>
                                        </div>
                                    </div>

                                ))
                            )}


                        </div>
                    </div>



                </div>
            </div>
        </div >

    );
}

export default TeacherDashboard;
