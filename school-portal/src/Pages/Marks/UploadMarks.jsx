import React, { useEffect, useState } from 'react'
import { Steps, ButtonGroup, Button, Uploader } from 'rsuite';
import Table from 'react-bootstrap/Table'
import "./Marks.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMarks, postMarks, postManyFile, delMarks, postMany, getMarksCSV } from '../../actions/marks';
import { getAnswers, getAssessments } from '../../actions/assessments';
import {requestClassStudents} from '../../actions/students';
const UploadMarks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const [subject, setSubject] = useState("");
    const [exam, setExam] = useState("");
    const [assessment, setAssessment] = useState("");
    const [step, setStep] = useState(0);
    const [file, setFile] = useState();
    const [assessmentId, setAssessmentId] = useState("");
    const [examId, setExamId] = useState("");
    const [studentData, setStudentData] = useState([]);
    const [classId, setClassId] = useState("");
    useEffect(() => {
        dispatch(getMarks({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }));
        dispatch(getMarksCSV({ token: localStorage.getItem('token') }));
        dispatch(getAnswers({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }));
        dispatch(requestClassStudents({id: localStorage.getItem('id')}));
    }, [dispatch]);

    const m = useSelector((state) => state.marksReducer)
    const csvData = useSelector((state) => state.marksCSVReducer)
    const answers = useSelector((state) => state.marksReducer)
    const classList = useSelector((state)=>state.allStudentsReducer)
    console.log(m)
    // console.log(answers)
    // console.log(csvData)
    // console.log(localStorage.getItem('token'))
    // console.log(classList)

    //download ans for marks
    const handleAnswerDownload = (studentId) => {
        const studentAnswers = answers && answers.docs.filter((item) =>
            item.assessment._id === assessmentId && item.student._id === studentId
        );
        if (studentAnswers.length > 0) {
            const item1 = studentAnswers[0];
            const blobUrl = URL.createObjectURL(item1.answerFile);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'downloaded-file-name.extension'; // Change the file name and extension accordingly
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        }
    }
const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }]

    const handleStudentListDownload = () => {
        const blob = new Blob([csvData.data.toString()], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = "fileName";
        link.click();
    }
    const handleStudentListUpload = (files) => {
        if (files.length !== 0) {
            let blob = new Blob([files[0].toString()], { type: 'text/csv' });
            setFile(blob)
        }
    }
    const handleSubmit1 = () => {
        if (file) {
            const formData = new FormData();
            formData.append('type', "assessment");
            formData.append('assessment', "64923d1b6255f24e230a6c60");
            formData.append('marks', file);
            dispatch(postManyFile(formData))
        }
    }
    //do submit2 and form studentdata

    // useEffect(() => {
    //     if (assessment && standard && section && subject) {
    //         const studentDataFromAssessment = m.docs.assessmentMarks
    //             .filter(item => (
    //                 item.assessment.class.standard === parseInt(standard) &&
    //                 item.assessment.class.section === section &&
    //                 item.assessment.class.subject === subject &&
    //                 item.title === assessment
    //             ));

    //         setAssessmentId(studentDataFromAssessment[0].assessment._id);

    //         const constructedStudentData = studentDataFromAssessment.map(item => ({
    //             type: "assessment",
    //             assessment: item.assessment._id,
    //             student: item.student._id,
    //             scoredMarks: "",
    //             remarks: ""
    //         }));

    //         setStudentData(constructedStudentData);
    //     } else if (exam) {
    //         const studentDataFromExam = m.docs.examMarks
    //             .filter(item => (
    //                 item.student.standard === parseInt(standard) &&
    //                 item.student.section === section &&
    //                 item.exam.class.subject === subject &&
    //                 item.exam.examName === exam
    //             ));

    //         setExamId(studentDataFromExam[0].exam._id);

    //         const constructedStudentData = studentDataFromExam.map(item => ({
    //             type: "exam",
    //             exam: item.exam._id,
    //             student: item.student._id,
    //             scoredMarks: "",
    //             remarks: ""
    //         }));

    //         setStudentData(constructedStudentData);
    //     }
    // }, [assessment, exam, standard, section, subject, m]);
    
    useEffect(() => {
        if (assessment && standard && section && subject) {
            const studentDataFromAssessment = m.docs.assessmentMarks
                .filter(item => (
                    item.class.standard === parseInt(standard) &&
                    item.class.section === section &&
                    item.class.subject === subject &&
                    item.title === assessment
                ));
            setAssessmentId(studentDataFromAssessment[0]._id);
            setClassId(studentDataFromAssessment[0].class._id);

            // const constructedStudentData = {
            //     type: "assessment",
            //     assessment: studentDataFromAssessment[0]._id,
            //     marks: studentDataFromAssessment.map(item => ({
            //         student: item.student._id,
            //         scoredMarks: "",
            //         remarks: "None"
            //     }))
            // };
            // setStudentData(constructedStudentData);
            
        } else if (exam) {
            const studentDataFromExam = m.docs.examMarks
                .filter(item => (
                    item.standard === parseInt(standard) &&
                    item.section === section &&
                    item.subject === subject &&
                    item.examName === exam
                ));
                console.log(studentDataFromExam)
            setExamId(studentDataFromExam[0]._id);

            // const constructedStudentData = {
            //     type: "exam",
            //     exam: studentDataFromExam[0].exam._id,
            //     marks: studentDataFromExam.map(item => ({
            //         student: item.student._id,
            //         scoredMarks: "",
            //         remarks: "None"
            //     }))
            // };
            // setStudentData(constructedStudentData);

        }
    }, [assessment, exam, standard, section, subject, m]);


    const handleMarkChange = (id, newMark) => {
        setStudentData(prevStudentData => {
            const updatedMarks = prevStudentData.marks.map(student => {
                if (student.student === id) {
                    return { ...student, scoredMarks: newMark };
                }
                return student;
            });
            return { ...prevStudentData, marks: updatedMarks };
        });
    };

    const handleRemarksChange = (id, newRemarks) => {
        setStudentData(prevStudentData => {
            const updatedMarks = prevStudentData.marks.map(student => {
                if (student.student === id) {
                    return { ...student, remarks: newRemarks };
                }
                return student;
            });
            return { ...prevStudentData, marks: updatedMarks };
        });
    };


    const handleSubmit2 = () => {
        if (studentData && studentData.marks) {
            const filteredMarks = studentData.marks.filter(student => (
                student.scoredMarks !== "" && student.remarks !== ""
            ));

            const updatedStudentData = {
                ...studentData,
                marks: filteredMarks
            };

            console.log(updatedStudentData);
        dispatch(postMany(updatedStudentData))
        }
    };



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
                        <h2>Upload Marks</h2>
                        {step === 1 ? <button className='btn btn-primary' onClick={handleStudentListDownload}>Download Student List</button> : <></>}
                        {step === 1 ? <Uploader autoUpload={false} accept=".csv" onChange={handleStudentListUpload} /> : <></>}
                        {step === 1 ? <button className='btn btn-primary' onClick={handleSubmit1}>Submit File</button> : <></>}
                        {step === 1 ? <button className='btn btn-primary' onClick={handleSubmit2}>Submit marks</button> : <></>}
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
                                                            Array.from(new Set(m.docs.assessmentMarks.map((i) => i.title))).map((i) => {
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
                                                            Array.from(new Set(m.docs.examMarks.map((i) => i.examName))).map((i) => {
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
                                                                    Array.from(new Set(m.docs.assessmentMarks.map((i) => i.class.standard))).map((i) => {
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
                                                                    Array.from(new Set(m.docs.assessmentMarks.map((i) => i.class.section))).map((i) => {
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
                                                                    Array.from(new Set(m.docs.assessmentMarks.map((i) => i.class.subject))).map((i) => {
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
                                                                    Array.from(new Set(m.docs.examMarks.map((i) => i.standard))).map((i) => {
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
                                                                    Array.from(new Set(m.docs.examMarks.map((i) => i.section))).map((i) => {
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
                                                                    Array.from(new Set(m.docs.examMarks.map((i) => i.subject))).map((i) => {
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
                                                    <th>File Uploaded</th>
                                                    <th>Marks Scored</th>
                                                    <th>Max Marks</th>
                                                    <th>Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    standard && section && subject ?
                                                        <>

                                                            {m.docs.assessmentMarks
                                                                .filter((item) => {
                                                                    return (
                                                                        item.class.standard === parseInt(standard) &&
                                                                        item.class.section === section &&
                                                                        item.class.subject === subject &&
                                                                        item.title === assessment
                                                                    );
                                                                }).map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{item.student.firstName}</td>
                                                                            <td>{item.student.lastName}</td>
                                                                            <td><button className='btn btn-primary' onClick={() => handleAnswerDownload(item.student._id)}>File</button></td>
                                                                            <td><input type="number" value={item.mark} onChange={(e) => handleMarkChange(item.student._id, e.target.value)} ></input></td>
                                                                            <td>{item.assessment.maxMarks}</td>
                                                                            <td><input type="text" value={item.mark} onChange={(e) => handleRemarksChange(item.student._id, e.target.value)}></input></td>                                                                        </tr>
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
                                                    <th>File Uploaded</th>
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
                                                                            <td><button className='btn btn-primary' onClick={() => handleAnswerDownload()}>File</button></td>
                                                                            <td><input type="number" value={item.mark} onChange={(e) => handleMarkChange(index, e.target.value)} ></input></td>
                                                                            <td>{item.assessment.maxMarks}</td>
                                                                            <td><input type="text" value={item.mark} onChange={(e) => handleRemarksChange(index, e.target.value)}></input></td>                                                                        </tr>
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
