import React, { useEffect } from 'react'
import { Header } from 'rsuite';
import Table from "react-bootstrap/Table";
import Accordion from 'react-bootstrap/Accordion'
import { useDispatch } from 'react-redux';
import { updateStatusLeave } from '../../actions/leave';
import { useNavigate } from "react-router-dom"

const ViewLeave = (props) => {

    const navigate = useNavigate();
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
		dispatch(updateStatusLeave("/PostLeave",navigate,{ user: leave[0].user, id: leave[0]._id, status: "Approved" }))
		props.onLoading(true);
		props.close()
	}

	const handleRejection = () => {
		dispatch(updateStatusLeave("/PostLeave",navigate,{ user: leave[0].user, id: leave[0]._id, status: "Rejected" }))
		props.onLoading(true);
		props.close()
	}


	return (
		<div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
			<Header>
				<div className='d-flex justify-content-between ' style={{ alignItems: "flex-start" }}>
					<h3 className='col-lg-10 col-md-10 col-sm-9'>Leave Request</h3>
					<button className='col-lg-1 col-md-2 col-sm-2 btn btn-danger' onClick={() => props.close()}>Back</button>
				</div>
				<hr style={{ border: "1px solid gray" }} />
			</Header>
			<br />
			<div className="AddStudent-container">
				<div style={{ minWidth: "600px" }}>
					<div className="row" style={{ display: "flex", alignItems: "center" }}>
						<div className="col-lg-8">
							<Table bordered className='AddStudent-Table-List'>
								{leave && leave.map((item) => (
									<tbody>
										<tr>
											<td>Staff Name</td>
											<td>{item[item.user].firstName+" "+item[item.user].lastName}</td>
										</tr>
										<tr>
											<td>Staff ID</td>
											<td>{item[item.user].empID}</td>
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
											<Table className='StudentInfo-content-table'>
												<tr>
													<th>S.No</th>
													<th>Type</th>
													<th>Reason</th>
													<th>From</th>
													<th>Till</th>
													<th>Status</th>
												</tr>
												{
													leave &&
													props.leave.docs.filter((item) => item[item.user]._id === leave[0][leave[0].user]._id).map((item, index) => (
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
											</Table>
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

export default ViewLeave
