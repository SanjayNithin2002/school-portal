import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SideNavBar from '../../components/SideNavBar/SideNavBar'


const UploadMarks = () => {
    const dispatch = useDispatch();
    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const [subject, setSubject] = useState("");
    const [exam, setExam] = useState("");
    useEffect(() => {
        // dispatch(getMarks({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }));
    }, [dispatch])

    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }]
    const m = useSelector((state) => state.marksReducer)
    console.log(m)

    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                        <h2>Marks Upload</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div>
                        <div className="row classmessage-container-1">

                            <div className="col-lg-3">
                                <h4>Select Class : </h4>
                            </div>
                            <div className="col-lg-3">
                                <select
                                    className="selectPicker3"
                                    value={standard}
                                    onChange={(e) => setStandard(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Class
                                    </option>
                                    {Array.from(new Set(m.docs.examMarks.map((i) => i.student.standard))).map((i) => {
                                        const item = standardList.find(item => item.value === 5);
                                        return <option value={i}>{item.label}</option>
                                    })}
                                </select>
                            </div>

                            <div className="col-lg-3">
                                <h4>Select Section : </h4>
                            </div>
                            <div className="col-lg-3">
                                <select
                                    className="selectPicker3"
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Section
                                    </option>
                                    {Array.from(new Set(m.docs.examMarks.map((i) => i.student.section))).map((i) => {
                                        return <option value={i}>{i}</option>
                                    })}
                                </select>
                            </div>

                            <div className="col-lg-3">
                                <h4>Select Subject : </h4>
                            </div>
                            <div className="col-lg-3">
                                <select
                                    className="selectPicker3"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Subject
                                    </option>
                                    {Array.from(new Set(m.docs.examMarks.map((i) => i.subject))).map((i) => {
                                        return <option value={i}>{i}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col-lg-3">
                                <h4>Select Exam : </h4>
                            </div>
                            <div className="col-lg-3">
                                <select
                                    className="selectPicker3"
                                    value={exam}
                                    onChange={(e) => setExam(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Exam
                                    </option>
                                    {Array.from(new Set(m.docs.examMarks.map((i) => i.examName))).map((i) => {
                                        return <option value={i}>{i}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UploadMarks
