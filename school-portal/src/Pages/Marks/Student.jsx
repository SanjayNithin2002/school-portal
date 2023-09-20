import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Table from "react-bootstrap/Table";
import { getMarksByStudentID } from '../../actions/marks';
import { getClass } from '../../actions/class';
import Accordion from 'react-bootstrap/Accordion';

const MarksStudent = () => {

  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [assessment, setAssessment] = useState("");
  const [exam, setExam] = useState("");
  const [assessmentID, setAssessmentID] = useState("");
  const [examID, setExamID] = useState("");
  const [subjectID, setSubjectID] = useState("");
  useEffect(() => {
    dispatch(getMarksByStudentID({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }));
    dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
  }, [dispatch])

  const studentMarks = useSelector((state) => state.marksReducer)
  console.log(studentMarks)
  const classes = useSelector((state) => state.allClassReducer)
  // console.log(classes)

  //set Subject id
  useEffect(() => {
    if (classes && subject) {
      const filteredSubjects = classes.docs.filter((i) => i.subject === subject).map((j) => j._id)
      if (filteredSubjects.length > 0)
        setSubjectID(filteredSubjects[0])
    }
  }, [classes, subject])

  //set Ass id
  useEffect(() => {
    if (studentMarks && assessment) {
      const filteredAssessments = studentMarks.docs.assessmentMarks.filter((i) => i.assessment.title === assessment && i.assessment.class._id === subjectID).map((j) => {
        return j._id;
      })
      if (filteredAssessments.length > 0)
        setAssessmentID(filteredAssessments[0])
    }
  }, [studentMarks, assessment])

  //set Exam id
  useEffect(() => {
    if (studentMarks && exam) {
      const filteredExams = studentMarks.docs.examMarks.filter((i) => i.exam.examName.name + " " + i.exam.examName.sequence === exam && i.exam.class._id === subjectID).map((j) => {
        return j._id;
      })
      if (filteredExams.length > 0)
        setExamID(filteredExams[0])
    }
  }, [studentMarks, exam])


  return (
    <>
      <div className="Main">
        <div className="Home">
          <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">

            <h2>Marks/Grade</h2>
            <hr style={{ border: "1px solid gray" }} />
            {
              <div className="row classmessage-container-1">

                <div className="col-lg-3">
                  <h4>Select Subject : </h4>
                </div>
                <div className="col-lg-3">
                  <select
                    className="selectPicker3"
                    value={subject}
                    onChange={(e) => { setSubject(e.target.value); }}
                  >
                    <option value="" disabled>
                      Select Subject
                    </option>
                    {classes ?
                      classes.docs.map((i) => {
                        return <option value={i.subject}>{i.subject}</option>
                      }) : <></>}
                  </select>
                </div>

                <div className="col-lg-3">
                  <h4>Select Assessment : </h4>
                </div>
                <div className="col-lg-3">
                  <select
                    className="selectPicker3"
                    value={assessment}
                    onChange={(e) => { setAssessment(e.target.value); setExam("") }}
                  >
                    <option value="" disabled>
                      Select Assessment
                    </option>
                    {studentMarks ?
                      studentMarks.docs.assessmentMarks.filter((j) => { if (j.assessment.class._id === subjectID) return j }).map((i) => {
                        return <option value={i.assessment.title}>{i.assessment.title}</option>
                      }) : <></>}
                  </select>
                </div>

                <div className="col-lg-3">
                  <h4>Select Exam : </h4>
                </div>
                <div className="col-lg-3">
                  <select
                    className="selectPicker3"
                    value={exam}
                    onChange={(e) => { setExam(e.target.value); setAssessment("") }}
                  >
                    <option value="" disabled>
                      Select Exam
                    </option>
                    {studentMarks ?
                      studentMarks.docs.examMarks.filter((j) => { if (j.exam.class._id === subjectID) return j }).map((i) => {
                        return <option value={i.exam.examName.name + " " + i.exam.examName.sequence}>{i.exam.examName.name + " " + i.exam.examName.sequence}</option>
                      }) : <></>}
                  </select>
                </div>
              </div>
            }
            <br></br>
            {
              studentMarks && examID ? (
                <div>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{exam}</Accordion.Header>
                      <Accordion.Body>
                        {studentMarks.docs.examMarks
                          .filter((i) => i.exam.class._id === subjectID && i._id === examID)
                          .map((j, index) => (
                            <Table>
                              <thead>
                                <tr>
                                  <th>Scored Marks</th>
                                  <th>Max Marks</th>
                                  <th>Weightage Scored Marks</th>
                                  <th>Weightage Marks</th>
                                  <th>Remarks</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{j.scoredMarks}</td>
                                  <td>{j.exam.maxMarks}</td>
                                  <td>{j.weightageScoredMarks}</td>
                                  <td>{j.exam.weightageMarks}</td>
                                  <td>{j.remarks}</td>
                                </tr>
                              </tbody>
                            </Table>
                          ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              ) : (
                <></>
              )
            }
<br></br>
            {studentMarks && assessmentID ?
              <div>
              <Accordion>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>{assessment}</Accordion.Header>
                  <Accordion.Body>
                    {studentMarks.docs.assessmentMarks
                      .filter((i) => i.assessment.class._id === subjectID && i._id === assessmentID)
                      .map((j, index) => (
                        <Table>
                          <thead>
                            <tr>
                              <th>Scored Marks</th>
                              <th>Max Marks</th>
                              <th>Weightage Scored Marks</th>
                              <th>Weightage Marks</th>
                              <th>Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{j.scoredMarks}</td>
                              <td>{j.assessment.maxMarks}</td>
                              <td>{j.weightageScoredMarks}</td>
                              <td>{j.assessment.weightageMarks}</td>
                              <td>{j.remarks}</td>
                            </tr>
                          </tbody>
                        </Table>
                      ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
              : <></>
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default MarksStudent

