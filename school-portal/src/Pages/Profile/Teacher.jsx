import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Panel } from 'rsuite';
import './Profile.css';
import { setCurrentUser } from "../../actions/currentUser";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table"


function Teacher() {

    const dispatch = useDispatch();
    const [buttonType, setButtonType] = useState("personal");
    useEffect(() => {
        dispatch(setCurrentUser({ type: localStorage.getItem("type"), id: localStorage.getItem("id") }))
    }, [dispatch])

    const currentUser = useSelector(state => state.currentUserReducer);
    console.log(currentUser)
    
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

    return (
        currentUser &&
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Profile</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='Profile-Container row'>
                        <div className='col-lg-3 col-md-4 Profile-Container-1'>
                            <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: "100%", maxWidth: "240px" }}>
                                <img alt="no img" src="https://via.placeholder.com/240x240" height="240" />
                                <table>
                                    <tr>
                                        <td align='left'>First Name</td>
                                        <td align='right'>{currentUser.docs.firstName}</td>
                                    </tr>
                                    <tr>
                                        <td align='left'>Last Name</td>
                                        <td align='right'>{currentUser.docs.lastName}</td>
                                    </tr>
                                </table>
                            </Panel>
                        </div>
                        <div className='col-lg-9 col-md-8 Profile-Container-2'>
                            <div className='Profile-Container-2-1'>
                                <div className='Profile-tab'>
                                    <div className="Profile-tab-1 ">
                                        <button onClick={() => setButtonType("personal")} className={buttonType === "personal" ? "btn btn-primary" : "btn btn-outline-primary"}>Personal Details</button>&ensp;
                                        <button onClick={() => setButtonType("educational")} className={buttonType === "educational" ? "btn btn-primary" : "btn btn-outline-primary"}>Educational Details</button>&ensp;
                                        <button onClick={() => setButtonType("salary")} className={buttonType === "salary" ? "btn btn-primary" : "btn btn-outline-primary"}>Salary Details</button>&ensp;
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
                                                        <td>{currentUser.docs.empID}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date Of Birth</td>
                                                        <td> { currentUser.docs.dob && handleDateFormat(currentUser.docs.dob)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Gender</td>
                                                        <td>{currentUser.docs.gender}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Blood Group</td>
                                                        <td>{currentUser.docs.bloodGroup}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Aadhaar No</td>
                                                        <td>{currentUser.docs.aadharNumber}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mother Tongue</td>
                                                        <td>{currentUser.docs.motherTongue}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email ID</td>
                                                        <td>{currentUser.docs.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address Line1</td>
                                                        <td>{currentUser.docs.address.line1}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address Line2</td>
                                                        <td>{currentUser.docs.address.line2}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>City</td>
                                                        <td>{currentUser.docs.address.city}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>State</td>
                                                        <td>{currentUser.docs.address.state}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pincode</td>
                                                        <td>{currentUser.docs.address.pincode}</td>
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
                                                        <td>{currentUser.docs.designation}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Role</td>
                                                        <td>{localStorage.getItem("type").charAt(0).toUpperCase() + localStorage.getItem("type").slice(1).toLowerCase()}</td>
                                                    </tr>
                                                    {
                                                        currentUser.docs.primarySubject &&
                                                        <tr>
                                                            <td>Primary Subject</td>
                                                            <td>{currentUser.docs.primarySubject}</td>
                                                        </tr>
                                                    }

                                                    <tr>
                                                        <td>Work Experience </td>
                                                        <td>{currentUser.docs.experience}</td>
                                                    </tr>
                                                    {
                                                        currentUser.docs.qualification.map((qual) => (
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
                                                        <td>&#8377;{currentUser.docs.salaryDetails.basic}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>HRA </td>
                                                        <td>{currentUser.docs.salaryDetails.hra}%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Conveyance </td>
                                                        <td>{currentUser.docs.salaryDetails.conveyance}%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>PA </td>
                                                        <td>{currentUser.docs.salaryDetails.pa}%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>PF </td>
                                                        <td>{currentUser.docs.salaryDetails.pf}%</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Professional Tax </td>
                                                        <td>{currentUser.docs.salaryDetails.pt}%</td>
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

export default Teacher;
