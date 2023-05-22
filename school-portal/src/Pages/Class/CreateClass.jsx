import React, { useState } from 'react'

import "./Class.css"
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { Steps, ButtonGroup, Button } from 'rsuite';
import Table from 'react-bootstrap/esm/Table';

function CreateClass() {
    const [step, setStep] = useState(0);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
    };
    const onNext = () => {
        onChange(step + 1);
    }
    const onPrevious = () => onChange(step - 1);
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Create Class</h2>
                        {
                            step === 2 && <button className='btn btn-primary'>Submit</button>
                        }
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="">
                        <Steps current={step}>
                            <Steps.Item title="Class" />
                            <Steps.Item title="Students" />
                            <Steps.Item title="Review" />
                        </Steps>
                        <br />
                        {
                            step === 0 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='CreateClass-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td>Standard</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>No of Working Days<br/>(per Week)</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Day Start Time</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Day End Time</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Duration per Class</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>No of Break or Lunch Period per Day ?</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>No of Subjects ?</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {
                            step === 1 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='CreateClass-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td>No of Boys </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>No of Girls</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>No of Sections</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Generate Automatically</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Preview</td>
                                            </tr>
                                            <tr>
                                                <td>Manual Entry<br/><a>Download</a></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Preview</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
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

export default CreateClass

// {
//     class:"VII",
//     sections:[{
//         section:"A",
//         Boys:[students._id],
//         Girls:[students._id],
//     }],
//     subject:[
//         "English",
//         "Tamil",
//         "Maths",
//         "Science",
//         "Social",
//         "Computer",
//         "Hindi",
//     ],
//     startTime:"9:00am",
//     endTime:"4:15pm",
//     duration:"45min",
//     break:[{
//         title:"break1"
//         startTime:"10:30am",
//         endTime:"10:45am",
//     },{
//         title:"Lunch"
//         startTime:"1:00pm",
//         endTime:"1:45pm",
//     }],
//     workingDays:5
//     }