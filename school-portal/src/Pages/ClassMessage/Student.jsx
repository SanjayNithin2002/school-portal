import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import SideNavBar from '../../components/SideNavBar/SideNavBar'
import "./ClassMessage.css"
import { getClassMessage } from '../../actions/classMessage';

const Student = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getClassMessage({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])


    const messages = useSelector((state) => state.classmessageReducer)
    console.log(messages);

    return (
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <h2>Class Message</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div>
                        <div className="row classmessage-container-2">
                            <div className='col-lg-10 chat-container'>
                                {
                                    messages && messages!=null && messages.docs.map((item) => (
                                        <div className='row chat-container-1'>
                                            <div className='col-lg-3 Avatar'>
                                                <span className='Avatar-1' title='Teacher Name'>{item.class.subject} Teacher</span>
                                            </div>
                                            <div className='col-lg-8 message-content'>
                                                <p className='Avatar-2'>{item.message}</p>
                                                <p className='timer'>a day ago</p>
                                            </div>
                                        </div>
                                    ))

                                }
                                {
                                    messages && messages!==null && messages.docs.length===0 &&
                                    <div>
                                        You have not received any message so far
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Student

