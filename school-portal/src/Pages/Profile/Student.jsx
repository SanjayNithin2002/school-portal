import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Panel } from 'rsuite';
import './Profile.css';
import { setCurrentUser } from "../../actions/currentUser";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table"


function Home() {

    const dispatch = useDispatch();
    const [buttonType, setButtonType] = useState("personal");
    useEffect(() => {
        if(localStorage.getItem("token")){
        dispatch(setCurrentUser({ type: localStorage.getItem("type"), id: localStorage.getItem("id") }))
        }
    }, [dispatch])

    const currentUser = useSelector(state => state.currentUserReducer);
    console.log(currentUser)
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

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
                <div style={{padding:"20px 40px"}} class="container1 container rounded bg-white">
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
                                    <tr>
                                        <td align='left'>Class</td>
                                        <td align='right'>{standardList[currentUser.docs.standard - 1].label} - {currentUser.docs.section}</td>
                                    </tr>
                                </table>
                            </Panel>
                        </div>
                        <div className='col-lg-9 col-md-8 Profile-Container-2'>
                            <div className='Profile-Container-2-1'>
                                <div className='Profile-tab'>
                                    <div className="Profile-tab-1 ">
                                        <button onClick={() => setButtonType("personal")} className={buttonType === "personal" ? "btn btn-primary" : "btn btn-outline-primary"}>Personal Details</button>&ensp;
                                        <button onClick={() => setButtonType("parents")} className={buttonType === "parents" ? "btn btn-primary" : "btn btn-outline-primary"}>Parents Details</button>&ensp;
                                        <button onClick={() => setButtonType("bus_hostel")} className={buttonType === "bus_hostel" ? "btn btn-primary" : "btn btn-outline-primary"}>Bus & Hostel Details</button>&ensp;
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
                                                        <td>Application Number</td>
                                                        <td>{currentUser.docs.applicationNumber}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date Of Birth</td>
                                                        <td>{handleDateFormat(currentUser.docs.dob)}</td>
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
                                                        <td>{currentUser.docs.bloodGroup}</td>
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
                                        buttonType === "parents" &&
                                        <>
                                            <h4>Parents Details</h4>
                                            <div className='table-responsive bdr'>
                                                <Table className='Profile-content-table'>
                                                    {
                                                        currentUser.docs.father.name !== "NA" &&
                                                        <>
                                                            <tr>
                                                                <th colSpan={2}>Father Details</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>{currentUser.docs.father.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Age</td>
                                                                <td>{currentUser.docs.father.age}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Occupation</td>
                                                                <td>{currentUser.docs.father.occupation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Qualification</td>
                                                                <td>{currentUser.docs.father.qualification}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Annual Income</td>
                                                                <td>{currentUser.docs.father.annualIncome}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone No</td>
                                                                <td>{currentUser.docs.father.phoneNumber}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email ID</td>
                                                                <td>{currentUser.docs.father.email}</td>
                                                            </tr>
                                                        </>
                                                    }
                                                    {
                                                        currentUser.docs.mother.name !== "NA" &&
                                                        <>
                                                            <tr>
                                                                <th colSpan={2}>Mother Details</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>{currentUser.docs.mother.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Age</td>
                                                                <td>{currentUser.docs.mother.age}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Occupation</td>
                                                                <td>{currentUser.docs.mother.occupation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Qualification</td>
                                                                <td>{currentUser.docs.mother.qualification}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Annual Income</td>
                                                                <td>{currentUser.docs.mother.annualIncome}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone No</td>
                                                                <td>{currentUser.docs.mother.phoneNumber}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email ID</td>
                                                                <td>{currentUser.docs.mother.email}</td>
                                                            </tr>
                                                        </>
                                                    }
                                                    {
                                                        currentUser.docs.guardian.name !== "NA" &&
                                                        <>
                                                            <tr>
                                                                <th colSpan={2}>Guardian Details</th>
                                                            </tr>
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>{currentUser.docs.guardian.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Age</td>
                                                                <td>{currentUser.docs.guardian.age}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Occupation</td>
                                                                <td>{currentUser.docs.guardian.occupation}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Qualification</td>
                                                                <td>{currentUser.docs.guardian.qualification}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Annual Income</td>
                                                                <td>{currentUser.docs.guardian.annualIncome}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phone No</td>
                                                                <td>{currentUser.docs.guardian.phoneNumber}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email ID</td>
                                                                <td>{currentUser.docs.guardian.email}</td>
                                                            </tr>
                                                        </>
                                                    }


                                                </Table>


                                            </div>
                                        </>
                                    }
                                    {
                                        buttonType === "bus_hostel" &&
                                        <>
                                            <h4>Parents Details</h4>
                                            <div className='table-responsive bdr'>
                                                <Table className='Profile-content-table'>
                                                    <tr>
                                                        <th colSpan={2}>Bus Details</th>
                                                    </tr>
                                                    {
                                                        currentUser.docs.busDetails.isNeeded ?
                                                            <>
                                                                <tr>
                                                                    <td>Bus No</td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Timing</td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Bus Stop</td>
                                                                    <td>{currentUser.docs.busDetails.busStop },{currentUser.docs.busDetails.busStopArea}</td>
                                                                </tr>
                                                            </>
                                                            :
                                                            <tr>
                                                                <td colSpan={2}>No Data</td>
                                                            </tr>
                                                    }
                                                    <tr>
                                                        <th colSpan={2}>Hostel</th>
                                                    </tr>
                                                    {currentUser.docs.hostelDetails.isNeeded ?
                                                            <>
                                                                <tr>
                                                                    <td>Room No</td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Room Type</td>
                                                                    <td>{currentUser.docs.hostelDetails.roomType}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Mess</td>
                                                                    <td>{currentUser.docs.hostelDetails.foodType}</td>
                                                                </tr>
                                                            </>
                                                            :
                                                            <tr>
                                                                <td colSpan={2}>No Data</td>
                                                            </tr>
}
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

export default Home;
