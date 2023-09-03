import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import * as Solid from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { viewBonafide } from '../../actions/bonafide';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAssessment, getAssessmentAnswers, updateAssessment, updateQuestionPaper } from '../../actions/assessments';
import { Accordion, Table, Button, Modal } from 'react-bootstrap';
import { requestClassStudents } from '../../actions/students';
import { getMarksByID } from '../../actions/marks';
import { Uploader } from 'rsuite';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Teacher = (props) => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [marksEntry, setMarksEntry] = useState([]);
    const [assessmentData, setAssessmentData] = useState(null);
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];
    const assessments = props.assessments;
    const classID = assessments.docs.filter((item) => item._id === props.assessmentID)[0].class._id;
    const dispatch = useDispatch();


    const studentList = useSelector((state) => state.allStudentsReducer)
    const marks = useSelector((state) => state.marksReducer)
    const answers = useSelector((state) => state.answersReducer)
    console.log(marks)
    console.log(answers)
    console.log(marksEntry)
    console.log(studentList)

    useEffect(() => {
        dispatch(requestClassStudents(classID));
        dispatch(getAssessmentAnswers(props.assessmentID));
        dispatch(getMarksByID(props.assessmentID));
    }, [dispatch, classID, props.assessmentID])

    useEffect(() => {
        if (studentList && marks && marks.docs) {
            let temp = [];
            studentList.docs.map((stu) => {
                let mark1 = 0
                if (marks.docs.length > 0) {
                    marks.docs.filter((mark) => mark.assessment._id === props.assessmentID && stu._id === mark.student._id).map((mark) => {
                        mark1 = mark.scoredMarks;
                        return true;
                    })
                }
                temp.push({
                    id: stu._id,
                    scoredMarks: mark1,
                    remarks: "",
                })
                return true;
            })
            setMarksEntry(temp);
        }
    }, [studentList, marks, props.assessmentID])

    if(!assessmentData && assessments){
        let temp = {};
        assessments.docs.filter((ass)=>ass._id===props.assessmentID).map((ass)=>{
            temp = ass;
            return true;
        })
        setAssessmentData(temp);
    }
    
    var toolbarOptions = [[{ 'list': 'bullet' }, 'bold', 'italic', 'underline', { 'list': 'ordered' }, 'link']];
    const module = {
        toolbar: toolbarOptions,
    };

    const handleDateFormat = (date1) => {
        const date = new Date(date1);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const userLocale = navigator.language || navigator.userLanguage;
        const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(date);
        return formattedDate
    }

    const checkDueDate = (date1) => {
        const startDate = new Date();
        const endDate = new Date(date1);
        if (endDate.getTime() - startDate.getTime() > 0)
            return true;
        else
            return false;
    }

    const handleDelete = () => {
        dispatch(deleteAssessment(props.assessmentID, navigate));
        props.close();
    }

    const handleUpdateAssessment = () =>{
        let request1 = [];
        let flag=1;
        assessments.docs.filter((ass)=>ass._id===props.assessmentID).map((ass)=>{
            if(ass.title!==assessmentData.title){
                request1.push({
                    propName:"title",
                    value:assessmentData.title,
                })
            }
            if(ass.description!==assessmentData.description){
                request1.push({
                    propName:"description",
                    value:assessmentData.description,
                })
            }
            if(ass.lastDate!==assessmentData.lastDate){
                request1.push({
                    propName:"lastDate",
                    value:assessmentData.lastDate,
                })
            }
            if(ass.maxMarks!==assessmentData.maxMarks){
                request1.push({
                    propName:"maxMarks",
                    value:assessmentData.maxMarks,
                })
            }
            if(ass.weightageMarks!==assessmentData.weightageMarks){
                request1.push({
                    propName:"weightageMarks",
                    value:assessmentData.weightageMarks,
                })
            }
            if(ass.questionPaper!==assessmentData.questionPaper){
                const formData = new FormData();
                
                console.log(assessmentData)
                if(assessmentData.questionPaper.length!==0){
                    var classID = assessmentData.class._id;
                    console.log(assessmentData.questionPaper)
                    formData.append('questionPaper', assessmentData.questionPaper[0].blobFile, assessmentData.questionPaper[0].blobFile.name);
                    formData.append('class', classID);
                    console.log(assessmentData.questionPaper)
                    dispatch(updateQuestionPaper(props.assessmentID,formData))
                }
                else{
                    flag=0;
                    alert("File can't be empty");
                }
                
            }
            return true;
        })
        if(request1.length>0 && flag===1){
            dispatch(updateAssessment(props.assessmentID,request1))
        }
    }

    const handleUpdateMarks = () => {
        let request1 = [];
        let request2 = [];
        marksEntry.map((stu) => {
            if(marks.docs.filter((mark) => mark.assessment._id === props.assessmentID && stu.id === mark.student._id && stu.scoredMarks!==mark.scoredMarks).length>0){
                request1.push({
                    propName: "scoredMarks",
                    value: stu.scoredMarks,
                })
                return true;
            }
            if (marks.docs.filter((mark1) => mark1.student._id === stu.id).length === 0) {
                request2.push({
                    type: "assessment",
                    id: stu.id,
                    scoredMarks: stu.scoredMarks,
                    remarks: "",
                })
            }
            return true;
        })
        if (request1.length > 0)
            console.log(request1);//patch request
        if (request2.length > 0)
            console.log(request2);//post request
    }

    const handleFile = (request) => {
        console.log(request);
        dispatch(viewBonafide(request));
    }

    const handleInputChange = (value, index, field) => {
        setMarksEntry(prev => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
    }

    const checkInput = (index, value) => {
        if (value > assessments.docs.filter((ass) => ass._id === props.assessmentID)[0].maxMarks) {
            alert("Mark can't be more than the maximum mark");
            handleInputChange(0, index, "scoredMarks");
        }
        else if (value < 0) {
            alert("Mark can't be less than zero");
            handleInputChange(0, index, "scoredMarks");
        }
    }

    const handleClose = () => {
        dispatch({ type: "FETCH_CLASS_STUDENTS", payload: null });
        props.close();
    }

    const handleCloseModal = () => {
        setShow(false);
        let temp = {};
        assessments.docs.filter((ass)=>ass._id===props.assessmentID).map((ass)=>{
            temp = ass;
            return true;
        })
        setAssessmentData(temp);
    }

    return (
        <>
            {
                assessments.docs.filter((item) => item._id === props.assessmentID).map((item) => (
                    <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                        <div className='Assessment-tab-1'>
                            <h2>{item.title}</h2>
                            <Button className='btn btn-primary' onClick={() => handleClose()}>Back</Button>
                        </div>
                        <hr style={{ border: "1px solid gray" }} />

                        <div style={{ width: "100%" }} className="AddStudent-container">
                            <div className='row' style={{ width: "100%", minWidth: "600px" }}>
                                <div className='float-md-right col-lg-7 col-xl-8'>
                                    <div style={{fontSize:"18px"}} dangerouslySetInnerHTML={{ __html: item.description }} />
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header style={{ padding: "initial" }}>Student List</Accordion.Header>
                                            <Accordion.Body>
                                                <div className='table-responsive'>
                                                    <Table className='Bonafide-content-table'>
                                                        <thead>
                                                            <tr>
                                                                <th>S.No</th>
                                                                <th>Name</th>
                                                                <th>Status</th>
                                                                <th>Date</th>
                                                                <th>Mark</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                marksEntry.length > 0 ?
                                                                    marksEntry.map((marks, index) => (
                                                                        studentList.docs.filter((stu) => stu._id === marks.id).map((stu) => (
                                                                            <tr>
                                                                                <td>{index + 1}</td>
                                                                                <td>{stu.firstName + " " + stu.lastName}</td>
                                                                                <td>Not Uploaded</td>
                                                                                <td>-</td>
                                                                                <td><input value={marks.scoredMarks} onBlur={(e) => checkInput(index, e.target.value)} onChange={(e) => handleInputChange(e.target.value, index, "scoredMarks")} type="number" min={0} max={item.maxMarks} /></td>
                                                                            </tr>
                                                                        ))
                                                                    ))
                                                                    :
                                                                    <tr>
                                                                        <td colSpan={6} style={{ textAlign: "center" }}>No Data</td>
                                                                    </tr>
                                                            }

                                                        </tbody>
                                                    </Table>
                                                </div>
                                                <div className='d-flex justify-content-end '>
                                                    <button onClick={()=>handleUpdateMarks()} className='btn btn-success'>Update</button>
                                                    &emsp;
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <br />
                                </div>
                                <div className='float-md-left col-lg-5 col-xl-4'>
                                    <table style={{ minWidth: "100px" }} className='AddStudent-Table-List'>
                                        <tr>
                                            <td>Class</td>
                                            <td>
                                                {
                                                    standardList.filter((item1) => item1.value === item.class.standard).map((standard) => (<>{standard.label}</>))
                                                }
                                                th {item.class.section}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Subject</td>
                                            <td>{item.class.subject}</td>
                                        </tr>
                                        <tr>
                                            <td>Posted on</td>
                                            <td>{handleDateFormat(item.postedOn)}</td>
                                        </tr>
                                        <tr>
                                            <td>Due Date</td>
                                            <td>{handleDateFormat(item.lastDate)}</td>
                                        </tr>
                                        <tr>
                                            <td>Maximum Mark</td>
                                            <td>{item.maxMarks}</td>
                                        </tr>
                                        <tr>
                                            <td>Weightage Mark</td>
                                            <td>{item.weightageMarks}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ verticalAlign: "top" }}>Uploaded file</td>
                                            <td>
                                                <button className='btn btn-primary btn-sm' onClick={() => handleFile(item.questionPaper)}>File</button>
                                            </td>
                                        </tr>
                                            <tr>
                                                <td style={{ textAlign: "right" }} colSpan={2}>
                                                    <Button className='btn btn-success btn-sm' onClick={() => setShow(true)}>
                                                        Edit
                                                    </Button>
                                                    &emsp;&emsp;
                                                    <Button className='btn btn-danger btn-sm' onClick={() => handleDelete()}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            <Modal
                show={show}
                onHide={() => handleCloseModal()}
                dialogClassName="modal-90w"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Edit Assessment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='table-responsive'>
                        {
                            assessmentData && 
                    <Table>
                        <tr>
                            {
                               console.log(assessmentData)
                            }
                            <td className='edit-title'>
                                Assessment Title                                
                            </td>
                            <td className='edit-title'>:</td>
                            <td>
                                <input onChange={(e)=>setAssessmentData((prev)=>({...prev,title:e.target.value}))} value={assessmentData.title} type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td className='edit-title'>
                                Assessment<br />
                                Description
                            </td>
                            <td className='edit-title'>:</td>
                            <td>
                            <ReactQuill onChange={(value)=>setAssessmentData((prev)=>({...prev,description:value}))} theme="snow" modules={module} value={assessmentData.description} />
                            </td>
                        </tr>
                        <tr>
                            <td className='edit-title'>Due Date</td>
                            <td className='edit-title'>:&emsp;</td>
                            {console.log(assessmentData.lastDate.slice(0,16))}
                            <td><input onChange={(e)=>setAssessmentData((prev)=>({...prev,lastDate:e.target.value}))} value={assessmentData.lastDate.slice(0,16)} type="datetime-local" /></td>
                        </tr>
                        <tr>
                            <td className='edit-title'>Maximum Mark</td>
                            <td className='edit-title'>:&emsp;</td>
                            <td><input onChange={(e)=>setAssessmentData((prev)=>({...prev,maxMarks:e.target.value}))} value={assessmentData.maxMarks} type="number" /></td>
                        </tr>
                        <tr>
                            <td className='edit-title'>Weigthage Mark</td>
                            <td className='edit-title'>:&emsp;</td>
                            <td><input onChange={(e)=>setAssessmentData((prev)=>({...prev,weightageMarks:e.target.value}))} value={assessmentData.weightageMarks} type="number" /></td>
                        </tr>
                        <tr>
                            <td className='edit-title'>Uploaded<br />Files</td>
                            <td className='edit-title'>:</td>
                            <td>
                                {
                                    assessmentData.questionPaper.includes("https") ?
                                    <>
                                    <button className='btn btn-primary' onClick={() => handleFile(assessmentData.questionPaper)}>File</button>
                                    <button onClick={()=>setAssessmentData((prev)=>({...prev,questionPaper:[]}))} className='btn custom-btn'><FontAwesomeIcon icon={Solid.faTrash} /></button>
                                    </>
                                    :
                                    <Uploader onChange={(value)=>setAssessmentData((prev)=>({...prev,questionPaper:value}))} autoUpload={false} disabled={assessmentData.questionPaper.length!==0 ? true : false }/>
                                }
                                
                            </td>
                        </tr>
                    </Table>
                }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => handleUpdateAssessment()} className='btn btn-success'>Save</button>
                    <button onClick={() => handleCloseModal()} className='btn btn-danger'>Cancel</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Teacher
