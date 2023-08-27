import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { getBusDetails } from '../../actions/bus'

import "./BusHostel.css"
import Bus from './Bus'
import Hostel from './Hostel'
import { getHostelMessDetails, getHostelRoomDetails } from '../../actions/hostel'

const BusHostel = () => {

    const dispatch = useDispatch();
    const [buttonType, setButtonType] = useState("bus");
    const [addBus, setAddBus] = useState(false);
    const [addHostel, setAddHostel] = useState(false);

    useEffect(() => {
        dispatch(getBusDetails());
        dispatch(getHostelMessDetails())
        dispatch(getHostelRoomDetails())
    }, [dispatch])

    const buses = useSelector((state) => state.busReducer);
    const hostelRoom = useSelector((state) => state.hostelRoomReducer);
    const hostelMess = useSelector((state) => state.hostelMessReducer);
    console.log(buses);
    console.log(hostelMess);
    console.log(hostelRoom);

    return (
        <div className='Main'>
            <div className="Home">
                <div class="container1 container rounded bg-white">
                    <div className='row justify-content-between align-items-start'>
                        <h2 className='col-xl-10 col-lg-9 col-md-8 col-sm-7'>Bus & Hostel Details</h2>
                        {
                            buttonType === "bus" ?
                                <Button className='col-xl-2  col-lg-3 col-md-4 col-sm-5 align-item-center' onClick={() => setAddBus(true)} style={{ alignItems: "center" }} ><FontAwesomeIcon icon={solid.faPlus} />&ensp;Add Bus Details</Button>
                                :
                                <Button className='col-xl-2  col-lg-3 col-md-4 col-sm-5 align-item-center' onClick={() => setAddHostel(true)} style={{ alignItems: "center" }} ><FontAwesomeIcon icon={solid.faPlus} />&ensp;Add Hostel Details</Button>
                        }
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div style={{ width: "100%" }} className="AddStudent-container">
                        <div style={{ width:"100%",minWidth: "400px" }}>
                            <div className='Profile-Container-2-1'>
                                <div className='Profile-tab'>
                                    <div className="Profile-tab-1 ">
                                        <button onClick={() => setButtonType("bus")} className={buttonType === "bus" ? "btn btn-primary" : "btn btn-outline-primary"}>Bus Details</button>&ensp;
                                        <button onClick={() => setButtonType("hostel")} className={buttonType === "hostel" ? "btn btn-primary" : "btn btn-outline-primary"}>Hostel Details</button>&ensp;
                                    </div>
                                </div>
                            </div>
                            <div>
                                {
                                    buttonType === "bus" ?
                                        <Bus addBus1={addBus} handleAddBus={()=>setAddBus(false)} buses={buses}/>
                                        :
                                        <Hostel addHostel1={addHostel} handleAddHostel={()=>setAddHostel(false)} room={hostelRoom} mess={hostelMess}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default BusHostel
