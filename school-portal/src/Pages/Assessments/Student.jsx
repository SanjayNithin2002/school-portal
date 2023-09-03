import React, { useState, useEffect } from 'react'
import { Uploader } from 'rsuite';

import "./Assessments.css"
import { useDispatch, useSelector } from 'react-redux'
import { deleteAnswers, postAnswers } from '../../actions/assessments'
import { requestTeacher } from '../../actions/teachers';
import { viewBonafide } from '../../actions/bonafide';
import Table from "react-bootstrap/Table"

const Student = (props) => {
    const dispatch = useDispatch()
    const [selectedFile, setSelectedFile] = useState(null)
    const allAssessments = props.assessments
    const answers = props.answers

    useEffect(() => {
        dispatch(requestTeacher(props.teacherID))
    }, [dispatch, props.teacherID])

    const teacher = useSelector((state) => state.teacherReducer)

    console.log(allAssessments)
    console.log(answers)
    console.log(teacher)

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

    const handleFileChange = (fileList) => {
        setSelectedFile(fileList[0]);
    };

    const close1 = () => {
        props.close();
    }

    const handleSubmit = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('assessment', props.assessmentID);
            formData.append('student', localStorage.getItem('id'));
            formData.append('answerFile', selectedFile.blobFile, selectedFile.blobFile.name);
            console.log(formData)
            dispatch(postAnswers(formData))
        }
        else {
            alert('Kindly upload the file')
        }
    }

    const checkDueDate = (date1) => {
        const startDate = new Date();
        const endDate = new Date(date1);
        if (endDate.getTime() - startDate.getTime() > 0)
            return true;
        else
            return false;
    }

    const handleDelete = (answerID) => {
        dispatch(deleteAnswers(answerID));
    }

    const handleFile = (request) => {
        dispatch(viewBonafide(request));
    }

    return (
        allAssessments && allAssessments.docs.filter((item) => item._id === props.assessmentID).map((item) => (
            <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                <div className='row Assessment-tab-1'>
                    <h2 className='col-lg-9 col-md-7 col-sm-6'>{item.title}</h2>
                    <h4 className='col-lg-3 col-md-5 col-sm-6 h4'>{item.class.subject}</h4>
                </div>
                <hr style={{ border: "1px solid gray" }} />
                <div style={{ width: "100%" }} className="AddStudent-container">
                    <div className='row' style={{ width: "100%", minWidth: "600px" }}>
                        <div className='float-md-right col-lg-7 col-xl-8'>
                            <div style={{fontSize:"18px"}} dangerouslySetInnerHTML={{ __html: item.description }} />
                            <br />
                            {
                                answers && answers.docs.length !== 0 ? answers.docs.filter((item1) => item1.assessment._id === props.assessmentID).map((item1) => (
                                    item1.answerFile !== null ?
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <button className='btn btn-primary' onClick={() => handleFile(item1.answerFile)}>View Answer</button>
                                        </div>
                                        :
                                        <>
                                            {checkDueDate(item.lastDate) &&
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <Uploader autoUpload={false} onChange={handleFileChange} disabled={selectedFile ? true : false} />
                                                </div>
                                            }
                                        </>

                                ))
                                    :
                                    <>
                                        {checkDueDate(item.lastDate) &&
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <Uploader autoUpload={false} onChange={handleFileChange} disabled={selectedFile ? true : false} />
                                            </div>
                                        }
                                    </>
                            }

                        </div>
                        <div className='float-md-left col-lg-5 col-xl-4'>
                            <Table style={{ minWidth: "100px" }} className='AddStudent-Table-List'>
                                <tr>
                                    <td style={{ width: "40%" }}>Posted By</td>
                                    <td style={{ width: "59%" }}>
                                        {
                                            teacher && teacher !== null && <>
                                                {teacher.docs.firstName + " " + teacher.docs.lastName}</>
                                        }
                                    </td>
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
                                    <td>Uploaded On</td>
                                    {
                                        answers && answers.docs.length !== 0 ? answers.docs.filter((item1) => item1.assessment._id === props.assessmentID).map((item1) => (
                                            item1.answersFile !== null ?
                                                <td>date</td>
                                                :
                                                <td>---</td>
                                        ))
                                            :
                                            <td>---</td>
                                    }
                                </tr>
                                {
                                    answers && answers.docs.length !== 0 ?
                                        answers.docs.filter((item1) => item1.assessment._id === props.assessmentID).map((item1) => (
                                            item1.answersFile === null ?
                                                <tr>
                                                    <td style={{ textAlign: "right" }} colSpan={2}>
                                                        {
                                                            checkDueDate(item.lastDate) &&
                                                            <><button className='btn btn-success' onClick={() => handleSubmit()}>Submit</button>&emsp;</>
                                                        }
                                                        <button className='btn btn-danger' onClick={() => close1()}>Back1</button>&emsp;
                                                    </td>
                                                </tr>
                                                :
                                                <tr>
                                                    <td style={{ textAlign: "right" }} colSpan={2}>
                                                        <button className='btn btn-danger' onClick={() => handleDelete(item1._id)}>Delete</button>&emsp;

                                                        <button className='btn btn-warning' onClick={() => close1()}>Back3</button>&emsp;
                                                    </td>
                                                </tr>
                                        ))
                                        :
                                        <tr>
                                            <td style={{ textAlign: "right" }} colSpan={2}>
                                                {
                                                    checkDueDate(item.lastDate) &&
                                                    <><button className='btn btn-success' onClick={() => handleSubmit()}>Submit</button>&emsp;</>
                                                }
                                                <button style={{ backgroundColor: "#dc3545" }} className='btn btn-danger' onClick={() => close1()}>Back2</button>&emsp;
                                            </td>
                                        </tr>
                                }
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}

export default Student
