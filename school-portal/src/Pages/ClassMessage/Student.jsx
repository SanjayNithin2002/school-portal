import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import "./ClassMessage.css"
import { getClassMessage } from '../../actions/classMessage';
import moment from "moment";

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

