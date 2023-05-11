
import React, { useState } from 'react'
import { Steps, ButtonGroup, Button } from 'rsuite';
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./Exam.css"

const AddExam = () => {
    const [step, setStep] = useState(0);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Add Examination Schedule</h2>
                        <Link to="/AddSchedule" className='btn btn-primary'><FontAwesomeIcon icon={solid.faPlus} /> Add Schedule</Link>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div>
                        <Steps current={step}>
                            <Steps.Item title="General" />
                            <Steps.Item title="Subjects" />
                            <Steps.Item title="Review" />
                        </Steps>
                        <br /><br />
                        {step === 0 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table className='AddStudent-Table-List-1'>
                                        <tbody>
                                            <tr>
                                                <td>Exam Title</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Duration<br/>(in min)</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Class</td>
                                                <td><input type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Do student have class during exam ?</td>
                                                <td><input type="radio" name="class" />Yes &emsp; <input type="radio" name="class" />No</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {step === 1 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table className='AddStudent-Table-List-1'>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Subject</th>
                                                <th>Exam Date</th>
                                                <th>Start Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>English</td>
                                                <td><input type='text'/></td>
                                                <td><input type='text'/></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Tamil</td>
                                                <td><input type='text'/></td>
                                                <td><input type='text'/></td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Maths</td>
                                                <td><input type='text'/></td>
                                                <td><input type='text'/></td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Science</td>
                                                <td><input type='text'/></td>
                                                <td><input type='text'/></td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>social</td>
                                                <td><input type='text'/></td>
                                                <td><input type='text'/></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {step === 2 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table className='AddStudent-Table-List-1'>
                                        <tbody>
                                            <tr>
                                                <td colSpan={2} style={{textAlign:"center"}}> 
                                                    Exam Details
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Exam Title</td>
                                                <td>Monthly Exam</td>
                                            </tr>
                                            <tr>
                                                <td>Duration</td>
                                                <td>60 min</td>
                                            </tr>
                                            <tr>
                                                <td>Class</td>
                                                <td>4th Stardard</td>
                                            </tr>
                                            <tr>
                                                <td>Do student have class during exam ?</td>
                                                <td>Yes</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} style={{textAlign:"center"}}k>
                                                    Subject Details
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>English</td>
                                                <td>15/05/2023 & 8:00 am</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Tamil</td>
                                                <td>16/05/2023 & 8:00 am</td>
                                            </tr>
                                            <tr>
                                                <td>Maths</td>
                                                <td>17/05/2023 & 8:00 am</td>
                                            </tr>
                                            <tr>
                                                <td>Science</td>
                                                <td>18/05/2023 & 8:00 am</td>
                                            </tr>
                                            <tr>
                                                <td>Social</td>
                                                <td>19/05/2023 & 8:00 am</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        
                        <br /><br />
                        <ButtonGroup>
                            <Button onClick={onPrevious} disabled={step === 0}>
                                Previous
                            </Button>
                            <Button onClick={onNext} disabled={step === 2}>
                                Next
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddExam
