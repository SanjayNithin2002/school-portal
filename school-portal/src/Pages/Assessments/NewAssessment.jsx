import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table';
import { useDispatch, useSelector } from "react-redux"
import { postAssessment } from "../../actions/assessments"
import { getClass } from '../../actions/class';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Notification, useToaster } from 'rsuite';
import { useNavigate, useLocation } from "react-router-dom"

function NewAssessment({status,onLoading}) {

    const navigate = useNavigate();
    const location = useLocation();
    const toaster = useToaster();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [maxMarks, setMaxMarks] = useState(0);
    const [description, setDescription] = useState('');
    const [fetchStatus,setFetchStatus] = useState(true);
    const [selectedFile, setSelectedFile] = useState('');
    const [lastDate, setLastDate] = useState(new Date());
    const [weightageMarks, setWeightageMarks] = useState(0);

    const [standard, setStandard] = useState("");
    const [section, setSection] = useState("");
    const standardList = [{ label: "I", value: 1 }, { label: "II", value: 2 }, { label: "III", value: 3 }, { label: "IV", value: 4 }, { label: "V", value: 5 }, { label: "VI", value: 6 }, { label: "VII", value: 7 }, { label: "VIII", value: 8 }, { label: "IX", value: 9 }, { label: "X", value: 10 }, { label: "XI", value: 11 }, { label: "XII", value: 12 }];

    useEffect(() => {
        if(fetchStatus){
            onLoading(true);
            dispatch(getClass("/PostAssessment",navigate,{ type: localStorage.getItem('type'), id: localStorage.getItem('id') }))
        }
    }, [dispatch,navigate,fetchStatus])

    const class1 = useSelector((state) => state.allClassReducer)
    console.log(class1);

    useEffect(()=>{
        if(class1){
            onLoading(false);
        }
    },[class1])

    useEffect(()=>{
        if(location.state){
            onLoading(false);
            setFetchStatus(false);
            const message = (
                <Notification type="error" header="error" closable>
                  Error Code: {location.state.status},<br/>{location.state.message}
                </Notification>
            );
            toaster.push(message, {placement:'topCenter'})
            navigate('/PostAssessment',{state:null});
        }
    },[location.state,navigate,toaster])

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
            class1.docs.map((item) => {
                if (item.teacher && item.teacher !== null && item.subject !== "Class Teacher" && item.teacher._id === localStorage.getItem('id')) {
                    if (item.standard === parseInt(standard)) {
                        if (item.section === section) {
                            classID = item._id
                        }
                    }
                }
                return true;
            })

            formData.append('class', classID);
            console.log({title,description,class:classID,maxMarks,weightageMarks,lastDate,selectedFile,formData})
            onLoading(true);
            dispatch(postAssessment("/Assessment",navigate,formData))
        }
        else {
            const message = (
                <Notification type="warning" header="Warning" closable>
                  Kindly please fill all the details.
                </Notification>
            );
            toaster.push(message, {placement:'topCenter'})
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
                                                        class1 !== null &&
                                                        Array.from(new Set(class1.docs.map((item) => item.standard))).map((item)=>(
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
                                                        class1 !== null &&
                                                        Array.from(new Set(class1.docs.filter((item) => parseInt(standard) === item.standard).map((item) =>item.section))).map((item)=>(
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
