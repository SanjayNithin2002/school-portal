import React, { useEffect, useState } from 'react'
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as solid from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from 'react-redux'
import { getAllClass } from '../../actions/class'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'

import "./timetable.css";
import { getTimeTables } from '../../actions/timetable'
import { requestTeachers } from '../../actions/teachers'



const AddTimeTable = () => {

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

    useEffect(() => {
        dispatch(getAllClass());
        dispatch(getTimeTables());
        dispatch(requestTeachers());
    }, [dispatch])

    let timetableData = [];

    const class1 = useSelector((state) => state.allClassReducer);
    const timetable = useSelector((state) => state.timeTableReducer);
    const teacher = useSelector((state) => state.teacherReducer);
    console.log(class1);
    console.log(timetable);
    console.log(teacher);

    if (class1 && timetableData.length === 0) {

        let std = Array.from(new Set(class1.docs.map((obj) => obj.standard)));
        std.map((item) => {
            let sec = Array.from(new Set(class1.docs.filter((item1) => item1.standard === item).map((obj) => obj.section)));
            let result = {};
            result["standard"] = item;
            result["Info"] = [];
            sec.map((item1) => {
                let flag = "";
                let status = true;
                let sub = {};
                class1.docs.filter((item2) => item2.subject !== "Class Teacher" && item2.standard === item & item2.section === item1).map((item2) => {
                    if (status) {
                        if (item2.teacher !== null) {
                            if (flag !== "Empty") {
                                if (item2.timings.length > 0) {
                                    flag = "Valid";
                                }
                                else {
                                    flag = "Not Valid"
                                    status = false;
                                }
                            }
                            else {
                                flag = "Not Valid"
                                status = false;
                            }
                        }
                        else {
                            if (flag === "Valid") {
                                flag = "Not Valid";
                                status = false;
                            }
                            else {
                                flag = "Empty";
                            }
                        }
                    }
                    return true;
                });

                sub["section"] = item1;
                sub["status"] = flag;
                result["Info"].push(sub);
                return true;
            })
            timetableData.push(result);
            return true;
        })
        console.log(timetableData);
    }

    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div className='d-flex justify-content-between align-items-center' >
                        <h2>Create TimeTable</h2>
                        <button className='btn btn-primary'>Submit</button>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <br />
                    <div className='row justify-content-evenly'>
                        <div className='col-lg-8'>
                                {
                                    standard && section ? 
                                    <div>
                                        <div className='d-flex justify-content-center' style={{ fontSize: "30px" }}>
                                        Standard:<b>{standardList[standard - 1].label}</b> &emsp;&emsp; Section:<b>{section}</b>
                                        </div>
                                        <br/>
                                        <div style={{border:"1px solid gray",borderRadius:"15px",height:"300px"}}>
                                            <div>
                                                <button>Monday</button>&emsp;<button>Tuesday</button>&emsp;<button>Wednesday</button>&emsp;<button>Thursdays</button>&emsp;<button>Friday</button>&emsp;<button>Saturday</button>&emsp;
                                            </div>    
                                        </div>
                                    </div> :
                                        <div>No Data</div>
                                }
                        </div>
                        <div className='col-lg-3 d-flex justify-content-center' style={{ borderRadius: "10px", padding: "10px", boxShadow: "0px 0px 5px rgba(0,0,0,.5)" }} >
                            <div style={{ width: "100%", overflowY: "auto", height: "350px" }}>
                                <Accordion defaultActiveKey="0">
                                    {
                                        timetableData && timetableData.map((item) => (

                                            <Accordion.Item eventKey={item}>
                                                <Accordion.Header style={{ padding: "initial" }}>{standardList[item.standard - 1].label} Standard</Accordion.Header>
                                                <Accordion.Body>
                                                    <table className='timetable-table' cellSpacing="20px">
                                                        {
                                                            item.Info.map((item2) => (
                                                                <tr onClick={() => { setStandard(item.standard); setSection(item2.section) }} className='timetable-row'>
                                                                    <td>
                                                                        {
                                                                            item2.status === "Empty" ?
                                                                                <FontAwesomeIcon icon={solid.faPlus} /> : item2.status === "Valid" ?
                                                                                    <FontAwesomeIcon icon={solid.faCheck} /> :
                                                                                    <FontAwesomeIcon icon={solid.faTimes} />
                                                                        }
                                                                    </td>
                                                                    <td></td>
                                                                    <td className='timetable-col'>
                                                                        {item2.section} Section
                                                                    </td>
                                                                </tr>

                                                            ))
                                                        }
                                                    </table>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))
                                    }
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTimeTable
