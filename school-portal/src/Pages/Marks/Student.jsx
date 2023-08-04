import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Table from "react-bootstrap/Table";
import { TagGroup, Tag } from 'rsuite';
import { getMarksForStudent } from '../../actions/marks';

const MarksStudent = () => {

  const dispatch = useDispatch();
  const [assessment, setAssessment] = useState("");
  const [exam, setExam] = useState("");
  useEffect(() => {
    dispatch(getMarksForStudent({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }));
  }, [dispatch])

  const m = useSelector((state) => state.marksReducer)
  console.log(m)
  return (
    <>
<div className="Main">
            <div className="Home">
                <div style={{padding:"20px 40px"}} class="container1 container rounded bg-white">

            <h2>Marks/Grade</h2>
            <hr style={{ border: "1px solid gray" }} />
            <div>
              {m ?
                <div className="row classmessage-container-1">
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
                        Select Section
                      </option>
                      {Array.from(new Set(m.docs.assessmentMarks.map((i) => i.assessment.title))).map((i) => {
                        return <option value={i}>{i}</option>
                      })}
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
                      {Array.from(new Set(m.docs.examMarks.map((i) => i.exam.examName))).map((i) => {
                        return <option value={i}>{i}</option>
                      })}
                    </select>
                  </div>
                </div>
                :
                <></>
              }
              <br />
              <br />

              {assessment ?
                <Table striped bordered responsive hover>
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Subject</th>
                      <th>Marks Scored</th>
                      <th>Max Marks</th>
                      <th>Weightage Scored Marks</th>
                      <th>Weightage Marks</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      assessment ?
                        <>
                          {m.docs.assessmentMarks
                            .filter((item) => {
                              return (
                                item.assessment.title === assessment
                              );
                            }).map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.assessment.class.subject}</td>
                                  <td>{item.scoredMarks}</td>
                                  <td>{item.assessment.maxMarks}</td>
                                  <td>{item.weightageScoredMarks}</td>
                                  <td>{item.assessment.weightageMarks}</td>
                                  <td>{item.remarks}</td>
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
                :
                <></>}
              {exam ?
                <Table striped bordered responsive hover>
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Subject</th>
                      <th>Marks Scored</th>
                      <th>Max Marks</th>
                      <th>Weightage Scored Marks</th>
                      <th>Weightage Marks</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      exam ?
                        <>
                          {m.docs.examMarks
                            .filter((item) => {
                              return (
                                item.exam.examName === exam
                              );
                            }).map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.exam.class.subject}</td>
                                  <td>{item.scoredMarks}</td>
                                  <td>{item.exam.maxMarks}</td>
                                  <td>{item.weightageScoredMarks}</td>
                                  <td>{item.exam.weightageMarks}</td>
                                  <td>{item.remarks}</td>
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
        </div>
      </div>
    </>
  )
}
export default MarksStudent

