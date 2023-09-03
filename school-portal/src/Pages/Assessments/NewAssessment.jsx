import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { postAssessment } from "../../actions/assessments"
import { getClass } from '../../actions/class';
import { setCurrentUser } from '../../actions/currentUser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function NewAssessment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [maxMarks, setMaxMarks] = useState(0);
    const [weightageMarks, setWeightageMarks] = useState(0);
    const [lastDate, setLastDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

    useEffect(() => {
        dispatch(getClass({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        dispatch(setCurrentUser({ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
    }, [dispatch])

    const currentUser = useSelector((state) => state.currentUserReducer)
    const class1 = useSelector((state) => state.allClassReducer)
    const [classes, setClasses] = useState(null)

    console.log(class1);

    if (class1 !== null && class1.docs && currentUser !== null && classes === null) {
        const cls = class1.docs;
        setClasses(cls)
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = () => {
        if (selectedFile && title && description && standard && section && lastDate) {
            const formData = new FormData();
            formData.append('maxMarks', maxMarks);
            formData.append('weightageMarks', weightageMarks);
            formData.append('lastDate', lastDate);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('questionPaper', selectedFile, selectedFile.name);
            var classID = '';
            classes.map((item) => {
                if (item.teacher && item.teacher !== null && item.subject !== "Class Teacher" && item.teacher._id === currentUser.docs._id) {
                    if (item.standard === parseInt(standard)) {
                        if (item.section === section) {
                            classID = item._id
                        }
                    }
                }
                return true;
            })

            formData.append('class', classID);
            //console.log({title,description,class:classID,maxMarks,weightageMarks,lastDate,formData})
            dispatch(postAssessment(formData, navigate))
        }
        else {
            alert('Kindly fill all the details')
        }
    }

    var toolbarOptions = [[{ 'list': 'bullet' }, 'bold', 'italic', 'underline', { 'list': 'ordered' }, 'link']];
    const module = {
        toolbar: toolbarOptions,
    };


    console.log(description)

    return (
        <div className="Main">
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div className='Assessment-tab-1 row'>
                        <h2 className='col-xl-11 col-lg-11 col-md-10 col-sm-9 col-xs-5'>New Assessment</h2>
                        <button onClick={() => handleSubmit()} className='btn btn-primary col-xl-1 col-lg-1 col-md-2 col-sm-3 col-xs-5'>Save</button>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div style={{ width: "100%" }} className="AddStudent-container">
                        <div style={{ minWidth: "500px",width: "100%"  }} className='row'>
                            <div className='col-xl-8'>
                                <Table className='new-assessment-table'>
                                    <tbody>
                                        <tr>
                                            <td style={{ backgroundColor: "#0b5ed7" }} className='new-title'>
                                                Assessment Title
                                            </td>
                                            <td><input value={title} onChange={(e) => setTitle(e.target.value)} type="text" /></td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: "#0b5ed7" }} className='new-title'>
                                                Assessment Description
                                            </td>
                                            <td>
                                                <ReactQuill theme="snow" modules={module} value={description} onChange={(value) => setDescription(value)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: "#0b5ed7" }} className='new-title'>
                                                Class
                                            </td>
                                            <td>
                                                <select className="selectPicker3" value={standard} onChange={(e) => setStandard(e.target.value)}>
                                                    <option value="" disabled>
                                                        Select Stardard
                                                    </option>
                                                    {
                                                        classes !== null &&
                                                        Array.from(new Set(classes.map((item) => item.standard))).map((item)=>(
                                                            standardList.filter((class1) => class1.value === item).map((class1) => (
                                                                <option value={class1.value}>{class1.label}</option>
                                                            ))
                                                        ))
                                                    }
                                                </select>
                                                &emsp;&nbsp;
                                                <select className="selectPicker3" value={section} onChange={(e) => setSection(e.target.value)}>
                                                    <option value="" disabled>
                                                        Select Section
                                                    </option>
                                                    {
                                                        classes !== null &&
                                                        Array.from(new Set(classes.filter((item) => parseInt(standard) === item.standard).map((item) =>item.section))).map((item)=>(
                                                            <option value={item}>{item}</option>
                                                        ))
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: "#0b5ed7" }} className='new-title'>
                                                Due Date
                                            </td>
                                            <td><input value={lastDate} onChange={(e) => setLastDate(e.target.value)} type="datetime-local" /></td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: "#0b5ed7" }} className='new-title'>
                                                Max Mark
                                            </td>
                                            <td><input value={maxMarks} onChange={(e) => setMaxMarks(e.target.value)} type="number" min={0} /></td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: "#0b5ed7" }} className='new-title'>
                                                Weightage Mark
                                            </td>
                                            <td><input value={weightageMarks} onChange={(e) => setWeightageMarks(e.target.value)} type="number" min={0} /></td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: "#0b5ed7" }} className='new-title'>
                                                Upload Question
                                            </td>
                                            <td>
                                                {/* <Uploader autoUpload={false} method="post" action="https://schoolportalbackend.onrender.com/assessments" fileList={selectedFile ? [selectedFile] : []}  disabled={selectedFile ? true : false} /> */}
                                                <input type="file" onChange={handleFileChange} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewAssessment
