import React, { useState } from 'react'
import { Button, Table, Modal } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import * as regular from "@fortawesome/free-regular-svg-icons"
import { useDispatch } from "react-redux"
import { Accordion } from 'react-bootstrap'

import "./BusHostel.css"
import { deleteHostelMessDetails, deleteHostelRoomDetails, postHostelMessDetails, postHostelRoomDetails, updateHostelMessDetails, updateHostelRoomDetails } from '../../actions/hostel'

const Bus = ({ handleAddHostel, addHostel1, room, mess }) => {

    const dispatch = useDispatch();
    const [addHostel, setAddHostel] = useState(addHostel1);
    const [editHostel, setEditHostel] = useState(false);
    const [updateType, setUpdateType] = useState(true);
    const [roomType, setRoomType] = useState({ type: "", available: "", maximum: "", fees: "" })
    const [foodType, setFoodType] = useState({ type: "", fees: "" })
    console.log(addHostel1)
    console.log(addHostel)

    const handleSaveHostel = () => {
        if (updateType) {
            dispatch(postHostelRoomDetails(roomType));
        }
        else {
            dispatch(postHostelMessDetails(foodType));
        }
        handleClose();
    }

    const handleClose = () => {
        setAddHostel(false);
        setEditHostel(false);
        handleAddHostel();
        setRoomType({});
        setFoodType({});
    }

    const handleEditHostel = (type, hostelDetails) => {
        setAddHostel(true);
        setEditHostel(hostelDetails._id);
        setUpdateType(type);
        if(type)
        setRoomType(hostelDetails);
        else
        setFoodType(hostelDetails);
    }

    const handleUpdateHostel = () => {
        let request = [];
        console.log(updateType)
        console.log(editHostel);
        if (updateType) {
            room.docs.filter((rooms) => rooms._id === editHostel).map((rooms) => {
                console.log(rooms.type);
                console.log(roomType.type)
                if (rooms.type !== roomType.type) {
                    request.push({
                        propName: "type",
                        value: roomType.type
                    })
                }
                if(rooms.maximum===rooms.available && rooms.maximum!==roomType.maximum){
                    request.push({
                        propName: "maximum",
                        value: roomType.maximum
                    })
                    request.push({
                        propName: "available",
                        value: roomType.maximum
                    })
                }
                if(rooms.fees!==roomType.fees){
                    request.push({
                        propName: "fees",
                        value: roomType.fees
                    })
                }
            })
            if(request.length>0)
            dispatch(updateHostelRoomDetails(editHostel, request));
        }
        else {
            mess.docs.filter((messes) => messes._id === editHostel).map((messes) => {
                if (messes.type !== foodType.type) {
                    request.push({
                        propName: "type",
                        value: foodType.type
                    })
                }
                if(messes.fees!==foodType.fees){
                    request.push({
                        propName: "fees",
                        value: foodType.fees
                    })
                }
            })
            if(request.length>0)
            dispatch(updateHostelMessDetails(editHostel, request));
        }
        handleClose();
    }

    const handleDeleteHostel = (type,hostelDetails) => {
        if(type){
            if (hostelDetails.maximum !== hostelDetails.available) {
                alert("Kindly Change the room students details before deleting the room record");
            }
            else if (window.confirm("Are you sure, you want to delete the Room record?")) {
                dispatch(deleteHostelRoomDetails(hostelDetails._id));
            }
        }
        else{
            if (window.confirm("Are you sure, you want to delete the Mess record?")) {
                dispatch(deleteHostelMessDetails(hostelDetails._id));
            }
        }
        
    }
    return (
        <div className='row justify-content-center'>
            <Accordion defaultActiveKey="0" className='col-xl-8 col-lg-9 col-md-10'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header style={{ padding: "initial" }}>Hostel Rooms</Accordion.Header>
                    <Accordion.Body>
                        {
                            room &&
                            <div className="table-responsive">
                                <Table className='HostelRoom-content-table'>
                                    <tr>
                                        <th>Sno</th>
                                        <th>Type</th>
                                        <th>Avaialable Rooms</th>
                                        <th>Maximum Rooms</th>
                                        <th>Fees</th>
                                        <th>Action</th>
                                    </tr>
                                    {
                                        room.docs.map((rooms, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{rooms.type}</td>
                                                <td>{rooms.available}</td>
                                                <td>{rooms.maximum}</td>
                                                <td>{rooms.fees}</td>
                                                <td>
                                                    <FontAwesomeIcon onClick={() => handleEditHostel(true, rooms)} style={{ padding: "0px" }} icon={solid.faPencil} />
                                                &nbsp;/&nbsp;
                                                <FontAwesomeIcon onClick={() => handleDeleteHostel(true, rooms)} style={{ padding: "0px" }} icon={regular.faTrashAlt} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </Table>
                            </div>

                        }
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Hostel Mess</Accordion.Header>
                    <Accordion.Body>
                        {
                            mess &&
                            <div className="table-responsive">
                                <Table className='HostelMess-content-table'>
                                    <tr>
                                        <th>Sno</th>
                                        <th>Type</th>
                                        <th>Fees</th>
                                        <th>Action</th>
                                    </tr>
                                    {
                                        mess.docs.map((messes, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{messes.type}</td>
                                                <td>{messes.fees}</td>
                                                <td>
                                                    <FontAwesomeIcon onClick={() => handleEditHostel(false, messes)} style={{ padding: "0px" }} icon={solid.faPencil} />
                                                    &nbsp;/&nbsp;
                                                    <FontAwesomeIcon onClick={() => handleDeleteHostel(false, messes)} style={{ padding: "0px" }} icon={regular.faTrashAlt} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </Table>
                            </div>

                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Modal show={addHostel || addHostel1} onHide={() => { handleClose() }}>
                <Modal.Header closeButton>
                    <Modal.Title>{editHostel === false ? "Add New Hostel" : "Edit Hostel"} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ overflowY: "auto", maxHeight: "40vh" }} className='table-responsive'>
                        <Table className='bus-content-table'>
                            {editHostel === false ? 
                            <tr>
                                <th>Add Details of</th>
                                <td><input onClick={() => setUpdateType(true)} type="radio" checked={updateType} />Hostel Room&emsp;<input onClick={() => setUpdateType(false)} type="radio" checked={!updateType} />Hostel Mess</td>
                            </tr> : <></>}
                            {
                                updateType ?
                                    <>
                                        <tr>
                                            <th>Room Type</th>
                                            <td><input value={roomType.type} onChange={(e) => setRoomType((prev) => ({ ...prev, type: e.target.value }))} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <th>No of Rooms</th>
                                            <td><input value={roomType.maximum} onChange={(e) => setRoomType((prev) => ({ ...prev, maximum: e.target.value }))} min="0" type="number" /></td>
                                        </tr>
                                        <tr>
                                            <th>Fees</th>
                                            <td><input value={roomType.fees} onChange={(e) => setRoomType((prev) => ({ ...prev, fees: e.target.value }))} type="number" /></td>
                                        </tr>
                                    </>
                                    :
                                    <>
                                        <tr>
                                            <th>Mess Type</th>
                                            <td><input value={foodType.type} onChange={(e) => setFoodType((prev) => ({ ...prev, type: e.target.value }))} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <th>Fees</th>
                                            <td><input value={foodType.fees} onChange={(e) => setFoodType((prev) => ({ ...prev, fees: e.target.value }))} type="number" /></td>
                                        </tr>
                                    </>
                            }
                        </Table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {editHostel === false ?
                        <Button variant='success' onClick={() => handleSaveHostel()}>
                            Save
                        </Button> :
                        <Button variant='success' onClick={() => handleUpdateHostel()}>
                            Save
                        </Button>}

                    <Button variant="danger" onClick={() => { handleClose() }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Bus
