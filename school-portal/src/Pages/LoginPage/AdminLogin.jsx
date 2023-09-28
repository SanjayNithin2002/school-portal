import React,{useEffect, useState} from 'react'
import { useNavigate,Link, useLocation } from 'react-router-dom';
import { AdminlogIn } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { Input, InputGroup } from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import PasswordIcon from "@rsuite/icons/legacy/Lock"
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import {Notification,useToaster} from 'rsuite';

const AdminLogin = ({handleBack,status,onLoading}) => {
    const [Adminuserid, setAdminUserid] = useState("");
    const [Adminpassword, setAdminPassword] = useState("");
    const [visible, setVisible] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const toaster = useToaster();

    const handleSubmit = () => {
        onLoading(true);
        dispatch(
            AdminlogIn({ userID: Adminuserid, password: Adminpassword }, navigate, onLoading)
        );
    };

    useEffect(()=>{
        if(location.state){
            onLoading(false);
            const message = (
                <Notification type="error" header="error" closable>
                  Error Code: {location.state.status},<br/>{location.state.message}
                </Notification>
            );
            toaster.push(message, {placement:'topCenter'})
            navigate('/',{state:null});
        }
    },[location.state,navigate,toaster,onLoading])
    
    console.log(location);
    return (
        <div style={{width:"100%"}} className='row justify-content-center '>
        <div style={{borderTop:"3px solid #0d6efd"}} className='col-sm-8 col-md-6 col-lg-5 col-xl-4 Login-Content'>
            <div style={{color:"#0d6efd"}} className='Login-Content-Title'>
                Admin Login
            </div>
            <br/>
            <div className='row'>
                <div class="form-floating mb-3">
                    <InputGroup>
                        <InputGroup.Addon>
                            <AvatarIcon />
                        </InputGroup.Addon>
                        <Input value={Adminuserid} onChange={(value) => setAdminUserid(value)} />
                    </InputGroup>
                </div>
                <div class="form-floating">
                    <InputGroup inside>
                        <InputGroup.Addon>
                            <PasswordIcon />
                        </InputGroup.Addon>
                        <Input style={{paddingLeft:"50px"}} type={visible ? 'text' : 'password'} value={Adminpassword} onChange={(value) => setAdminPassword(value)} />
                        <InputGroup.Button onClick={()=>setVisible(!visible)}>
                            {visible ? <EyeIcon /> : <EyeSlashIcon />}
                        </InputGroup.Button>
                    </InputGroup>
                </div>
            </div>
            <br/>
            <div>
                <div style={{width:"100%",textAlign:"right"}}>
                    <button className="btn btn-primary btn-sm" onClick={() => handleSubmit()}>Submit</button>
                </div>
                <div style={{width:"100%",textAlign:"left"}}>
                    <Link>Forgot Password</Link>
                </div>
                <div className='d-flex justify-content-between'>
                    <Link>Forgot UserID</Link>
                    <Link onClick={()=>handleBack()}>Go to Home</Link>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AdminLogin
