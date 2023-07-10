import React from 'react'
import { Header } from 'rsuite';
import Table from "react-bootstrap/Table";
import Accordion from 'react-bootstrap/Accordion'
import { useDispatch } from 'react-redux';
import { updateStatusLeave } from '../../actions/leave';

const ViewLeave = (props) => {
  const dispatch = useDispatch()
  const leave = props.leave.docs.filter((item) => item._id === props.leaveID);

  console.log(leave);

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

  const handleApproval = () => {
    dispatch(updateStatusLeave({user:leave[0].user,id:leave[0]._id,status:"Approved"}))
    props.close()
  }

  const handleRejection = () => {
    dispatch(updateStatusLeave({user:leave[0].user,id:leave[0]._id,status:"Rejected"}))
    props.close()
  }


  return (
    <div class="container rounded bg-white">
      <Header>
        <div className='d-flex justify-content-between'>
          <h3>{leave[0][leave[0].user]} Leave Request</h3>
          <button className='btn btn-danger' onClick={() => props.close()}>Back</button>
        </div>
        <hr style={{ border: "1px solid gray" }} />
      </Header>
      <br /><br />
      <div className="row" style={{ display: "flex", alignItems: "center" }}>
        <div className="col-lg-8 table-responsive">
          <Table bordered className='CreateClass-Table-List'>
            {leave && leave.map((item) => (
              <tbody>
                <tr>
                  <td>Staff Name</td>
                  <td>{item[item.user]}</td>
                </tr>
                <tr>
                  <td>Staff ID</td>
                  <td>{item[item.user]}</td>
                </tr>
                <tr>
                  <td>Leave Type</td>
                  <td>{item.type === "sickLeave" ? "Medical Leave" : item.type === "earnedLeave" ? "EL" : "CL"}</td>
                </tr>
                <tr>
                  <td>Leave Reason</td>
                  <td>{item.reason}</td>
                </tr>
                <tr>
                  <td>Leave Applied From</td>
                  <td>{handleDateFormat(item.startDate)}</td>
                </tr>
                <tr>
                  <td>Leave Applied Till</td>
                  <td>{handleDateFormat(item.endDate)}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{item.status}</td>
                </tr>
                {
                  item.status === "Pending" &&
                  <tr>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      <button className='btn btn-success' onClick={() => handleApproval()}>Approve</button>&emsp;&emsp;
                      <button className='btn btn-danger' onClick={() => handleRejection()}>Reject</button>
                    </td>
                  </tr>
                }
              </tbody>
            ))}
          </Table>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-10'>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header style={{ padding: "initial" }}>Leave History</Accordion.Header>
              <Accordion.Body>
                <div className='table-responsive'>
                  <Table striped bordered hover style={{textAlign:"center"}}>
                    <thead>
                      <th>S.No</th>
                      <th>Type</th>
                      <th>Reason</th>
                      <th>From</th>
                      <th>Till</th>
                      <th>Status</th>
                    </thead>
                    <tbody>
                      {
                        leave &&
                        props.leave.docs.filter((item) => item[item.user] === leave[0][leave[0].user]).map((item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.type}</td>
                            <td>{item.reason}</td>
                            <td>{handleDateFormat(item.startDate)}</td>
                            <td>{handleDateFormat(item.endDate)}</td>
                            <td>{item.status}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default ViewLeave
