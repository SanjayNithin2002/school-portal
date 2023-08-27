import React, { useState } from 'react'
import { Button, Table, Modal } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import * as regular from "@fortawesome/free-regular-svg-icons"
import { useDispatch } from "react-redux"
import { deleteBusDetails, postBusDetails, updateBusDetails } from '../../actions/bus'

import "./BusHostel.css"

const Bus = ({handleAddBus,addBus1,buses}) => {
    
    const dispatch = useDispatch();
    const [addBus,setAddBus] = useState(addBus1);
    const [editBus, setEditBus] = useState(false);
    const [busNumber, setbusNumber] = useState("");
    const [noSeat, setNoSeat] = useState("");
    const [noStop, setNoStop] = useState(0)
    const [stopList, setStopList] = useState([]);
    console.log(addBus1)
    console.log(addBus)
    const handleBus = (value1) => {
        setNoStop(value1)
        let value = parseInt(value1);
        let StopLen = stopList.length
        if (StopLen > value) {
            let diff = StopLen - value
            for (let i = 0; i < diff; i++) {
                stopList.pop();
            }
        }
        else {
            let diff = value - StopLen
            for (let i = 0; i < diff; i++) {
                stopList.push({ stopName: "", landmark: "", pickUpTime: "", dropTime: "", fees: 0 });
            }
        }
    }

    const handleInputChange = (value, index, field) => {
        setStopList(prev => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
    }

    const handleSaveBus = () => {
        let request = {
            busNumber,
            availableSeats: noSeat,
            maxSeats: noSeat,
            stops: stopList
        };
        dispatch((postBusDetails(request)));
    }

    const checkDate = (a, b) => {
        const startTimeA = new Date(`2000-01-01T${a}`);
        const startTimeB = new Date(`2000-01-01T${b}`);
        return startTimeA - startTimeB;
    }

    const handleClose = () => {
        setAddBus(false);
        setEditBus(false);
        handleAddBus();
        setbusNumber("");
        setNoSeat("");
        setNoStop(0);
        setStopList([]);
    }

    const handleEditBus = (busDetails) => {

        setAddBus(true);
        setEditBus(busDetails._id);
        setbusNumber(busDetails.busNumber);
        setNoSeat(busDetails.maxSeats);
        setNoStop(busDetails.stops.length);
        setStopList(JSON.parse(JSON.stringify(busDetails.stops)));
    }

    const handleUpdateBus = () => {
        let request = [];
        let old = buses.docs.filter((bus) => bus._id === editBus);
        if (old[0].busNumber !== busNumber) {
            request.push({
                propName: "busNumber",
                value: busNumber
            })
        }
        if (old[0].maxSeats !== noSeat) {
            request.push({
                propName: "maxSeats",
                value: noSeat
            })
            request.push({
                propName: "availableSeats",
                value: noSeat
            })
        }
        let flag = 1;
        stopList.map((stop, index) => {
            console.log(stop);
            console.log(old[0]["stops"][index])
            if (old[0]["stops"][index] !== stop && flag === 1) {
                flag = 0;
                request.push({
                    propName: "stops",
                    value: stopList
                })
            }
        })
        console.log(request)
        dispatch(updateBusDetails(editBus, request));
    }

    const handleDeleteBus = (busDetails) => {
        if (busDetails.maxSeats !== busDetails.availableSeats) {
            alert("Kindly Change the bus students details before deleting the bus record");
        }
        else if (window.confirm("Are you sure, you want to delete the bus record?")) {
            dispatch(deleteBusDetails(busDetails._id));
        }
    }
  return (
    <div>
    {
        buses && buses.docs.length > 0 &&
        <div className="table-responsive">
            <Table className='TeacherInfo-content-table'>
                <tr>
                    <th>Stop Name</th>
                    <th>Landmark</th>
                    <th>Pickup Time</th>
                    <th>Drop Time</th>
                    <th>Fees</th>
                </tr>
                {
                    buses.docs.map((bus) => (
                        <>
                            <tr>
                                <th style={{ float: "none", textAlign: "center" }} className='sub-head' colSpan={5}>
                                    <span style={{ float: "left" }}>Seats : {bus.availableSeats}/{bus.maxSeats}</span>
                                    <span>BusNo:{bus.busNumber}</span>
                                    <span style={{ float: "right", cursor: "pointer" }}><FontAwesomeIcon onClick={() => handleEditBus(bus)} icon={solid.faPencil} />&nbsp;/&nbsp;<FontAwesomeIcon onClick={() => handleDeleteBus(bus)} icon={regular.faTrashAlt} /></span>
                                </th>
                            </tr>
                            {
                                bus.stops.sort((a, b) => checkDate(a.pickUpTime, b.pickUpTime)).map((stop) => (
                                    <tr>
                                        <td>{stop.stopName}</td>
                                        <td>{stop.landmark}</td>
                                        <td>{stop.pickUpTime}</td>
                                        <td>{stop.dropTime}</td>
                                        <td>&#8377;{stop.fees}</td>
                                    </tr>
                                ))
                            }
                        </>
                    ))
                }
            </Table>
        </div>

    }
    <Modal show={addBus || addBus1} onHide={() => { handleClose() }}>
                <Modal.Header closeButton>
                    <Modal.Title>{editBus === false ? "Add New Bus" : "Edit Bus"} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{overflowY:"auto",maxHeight:"40vh"}} className='table-responsive'>
                        <Table className='bus-content-table'>
                            <tr>
                                <th>Bus No</th>
                                <td><input value={busNumber} onChange={(e) => setbusNumber(e.target.value)} type="text" /></td>
                            </tr>
                            <tr>
                                <th>No Of Seats</th>
                                <td><input value={noSeat} onChange={(e) => setNoSeat(e.target.value)} type="number" /></td>
                            </tr>
                            <tr>
                                <th>No Of Stops</th>
                                <td><input value={noStop} min="0" onChange={(e) => handleBus(e.target.value)} type="number" /></td>
                            </tr>
                            {
                                stopList.map((stop, index) => (
                                    <>
                                        <tr>
                                            <th colSpan={2}>Bus Stop {index + 1}</th>
                                        </tr>
                                        <tr>
                                            <th>Stop Name</th>
                                            <td><input value={stop.stopName} onChange={(e) => handleInputChange(e.target.value, index, "stopName")} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <th>Landmark</th>
                                            <td><input value={stop.landmark} onChange={(e) => handleInputChange(e.target.value, index, "landmark")} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <th>Morning Pickup Time</th>
                                            <td><input value={stop.pickUpTime} onChange={(e) => handleInputChange(e.target.value, index, "pickUpTime")} type="time" /></td>
                                        </tr>
                                        <tr>
                                            <th>Evening Drop Time</th>
                                            <td><input value={stop.dropTime} onChange={(e) => handleInputChange(e.target.value, index, "dropTime")} type="time" /></td>
                                        </tr>
                                        <tr>
                                            <th>Fees</th>
                                            <td><input value={stop.fees} onChange={(e) => handleInputChange(e.target.value, index, "fees")} type="number" /></td>
                                        </tr>
                                    </>
                                ))
                            }
                        </Table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {editBus === false ?
                        <Button variant='success' onClick={() => handleSaveBus()}>
                            Save
                        </Button> :
                        <Button variant='success' onClick={() => handleUpdateBus()}>
                            Save
                        </Button>}

                    <Button variant="danger" onClick={() => { handleClose()}}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
</div>
  )
}

export default Bus
