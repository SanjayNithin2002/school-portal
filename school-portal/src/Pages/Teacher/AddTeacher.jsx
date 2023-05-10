import React,{useState} from 'react'
import { Steps, ButtonGroup, Button } from 'rsuite';

import SideNavBar from "../../components/SideNavBar/SideNavBar";
import "./Teacher.css";
import Table from 'react-bootstrap/esm/Table';

const AddTeacher = () => {
    const [step, setStep] = useState(0);
    const [UG,setUG] = useState(false);
    const [PG,setPG] = useState(false); 
    const [bus,setBus] = useState(false);
    const [hostel,setHostel] = useState(false);
    const [PHD,setPHD] = useState(false);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Add Staff</h2>
                        {step===3 && <button className='btn btn-primary'>Submit</button>}
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="">
                        <Steps current={step}>
                            <Steps.Item title="Personal" />
                            <Steps.Item title={<>Education<br/>Salary</>} />
                            <Steps.Item title={<>School Bus <br/>& Hostel</>} />
                            <Steps.Item title="Review" />
                        </Steps>
                        <br />
                        {step === 0 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='AddTeacher-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td>First Name</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Last Name</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>EMP ID</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>DOB</td>
                                                <td><input type="date" /></td>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Blood Group</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Aadhaar No</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Mother Tongue</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Address Line-1</td>
                                                <td><textarea rows={4} cols={30}/></td>
                                            </tr>
                                            <tr>
                                                <td>Address Line-2</td>
                                                <td><textarea rows={4} cols={30}/></td>
                                            </tr>
                                            <tr>
                                                <td>City</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>State</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Pincode</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Email ID</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {step === 1 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='AddTeacher-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>Education Details</td>
                                            </tr>
                                            
                                            <tr>
                                                <td>Qualification</td>
                                                <td className='radio'><input type="checkbox" name="qualification" onClick={()=>setUG(!UG)} />UG &emsp; <input type="checkbox" name="qualification" onClick={()=>setPG(!PG)} />PG &emsp; <input type="checkbox" name="qualification" onClick={()=>setPHD(!PHD)} />PHD &emsp;</td>
                                            </tr>
                                            <tr>
                                                <td>How many years experience in this field</td>
                                                <td className='radio'><input type="text"/> </td>
                                            </tr>
                                            {UG && <>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>UG Details</td>
                                            </tr>
                                            <tr>
                                                <td>College Name</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>College Location<br/>(City,State,Country)</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Year Passed out</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Percentage</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Certificate</td>
                                                <td><input type="file" /></td>
                                            </tr>
                                            </>
                                            }
                                            {PG && <>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>PG Details</td>
                                            </tr>
                                            <tr>
                                                <td>College Name</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>College Location<br/>(City,State,Country)</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Year Passed out</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Percentage</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Certificate</td>
                                                <td><input type="file" /></td>
                                            </tr>
                                            </>
                                            }
                                            {PHD && <>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>PHD Details</td>
                                            </tr>
                                            <tr>
                                                <td>College Name</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>College Location<br/>(City,State,Country)</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Year Passed out</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Percentage</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Certificate</td>
                                                <td><input type="file" /></td>
                                            </tr>
                                            </>
                                            }
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>Salary Details</td>
                                            </tr>
                                            <tr>
                                                <td>Basic</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>HRA</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Conveyance</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>PA</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>PF</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Professional Tax</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {step === 2 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='AddTeacher-Table-List'>
                                        <tbody>
                                           {
                                            (bus || (!bus && !hostel) ) && 
                                            <tr>
                                                <td>Does the student need school bus : </td>
                                                <td><input type="radio" name="bus" onClick={()=>setBus(true)} />Yes &emsp; <input type="radio" name="bus" onClick={()=>setBus(false)} />No</td>
                                            </tr>
                                             
                                           } 
                                           {
                                            (hostel || (!bus && !hostel) ) && 
                                            <tr>
                                                <td>Does the student need Hostal : </td>
                                                <td><input type="radio" name="hostel" onClick={()=>setHostel(true)} />Yes &emsp; <input type="radio" name="hostel" onClick={()=>setHostel(false)} />No</td>
                                            </tr>
                                            }
                                            {bus && <>
                                            <tr>
                                                <td>Bus Stop Area</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Bus Stop</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Available Bus</td>
                                                <td><input type="text" /><br/>Automatically</td>
                                            </tr>
                                            <tr>
                                                <td>Route Bus</td>
                                                <td>Automatically</td>
                                            </tr>
                                            </>}
                                            {hostel && <>
                                            <tr>
                                                <td>Room Type</td>
                                                <td><input type="radio" name="bus" onClick={()=>setBus(true)} />AC &emsp; <input type="radio" name="bus" onClick={()=>setBus(false)} />Non AC</td>
                                            </tr>
                                            <tr>
                                                <td>Food Type</td>
                                                <td><input type="radio" name="bus" onClick={()=>setBus(true)} />Veg &emsp; <input type="radio" name="bus" onClick={()=>setBus(false)} />Non Veg</td>
                                            </tr>
                                            </>}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {step === 3 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table className='AddTeacher-Table-List-1'>
                                        <tbody>
                                            <tr>
                                                <td colSpan={4}>Personal Details</td>
                                            </tr>
                                            <tr>
                                                <td>First Name</td>
                                                <td>Sathiya</td>
                                                <td>Last Name</td>
                                                <td>Siva</td>
                                            </tr>
                                            <tr>
                                                <td>DOB</td>
                                                <td>12/12/2012</td>
                                                <td>Gender</td>
                                                <td>Male</td>
                                            </tr>
                                            <tr>
                                                <td>Standard</td>
                                                <td>8th grade</td>
                                                <td>Aadhaar No</td>
                                                <td>798465894662</td>
                                            </tr>
                                            <tr>
                                                <td>Mother Tongue</td>
                                                <td>Tamil</td>
                                                <td>Blood Group</td>
                                                <td>B+</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4}>Family Details</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Do he/she have a Father?</td>
                                                <td colSpan={2} className='radio'>Yes</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Do he/she have a Mother?</td>
                                                <td colSpan={2} className='radio'>No</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Do he/she have a Siblings?</td>
                                                <td colSpan={2} className='radio'>No</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4}>Father Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td>Siva Kumar</td>
                                                <td>Age</td>
                                                <td>40</td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td>PHD in Maths</td>
                                                <td>Occupation</td>
                                                <td>Sr. Professor,VIT,Vellore</td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td>9875462135</td>
                                                <td>Email ID</td>
                                                <td>sivakumar12@gmail.com</td>
                                            </tr>
                                            <tr>
                                                <td>Annaual Income</td>
                                                <td>10000000-20000000</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4}>School Bus and Hostel Details</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Does the student need school bus : </td>
                                                <td colSpan={2}>Yes</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Does the student need Hostal : </td>
                                                <td colSpan={2}>No</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4}>School Bus Details</td>
                                            </tr>
                                            <tr>
                                                <td>Bus Stop Area</td>
                                                <td>Katpadi</td>
                                                <td>Bus Stop</td>
                                                <td>Muthtamzil Nager</td>
                                            </tr>
                                            <tr>
                                                <td>Available Bus</td>
                                                <td>3A</td>
                                                <td>Route Bus</td>
                                                <td>Thotapalayam Via Katpadi</td>
                                            </tr>
                                            
                                        </tbody>
                                    </Table>
                                </div>
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
        </div>

    )
}

export default AddTeacher
