import React, { useEffect, useState } from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { useDispatch, useSelector } from 'react-redux';
import { getAllClass } from '../../actions/class';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
const Admin = () => {

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [standard, setStandard] = useState("");
    const [examList, setExamList] = useState(null);
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

    useEffect(() => {
        dispatch(getAllClass());
    }, [dispatch])

    const class1 = useSelector((state) => state.allClassReducer);
    console.log(class1);

    return (
        <div className='Main'>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div className='d-flex justify-content-between align-items-center' >
                        <h2>TimeTable</h2>
                        <Link to="/AddTimeTable" className='btn btn-primary'><FontAwesomeIcon icon={solid.faPlus} /> Create</Link>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <br />
                    <div className="row studentlist-container">
                        <div className="col-lg-4 col-md-5 col-sm-6">
                            <h4>Select Standard : </h4>
                        </div>
                        <div className="col-lg-3 col-md-5 col-sm-6">
                            <select className="selectPicker3" value={standard} onChange={(e) => { setStandard(e.target.value); setEdit(true); }} >
                                <option value="" disabled>
                                    Select Standard
                                </option>
                                {
                                    class1 !== null && class1.docs.length > 0 &&
                                    Array.from(new Set(class1.docs.map(obj => obj.standard))).map((item) => (
                                        standardList.filter((class1) => class1.value === item).map((class1) => (
                                            <option value={class1.value}>{class1.label}</option>
                                        ))
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        </div>
    )
}

export default Admin
