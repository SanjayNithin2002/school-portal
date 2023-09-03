import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Input, InputGroup } from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNavBar from '../../components/SideNavBar/SideNavBar'

import "./Settings.css";
import { changePassword, changeUserID, setCurrentUser } from '../../actions/currentUser';
const styles = {
    width: 300,
    marginBottom: 10
};


function Settings() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setCurrentUser({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }));
    }, [dispatch])

    const currentUser = useSelector((state) => state.currentUserReducer)

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const [request1, setRequest1] = useState({
        id: "",
        currentUserID: "",
        newUserID: "",
        password: "",
    })

    const [request2, setRequest2] = useState({
        id: "",
        currentPassword: "",
        newPassword: "",
    })

    if (currentUser && request1.id === "") {
        console.log(currentUser.docs)
        setRequest1((prev) => ({ ...prev, id: currentUser.docs._id }))
    }

    if (currentUser && request2.id === "") {
        console.log(currentUser.docs)
        setRequest2((prev) => ({ ...prev, id: currentUser.docs._id }))
    }



    const handleSubmit1 = () => {
        dispatch(changeUserID(localStorage.getItem("type"), request1, navigate))
    }

    const handleSubmit2 = () => {
        dispatch(changePassword(localStorage.getItem("type"), request2, navigate))
    }

    return (
        <div className='Main'>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Settings</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div style={{ width: "100%" }} className="AddStudent-container">
                        <div style={{ minWidth: "500px" }}>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header style={{ padding: "initial" }}>Change User ID</Accordion.Header>
                                    <Accordion.Body className='Setting-Container'>
                                        <div className='Setting-Container-1'>
                                            <div className='row'>
                                                <div className='col-lg-2'><h6>Current User ID : </h6></div>
                                                <div className='col-lg-2'>
                                                    <InputGroup style={styles}>
                                                        <InputGroup.Addon>
                                                            <AvatarIcon />
                                                        </InputGroup.Addon>
                                                        <Input type="text" value={request1.currentUserID} onChange={(value) => setRequest1((prev) => ({ ...prev, currentUserID: value }))} />
                                                    </InputGroup>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-lg-2'><h6>New User ID : </h6></div>
                                                <div className='col-lg-2'>
                                                    <InputGroup style={styles}>
                                                        <InputGroup.Addon>
                                                            <AvatarIcon />
                                                        </InputGroup.Addon>
                                                        <Input type="text" value={request1.newUserID} onChange={(value) => setRequest1((prev) => ({ ...prev, newUserID: value }))} />
                                                    </InputGroup>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-lg-2'><h6>Password : </h6></div>
                                                <div className='col-lg-2'>
                                                    <InputGroup inside style={styles}>
                                                        <Input value={request1.password} onChange={(value) => setRequest1((prev) => ({ ...prev, password: value }))} type={visible4 ? 'text' : 'password'} />
                                                        <InputGroup.Button onClick={() => setVisible4(!visible4)}>
                                                            {visible4 ? <EyeIcon /> : <EyeSlashIcon />}
                                                        </InputGroup.Button>
                                                    </InputGroup>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-lg-2'>
                                                    <button className='btn btn-primary' onClick={handleSubmit1}>Change</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Change Password</Accordion.Header>
                                    <Accordion.Body className='Setting-Container'>
                                        <div className='Setting-Container-1'>
                                            <div className='row'>
                                                <div className='col-lg-2'><h6>Current Password : </h6></div>
                                                <div className='col-lg-2'>
                                                    <InputGroup inside style={styles}>
                                                        <Input value={request2.currentPassword} onChange={(value) => setRequest2((prev) => ({ ...prev, currentPassword: value }))} type={visible1 ? 'text' : 'password'} />
                                                        <InputGroup.Button onClick={() => setVisible1(!visible1)}>
                                                            {visible1 ? <EyeIcon /> : <EyeSlashIcon />}
                                                        </InputGroup.Button>
                                                    </InputGroup>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-lg-2'><h6>New Password : </h6></div>
                                                <div className='col-lg-2'>
                                                    <InputGroup inside style={styles}>
                                                        <Input value={request2.newPassword} onChange={(value) => setRequest2((prev) => ({ ...prev, newPassword: value }))} type={visible2 ? 'text' : 'password'} />
                                                        <InputGroup.Button onClick={() => setVisible2(!visible2)}>
                                                            {visible2 ? <EyeIcon /> : <EyeSlashIcon />}
                                                        </InputGroup.Button>
                                                    </InputGroup>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-lg-2'><h6>Confirm Password : </h6></div>
                                                <div className='col-lg-2'>
                                                    <InputGroup inside style={styles}>
                                                        <Input value={confirmPassword} onChange={(value) => setConfirmPassword(value)} type={visible3 ? 'text' : 'password'} />
                                                        <InputGroup.Button onClick={() => setVisible3(!visible3)}>
                                                            {visible3 ? <EyeIcon /> : <EyeSlashIcon />}
                                                        </InputGroup.Button>
                                                    </InputGroup>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-lg-2'>
                                                    <button className='btn btn-primary' onClick={handleSubmit2}>Change</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Settings
