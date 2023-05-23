import React, { useEffect, useState } from 'react'

import "./Class.css"
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import { Steps, ButtonGroup, Button } from 'rsuite';
import Table from 'react-bootstrap/esm/Table';
import {useDispatch,useSelector} from "react-redux";
import { requestStudents, updateSection } from '../../actions/students';
import {createClass} from "../../actions/class"
import { useNavigate } from 'react-router-dom';

function CreateClass() {
    const [request1,setRequest1] = useState([])
    const [request2,setRequest2] = useState([])
    const [request3,setRequest3] = useState([])
    const [step, setStep] = useState(0);
    const [standard, setStandard] = useState('')
    const [workingDay,setWorkingDay] = useState('')
    const [startTime,setStartTime] = useState('')
    const [endTime,setEndTime] = useState('')
    const [duration,setDuration] = useState('')
    const [noClass,setNoClass] = useState(0)
    const [noBreak,setNoBreak] = useState(0)
    const [noSubject,setNoSubject] = useState(0)
    const [break1,setBreak1] = useState([])
    const [subject,setSubject] = useState([])
    const [noSections,setNoSections] = useState(0);
    const [sections,setSection] = useState([]);
    const standardList = [{label:"I",value:1},{label:"II",value:2},{label:"III",value:3},{label:"IV",value:4},{label:"V",value:5},{label:"VI",value:6},{label:"VII",value:7},{label:"VIII",value:8},{label:"IX",value:9},{label:"X",value:10},{label:"XI",value:11},{label:"XII",value:12}]
    const [auto,setAuto] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    var students = [{}] 
    const allStudents = useSelector(state=>state.allStudentsReducer);
    useEffect(()=>{
        dispatch(requestStudents());
    },[dispatch])
    
    if(allStudents && standard){
        students = allStudents.docs.filter((item)=> item.standard==standard );
    }

    const onChange = nextStep => setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
    const onNext = () => 
    {
        if(step===1){
            sections.map((section,index)=>{
                subject.map((subject)=>{
                    request1.push({
                        teacher:null,
                        standard,
                        section,
                        subject,
                        timings:[{
                            startTime:new Date(),
                            endTime:new Date(),
                            day:""
                        }]
                    })
                    return true
                })
                boys[index].map((student)=>{
                    request2.push({
                        student,
                        request : [{
                            section
                        }]
                    })
                    return true
                })
                girls[parseInt(noSections)-index-1].map((student)=>{
                    request2.push({
                        student,
                        request : [{
                            
                                propName : "section",
                                value : section
                            
                        }]
                    })
                    return true
                })
                return true
            })
            setRequest3({
                standard,
                startTime,
                endTime,
                duration,
                break:break1,
                workingDay, 
            })
            
            onChange(step + 1);
        }
        
        onChange(step + 1);
    }
    const onPrevious = () =>{
        if(step===2)
        {
            setRequest1([])
            setRequest2([])
        }
        onChange(step - 1);
    }
 
    const [boys,setBoys] = useState([]);
    const [girls,setGirls] = useState([])

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function divideListIntoGroups(list, n, gender) {
        const lists = list.filter((item)=> item.gender===gender) 
        const shuffledList = [...lists];
        shuffleArray(shuffledList);
      
        const groups = [];
        for(let i=0;i<n;i++){
            groups.push([]);
        }
      
        let currentIndex = 0;
        shuffledList.forEach(item => {
          groups[currentIndex].push(item);
          currentIndex = (currentIndex + 1) % n;
        });
      
        return groups;
    }

    const generateAutomatically = () => {
        setAuto(!auto);
        if(noSections){
            setBoys(divideListIntoGroups(students, noSections, "male"))
            setGirls(divideListIntoGroups(students, noSections, "female"))
            console.log(boys);
            console.log(girls);
        }
        else{

        }
    }

    const handleBreak = (e) =>{
        setNoBreak(e.target.value)
        let value = parseInt(e.target.value);
        let breakLen = break1.length
        if(breakLen>value){
            let diff = breakLen-value
            for(let i=0;i<diff;i++)
            {
                break1.pop();
            }
        }
        else{
            let diff = value-breakLen
            for(let i=0;i<diff;i++)
            {
                break1.push({title:'',startTime:'',endTime:''});
            }
        }
    }

    const handleSubject = (e) =>{
        setNoSubject(e.target.value)
        let value = parseInt(e.target.value);
        let SubjectLen = subject.length
        if(SubjectLen>value){
            let diff = SubjectLen-value
            for(let i=0;i<diff;i++)
            {
                subject.pop();
            }
        }
        else{
            let diff = value-SubjectLen
            for(let i=0;i<diff;i++)
            {
                subject.push('');
            }
        }
    }

    const handleSection = (e) =>{
        setAuto(false);
        setNoSections(e.target.value)
        let value = parseInt(e.target.value);
        let SectionLen = sections.length
        if(SectionLen>value){
            let diff = SectionLen-value
            for(let i=0;i<diff;i++)
            {
                sections.pop();
            }
        }
        else{
            let diff = value-SectionLen
            for(let i=0;i<diff;i++)
            {
                let ascii = 65+SectionLen+i;
                sections.push(String.fromCharCode(ascii));
            }
        }
    }

    const handleInputChange = (event, index, field) => {
        const { value } = event.target;
        setBreak1(prevBreaks => {
          const updatedBreaks = [...prevBreaks];
          updatedBreaks[index][field] = value;
          return updatedBreaks;
        });
    }

    const handleSubjectChange = (event, index) => {
        const { value } = event.target;
    
        setSubject(prevSubjects => {
          const updatedSubjects = [...prevSubjects];
          updatedSubjects[index] = value;
          return updatedSubjects;
        });
    }

    const getCount = (gender) =>{
        let count = 0;
        if(students.length!==0){
            students.map((item)=>{
                if(item.gender===gender)
                count++
                return true;
            })
            return count;
        }
        else{
            return 0;
        }
    }

    const handleSubmit = () =>{
        console.log(request1)
        console.log(request2)
        console.log(request3)
        //dispatch(createClass(request1,navigate))
        dispatch(updateSection(request2,navigate))
    }

    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Create Class</h2>
                        {
                            step === 2 && <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                        }
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="">
                        <Steps current={step}>
                            <Steps.Item title="Class" />
                            <Steps.Item title="Students" />
                            <Steps.Item title="Review" />
                        </Steps>
                        <br />
                        {
                            step === 0 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='CreateClass-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td>Standard</td>
                                                <td>
                                                    <select value={standard} onChange={(e) => setStandard(e.target.value)}>
                                                        <option value="" disabled>Select Standard</option>
                                                        {
                                                            standardList.map((item)=>(
                                                                <option value={item.value}>{item.label}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>No of Working Days<br/>(per Week)</td>
                                                <td>
                                                    <select value={workingDay} onChange={(e) => setWorkingDay(e.target.value)}>
                                                        <option value="" disabled>Select Standard</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Day Start Time</td>
                                                <td><input type="time" value={startTime} onChange={(e)=>setStartTime(e.target.value)}/></td>
                                            </tr>
                                            <tr>
                                                <td>Day End Time</td>
                                                <td><input type="time" value={endTime} onChange={(e)=>setEndTime(e.target.value)} disabled/></td>
                                            </tr>
                                            <tr>
                                                <td>Duration per Class<br/>(in min)</td>
                                                <td><input type="number" min={0} value={duration} onChange={(e)=>setDuration(e.target.value)}/></td>
                                            </tr>
                                            <tr>
                                                <td>No of Classes Per Day ?</td>
                                                <td><input type="number" min={0} value={noClass} onChange={(e)=>setNoClass(e.target.value)}/></td>
                                            </tr>
                                            <tr>
                                                <td>No of Break or Lunch per Day ?</td>
                                                <td><input type="number" min={0} value={noBreak} onChange={(e)=>handleBreak(e)}/></td>
                                            </tr>
                                            <tr>
                                                <td>No of Subjects ?</td>
                                                <td><input type="number" min={0} value={noSubject} onChange={(e)=>handleSubject(e)}/></td>
                                            </tr>
                                            { 
                                                break1.length!==0 &&
                                            <tr>
                                                <td colSpan={2} style={{textAlign:"center",fontWeight:"600"}}>Break List</td>
                                            </tr>
                                            }
                                            {
                                                break1.map((item,index)=>(
                                                    <>
                                                    <tr>
                                                        <td>Break {index+1} Name</td>
                                                        <td><input type="text" value={item.title} onChange={event => handleInputChange(event, index, 'title')}/></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Start Time</td>
                                                        <td><input type="time" value={item.startTime} onChange={event => handleInputChange(event, index, 'startTime')}/></td>
                                                    </tr>
                                                    <tr>
                                                        <td>End Time</td>
                                                        <td><input type="time" value={item.endTime} onChange={event => handleInputChange(event, index, 'endTime')}/></td>
                                                    </tr>
                                                    </>
                                                ))
                                            }
                                            {
                                                subject.length!==0 &&
                                            <tr>
                                                <td colSpan={2} style={{textAlign:"center",fontWeight:"600"}}>Subject List{noSubject}</td>
                                            </tr>  
                                            }
                                            {
                                                subject.map((item,index)=>(
                                                    <>
                                                    <tr>
                                                        <td>Subject {index+1} Name</td>
                                                        <td><input type="text" value={item} onChange={event => handleSubjectChange(event, index)}/></td>
                                                    </tr>
                                                    </>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {
                            step === 1 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='CreateClass-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td>No of Boys </td>
                                                <td>{getCount('male')}</td>
                                            </tr>
                                            <tr>
                                                <td>No of Girls</td>
                                                <td>{getCount('female')}</td>
                                            </tr>
                                            <tr>
                                                <td>No of Sections</td>
                                                <td>
                                                    <input type="number" min={0} value={noSections} onChange={(e)=>handleSection(e)}/>
                                                    <br/>
                                                    { noSections && <>
                                                    Eg,
                                                    { sections.length!==0 &&
                                                        sections.map((item)=>(
                                                            <>{item},</>
                                                        ))
                                                    }
                                                    </>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Generate Automatically</td>
                                                <td><button className='btn btn-primary' onClick={generateAutomatically}>Click</button></td>
                                            </tr>
                                            { auto &&   
                                            <tr>
                                                <td style={{textAlign:"center",backgroundColor:"white"}} colSpan={2}>
                                                    <p>Preview</p>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            
                                                    <Table className='CreateClass-subTable'>
                                                        <thead>
                                                            <th>Sections</th>
                                                            <th>No of Boys</th>
                                                            <th>No of Girls</th>
                                                            <th>Total Strength</th>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                sections.map((item,index)=>(
                                                                    <tr>
                                                                        <td>{item}</td>
                                                                        <td>{boys[index].length}</td>
                                                                        <td>{girls[parseInt(noSections)-index-1].length}</td>
                                                                        <td>{boys[index].length + girls[parseInt(noSections)-index-1].length}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </Table>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            }
                                            
                                            <tr>
                                                <td>Manual Entry<br/><a href='/Home'>Download</a></td>
                                                <td><input type="file" onChange={()=>setAuto(false)}/></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {
                            step === 2 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table>
                                        <tbody>
                                            <tr>
                                            <td colSpan={4} style={{textAlign:"center",fontWeight:"bold"}}>Class Details</td>
                                            </tr>
                                            <tr>
                                                <td>Standard</td>
                                                <td>{standard}</td>
                                                <td>No of Working Days</td>
                                                <td>{workingDay}</td>
                                            </tr>
                                            <tr>
                                                <td>Day Start Time</td>
                                                <td>{startTime}</td>
                                                <td>Day End Time</td>
                                                <td>{endTime}</td>
                                            </tr>
                                            <tr>
                                                <td>Duration</td>
                                                <td>{duration}</td>
                                                <td>No of Classes per Day</td>
                                                <td>{noClass}</td>
                                            </tr>
                                            <tr>
                                            <td colSpan={4} style={{fontWeight:"bold"}}>Break Details</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>No of Break or Lunch per Day ?</td>
                                                <td colSpan={2}>{noBreak}</td>
                                            </tr>
                                            { break1.map((item)=>(
                                            <>
                                            <tr>
                                                <td>Break Name</td>
                                                <td>{item.title}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Start Time</td>
                                                <td>{item.startTime}</td>
                                                <td>End Time</td>
                                                <td>{item.endTime}</td>
                                            </tr>
                                            </>
                                            ))
                                            }
                                            <tr>
                                                <td colSpan={4} style={{fontWeight:"bold"}}>Subject Details</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>No of Subjects ?</td>
                                                <td colSpan={2}>{noSubject}</td>
                                            </tr>
                                            <tr>
                                                <td>Subject List</td>
                                                <td colSpan={3}>
                                                    {
                                                        subject.map((item)=>(
                                                            <>{item},</>
                                                        ))
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4} style={{textAlign:"center",fontWeight:"bold"}}>Students Details</td>
                                            </tr>
                                            <tr>
                                                <td>No of Boys</td>
                                                <td>{getCount('male')}</td>
                                                <td>No of Girls</td>
                                                <td>{getCount('female')}</td>
                                            </tr>
                                            <tr>
                                                <td>No of Sections</td>
                                                <td>{noSections}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            { auto && <>
                                            <tr>
                                                <td colSpan={4} style={{fontWeight:"bold"}}>Generated Automatically</td>
                                            </tr>
                                            <tr>
                                                <td style={{backgroundColor:"white"}} colSpan={4}>
                                                    <h4>Preview</h4>
                                                    <div style={{textAlign:"center"}} className='row'>
                                                        <div className='col-lg-6 d-flex justify-content-center'>
                                                            <Table className='CreateClass-subTable'>
                                                                <thead>
                                                                    <th>Sections</th>
                                                                    <th>No of Boys</th>
                                                                    <th>No of Girls</th>
                                                                    <th>Total Strength</th>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        sections.map((item,index)=>(
                                                                            <tr>
                                                                                <td>{item}</td>
                                                                                <td>{boys[index].length}</td>
                                                                                <td>{girls[parseInt(noSections)-index-1].length}</td>
                                                                                <td>{boys[index].length + girls[parseInt(noSections)-index-1].length}</td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            </>
                                            }
                                            { !auto && <>
                                            <tr>
                                                <td colSpan={4} style={{fontWeight:"bold"}}>Manual Entry</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Student List (Section Wise)</td>
                                                <td colSpan={2}><input type="file" onChange={()=>setAuto(false)}/></td>
                                            </tr>
                                            </>
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        <ButtonGroup>
                            <Button onClick={onPrevious} disabled={step === 0}>
                                Previous
                            </Button>
                            <Button onClick={onNext} disabled={step === 3}>
                                Next{step}
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateClass

// {
//     class:"VII",
//     sections:[{
//         section:"A",
//         Boys:[students._id],
//         Girls:[students._id],
//     }],
//     subject:[
//         "English",
//         "Tamil",
//         "Maths",
//         "Science",
//         "Social",
//         "Computer",
//         "Hindi",
//     ],
//     startTime:"9:00am",
//     endTime:"4:15pm",
//     duration:"45min",
//     break:[{
//         title:"break1"
//         startTime:"10:30am",
//         endTime:"10:45am",
//     },{
//         title:"Lunch"
//         startTime:"1:00pm",
//         endTime:"1:45pm",
//     }],
//     workingDays:5
//     }