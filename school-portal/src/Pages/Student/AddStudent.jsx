import React,{useState} from 'react'
import { Steps, ButtonGroup, Button } from 'rsuite';

import SideNavBar from "../../components/SideNavBar/SideNavBar";
import "./Student.css";
import Table from 'react-bootstrap/esm/Table';

const AddStudent = () => {
    const [name,setName] = useState({fname:'',lname:''});
    const [dob,setDob] = useState('');
    const [gender,setGender] = useState('');
    const [blood,setBlood] = useState('');
    const [aadhaar,setAadhaar] = useState('');
    const [secondLang,setSecondLang] = useState('');
    const [standard,setStandard] = useState('');
    const [fatherDetails,setFatherDetails] = useState({name:'',age:null,qualification:'',occupation:'',income:'',phone:null,email:''});
    const [motherDetails,setMotherDetails] = useState({name:'',age:null,qualification:'',occupation:'',income:'',phone:null,email:''});
    const [gaudianDetails,setGaudianDetails] = useState({name:'',age:null,qualification:'',occupation:'',income:'',phone:null,email:''});
    const [address,setAddress] = useState({line1:'',line2:'',city:'',state:'',pincode:''});
    const [busdetails,setBusdetails] = useState({area:'',stop:'',busNo:'',route:''});
    const [hostelDetails,setHostelDetails] = useState({roomType:'',foodType:''});
    const [step, setStep] = useState(0);
    const [father,setFather] = useState(true);
    const [mother,setMother] = useState(true); 
    const [bus,setBus] = useState(false);
    const [hostel,setHostel] = useState(false);
    // eslint-disable-next-line
    const [siblings,setSiblings] = useState(false);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
    const onNext = () => {
        if(step===0){
            if(!name.fname || !name.lname || !dob || !gender || !blood || !aadhaar || !standard || !secondLang){
                alert("Kindly Fill all the Details")
            }
            else{
                onChange(step + 1);
            }
        }
        else if(step===1){
            
        }
    }
    const onPrevious = () => onChange(step - 1);
    const stardardList = ['LKG','UKG','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
    const incomeList = ["No Income","0-h50000","50000-200000","200000-400000","400000-700000","More than 700000"]
    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Add Student</h2>
                        {step===3 && <button className='btn btn-primary'>Submit</button>}
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="">
                        <Steps current={step}>
                            <Steps.Item title="Personal" />
                            <Steps.Item title="Family" />
                            <Steps.Item title={<>School Bus <br/>& Hostel</>} />
                            <Steps.Item title="Review" />
                        </Steps>
                        <br />
                        {step === 0 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='AddStudent-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td>First Name</td>
                                                <td><input value={name.fname} onChange={(e)=>setName((prev) => ({...prev,fname:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Last Name</td>
                                                <td><input value={name.lname} onChange={(e)=>setName((prev) => ({...prev,lname:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>DOB</td>
                                                <td><input value={dob} onChange={(e) => setDob(e.target.value)} type="date" /></td>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <td>
                                                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                                        <option value="" disabled>Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Blood Group</td>
                                                <td><input value={blood} onChange={(e) => setBlood(e.target.value)} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Aadhaar No</td>
                                                <td><input value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Standard</td>
                                                <td>
                                                    <select value={standard} onChange={(e) => setStandard(e.target.value)}>
                                                        <option value="" disabled>Select Standard</option>
                                                        {
                                                            stardardList.map((item)=>(
                                                                <option value={item}>{item}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Mother Tongue</td>
                                                <td><input value={secondLang} onChange={(e) => setSecondLang(e.target.value)}  type="text" /></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {step === 1 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='AddStudent-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td>Do he/she have a Father?</td>
                                                <td className='radio'><input type="radio" name="father" onClick={()=>setFather(true)} />Yes &emsp; <input type="radio" name="father" onClick={()=>setFather(false)} />No</td>
                                            </tr>
                                            <tr>
                                                <td>Do he/she have a Mother?</td>
                                                <td className='radio'><input type="radio" name="mother" onClick={()=>setMother(true)} />Yes &emsp; <input type="radio" name="mother" onClick={()=>setMother(false)} />No</td>
                                            </tr>
                                            <tr>
                                                <td>Do he/she have a Siblings?</td>
                                                <td className='radio'><input type="radio" name="siblings" />Yes &emsp; <input type="radio" name="siblings" />No</td>
                                            </tr>
                                            {father && <>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>Father Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td><input value={fatherDetails.name} onChange={(e)=>setFatherDetails((prev) => ({...prev,name:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Age</td>
                                                <td><input value={fatherDetails.age} onChange={(e)=>setFatherDetails((prev) => ({...prev,age:e.target.value}))} type="number" /></td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td><input value={fatherDetails.qualification} onChange={(e)=>setFatherDetails((prev) => ({...prev,qualification:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Occupation</td>
                                                <td><input value={fatherDetails.occupation} onChange={(e)=>setFatherDetails((prev) => ({...prev,occupation:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Annual Income</td>
                                                <td>
                                                    <select value={fatherDetails.income} onChange={(e) => setFatherDetails((prev) => ({...prev,income:e.target.value}))}>
                                                        <option value="" disabled>Select Annual Income</option>
                                                        {
                                                            incomeList.map((item)=>(
                                                                <option value={item}>{item}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td><input value={fatherDetails.phone} onChange={(e)=>setFatherDetails((prev) => ({...prev,phone:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Email ID</td>
                                                <td><input value={fatherDetails.email} onChange={(e)=>setFatherDetails((prev) => ({...prev,email:e.target.value}))} type="text" /></td>
                                            </tr>
                                            </>
                                            }
                                            {mother && <>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>Mother Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td><input value={motherDetails.name} onChange={(e)=>setMotherDetails((prev) => ({...prev,name:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Age</td>
                                                <td><input value={motherDetails.age} onChange={(e)=>setMotherDetails((prev) => ({...prev,age:e.target.value}))} type="number" /></td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td><input value={motherDetails.qualification} onChange={(e)=>setMotherDetails((prev) => ({...prev,qualification:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Occupation</td>
                                                <td><input value={motherDetails.occupation} onChange={(e)=>setMotherDetails((prev) => ({...prev,occupation:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Annual Income</td>
                                                <td>
                                                    <select value={motherDetails.income} onChange={(e) => setMotherDetails((prev) => ({...prev,income:e.target.value}))}>
                                                        <option value="" disabled>Select Annual Income</option>
                                                        {
                                                            incomeList.map((item)=>(
                                                                <option value={item}>{item}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td><input value={motherDetails.phone} onChange={(e)=>setMotherDetails((prev) => ({...prev,phone:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Email ID</td>
                                                <td><input value={motherDetails.email} onChange={(e)=>setMotherDetails((prev) => ({...prev,email:e.target.value}))} type="text" /></td>
                                            </tr>
                                            </>
                                            }
                                            {!father && !mother && <>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>Guardian Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td><input value={gaudianDetails.name} onChange={(e)=>setGaudianDetails((prev) => ({...prev,name:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Age</td>
                                                <td><input value={gaudianDetails.age} onChange={(e)=>setGaudianDetails((prev) => ({...prev,age:e.target.value}))} type="number" /></td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td><input value={gaudianDetails.qualification} onChange={(e)=>setGaudianDetails((prev) => ({...prev,qualification:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Occupation</td>
                                                <td><input value={gaudianDetails.occupation} onChange={(e)=>setGaudianDetails((prev) => ({...prev,occupation:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Annual Income</td>
                                                <td>
                                                    <select value={gaudianDetails.income} onChange={(e) => setGaudianDetails((prev) => ({...prev,income:e.target.value}))}>
                                                        <option value="" disabled>Select Annual Income</option>
                                                        {
                                                            incomeList.map((item)=>(
                                                                <option value={item}>{item}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td><input value={gaudianDetails.phone} onChange={(e)=>setGaudianDetails((prev) => ({...prev,phone:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Email ID</td>
                                                <td><input value={gaudianDetails.email} onChange={(e)=>setGaudianDetails((prev) => ({...prev,email:e.target.value}))} type="text" /></td>
                                            </tr>
                                            </>
                                            }
                                            <tr>
                                                <td>Address Line-1</td>
                                                <td><textarea value={address.line1} onChange={(e)=>setAddress((prev) => ({...prev,line1:e.target.value}))} rows={4} cols={30}/></td>
                                            </tr>
                                            <tr>
                                                <td>Address Line-2</td>
                                                <td><textarea value={address.line2} onChange={(e)=>setAddress((prev) => ({...prev,line2:e.target.value}))} rows={4} cols={30}/></td>
                                            </tr>
                                            <tr>
                                                <td>City</td>
                                                <td><input value={address.city} onChange={(e)=>setAddress((prev) => ({...prev,city:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>State</td>
                                                <td><input value={address.state} onChange={(e)=>setAddress((prev) => ({...prev,state:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Pincode</td>
                                                <td><input value={address.pincode} onChange={(e)=>setAddress((prev) => ({...prev,pincode:e.target.value}))} type="text" /></td>
                                            </tr>
                                            
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {step === 2 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='AddStudent-Table-List'>
                                        <tbody>
                                            {
                                            (bus || (!bus && !hostel) ) && 
                                            <tr>
                                                <td>Does the student need school bus : </td>
                                                <td><input type="radio" name="bus" onClick={()=>setBus(true)} />Yes &emsp; <input type="radio" name="bus" onClick={()=>setBus(false)} />No</td>
                                            </tr>
                                             
                                           } 
                                           {
                                            (hostel || (!bus && !hostel) ) && 
                                            <tr>
                                                <td>Does the student need Hostal : </td>
                                                <td><input type="radio" name="hostel" onClick={()=>setHostel(true)} />Yes &emsp; <input type="radio" name="hostel" onClick={()=>setHostel(false)} />No</td>
                                            </tr>
                                            }
                                            {bus && <>
                                            <tr>
                                                <td>Bus Stop Area</td>
                                                <td><input value={busdetails.area} onChange={(e)=>setBusdetails((prev) => ({...prev,area:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Bus Stop</td>
                                                <td><input value={busdetails.stop} onChange={(e)=>setBusdetails((prev) => ({...prev,stop:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Available Bus</td>
                                                <td><input value={busdetails.busNo} onChange={(e)=>setBusdetails((prev) => ({...prev,busNo:e.target.value}))} type="text" /><br/>Automatically</td>
                                            </tr>
                                            <tr>
                                                <td>Route Bus</td>
                                                <td>{busdetails.route}</td>
                                            </tr>
                                            </>}
                                            {hostel && <>
                                            <tr>
                                                <td>Room Type</td>
                                                <td><input type="radio" name="room" onClick={()=>setHostelDetails((prev) => ({...prev,roomType:"AC"}))} />AC &emsp; <input type="radio" name="room" onClick={()=>setHostelDetails((prev) => ({...prev,roomType:"Non AC"}))} />Non AC</td>
                                            </tr>
                                            <tr>
                                                <td>Food Type</td>
                                                <td><input type="radio" name="food" onClick={()=>setHostelDetails((prev) => ({...prev,foodType:"Veg"}))} />Veg &emsp; <input type="radio" name="food" onClick={()=>setHostelDetails((prev) => ({...prev,foodType:"Non Veg"}))} />Non Veg</td>
                                            </tr>
                                            </>}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {step === 3 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table className='AddStudent-Table-List-1'>
                                        <tbody>
                                            <tr>
                                                <td colSpan={4} style={{textAlign:"center",fontWeight:"bold"}}>Personal Details</td>
                                            </tr>
                                            <tr>
                                                <td>First Name</td>
                                                <td>{name.fname}</td>
                                                <td>Last Name</td>
                                                <td>{name.lname}</td>
                                            </tr>
                                            <tr>
                                                <td>DOB</td>
                                                <td>{dob}</td>
                                                <td>Gender</td>
                                                <td>{gender}</td>
                                            </tr>
                                            <tr>
                                                <td>Standard</td>
                                                <td>{standard} grade</td>
                                                <td>Aadhaar No</td>
                                                <td>{aadhaar}</td>
                                            </tr>
                                            <tr>
                                                <td>Mother Tongue</td>
                                                <td>{secondLang}</td>
                                                <td>Blood Group</td>
                                                <td>{blood}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4} style={{textAlign:"center",fontWeight:"bold"}}>Family Details</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Do he/she have a Father?</td>
                                                <td colSpan={2} className='radio'>{father ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Do he/she have a Mother?</td>
                                                <td colSpan={2} className='radio'>{mother ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Do he/she have a Siblings?</td>
                                                <td colSpan={2} className='radio'>No</td>
                                            </tr>
                                            { father && <>
                                            <tr>
                                                <td colSpan={4} style={{fontWeight:"bold"}}>Father Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td>{fatherDetails.name}</td>
                                                <td>Age</td>
                                                <td>{fatherDetails.age}</td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td>{fatherDetails.qualification}</td>
                                                <td>Occupation</td>
                                                <td>{fatherDetails.occupation}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td>{fatherDetails.phone}</td>
                                                <td>Email ID</td>
                                                <td>{fatherDetails.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Annaual Income</td>
                                                <td>{fatherDetails.income}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            </>}
                                            { mother && <>
                                            <tr>
                                                <td colSpan={4} style={{fontWeight:"bold"}}>mother Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td>{motherDetails.name}</td>
                                                <td>Age</td>
                                                <td>{motherDetails.age}</td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td>{motherDetails.qualification}</td>
                                                <td>Occupation</td>
                                                <td>{motherDetails.occupation}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td>{motherDetails.phone}</td>
                                                <td>Email ID</td>
                                                <td>{motherDetails.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Annaual Income</td>
                                                <td>{motherDetails.income}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            </>}
                                            { !father && !mother && <>
                                            <tr>
                                                <td colSpan={4} style={{fontWeight:"bold"}}>Guardian Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td>{gaudianDetails.name}</td>
                                                <td>Age</td>
                                                <td>{gaudianDetails.age}</td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td>{gaudianDetails.qualification}</td>
                                                <td>Occupation</td>
                                                <td>{gaudianDetails.occupation}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td>{gaudianDetails.phone}</td>
                                                <td>Email ID</td>
                                                <td>{gaudianDetails.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Annaual Income</td>
                                                <td>{gaudianDetails.income}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            </>}
                                            <tr>
                                                <td colSpan={4} style={{textAlign:"center",fontWeight:"bold"}}>School Bus and Hostel Details</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Does the student need school bus : </td>
                                                <td colSpan={2}>{bus ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Does the student need Hostal : </td>
                                                <td colSpan={2}>{hostel ? "Yes" : "No"}</td>
                                            </tr>
                                            {bus && <>
                                            <tr>
                                                <td colSpan={4} style={{fontWeight:"bold"}}>School Bus Details</td>
                                            </tr>
                                            <tr>
                                                <td>Bus Stop Area</td>
                                                <td>{busdetails.area}</td>
                                                <td>Bus Stop</td>
                                                <td>{busdetails.stop}</td>
                                            </tr>
                                            <tr>
                                                <td>Available Bus</td>
                                                <td>{busdetails.busNo}</td>
                                                <td>Route Bus</td>
                                                <td>{busdetails.route}</td>
                                            </tr>
                                            </>}
                                            {hostel && <>
                                            <tr>
                                                <td colSpan={4} style={{fontWeight:"bold"}}>Hostel Details</td>
                                            </tr>
                                            <tr>
                                                <td>Room Type</td>
                                                <td>{hostelDetails.roomType}</td>
                                                <td>Food Type</td>
                                                <td>{hostelDetails.foodType}</td>
                                            </tr>
                                            </>}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        <br />
                        <ButtonGroup>
                            <Button onClick={onPrevious} disabled={step === 0}>
                                Previous
                            </Button>
                            <Button onClick={onNext} disabled={step === 3}>
                                Next
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddStudent
