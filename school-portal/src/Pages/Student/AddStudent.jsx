import React,{useState} from 'react'
import { Steps, ButtonGroup, Button } from 'rsuite';

import SideNavBar from "../../components/SideNavBar/SideNavBar";
import "./Student.css";
import Table from 'react-bootstrap/esm/Table';

const AddStudent = () => {
    const [step, setStep] = useState(0);
    const [father,setFather] = useState(false);
    const [mother,setMother] = useState(false); 
    // eslint-disable-next-line
    const [siblings,setSiblings] = useState(false);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 4 ? 4 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <h2>Add Student</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="">
                        <Steps current={step}>
                            <Steps.Item title="Personal" />
                            <Steps.Item title="Family" />
                            <Steps.Item title="School Bus" />
                            <Steps.Item title="Hostel" />
                            <Steps.Item title="Review" />
                        </Steps>
                        <br />
                        {step === 0 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='AddStudent-Table-List'>
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
                                                <td>Standard</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Section</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Mother Tongue</td>
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
                                    <Table bordered className='AddStudent-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td>Do he/she have a Father?</td>
                                                <td className='radio'><input type="radio" name="father" onClick={()=>setFather(true)} />Yes &emsp; <input type="radio" name="father" onClick={()=>setFather(false)} />No</td>
                                            </tr>
                                            <tr>
                                                <td>Do he/she have a Mother?</td>
                                                <td className='radio'><input type="radio" name="mother" onClick={()=>setMother(true)} />Yes &emsp; <input type="radio" name="mother" onClick={()=>setMother(false)} />No</td>
                                            </tr>
                                            <tr>
                                                <td>Do he/she have a Siblings?</td>
                                                <td className='radio'><input type="radio" name="siblings" />Yes &emsp; <input type="radio" name="siblings" />No</td>
                                            </tr>
                                            {father && <>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>Father Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Age</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Occupation</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Annual Income</td>
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
                                            </>
                                            }
                                            {mother && <>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>Mother Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Age</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Occupation</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Annual Income</td>
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
                                            </>
                                            }
                                            {!father && !mother && <>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>Guardian Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Age</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Occupation</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Annual Income</td>
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
                                            </>
                                            }
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
                            <Button onClick={onNext} disabled={step === 4}>
                                Next
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddStudent
