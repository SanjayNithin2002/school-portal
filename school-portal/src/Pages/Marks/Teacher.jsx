import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Table from "react-bootstrap/Table";
import { requestClassStudents } from '../../actions/students';
import { getClass } from "../../actions/class";
import { getAssessments } from "../../actions/assessments";
import { getMarksByAssessmentID, getMarksByExamID } from "../../actions/marks";
import { getStudentExam } from "../../actions/exam";
import matchers from '@testing-library/jest-dom/matchers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

const MarksTeacher = () => {

  const dispatch = useDispatch();
  const [standard, setStandard] = useState("");
  const [section, setSection] = useState("");
  const [classID, setClassID] = useState("");
  const [exam, setExam] = useState("");
  const [examID, setExamID] = useState("");
  const [assessment, setAssessment] = useState("");
  const [assessmentID, setAssessmentID] = useState("");
  const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }]

  useEffect(() => {
    dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    dispatch(getAssessments({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    dispatch(getStudentExam({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
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


  return (
    <>
      <div className="Main">
        <div className="Home">
          <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
            <div className='d-flex justify-content-between'>
              <h2>Marks View</h2>
              <Link to="/UploadMarks" className='btn btn-primary'><FontAwesomeIcon icon={solid.faPlus} /> Upload Marks</Link>
              <Link to="/EditMarks" className='btn btn-primary'><FontAwesomeIcon icon={solid.faPlus} /> Edit Marks</Link>
            </div>
            <hr style={{ border: "1px solid gray" }} />
            <div>
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

              <br />
              <br />

              {exam ?
                <Table striped bordered responsive hover>
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Marks Scored</th>
                      <th>Max Marks</th>
                      <th>Weightage Scored Marks</th>
                      <th>Weightage Marks</th>
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

                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{student.firstName}</td>
                                  <td>{student.lastName}</td>
                                  <td>{examMark ? examMark.scoredMarks : "-"}</td>
                                  <td>{examMark ? examMark.exam.maxMarks : "-"}</td>
                                  <td>{examMark ? examMark.weightageScoredMarks.toFixed(2) : "-"}</td>
                                  <td>{examMark ? examMark.exam.weightageMarks : "-"}</td>
                                  <td>{examMark ? examMark.remarks : "-"}</td>
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
        </div>
      </div>
    </>
  )
}
export default MarksTeacher