import React, { useEffect, useState } from 'react'
import { Steps, ButtonGroup, Button, Uploader } from 'rsuite';
import Table from 'react-bootstrap/Table'
import "./Marks.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMarks, postMarks, postManyFile, delMarks, postMany, getMarksCSV } from '../../actions/marks';
import { getAnswers, getAssessments } from '../../actions/assessments';
import { requestClassStudents } from '../../actions/students';
import { getClass } from "../../actions/class";
import { getStudentExam } from "../../actions/exam";
import { getMarksByAssessmentID, getMarksByExamID } from "../../actions/marks";

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
    const [assessmentID, setAssessmentID] = useState("");
    const [examID, setExamID] = useState("");
    const [studentData, setStudentData] = useState([]);
    const [classID, setClassID] = useState("");

    useEffect(() => {
        dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(getAssessments({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(getStudentExam({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        if(standard && section)
        dispatch(getMarksCSV({ standard:"V", section: section }));
        if (classID)
            dispatch(requestClassStudents(classID));
    }, [dispatch, classID])
    
    let classes = useSelector((state) => state.allClassReducer) // get classes
    let students = useSelector((state) => state.allStudentsReducer) //get students
    let assessments = useSelector((state) => state.assessmentsReducer) //get assessments of that class
    let exams = useSelector((state) => state.examReducer)  //get exams of that class
    // console.log(classes)
    // console.log(students)
    // console.log(assessments)
    // console.log(exams)

    //Set classID
    useEffect(() => {
        if (classes && standard && section) {
            const filteredItems = classes.docs.filter(item => {
                return (
                    item.standard === parseInt(standard) &&
                    item.section === section &&
                    item.subject !== "Class Teacher"
                );
            });
            if (filteredItems.length > 0) {
                setClassID(filteredItems[0]._id)
            }
        }
    }, [classes, standard, section])
    //Set assessmentID
    useEffect(() => {
        if (classes && assessments && assessment) {
            const filteredAssessments = Array.from(new Set(assessments.docs.filter((i) => i.title === assessment))).map((j) => {
                return j._id;
            })
            if (filteredAssessments.length > 0)
                setAssessmentID(filteredAssessments)
        }
    }, [assessment, standard, section])
    //Set examID
    useEffect(() => {
        if (classes && exams && exam) {
            const filteredExams = Array.from(new Set(exams.docs.filter((i) => i.examName.name === exam))).map((j) => {
                return j._id;
            })

            if (filteredExams.length > 0) {
                setExamID(filteredExams)
                console.log(examID)
            }
        }
    }, [exam, standard, section])

    //get ass && exam marks
    useEffect(() => {
        if (assessmentID) {
            dispatch(getMarksByAssessmentID({ id: assessmentID }));
        }
        if (examID) {
            dispatch(getMarksByExamID({ id: examID }));
        }
    }, [assessmentID, examID]);

    let StudentAssessmentMarks = useSelector((state) => state.marksReducer)
    // console.log(StudentAssessmentMarks)
    let StudentExamMarks = useSelector((state) => state.marksReducer)
    // console.log(StudentExamMarks)

    const csvData = useSelector((state) => state.marksCSVReducer)
    // const answers = useSelector((state) => state.marksReducer)
    const classList = useSelector((state) => state.allStudentsReducer)
    // console.log(answers)
    // console.log(csvData)
    console.log(classList)

    //download ans for marks
    const handleAnswerDownload = (studentId) => {
        // const studentAnswers = answers && answers.docs.filter((item) =>
        //     item.assessment._id === assessmentID && item.student._id === studentID
        // );
        // if (studentAnswers.length > 0) {
        //     const item1 = studentAnswers[0];
        //     const blobUrl = URL.createObjectURL(item1.answerFile);

        //     const link = document.createElement('a');
        //     link.href = blobUrl;
        //     link.download = 'downloaded-file-name.extension'; // Change the file name and extension accordingly
        //     link.style.display = 'none';

        //     document.body.appendChild(link);
        //     link.click();

        //     document.body.removeChild(link);
        //     URL.revokeObjectURL(blobUrl);
        // }
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
            formData.append('assessment', assessmentID);
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

    // useEffect(() => {
    //     if (assessment && standard && section && subject) {
    //         const studentDataFromAssessment = m.docs.assessmentMarks
    //             .filter(item => (
    //                 item.class.standard === parseInt(standard) &&
    //                 item.class.section === section &&
    //                 item.class.subject === subject &&
    //                 item.title === assessment
    //             ));
    //         setAssessmentId(studentDataFromAssessment[0]._id);
    //         setClassId(studentDataFromAssessment[0].class._id);

    //         // const constructedStudentData = {
    //         //     type: "assessment",
    //         //     assessment: studentDataFromAssessment[0]._id,
    //         //     marks: studentDataFromAssessment.map(item => ({
    //         //         student: item.student._id,
    //         //         scoredMarks: "",
    //         //         remarks: "None"
    //         //     }))
    //         // };
    //         // setStudentData(constructedStudentData);

    //     } else if (exam) {
    //         const studentDataFromExam = m.docs.examMarks
    //             .filter(item => (
    //                 item.standard === parseInt(standard) &&
    //                 item.section === section &&
    //                 item.subject === subject &&
    //                 item.examName === exam
    //             ));
    //         console.log(studentDataFromExam)
    //         setExamId(studentDataFromExam[0]._id);

    //         // const constructedStudentData = {
    //         //     type: "exam",
    //         //     exam: studentDataFromExam[0].exam._id,
    //         //     marks: studentDataFromExam.map(item => ({
    //         //         student: item.student._id,
    //         //         scoredMarks: "",
    //         //         remarks: "None"
    //         //     }))
    //         // };
    //         // setStudentData(constructedStudentData);

    //     }
    // }, [assessment, exam, standard, section, subject, m]);


    const handleMarkChange = (id, newMark) => {
        // setStudentData(prevStudentData => {
        //     const updatedMarks = prevStudentData.marks.map(student => {
        //         if (student.student === id) {
        //             return { ...student, scoredMarks: newMark };
        //         }
        //         return student;
        //     });
        //     return { ...prevStudentData, marks: updatedMarks };
        // });
    };

    const handleRemarksChange = (id, newRemarks) => {
        // setStudentData(prevStudentData => {
        //     const updatedMarks = prevStudentData.marks.map(student => {
        //         if (student.student === id) {
        //             return { ...student, remarks: newRemarks };
        //         }
        //         return student;
        //     });
        //     return { ...prevStudentData, marks: updatedMarks };
        // });
    };


    const handleSubmit2 = () => {
        // if (studentData && studentData.marks) {
        //     const filteredMarks = studentData.marks.filter(student => (
        //         student.scoredMarks !== "" && student.remarks !== ""
        //     ));

        //     const updatedStudentData = {
        //         ...studentData,
        //         marks: filteredMarks
        //     };

        //     console.log(updatedStudentData);
        //     dispatch(postMany(updatedStudentData))
        // }
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

                                    <div className="row">
                                        <div className="col-lg-3">
                                            <h4>Select Standard : </h4>
                                        </div>
                                        <div className="col-lg-3">
                                            <select
                                                className="selectPicker3"
                                                value={standard}
                                                onChange={(e) => { setStandard(e.target.value); setAssessment(""); setExam("");}}
                                            >
                                                <option value="" disabled>
                                                    Select Standard
                                                </option>
                                                {
                                                    classes &&
                                                    Array.from(new Set(classes.docs.map((element) => element.standard))).map((item) => (
                                                        standardList.filter((class1) => class1.value === item).map((class1) => (
                                                            <option value={class1.value}>{class1.label}</option>
                                                        ))
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="col-lg-3">
                                            <h4>Select Section : </h4>
                                        </div>
                                        <div className="col-lg-3">
                                            <select
                                                className="selectPicker3"
                                                value={section}
                                                onChange={(e) => { setSection(e.target.value); setAssessment(""); setExam(""); }}
                                            >
                                                <option value="" disabled>
                                                    Select Section
                                                </option>
                                                {
                                                    classes &&
                                                    Array.from(new Set(classes.docs.filter((item) => parseInt(standard) === item.standard).map((element) => element.section))).map((item) => (
                                                        <option value={item}>{item}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="col-lg-3">
                                            <h4>Select Exam : </h4>
                                        </div>
                                        <div className="col-lg-3">
                                            <select
                                                className="selectPicker3"
                                                value={exam}
                                                onChange={(e) => { setExam(e.target.value); setAssessment(""); }}
                                            >
                                                <option value="" disabled>
                                                    Select Exam
                                                </option>
                                                {
                                                    exams && classes &&
                                                    Array.from(new Set(exams.docs.filter((i) => i.class._id === classID))).map((j) => {
                                                        return <option value={j.examName.name}>{j.examName.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col-lg-3">
                                            <h4>Select Assessment : </h4>
                                        </div>
                                        <div className="col-lg-3">
                                            <select
                                                className="selectPicker3"
                                                value={assessment}
                                                onChange={(e) => { setAssessment(e.target.value); setExam(""); }}
                                            >
                                                <option value="" disabled>
                                                    Select Assessment
                                                </option>
                                                {assessments && classes &&
                                                    Array.from(new Set(assessments.docs.filter((i) => i.class._id === classID))).map((j) => {
                                                        return <option value={j.title}>{j.title}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
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
                                                //
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
                                                //
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
