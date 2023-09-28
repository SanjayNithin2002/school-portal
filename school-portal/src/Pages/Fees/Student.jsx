import React, { useEffect, useState } from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/esm/Table';
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Notification, useToaster } from 'rsuite';

import "./Fees.css"
import { getPaymentRequest } from '../../actions/fees';

const Admin = ({ status, onLoading }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [pending, setPending] = useState(0);
    const [paid, setPaid] = useState(0);
    const [active, setActive] = useState("school");
    const [fetchStatus, setFetchStatus] = useState(true);

    useEffect(() => {
        if (fetchStatus) {
            onLoading(true);
            dispatch(getPaymentRequest("/payment", navigate, { type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        }
    }, [dispatch, navigate, fetchStatus])

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];
    const payment = useSelector((state) => state.paymentReducer)
    console.log(payment);

    useEffect(() => {
        if (payment) {
            let pending1 = 0;
            let paid1 = 0;
            payment.docs.filter((pay) => pay.status === "Pending").map((pay) => {
                pending1 += parseInt(pay.fees.amount);
            })
            payment.docs.filter((pay) => pay.status !== "Pending").map((pay) => {
                paid1 += parseInt(pay.fees.amount);
            })
            setPending(pending1);
            setPaid(paid1);
            onLoading(false);
        }
    }, [payment])

    useEffect(() => {
        if (location.state && fetchStatus) {
            if (location.state.status === 200) {
                onLoading(false);
                const message = (
                    <Notification type="success" header="Success" closable>
                        {location.state.message}
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
                navigate('/payment', { state: null });
            }
            else {
                onLoading(false);
                setFetchStatus(false);
                const message = (
                    <Notification type="error" header="error" closable>
                        Error Code: {location.state.status},<br />{location.state.message}
                    </Notification>
                );
                toaster.push(message, { placement: 'topCenter' })
                navigate('/payment', { state: null });
            }
        }
    }, [location.state, toaster, navigate])

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

    const getDates = (day1) => {
        var desiredDate = new Date(day1);
        let date = desiredDate.getDate() < 10 ? "0" + desiredDate.getDate() : desiredDate.getDate();
        let month = desiredDate.getMonth() < 10 ? "0" + (desiredDate.getMonth() + 1) : (desiredDate.getMonth() + 1);
        return desiredDate.getFullYear() + "-" + month + "-" + date;
    }

    const handlePay = async(paymentID) => {
        const data = (await fetch('https://schoolportalbackend.onrender.com/transactions/razorpay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+localStorage.getItem("token"),
            },
            body: JSON.stringify({
                payment: paymentID,
            })
        }));
        const apiData = await data.json();
        const options = {
            "key": "rzp_test_73wohYapKBYpbR",
            "amount": apiData.amount,
            "currency": apiData.currency,
            "name": "10x Corp.",
            "description": "10x Developers",
            "image": "https://www.freepnglogos.com/uploads/black-logo-batman-png-1.png",
            "order_id": apiData.id,
            "handler": function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            "prefill": {
                "name": "Sanjay Nithin"
            },
            "theme": {
                "color": "#000000"
            }
        };
        console.log(options)
        var paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h2>Payments</h2>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='payment-main-content'>
                        <div className='payment-tab'>
                            <button className={'btn btn-outline-success payment-btn'}>Paid Amount<br /> &#8377;{paid}</button>
                            <button className={'btn btn-outline-warning payment-btn'}>Pending Payment<br /> &#8377;{pending}</button>
                        </div>
                        <br /><br />
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header style={{ padding: "initial" }}>Pending/Request Payment</Accordion.Header>
                                <Accordion.Body>
                                    <div className='table-responsive'>
                                        <Table className='Payment-content-table-1'>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Title</th>
                                                <th>Due Date</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                            {
                                                payment && payment.docs.length > 0 &&
                                                payment.docs.filter((pay) => pay.status === "Pending").map((pay, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{pay.fees.description}</td>
                                                        <td>{handleDateFormat(pay.fees.due)}</td>
                                                        <td>&#8377;{pay.fees.amount}</td>
                                                        <td>
                                                            <button onClick={() => handlePay(pay._id)} className='btn btn-primary btn-sm'>Pay</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            {
                                                ((!payment) || (payment && payment.docs.length === 0)) &&
                                                <tr>
                                                    <td style={{ textAlign: "center" }} colSpan={5}>No data</td>
                                                </tr>
                                            }
                                        </Table>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header style={{ padding: "initial" }}>Payment Receipts</Accordion.Header>
                                <Accordion.Body>
                                    <div className='table-responsive'>
                                        <Table className='Payment-content-table-2'>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Title</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                            {
                                                payment && payment.docs.length > 0 &&
                                                payment.docs.filter((pay) => pay.status !== "Pending").map((pay, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{pay.fees.description}</td>
                                                        <td>&#8377;{pay.fees.amount}</td>
                                                        <td>
                                                            <button onClick={() => handlePay(pay._id)} className='btn btn-primary btn-sm'>Pay</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            {
                                                ((!payment) || (payment && payment.docs.length === 0)) &&
                                                <tr>
                                                    <td style={{ textAlign: "center" }} colSpan={5}>No data</td>
                                                </tr>
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
    )
}

export default Admin
