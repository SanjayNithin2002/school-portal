import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Input, InputGroup } from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';

import SideNavBar from '../../components/SideNavBar/SideNavBar'
const styles = {
    width: 300,
    marginBottom: 10
};

function Settings() {
    const [visible1, setVisible1] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [visible3, setVisible3] = React.useState(false);

    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Settings</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header style={{ padding: "initial" }}>Change User ID</Accordion.Header>
                            <Accordion.Body>
                                <div className='row'>
                                    <div className='col-lg-2'><h6>Current User ID : </h6></div>
                                    <div className='col-lg-2'>
                                        <InputGroup style={styles}>
                                            <InputGroup.Addon>
                                                <AvatarIcon />
                                            </InputGroup.Addon>
                                            <Input readOnly value="KUMAR12345" />
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-2'><h6>Preferred Login ID : </h6></div>
                                    <div className='col-lg-2'>
                                        <InputGroup style={styles}>
                                            <InputGroup.Addon>
                                                <AvatarIcon />
                                            </InputGroup.Addon>
                                            <Input />
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-2'>
                                        <button className='btn btn-primary'>Change</button>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Change Password</Accordion.Header>
                            <Accordion.Body>
                                <div className='row'>
                                    <div className='col-lg-2'><h6>Current Password : </h6></div>
                                    <div className='col-lg-2'>
                                        <InputGroup inside style={styles}>
                                            <Input type={visible1 ? 'text' : 'password'} />
                                            <InputGroup.Button onClick={()=>setVisible1(!visible1)}>
                                                {visible1 ? <EyeIcon /> : <EyeSlashIcon />}
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-2'><h6>New Password : </h6></div>
                                    <div className='col-lg-2'>
                                        <InputGroup inside style={styles}>
                                            <Input type={visible2 ? 'text' : 'password'} />
                                            <InputGroup.Button onClick={()=>setVisible2(!visible2)}>
                                                {visible2 ? <EyeIcon /> : <EyeSlashIcon />}
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-2'><h6>Confirm Password : </h6></div>
                                    <div className='col-lg-2'>
                                        <InputGroup inside style={styles}>
                                            <Input type={visible3 ? 'text' : 'password'} />
                                            <InputGroup.Button onClick={()=>setVisible3(!visible3)}>
                                                {visible3 ? <EyeIcon /> : <EyeSlashIcon />}
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-2'>
                                        <button className='btn btn-primary'>Change</button>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        </div>


    )
}

export default Settings
