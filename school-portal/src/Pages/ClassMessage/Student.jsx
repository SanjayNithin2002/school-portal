import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import "./ClassMessage.css"
import { getClassMessage } from '../../actions/classMessage';
import moment from "moment";
import {Notification,useToaster} from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"

const Student = ({status,onLoading}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [fetchStatus,setFetchStatus] = useState(true);

    useEffect(() => {
        if(fetchStatus){
            onLoading(true);
            dispatch(getClassMessage("/ClassMessage",navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        }
    }, [dispatch,onLoading,navigate,fetchStatus])

    const messages = useSelector((state) => state.classmessageReducer)
    console.log(messages);

    useEffect(()=>{
        if(messages!==null){
            onLoading(false);
        }
    },[onLoading,messages])

    useEffect(()=>{
        if(location.state){
            onLoading(false);
            const message = (
                <Notification type="error" header="error" closable>
                  Error Code: {location.state.status},<br/>{location.state.message}
                </Notification>
            );
            toaster.push(message, {placement:'topCenter'})
            navigate('/ClassMessage',{state:null});
            setFetchStatus(false);
        }
    },[location.state,navigate,toaster,onLoading])

    return (
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Class Message</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div>
                        <div className="row classmessage-container-2">
                            {
                                messages && messages !== null && messages.docs.length === 0 &&
                                <div className='row' style={{ justifyContent: 'center' }}>
                                    <div className='col-lg-10' style={{ backgroundColor: "rgb(155, 212, 228)", padding: "5px", fontSize: "18px", fontWeight: "bolder", justifyContent: "center", display: "flex" }}>
                                        You have not received any message so far
                                    </div>
                                </div>
                            }
                            {
                                messages && messages != null &&
                                <div className='col-lg-12 chat-container'>
                                    {
                                        messages.docs.map((item) => (
                                            <div className='chat-container-2'>
                                                <div className='col-lg-3 Avatar'>
                                                    <span className='Avatar-1'>
                                                        {item.postedBy.firstName+" "+item.postedBy.lastName} - Teacher
                                                    </span>
                                                </div>
                                                <div className='col-lg-8 message-content'>
                                                    <p className='Avatar-2'>{item.message}</p>
                                                    <p className='timer'>{moment(new Date(item.postedOn), "YYYYMMDD").fromNow()}</p>
                                                </div>
                                            </div>
                                        ))

                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Student

