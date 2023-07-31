import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Table from "react-bootstrap/Table";
import { TagGroup, Tag } from 'rsuite';
import { getMarks } from '../../actions/marks';
import matchers from '@testing-library/jest-dom/matchers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

// const data = [
//   {
//     rollno: 5,
//     fname: "Arvind",
//     lname: "M M",
//     marks: 89,
//     grade: "B"
//   },
//   {
//     rollno: 5,
//     fname: "Dharan",
//     lname: "Kumar",
//     marks: 66,
//     grade: 'B'
//   },
//   {
//     rollno: 3,
//     fname: "Keerthy",
//     lname: "Suresh",
//     marks: 87,
//     grade: 'B'
//   },
//   {
//     rollno: 4,
//     fname: "Muthu",
//     lname: "Kumar",
//     marks: 56,
//     grade: 'B'
//   },
//   {
//     rollno: 5,
//     fname: "Ramya",
//     lname: "Pandian",
//     marks: 43,
//     grade: 'B'
//   },
//   {
//     rollno: 6,
//     fname: "Yeshwanth",
//     lname: "J D",
//     marks: 92,
//     grade: 'B'
//   },
// ];

const MarksTeacher = () => {

  const dispatch = useDispatch();
  const [standard, setStandard] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [exam, setExam] = useState("");
  const [assessment, setAssessment] = useState("");
  useEffect(() => {
    dispatch(getMarks({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }));
  }, [dispatch])

  const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }]
  const m = useSelector((state) => state.marksReducer)
  // console.log(m)

  // let sum = 0;
  // for (let i = 0; i < data.length; i++) {
  //   sum += data[i].marks;
  // }
  // const avg = (sum / data.length).toFixed(2);
  // let lmark = data[0].marks;
  // let hmark = data[0].marks;
  // for (let i = 0; i < data.length; i++) {
  //   if (lmark > data[i].marks)
  //     lmark = data[i].marks;
  //   if (hmark < data[i].marks)
  //     hmark = data[i].marks;
  // }
  {/* <TagGroup style={{ display: 'inline', margin: '10px' }}>
                    <Tag size="lg">Class Average</Tag>
                    <Tag size="lg">{avg}</Tag>
                  </TagGroup>
                  <TagGroup style={{ display: 'inline', margin: '10px' }}>
                    <Tag size="lg">Highest Mark</Tag>
                    <Tag size="lg">{hmark}</Tag>
                  </TagGroup>
                  <TagGroup style={{ display: 'inline', margin: '10px' }}>
                    <Tag size="lg">Lowest Mark</Tag>
                    <Tag size="lg">{lmark}</Tag>
                  </TagGroup> */}


  return (
    <>
          <div className="Main">
            <div className="Home">
                <div style={{padding:"20px 40px"}} class="container1 container rounded bg-white">
            <div className='d-flex justify-content-between'>
              <h2>Marks View</h2>
              <Link to="/UploadMarks" className='btn btn-primary'><FontAwesomeIcon icon={solid.faPlus} /> Upload Marks</Link>
            </div>
            <hr style={{ border: "1px solid gray" }} />
            <div>
              <div className="row">

                <div className="col-lg-3">
                  <h4>Select Class : </h4>
                </div>
                <div className="col-lg-3">
                  <select
                    className="selectPicker3"
                    value={standard}
                    onChange={(e) => setStandard(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Class
                    </option>
                    {m ?
                      Array.from(new Set(m.docs.examMarks.map((i) => i.student.standard))).map((i) => {
                        const item = standardList.find(item => item.value === 5);
                        return <option value={i}>{item.label}</option>
                      })
                      : <></>}
                  </select>
                </div>

                <div className="col-lg-3">
                  <h4>Select Section : </h4>
                </div>
                <div className="col-lg-3">
                  <select
                    className="selectPicker3"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Section
                    </option>
                    {m ?
                      Array.from(new Set(m.docs.examMarks.map((i) => i.student.section))).map((i) => {
                        return <option value={i}>{i}</option>
                      })
                      : <></>}
                  </select>
                </div>

                <div className="col-lg-3">
                  <h4>Select Subject : </h4>
                </div>
                <div className="col-lg-3">
                  <select
                    className="selectPicker3"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Subject
                    </option>
                    {m ?
                      Array.from(new Set(m.docs.examMarks.map((i) => i.exam.class.subject))).map((i) => {
                        return <option value={i}>{i}</option>
                      })
                      : <></>}
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
                    {m ?
                      Array.from(new Set(m.docs.examMarks.map((i) => i.exam.examName))).map((i) => {
                        return <option value={i}>{i}</option>
                      })
                      : <></>}
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
                    {m ?
                      Array.from(new Set(m.docs.assessmentMarks.map((i) => i.assessment.title))).map((i) => {
                        return <option value={i}>{i}</option>
                      })
                      : <></>}
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
              {assessment ?
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
                      standard && section && subject ?
                        <>
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
                : <></>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default MarksTeacher