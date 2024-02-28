import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Panel } from 'rsuite';
import './Profile.css';
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table"
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"
import { getUserDetails } from '../../actions/currentUser';
import { getAttendance } from '../../actions/attendance';
import { Calendar } from "react-big-calendar";
import { locales, localizer } from "../Attendance/Attendance";

function ViewTeacher({ status, onLoading, id, close, location1, type }) {

  const navigate = useNavigate();
  const location = useLocation();
  const toaster = useToaster();
  const dispatch = useDispatch();
  const [events, setEvents] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [buttonType, setButtonType] = useState("personal");
  useEffect(() => {
    if (fetchStatus) {
      onLoading(true);
      dispatch(getUserDetails(location1, navigate, { type, id }))
    }
  }, [dispatch, fetchStatus, navigate])

  const User = useSelector(state => state.singleUserReducer);
  const attendances = useSelector((state) => state.attendanceReducer);

  console.log(User)
  console.log(events);
  console.log(attendances)

  useEffect(() => {
    if (User && fetchStatus) {
      dispatch(getAttendance(location, navigate, { type, id }))
    }
  }, [User, dispatch, navigate, fetchStatus])

  useEffect(() => {
    if (attendances) {
      onLoading(false);
    }
  }, [attendances])

  useEffect(() => {
    if (attendances) {
      let result = []
      if (attendances.docs && attendances.docs.length > 0) {
        attendances.docs.map((item) => {
          result.push({
            title1: item.status,
            start: item.date,
            end: item.date
          })
          return true;
        })
      }
      console.log(result);
      setEvents(result);
    }
  }, [attendances])

  const handleDateFormat = (date1) => {
    const date = new Date(date1);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const userLocale = navigator.language || navigator.userLanguage;
    const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(date);
    return formattedDate
  }
  const CustomEvent = ({ event }) => {
    return (
        <>
            {
                event.title1 === "Absent" &&
                <div className="attendance-status-view" style={{ backgroundColor: "red" }}>{event.title1}</div>
            }
            {
                event.title1 === "Present" &&
                <div className="attendance-status-view" style={{ backgroundColor: "green" }}>{event.title1}</div>
            }
        </>
    )
}


  const handleBack1 = () => {
    close();
    dispatch({ type: "FETCH_USER_DETAILS", payload: null });
    dispatch({ type: "USER_FETCH_ATTENDANCE", payload: null });
  }

  return (
    User &&
    <div className="Main">
      <div className="Home">
        <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
          <div className='row justify-content-between' >
            <h2 className=' col-xl-11 col-lg-11 col-md-10 col-sm-10'>Profile</h2>
            <button style={{ maxWidth: "100px" }} className='btn btn-warning col-xl-1 col-lg-1 col-md-2 col-sm-2' onClick={() => { handleBack1() }} >Back</button>
          </div>
          <hr style={{ border: "1px solid gray" }} />
          <div className='Profile-Container row'>
            <div className='col-lg-3 col-md-4 Profile-Container-1'>
              <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: "100%", maxWidth: "240px" }}>
                <img alt="no img" src={User.profile ? User.profile : "https://via.placeholder.com/240x240"} height="200" width="100%" />
                <table>
                  <tr>
                    <td style={{ fontWeight: "bolder" }} align='left'>Name</td>
                    <td align='left'>{User.docs.firstName} {User.docs.lastName}</td>
                  </tr>
                </table>
              </Panel>
            </div>
            <div className='col-lg-9 col-md-8 Profile-Container-2'>
              <div className='Profile-Container-2-1'>
                <div className='Profile-tab'>
                  <div className="Profile-tab-1 ">
                    <button onClick={() => setButtonType("personal")} className={buttonType === "personal" ? "btn btn-primary" : "btn btn-outline-primary"}>Personal Details</button>&ensp;
                    {
                      localStorage.getItem("type") === "admin" && <>

                        <button onClick={() => setButtonType("educational")} className={buttonType === "educational" ? "btn btn-primary" : "btn btn-outline-primary"}>Educational Details</button>&ensp;
                        <button onClick={() => setButtonType("attendance")} className={buttonType === "attendance" ? "btn btn-primary" : "btn btn-outline-primary"}>Attendance Details</button>&ensp;
                        <button onClick={() => setButtonType("salary")} className={buttonType === "salary" ? "btn btn-primary" : "btn btn-outline-primary"}>Salary Details</button>&ensp;
                      </>
                    }
                  </div>
                </div>
              </div>
              <div className='Profile-Container-2-1'>
                <div className='Profile-content table-responsive'>
                  {
                    buttonType === "personal" &&
                    <>
                      <h4>Personal Details</h4>
                      <div className='table-responsive bdr'>
                        <Table className='Profile-content-table'>
                          <tr>
                            <th>Information</th>
                            <th>Details</th>
                          </tr>
                          <tr>
                            <td>EMP Number</td>
                            <td>{User.docs.empID}</td>
                          </tr>
                          <tr>
                            <td>Date Of Birth</td>
                            <td> {User.docs.dob && handleDateFormat(User.docs.dob)}</td>
                          </tr>
                          <tr>
                            <td>Gender</td>
                            <td>{User.docs.gender}</td>
                          </tr>
                          <tr>
                            <td>Blood Group</td>
                            <td>{User.docs.bloodGroup}</td>
                          </tr>
                          <tr>
                            <td>Aadhaar No</td>
                            <td>{User.docs.aadharNumber}</td>
                          </tr>
                          <tr>
                            <td>Mother Tongue</td>
                            <td>{User.docs.motherTongue}</td>
                          </tr>
                          <tr>
                            <td>Email ID</td>
                            <td>{User.docs.email}</td>
                          </tr>
                          <tr>
                            <td>Address Line1</td>
                            <td>{User.docs.address.line1}</td>
                          </tr>
                          <tr>
                            <td>Address Line2</td>
                            <td>{User.docs.address.line2}</td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>{User.docs.address.city}</td>
                          </tr>
                          <tr>
                            <td>State</td>
                            <td>{User.docs.address.state}</td>
                          </tr>
                          <tr>
                            <td>Pincode</td>
                            <td>{User.docs.address.pincode}</td>
                          </tr>
                        </Table>
                      </div>
                    </>
                  }
                  {
                    buttonType === "educational" &&
                    <>
                      <h4>Educational Details</h4>
                      <div className='table-responsive bdr'>
                        <Table className='Profile-content-table'>
                          <tr>
                            <th colSpan={2}>Role Details</th>
                          </tr>
                          <tr>
                            <td>Designation</td>
                            <td>{User.docs.designation}</td>
                          </tr>
                          <tr>
                            <td>Role</td>
                            <td>{localStorage.getItem("type").charAt(0).toUpperCase() + localStorage.getItem("type").slice(1).toLowerCase()}</td>
                          </tr>
                          {
                            User.docs.primarySubject &&
                            <tr>
                              <td>Primary Subject</td>
                              <td>{User.docs.primarySubject}</td>
                            </tr>
                          }

                          <tr>
                            <td>Work Experience </td>
                            <td>{User.docs.experience}</td>
                          </tr>
                          {
                            User.docs.qualification.map((qual) => (
                              <>
                                <tr>
                                  <th colSpan={2}>{qual.title}</th>
                                </tr>
                                <tr>
                                  <td>College Name</td>
                                  <td>{qual.collegeName}</td>
                                </tr>
                                <tr>
                                  <td>Location</td>
                                  <td>{qual.collegelocation}</td>
                                </tr>
                                <tr>
                                  <td>Year Passout</td>
                                  <td>{qual.yearPassed}</td>
                                </tr>
                                <tr>
                                  <td>Percentage</td>
                                  <td>{qual.percentage}</td>
                                </tr>
                              </>
                            ))

                          }

                        </Table>


                      </div>
                    </>
                  }
                  {
                    buttonType === "attendance" &&
                    <>
                      <h4>Attendance Details</h4>
                      <div className='table-responsive bdr'>
                        {
                          events &&
                          <Calendar components={{ event: CustomEvent }} localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 500, minWidth: 500 }} />
                        }


                      </div>
                    </>
                  }
                  {
                    buttonType === "salary" &&
                    <>
                      <h4>Salary Details</h4>
                      <div className='table-responsive bdr'>
                        <Table className='Profile-content-table'>
                          <tr>
                            <th>Information</th>
                            <th>Details</th>
                          </tr>
                          <tr>
                            <td>Basic Salary</td>
                            <td>&#8377;{User.docs.salaryDetails.basic}</td>
                          </tr>
                          <tr>
                            <td>HRA </td>
                            <td>{User.docs.salaryDetails.hra}%</td>
                          </tr>
                          <tr>
                            <td>Conveyance </td>
                            <td>{User.docs.salaryDetails.conveyance}%</td>
                          </tr>
                          <tr>
                            <td>PA </td>
                            <td>{User.docs.salaryDetails.pa}%</td>
                          </tr>
                          <tr>
                            <td>PF </td>
                            <td>{User.docs.salaryDetails.pf}%</td>
                          </tr>
                          <tr>
                            <td>Professional Tax </td>
                            <td>{User.docs.salaryDetails.pt}%</td>
                          </tr>
                        </Table>


                      </div>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTeacher;
