import SideNavBar from "../../components/SideNavBar/SideNavBar";
import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Panel, Table, Steps, Placeholder, Tag, TagGroup, ButtonGroup, Button } from 'rsuite';
import './Home.css';
const { Column, HeaderCell, Cell } = Table;

const data = [
    {
        FirstName: 'Samuel',
        LastName: 'Jackson',
        Standard: '5',
        Section: 'C',
        ApplicationNumber: '123456',
        Dob: '19th October 2002',
        Gender: 'Male',
        Address: 'XYZ block,sdfabc road, pqr layout, abcd Nagar, Vellore.',
        BloodGroup: 'O+',
        AdharNumber: '123453 123546 123434',
        MotherToungue: 'Tamil',
        FatherName: 'Walter White',
        FatherAge: 99,
        FatherQualification: 'M.Tech CSE',
        FatherOccupation: 'Senior VP at VIT',
        FatherAnnualIncome: 10000000,
        FatherPhone: 123456789,
        FatherEmailId: 'father@gmail.com',
        MotherName: 'Walter White',
        MotherAge: 99,
        MotherQualification: 'M.Tech CSE',
        MotherOccupation: 'Senior VP at VIT',
        MotherAnnualIncome: 10000000,
        MotherPhone: 123456789,
        MotherEmailId: 'father@gmail.com'
    }
];

function Home() {
    const [step, setStep] = React.useState(0);
    const [father, setFather] = useState(true);
    const [mother, setMother] = useState(true);
    const [bus, setBus] = useState(false);
    const [hostel, setHostel] = useState(true);
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
                                                    <Tag size="lg">{item.FirstName}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Last Name</Tag>
                                                    <Tag size="lg">{item.LastName}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Standard</Tag>
                                                    <Tag size="lg">{item.Standard}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Section</Tag>
                                                    <Tag size="lg">{item.Section}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Application Number</Tag>
                                                    <Tag size="lg">{item.ApplicationNumber}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Date of Birth</Tag>
                                                    <Tag size="lg">{item.Dob}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Gender</Tag>
                                                    <Tag size="lg">{item.Gender}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Address</Tag>
                                                    <Tag size="lg">{item.Address}</Tag>
                                                </TagGroup>
                                            </div>
                                            <div className='rightcol'>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Blood Group</Tag>
                                                    <Tag size="lg">{item.BloodGroup}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Adhar Number</Tag>
                                                    <Tag size="lg">{item.AdharNumber}</Tag>
                                                </TagGroup>
                                                <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                    <Tag size="lg">Mother Toungue</Tag>
                                                    <Tag size="lg">{item.MotherToungue}</Tag>
                                                </TagGroup>
                                            </div>
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
                                                        <Tag size="lg">{item.FatherName}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Age</Tag>
                                                        <Tag size="lg">{item.FatherAge}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Qualification</Tag>
                                                        <Tag size="lg">{item.FatherQualification}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Occupation</Tag>
                                                        <Tag size="lg">{item.FatherOccupation}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Annual Income</Tag>
                                                        <Tag size="lg">{item.FatherAnnualIncome}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Phone Number</Tag>
                                                        <Tag size="lg">{item.FatherPhone}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Email-ID</Tag>
                                                        <Tag size="lg">{item.FatherEmailId}</Tag>
                                                    </TagGroup>
                                                </div>
                                            </>
                                            }
                                            {mother && <>
                                                <div className='rightcol'>
                                                    <h4 style={{ display: 'block', margin: '10px' }}>Mother Details</h4>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Name</Tag>
                                                        <Tag size="lg">{item.MotherName}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Age</Tag>
                                                        <Tag size="lg">{item.MotherAge}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Qualification</Tag>
                                                        <Tag size="lg">{item.MotherQualification}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Occupation</Tag>
                                                        <Tag size="lg">{item.MotherOccupation}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Annual Income</Tag>
                                                        <Tag size="lg">{item.MotherAnnualIncome}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Phone Number</Tag>
                                                        <Tag size="lg">{item.MotherPhone}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Email-ID</Tag>
                                                        <Tag size="lg">{item.MotherEmailId}</Tag>
                                                    </TagGroup>
                                                </div>
                                            </>
                                            }
                                            {!father && !mother && <>
                                                <div className='leftcol'>
                                                    <h4 style={{ display: 'block', margin: '10px' }}>Guardian Details</h4>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Name</Tag>
                                                        <Tag size="lg">{item.MotherName}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Age</Tag>
                                                        <Tag size="lg">{item.MotherAge}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Qualification</Tag>
                                                        <Tag size="lg">{item.MotherQualification}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Occupation</Tag>
                                                        <Tag size="lg">{item.MotherOccupation}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Annual Income</Tag>
                                                        <Tag size="lg">{item.MotherAnnualIncome}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Phone Number</Tag>
                                                        <Tag size="lg">{item.MotherPhone}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Email-ID</Tag>
                                                        <Tag size="lg">{item.MotherEmailId}</Tag>
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
                                                        <Tag size="lg">{item.FirstName}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Bus Stop</Tag>
                                                        <Tag size="lg">{item.LastName}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Available Bus</Tag>
                                                        <Tag size="lg">{item.Standard}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Available Route</Tag>
                                                        <Tag size="lg">{item.Section}</Tag>
                                                    </TagGroup>
                                                </div>
                                            </>
                                            }
                                            {hostel && <>
                                                <div className='leftcol' >
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Room Type</Tag>
                                                        <Tag size="lg">{item.FirstName}</Tag>
                                                    </TagGroup>
                                                    <TagGroup key={item} style={{ display: 'block', margin: '10px' }}>
                                                        <Tag size="lg">Food Type</Tag>
                                                        <Tag size="lg">{item.LastName}</Tag>
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
