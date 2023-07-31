import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Panel } from 'rsuite';
import './Home.css';
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
                                        <td align='right'></td>
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
