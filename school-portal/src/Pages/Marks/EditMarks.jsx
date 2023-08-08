import React, { useEffect, useState } from 'react'
import { Steps, ButtonGroup, Button, Uploader } from 'rsuite';
import Table from 'react-bootstrap/Table'
import "./Marks.css"
import { useDispatch, useSelector } from 'react-redux';
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { useNavigate } from 'react-router-dom';
import { getMarks, postMarks, postMany, delMarks, getMarksCSV } from '../../actions/marks';
import marksCSVReducer from '../../reducers/MarksCSV';

const UploadMarks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const [subject, setSubject] = useState("");
    const [exam, setExam] = useState("");
    const [assessment, setAssessment] = useState("");
    const [id, setId] = useState("");
    const [mark, setMark] = useState([]);
    const [step, setStep] = useState(0);
    const [selectedFile, setSelectedFile] = useState('');


    useEffect(() => {
        dispatch(getMarks({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }));
        dispatch(getMarksCSV({ token: localStorage.getItem('token') }))
    }, [dispatch])
    const m = useSelector((state) => state.marksReducer)
    const csvData = useSelector((state) => state.marksCSVReducer)

    // console.log(m)
    // console.log(csvData)

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }]
    let tt;
    if (m) {
        tt = {
            "type": "assessment",
            "assessment": "64923d1b6255f24e230a6c60",
            "student": "646c95f4814b7bf44c74be11",
            "scoredMarks": "2",
            "remarks": "bad"
        }
    }
    const handleSubmit = () => {
        // dispatch(postMarks(tt))
        // dispatch(delMarks(tt))
        // dispatch(postMany())
        const blob = new Blob([csvData.data.toString()], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = "fileName";
        link.click();
    }


    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
    };


    return (
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2>Edit Marks</h2>
                        {step === 1 ? <button className='btn btn-primary' onClick={() => handleSubmit()}>Submit</button> : <></>}
                        {step === 1 ? <button className='btn btn-primary' onClick={() => handleSubmit()}>dow</button> : <></>}
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div>
                        <Steps current={step}>
                            <Steps.Item title="General" />
                            <Steps.Item title="Marks" />
                        </Steps>
                        <br /><br />
                        {step === 0 &&
                            <div className='row'>
                                <div className='col-lg-12 justify-content-center'>
                                    <Table className='AddStudent-Table-List-1'>
                                        <tbody>
                                            <tr>
                                                <td>Select Assessment</td>
                                                <td>
                                                    <select className="selectPicker3" value={assessment} onChange={(e) => { setAssessment(e.target.value); setExam("") }}>
                                                        <option value="" disabled>Select Assessment</option>
                                                        {m ?
                                                            Array.from(new Set(m.docs.assessmentMarks.map((i) => i.assessment.title))).map((i) => {
                                                                return <option value={i}>{i}</option>
                                                            })
                                                            : <></>
                                                        }
                                                    </select>
                                                </td>
                                                <td>Select Exam</td>
                                                <td>
                                                    <select className="selectPicker3" value={exam} onChange={(e) => { setExam(e.target.value); setAssessment("") }}>
                                                        <option value="" disabled>Select Exam</option>
                                                        {m ?
                                                            Array.from(new Set(m.docs.examMarks.map((i) => i.exam.examName))).map((i) => {
                                                                return <option value={i}>{i}</option>
                                                            })
                                                            : <></>
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            {assessment ?
                                                <>
                                                    <tr>
                                                        <td>Select Class </td>
                                                        <td>
                                                            <select className="selectPicker3" value={standard} onChange={(e) => setStandard(e.target.value)}>
                                                                <option value="" disabled>Select Class</option>
                                                                {m ?
                                                                    Array.from(new Set(m.docs.assessmentMarks.map((i) => i.assessment.class.standard))).map((i) => {
                                                                        const item = standardList.find(item => item.value === 5);
                                                                        return <option value={i}>{item.label}</option>
                                                                    })

                                                                    : <></>}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Select Section </td>
                                                        <td>
                                                            <select className="selectPicker3" value={section} onChange={(e) => setSection(e.target.value)}>
                                                                <option value="" disabled>Select Section</option>
                                                                {m ?
                                                                    Array.from(new Set(m.docs.assessmentMarks.map((i) => i.assessment.class.section))).map((i) => {
                                                                        return <option value={i}>{i}</option>
                                                                    })
                                                                    : <></>}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Select Subject </td>
                                                        <td>
                                                            <select className="selectPicker3" value={subject} onChange={(e) => setSubject(e.target.value)}>
                                                                <option value="" disabled>Select Subject</option>
                                                                {m ?
                                                                    Array.from(new Set(m.docs.assessmentMarks.map((i) => i.assessment.class.subject))).map((i) => {
                                                                        return <option value={i}>{i}</option>
                                                                    })
                                                                    : <></>}
                                                            </select>
                                                        </td>
                                                    </tr></>
                                                : <></>
                                            }
                                            {exam ?
                                                <>
                                                    <tr>
                                                        <td>Select Class </td>
                                                        <td>
                                                            <select className="selectPicker3" value={standard} onChange={(e) => setStandard(e.target.value)}>
                                                                <option value="" disabled>Select Class</option>
                                                                {m ?
                                                                    Array.from(new Set(m.docs.examMarks.map((i) => i.exam.class.standard))).map((i) => {
                                                                        const item = standardList.find(item => item.value === 5);
                                                                        return <option value={i}>{item.label}</option>
                                                                    })

                                                                    : <></>}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Select Section </td>
                                                        <td>
                                                            <select className="selectPicker3" value={section} onChange={(e) => setSection(e.target.value)}>
                                                                <option value="" disabled>Select Section</option>
                                                                {m ?
                                                                    Array.from(new Set(m.docs.examMarks.map((i) => i.exam.class.section))).map((i) => {
                                                                        return <option value={i}>{i}</option>
                                                                    })
                                                                    : <></>}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Select Subject </td>
                                                        <td>
                                                            <select className="selectPicker3" value={subject} onChange={(e) => setSubject(e.target.value)}>
                                                                <option value="" disabled>Select Subject</option>
                                                                {m ?
                                                                    Array.from(new Set(m.docs.examMarks.map((i) => i.exam.class.subject))).map((i) => {
                                                                        return <option value={i}>{i}</option>
                                                                    })
                                                                    : <></>}
                                                            </select>
                                                        </td>
                                                    </tr></>
                                                : <></>
                                            }

                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                        }
                        {step === 1 &&
                            <div className='row'>
                                <div className='col-lg-12 justify-content-center'>
                                    {assessment ?
                                        <Table className='AddStudent-Table-List-1'>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Marks Scored</th>
                                                    <th>Max Marks</th>
                                                    <th>Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    standard && section && subject ?
                                                        <>
                                                            {/* {
                                                             t=m.docs.assessmentMarks.filter((item)=>{
                                                                return (
                                                                    item.assessment.class.standard === parseInt(standard) &&
                                                                    item.assessment.class.section === section &&
                                                                    item.assessment.class.subject === subject &&
                                                                    item.assessment.title === assessment
                                                                    );
                                                            })
                                                        }
                                                        {console.log(t)} */}
                                                            {m.docs.assessmentMarks
                                                                .filter((item) => {
                                                                    return (
                                                                        item.assessment.class.standard === parseInt(standard) &&
                                                                        item.assessment.class.section === section &&
                                                                        item.assessment.class.subject === subject &&
                                                                        item.assessment.title === assessment
                                                                    );
                                                                }).map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{item.student.firstName}</td>
                                                                            <td>{item.student.lastName}</td>
                                                                            <td><input type="number" value={mark} onChange={(e) => setMark(e.target.value)} ></input></td>
                                                                            <td>{item.assessment.maxMarks}</td>
                                                                            <td><input type="text"></input></td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                        </>
                                                        :
                                                        <tr>
                                                            <td style={{ textAlign: "center" }} colSpan={12}>No Data</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </Table>
                                        : <></>}


                                    {exam ?
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Marks Scored</th>
                                                    <th>Max Marks</th>
                                                    <th>Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    standard && section && subject ?
                                                        <>
                                                            {m.docs.examMarks
                                                                .filter((item) => {
                                                                    return (
                                                                        item.student.standard === parseInt(standard) &&
                                                                        item.student.section === section &&
                                                                        item.exam.class.subject === subject &&
                                                                        item.exam.examName === exam
                                                                    );
                                                                }).map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{item.student.firstName}</td>
                                                                            <td>{item.student.lastName}</td>
                                                                            <td><input type="number"></input></td>
                                                                            <td>{item.exam.maxMarks}</td>
                                                                            <td><input type="text"></input></td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                        </>
                                                        :
                                                        <tr>
                                                            <td style={{ textAlign: "center" }} colSpan={8}>No Data</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </Table>
                                        : <></>}
                                </div>
                            </div>
                        }

                        <br /><br />
                        <ButtonGroup>
                            <Button onClick={onPrevious} disabled={step === 0}>
                                Previous
                            </Button>
                            <Button onClick={onNext} disabled={step === 1}>
                                Next
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadMarks
