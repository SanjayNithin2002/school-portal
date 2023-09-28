import React, { useEffect, useState } from 'react'
import { Steps, ButtonGroup, Button, Uploader } from 'rsuite';
import Table from 'react-bootstrap/Table'
import "./Marks.css"
import { useDispatch, useSelector } from 'react-redux';
import { getMarks, postMarks, postManyFile, delMarks, postMany, getMarksCSV } from '../../actions/marks';
import { getAnswers, getAssessments } from '../../actions/assessments';
import { requestClassStudents } from '../../actions/students';
import { getClass } from "../../actions/class";
import { getStudentExam } from "../../actions/exam";
import { getMarksByAssessmentID, getMarksByExamID } from "../../actions/marks";
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"

const UploadMarks = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const [exam, setExam] = useState("");
    const [assessment, setAssessment] = useState("");
    const [step, setStep] = useState(0);
    const [file, setFile] = useState();
    const [assessmentID, setAssessmentID] = useState("");
    const [examID, setExamID] = useState("");
    const [classID, setClassID] = useState("");
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }]

    useEffect(() => {
        if (standard && section)
            dispatch(getMarksCSV({ standard: standard, section: section }));
        if (classID)
            dispatch(requestClassStudents("/UploadMarks",navigate,classID));
    }, [dispatch, classID])

    useEffect(() => {
        dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(getAssessments("/UploadMarks",navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(getStudentExam("/UploadMarks",navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])

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
                setAssessmentID(filteredAssessments[0])
        }
    }, [assessment, standard, section])
    //Set examID
    useEffect(() => {
        if (classes && exams && exam) {
            const filteredExams = Array.from(new Set(exams.docs.filter((i) => i.examName.name + " " + i.examName.sequence === exam && i.class.section === section))).map((j) => {
                return j._id;
            })

            if (filteredExams.length > 0) {
                setExamID(filteredExams[0])
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
    // console.log(classList)

    const [studentExamDataForUpload, setStudentExamDataForUpload] = useState({
        type: "exam",
        exam: null,
        marks: []
    });
    const [studentAssessmentDataForUpload, setStudentAssessmentDataForUpload] = useState({
        type: "Assessment",
        assessment: assessmentID,
        marks: []
    });

    //Initialize marks
    useEffect(() => {

        if (classID && students && StudentExamMarks) {
            // Iterate through students.docs and create marks data
            const initialMarks = students.docs.map((student) => ({
                student: student._id,
                scoredMarks: "",
                remarks: "None",
            }));
            const unmarkedList = initialMarks.filter((i) => {
                return !StudentExamMarks.docs.some((j) => i.student === j.student._id);
            });

            // Update the state with the initial marks data
            setStudentExamDataForUpload((prevData) => ({
                ...prevData,
                exam: examID,
                marks: unmarkedList,
            }));
        }
    }, [students, classID, examID, StudentExamMarks]);

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

    // Download CSV of list of students
    const handleStudentListDownload = () => {
        const blob = new Blob([csvData.data.toString()], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = "fileName";
        link.click();
    }

    const handleStudentFileUpload = (e) => {
        setFile(e.target.files[0])
    }

    // File submit
    const handleSubmitFile = (event) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('marks', file, file.name);
            formData.append('exam', examID);
            formData.append('type', "exam");
            dispatch(postManyFile(formData)).then(() => {
                alert('Successfully submitted');
                navigate("/Marks")
            })
                .catch((error) => {
                    alert("Submission failed" + error)
                });
        }
    }

    const handleMarkChange = (id, newMark) => {
        const studentIndex = studentExamDataForUpload.marks.findIndex((student) => student.student === id);

        if (studentIndex !== -1) {
            // Student is found, update their data
            setStudentExamDataForUpload((prevData) => {
                const updatedMarks = [...prevData.marks];
                updatedMarks[studentIndex].scoredMarks = newMark;
                return { ...prevData, marks: updatedMarks };
            });
        } else {
            alert("Wrong Entry");
        }
    };

    const handleRemarkChange = (id, newRemark) => {
        const studentIndex = studentExamDataForUpload.marks.findIndex((student) => student.student === id);
        if (studentIndex !== -1) {
            // Student is found, update their data
            setStudentExamDataForUpload((prevData) => {
                const updatedRemarks = [...prevData.marks];
                updatedRemarks[studentIndex].remarks = newRemark;
                return { ...prevData, marks: updatedRemarks };
            });
        } else {
            alert("Wrong Entry");
        }
    };

    // Non- file sumbmit
    const handleSubmitMarks = () => {
        dispatch(postMany(studentExamDataForUpload)).then(() => {
            alert('Successfully submitted');
            navigate("/Marks")
        })
            .catch((error) => {
                alert("Submission failed" + error)
            });
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
                    <div className="upload-marks-container">
                        <h2>Upload Marks</h2>
                        {step === 1 && (
                            <div className="upload-buttons">
                                <button className="btn btn-primary" onClick={handleStudentListDownload}>
                                    Download Student List
                                </button>
                                <form encType="multipart/form-data" onSubmit={handleSubmitFile}>
                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        <input
                                            id="file-upload"
                                            type="file"
                                            onChange={(e) => handleStudentFileUpload(e)}
                                        />
                                        Choose File
                                    </label>
                                    <button className="btn btn-primary" type="submit">
                                        Submit File
                                    </button>
                                </form>
                                <button className="btn btn-primary" onClick={handleSubmitMarks}>
                                    Submit Marks
                                </button>
                            </div>
                        )}
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
                                                onChange={(e) => { setStandard(e.target.value); setAssessment(""); setExam(""); }}
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
                                                onChange={(e) => { setExam(e.target.value); setAssessment(""); setAssessmentID(null) }}
                                            >
                                                <option value="" disabled>
                                                    Select Exam
                                                </option>
                                                {
                                                    exams && classes &&
                                                    Array.from(new Set(exams.docs.filter((i) => i.class._id === classID))).map((j) => {
                                                        return <option value={j.examName.name + " " + j.examName.sequence}>{j.examName.name + " " + j.examName.sequence}</option>
                                                    })
                                                }
                                            </select>
                                        </div>

                                        {/* <div className="col-lg-3">
                                            <h4>Select Assessment : </h4>
                                        </div>
                                        <div className="col-lg-3">
                                            <select
                                                className="selectPicker3"
                                                value={assessment}
                                                onChange={(e) => { setAssessment(e.target.value); setExam(""); setExamID(null)}}
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
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                        }

                        {step === 1 &&
                            <div className='row'>
                                <div className='col-lg-12 justify-content-center'>
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
                                                    StudentExamMarks && students ?
                                                        <>
                                                            {
                                                                students.docs.map((student, index) => {
                                                                    const examMark = StudentExamMarks.docs.find(
                                                                        (mark) =>
                                                                            mark.student &&
                                                                            mark.student._id.includes(student._id)
                                                                    );
                                                                    const examInfo = exams.docs.find((exam) => exam._id.includes(examID));
                                                                    const maxMarks = examInfo?.maxMarks || 0;
                                                                    return (
                                                                        <tr key={index} className="table-row">
                                                                            <td>{index + 1}</td>
                                                                            <td>{student.firstName}</td>
                                                                            <td>{student.lastName}</td>
                                                                            <td>{examMark ? (examMark.scoredMarks) : (<input type="number" className="custom-input" required min="0" max={maxMarks} onChange={(e) => handleMarkChange(student._id, e.target.value)} />)}</td>
                                                                            <td>{maxMarks ? maxMarks : "-"}</td>
                                                                            <td> {examMark ? (examMark.remarks) : (<input type="text" className="custom-input" onChange={(e) => handleRemarkChange(student._id, e.target.value)} />)} </td>
                                                                        </tr>
                                                                    );
                                                                })
                                                            }


                                                        </>
                                                        :
                                                        <></>
                                                }
                                            </tbody>

                                        </Table>
                                        : <></>}
                                    {assessment ?
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Marks Scored</th>
                                                    <th>Weightage Scored Marks</th>
                                                    <th>Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    StudentAssessmentMarks && students ?
                                                        <>
                                                            {
                                                                students.docs.map((student, index) => {
                                                                    const AssessmentMark = StudentAssessmentMarks.docs.find(
                                                                        (mark) =>
                                                                            mark.student &&
                                                                            mark.student._id.includes(student._id)
                                                                    );

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{student.firstName}</td>
                                                                            <td>{student.lastName}</td>
                                                                            <td>{AssessmentMark ? AssessmentMark.scoredMarks : "-"}</td>
                                                                            <td>{AssessmentMark ? AssessmentMark.weightageScoredMarks.toFixed(2) : "-"}</td>
                                                                            <td>{AssessmentMark ? AssessmentMark.remarks : "-"}</td>
                                                                        </tr>
                                                                    );
                                                                })
                                                            }

                                                        </>
                                                        :
                                                        <></>
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
