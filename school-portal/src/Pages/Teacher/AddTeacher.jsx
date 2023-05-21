import React,{useState} from 'react'
import { Steps, ButtonGroup, Button } from 'rsuite';

import SideNavBar from "../../components/SideNavBar/SideNavBar";
import "./Teacher.css";
import Table from 'react-bootstrap/esm/Table';

const AddTeacher = () => {
    const [step, setStep] = useState(0);
    const [request, setRequest] = useState({});
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [emp,setEmp] = useState('');
    const [name,setName] = useState({fname:'',lname:''});
    const [dob,setDob] = useState('');
    const [gender,setGender] = useState('');
    const [blood,setBlood] = useState('');
    const [aadhaar,setAadhaar] = useState('');
    const [secondLang,setSecondLang] = useState('');
    const [experience,setExperience] = useState(0);
    const [address,setAddress] = useState({line1:'',line2:'',city:'',state:'',pincode:''});
    const [hostelDetails,setHostelDetails] = useState({isNeeded:false,roomType:'',foodType:''});
    const [salaryDetails,setSalaryDetails] = useState({basic:0,hra:0,conveyance:0,pa:0,pf:0,pt:0})
    const [busdetails,setBusdetails] = useState({isNeeded:false,busStopArea:'',busStop:'',availableBus:''});
    const [qualification,setQualification] = useState([{}]);
    const [ugDetails,setUgDetails] = useState({title:'UG',collegeName:'',collegeLocation:'',yearPassed:'',percentage:''})
    const [pgDetails,setPgDetails] = useState({title:'PG',collegeName:'',collegeLocation:'',yearPassed:'',percentage:''})
    const [phdDetails,setPhdDetails] = useState({title:'PhD',collegeName:'',collegeLocation:'',yearPassed:'',percentage:''})
    const [bus,setBus] = useState("");
    const [hostel,setHostel] = useState("");
    const [UG,setUG] = useState("");
    const [PG,setPG] = useState(""); 
    const [PHD,setPHD] = useState("");
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const onNext = () =>{
        if(step===0){
            let flag=1;
            if(!name.fname || !name.lname || !dob || !gender || !blood || !aadhaar || !email || !phone || !emp || !secondLang){
                alert("Kindly Fill all the Details")
                flag=0;
            }
            if(!address.line1 || !address.city || !address.state || !address.pincode){
                alert("Kindly Fill the Address")
                flag=0;
            }
            if(flag===1){
                onChange(step + 1);
            }
        }
        else if(step===1){
            let flag=1;
            // if(!experience || !salaryDetails.basic || !salaryDetails.conveyance || !salaryDetails.hra || !salaryDetails.pa || !salaryDetails.pf || !salaryDetails.pt){
            //     alert("Kindly Fill Father Details")
            //     flag=0;
            // }
            // if((UG || PG || PHD) && (!ugDetails.collegeName || !ugDetails.collegeLocation || !ugDetails.yearPassed || !ugDetails.percentage)){
            //     alert("Kindly Fill Father Details")
            //     flag=0;
            // }
            // else if(UG || PG || PHD){
            //     setQualification.push(ugDetails);
            // }
            // if((PG || PHD) && (!pgDetails.collegeName || !pgDetails.collegeLocation || !pgDetails.yearPassed || !pgDetails.percentage)){
            //     alert("Kindly Fill Mother Details")
            //     flag=0;
            // }
            // else if(PG || PHD){
            //     setQualification.push(pgDetails);
            // }
            // if(PHD && (!phdDetails.collegeName || !phdDetails.collegeLocation || !phdDetails.yearPassed || !phdDetails.percentage)){
            //     alert("Kindly Fill Gaudian Details")
            //     flag=0;
            // }
            // else if(PHD){
            //     setQualification.push(phdDetails);
            // }
            if(flag===1){
                onChange(step + 1);
                setQualification([ugDetails,pgDetails,phdDetails])
            }
        }
        else if(step===2){
            onChange(step + 1);
            const req = {
                emp,
                firstName:name.fname,
                lastName:name.lname,
                dob,
                gender,
                bloodGroup:blood,
                aadhaarNumber:aadhaar,
                motherTongue:secondLang,
                phoneNumber:phone,
                email,
                address,
                qualification,
                experience,
                salaryDetails,
                busDetails: busdetails,
                hostelDetails : hostelDetails,
            }
            console.log(req)
            setRequest(req);
        }
    } 
    const onPrevious = () => onChange(step - 1);

    const handleSubmit = () =>{

    }

    return (
        <div className="Main">
            <SideNavBar />
            <div className="Home">
                <div className="container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Add Staff</h2>
                        {step===3 && <button onClick={() => handleSubmit} className='btn btn-primary'>Submit</button>}
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="">
                        <Steps current={step}>
                            <Steps.Item title="Personal" />
                            <Steps.Item title={<>Education<br/>Salary</>} />
                            <Steps.Item title={<>School Bus <br/>& Hostel</>} />
                            <Steps.Item title="Review" />
                        </Steps>
                        <br />
                        {step === 0 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='AddTeacher-Table-List'>
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
                                                <td>Emp ID</td>
                                                <td><input value={emp} onChange={(e)=>setEmp(e.target.value)} type="text" /></td>
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
                                                <td>Mother Tongue</td>
                                                <td><input value={secondLang} onChange={(e) => setSecondLang(e.target.value)}  type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Email ID</td>
                                                <td><input value={email} onChange={(e) => setEmail(e.target.value)}  type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Phone Number</td>
                                                <td><input value={phone} onChange={(e) => setPhone(e.target.value)}  type="text" /></td>
                                            </tr>
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
                        {step === 1 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='AddTeacher-Table-List'>
                                        <tbody>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>Education Details</td>
                                            </tr>
                                            
                                            <tr>
                                                <td>Qualification</td>
                                                <td className='radio'><input type="checkbox" name="qualification" onClick={()=>setUG(!UG)} />UG &emsp; <input type="checkbox" name="qualification" onClick={()=>setPG(!PG)} />PG &emsp; <input type="checkbox" name="qualification" onClick={()=>setPHD(!PHD)} />PHD &emsp;</td>
                                            </tr>
                                            <tr>
                                                <td>How many years experience in this field</td>
                                                <td className='radio'><input value={experience} onChange={(e) => setExperience(e.target.value)}  type="number" /></td>
                                            </tr>
                                            {(UG || PG || PHD) && <>
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>UG Details</td>
                                            </tr>
                                            <tr>
                                                <td>College Name</td>
                                                <td><input value={ugDetails.collegeName} onChange={(e)=>setUgDetails((prev) => ({...prev,collegeName:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>College Location<br/>(City,State,Country)</td>
                                                <td><input value={ugDetails.collegeLocation} onChange={(e)=>setUgDetails((prev) => ({...prev,collegeLocation:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Year Passed out</td>
                                                <td><input value={ugDetails.yearPassed} onChange={(e)=>setUgDetails((prev) => ({...prev,yearPassed:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Percentage</td>
                                                <td><input value={ugDetails.percentage} onChange={(e)=>setUgDetails((prev) => ({...prev,percentage:e.target.value}))} type="text" /></td>
                                            </tr>
                                            </>
                                            }
                                            {(PG || PHD) && <>
                                                <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>UG Details</td>
                                            </tr>
                                            <tr>
                                                <td>College Name</td>
                                                <td><input value={pgDetails.collegeName} onChange={(e)=>setPgDetails((prev) => ({...prev,collegeName:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>College Location<br/>(City,State,Country)</td>
                                                <td><input value={pgDetails.collegeLocation} onChange={(e)=>setPgDetails((prev) => ({...prev,collegeLocation:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Year Passed out</td>
                                                <td><input value={pgDetails.yearPassed} onChange={(e)=>setPgDetails((prev) => ({...prev,yearPassed:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Percentage</td>
                                                <td><input value={pgDetails.percentage} onChange={(e)=>setPgDetails((prev) => ({...prev,percentage:e.target.value}))} type="text" /></td>
                                            </tr>
                                            </>
                                            }
                                            {PHD && <>
                                                <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>UG Details</td>
                                            </tr>
                                            <tr>
                                                <td>College Name</td>
                                                <td><input value={phdDetails.collegeName} onChange={(e)=>setPhdDetails((prev) => ({...prev,collegeName:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>College Location<br/>(City,State,Country)</td>
                                                <td><input value={phdDetails.collegeLocation} onChange={(e)=>setPhdDetails((prev) => ({...prev,collegeLocation:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Year Passed out</td>
                                                <td><input value={phdDetails.yearPassed} onChange={(e)=>setPhdDetails((prev) => ({...prev,yearPassed:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Percentage</td>
                                                <td><input value={phdDetails.percentage} onChange={(e)=>setPhdDetails((prev) => ({...prev,percentage:e.target.value}))} type="text" /></td>
                                            </tr>
                                            </>
                                            }
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan={2} className='newstudent-tilte'>Salary Details</td>
                                            </tr>
                                            <tr>
                                                <td>Basic</td>
                                                <td><input value={salaryDetails.basic} onChange={(e)=>setSalaryDetails((prev) => ({...prev,basic:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>HRA</td>
                                                <td><input value={salaryDetails.hra} onChange={(e)=>setSalaryDetails((prev) => ({...prev,hra:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Conveyance</td>
                                                <td><input value={salaryDetails.conveyance} onChange={(e)=>setSalaryDetails((prev) => ({...prev,conveyance:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>PA</td>
                                                <td><input value={salaryDetails.pa} onChange={(e)=>setSalaryDetails((prev) => ({...prev,pa:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>PF</td>
                                                <td><input value={salaryDetails.pf} onChange={(e)=>setSalaryDetails((prev) => ({...prev,pf:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Professional Tax</td>
                                                <td><input value={salaryDetails.pt} onChange={(e)=>setSalaryDetails((prev) => ({...prev,pt:e.target.value}))} type="text" /></td>
                                            </tr>
                                            
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {step === 2 &&
                            <div className='row'>
                                <div className='col-lg-8 justify-content-center'>
                                    <Table bordered className='AddTeacher-Table-List'>
                                        <tbody>
                                        {
                                            (bus || (!bus && !hostel) ) && 
                                            <tr>
                                                <td>Does the student need school bus : </td>
                                                <td><input type="radio" name="bus" onClick={()=>{setBus(true);setBusdetails((prev)=>({...prev,isNeeded:true}));}} checked={bus} />Yes &emsp; <input type="radio" name="bus" onClick={()=>{setBus(false);setBusdetails((prev)=>({...prev,isNeeded:false}));}} checked={!bus} />No</td>
                                            </tr>
                                             
                                           } 
                                           {
                                            (hostel || (!bus && !hostel) ) && 
                                            <tr>
                                                <td>Does the student need Hostal : </td>
                                                <td><input type="radio" name="hostel" onClick={()=>{setHostel(true);setHostelDetails((prev)=>({...prev,isNeeded:true}));}} checked={hostel} />Yes &emsp; <input type="radio" name="hostel" onClick={()=>{setHostel(false);setHostelDetails((prev)=>({...prev,isNeeded:false}));}} checked={!hostel} />No</td>
                                            </tr>
                                            }
                                            {bus && <>
                                            <tr>
                                                <td>Bus Stop Area</td>
                                                <td><input value={busdetails.busStopArea} onChange={(e)=>setBusdetails((prev) => ({...prev,busStopArea:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Bus Stop</td>
                                                <td><input value={busdetails.busStop} onChange={(e)=>setBusdetails((prev) => ({...prev,busStop:e.target.value}))} type="text" /></td>
                                            </tr>
                                            <tr>
                                                <td>Available Bus</td>
                                                <td><input value={busdetails.availableBus} onChange={(e)=>setBusdetails((prev) => ({...prev,availableBus:e.target.value}))} type="text" /><br/>Automatically</td>
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
                                    <Table className='AddTeacher-Table-List-1'>
                                        <tbody>
                                            <tr>
                                                <td colSpan={4}>Personal Details</td>
                                            </tr>
                                            <tr>
                                                <td>First Name</td>
                                                <td>Sathiya</td>
                                                <td>Last Name</td>
                                                <td>Siva</td>
                                            </tr>
                                            <tr>
                                                <td>DOB</td>
                                                <td>12/12/2012</td>
                                                <td>Gender</td>
                                                <td>Male</td>
                                            </tr>
                                            <tr>
                                                <td>Standard</td>
                                                <td>8th grade</td>
                                                <td>Aadhaar No</td>
                                                <td>798465894662</td>
                                            </tr>
                                            <tr>
                                                <td>Mother Tongue</td>
                                                <td>Tamil</td>
                                                <td>Blood Group</td>
                                                <td>B+</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4}>Family Details</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Do he/she have a Father?</td>
                                                <td colSpan={2} className='radio'>Yes</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Do he/she have a Mother?</td>
                                                <td colSpan={2} className='radio'>No</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Do he/she have a Siblings?</td>
                                                <td colSpan={2} className='radio'>No</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4}>Father Details</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td>Siva Kumar</td>
                                                <td>Age</td>
                                                <td>40</td>
                                            </tr>
                                            <tr>
                                                <td>Qualification</td>
                                                <td>PHD in Maths</td>
                                                <td>Occupation</td>
                                                <td>Sr. Professor,VIT,Vellore</td>
                                            </tr>
                                            <tr>
                                                <td>Phone No</td>
                                                <td>9875462135</td>
                                                <td>Email ID</td>
                                                <td>sivakumar12@gmail.com</td>
                                            </tr>
                                            <tr>
                                                <td>Annaual Income</td>
                                                <td>10000000-20000000</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4}>School Bus and Hostel Details</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Does the student need school bus : </td>
                                                <td colSpan={2}>Yes</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>Does the student need Hostal : </td>
                                                <td colSpan={2}>No</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={4}>School Bus Details</td>
                                            </tr>
                                            <tr>
                                                <td>Bus Stop Area</td>
                                                <td>Katpadi</td>
                                                <td>Bus Stop</td>
                                                <td>Muthtamzil Nager</td>
                                            </tr>
                                            <tr>
                                                <td>Available Bus</td>
                                                <td>3A</td>
                                                <td>Route Bus</td>
                                                <td>Thotapalayam Via Katpadi</td>
                                            </tr>
                                            
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

export default AddTeacher
