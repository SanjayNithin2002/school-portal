import SideNavBar from "../../components/SideNavBar/SideNavBar";
import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Panel, Table, Steps, Tag, TagGroup, ButtonGroup, Button } from 'rsuite';
import './Home.css';
import { setCurrentUser } from "../../actions/currentUser";
import { useDispatch, useSelector } from "react-redux";

const data = [
    {
        "email": "sanjay.nithin19@gmail.com",
        "standard": "10",
        "section": "A",
        "firstName": "John",
        "lastName": "Doe",
        "dob": "2005-06-12",
        "gender": "Male",
        "bloodGroup": "O+",
        "aadharNumber": "123456789012",
        "motherTongue": "English",
        "address": {
          "line1": "123 Main Street",
          "line2": "Apartment 4B",
          "city": "New York",
          "state": "NY",
          "pincode": 10001
        },
        "father": {
          "name": "David Doe",
          "age": 40,
          "qualification": "Bachelor's Degree",
          "occupation": "Engineer",
          "annualIncome": 80000,
          "phoneNumber": "123-456-7890",
          "email": "david.doe@example.com"
        },
        "mother": {
          "name": "Emily Doe",
          "age": 38,
          "qualification": "Master's Degree",
          "occupation": "Teacher",
          "annualIncome": 60000,
          "phoneNumber": "987-654-3210",
          "email": "emily.doe@example.com"
        },
        "guardian": {
          "name": "Emily Doe",
          "age": 38,
          "qualification": "Master's Degree",
          "occupation": "Teacher",
          "annualIncome": 60000,
          "phoneNumber": "987-654-3210",
          "email": "emily.doe@example.com"
        },
        "busDetails": {
          "isNeeded": true,
          "busStopArea": "Main Street",
          "busStop": "Bus Stop 1",
          "availableBus": "Bus A"
        },
        "hostelDetails": {
          "isNeeded": false,
          "roomType": "2bed AC",
          "foodType": "Non-Veg"
        }
      }
];

function Home() {
    const [step, setStep] = React.useState(0);
    const [father, setFather] = useState(true);
    const [mother, setMother] = useState(true);
    const [bus, setBus] = useState(true);
    const [hostel, setHostel] = useState(false);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setCurrentUser({type:localStorage.getItem("type"),id:localStorage.getItem("id")}))
    },[dispatch])

const currentUser = useSelector(state => state.currentUserReducer);
console.log(currentUser)

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
                        <Steps current={step}>
                            <Steps.Item title="Personal" description="" />
                            <Steps.Item title="Family" description="" />
                            <Steps.Item title={<>School Bus <br />& Hostel</>} />
                        </Steps>
                        <hr />
                        {step === 0 &&
                            <div className="PersonalDetails">
                                <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                                    <img src="https://via.placeholder.com/240x240" height="240" />
                                    <Panel header="STUDENT NAME">
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
                                                    <Tag size="lg">Standard</Tag>
                                                    <Tag size="lg">{item.standard}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Section</Tag>
                                                    <Tag size="lg">{item.section}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Email ID</Tag>
                                                    <Tag size="lg">{item.email}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Application Number</Tag>
                                                    <Tag size="lg">{item.ApplicationNumber}</Tag>
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
                                                    <Tag size="lg">Mother Tongue</Tag>
                                                    <Tag size="lg">{item.motherTongue}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Address</Tag>
                                                    <Tag size="lg">{item.address.line1+" "+item.address.line2+" "+item.address.city+" "+item.address.state+" "+item.address.pincode}</Tag>
                                                </TagGroup>
                                            </div>
                                            <div className='rightcol'>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Blood Group</Tag>
                                                    <Tag size="lg">{item.bloodGroup}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Adhar Number</Tag>
                                                    <Tag size="lg">{item.aadharNumber}</Tag>
                                                </TagGroup>                                            </div>
                                        </div>
                                    ))
                                )}


                            </div>
                        }
                        {step === 1 &&
                            <div className="FamilyDetails">
                                <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                                    <img src="https://via.placeholder.com/240x240" height="240" />
                                    <Panel header="STUDENT NAME">
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
                                            {father && <>
                                                <div className='leftcol' >
                                                    <h4 style={{ display: 'block', margin: '10px' }}>Father Details</h4>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Name</Tag>
                                                        <Tag size="lg">{item.father.name}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Age</Tag>
                                                        <Tag size="lg">{item.father.age}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Qualification</Tag>
                                                        <Tag size="lg">{item.father.qualification}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Occupation</Tag>
                                                        <Tag size="lg">{item.father.occupation}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Annual Income</Tag>
                                                        <Tag size="lg">{item.father.annualIncome}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Phone Number</Tag>
                                                        <Tag size="lg">{item.father.phoneNumber}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Email-ID</Tag>
                                                        <Tag size="lg">{item.father.email}</Tag>
                                                    </TagGroup>
                                                </div>
                                            </>
                                            }
                                            {mother && <>
                                                <div className='rightcol'>
                                                    <h4 style={{ display: 'block', margin: '10px' }}>Mother Details</h4>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Name</Tag>
                                                        <Tag size="lg">{item.mother.name}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Age</Tag>
                                                        <Tag size="lg">{item.mother.age}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Qualification</Tag>
                                                        <Tag size="lg">{item.mother.qualification}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Occupation</Tag>
                                                        <Tag size="lg">{item.mother.occupation}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Annual Income</Tag>
                                                        <Tag size="lg">{item.mother.annualIncome}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Phone Number</Tag>
                                                        <Tag size="lg">{item.mother.phoneNumber}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Email-ID</Tag>
                                                        <Tag size="lg">{item.mother.email}</Tag>
                                                    </TagGroup>
                                                </div>
                                            </>
                                            }
                                            {!father && !mother && <>
                                                <div className='leftcol'>
                                                    <h4 style={{ display: 'block', margin: '10px' }}>Guardian Details</h4>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Name</Tag>
                                                        <Tag size="lg">{item.guardian.name}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Age</Tag>
                                                        <Tag size="lg">{item.guardian.age}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Qualification</Tag>
                                                        <Tag size="lg">{item.guardian.qualification}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Occupation</Tag>
                                                        <Tag size="lg">{item.guardian.occupation}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Annual Income</Tag>
                                                        <Tag size="lg">{item.guardian.annualIncome}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Phone Number</Tag>
                                                        <Tag size="lg">{item.guardian.phoneNumber}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Email-ID</Tag>
                                                        <Tag size="lg">{item.guardian.email}</Tag>
                                                    </TagGroup>
                                                </div>

                                            </>
                                            }
                                        </div>
                                    ))
                                )}


                            </div>
                        }
                        {step === 2 &&
                            <div className="SchoolBusAndHostelDetails">
                                <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                                    <img src="https://via.placeholder.com/240x240" height="240" />
                                    <Panel header="STUDENT NAME">
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
                                            {bus && <>
                                                <div className='leftcol' >
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Bus Stop Area</Tag>
                                                        <Tag size="lg">{item.busDetails.busStopArea}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Bus Stop</Tag>
                                                        <Tag size="lg">{item.busDetails.busStop}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Available Bus</Tag>
                                                        <Tag size="lg">{item.busDetails.availableBus}</Tag>
                                                    </TagGroup>
                                                    
                                                </div>
                                            </>
                                            }
                                            {hostel && <>
                                                <div className='leftcol' >
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Room Type</Tag>
                                                        <Tag size="lg">{item.hostelDetails.roomType}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Food Type</Tag>
                                                        <Tag size="lg">{item.hostelDetails.foodType}</Tag>
                                                    </TagGroup>
                                                </div>
                                            </>
                                            }
                                        </div>
                                    ))
                                )}


                            </div>
                        }
                        <br />
                        <ButtonGroup>
                            <Button onClick={onPrevious} disabled={step === 0}>
                                Previous
                            </Button>
                            <Button onClick={onNext} disabled={step === 3}>
                                Next
                            </Button>
                        </ButtonGroup>
                    </div>



                </div>
            </div>
        </div >

    );
}

export default Home;
