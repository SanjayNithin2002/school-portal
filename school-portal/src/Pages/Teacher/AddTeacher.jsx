import React, { useState } from 'react'
import { Steps, ButtonGroup, Button } from 'rsuite';
import Table from 'react-bootstrap/esm/Table';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AddAdmin, AddTeachers, AddWorkers } from '../../actions/auth';
import "./Teacher.css";

const AddTeacher = () => {
    const [step, setStep] = useState(0);
    const [request, setRequest] = useState({});
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [emp, setEmp] = useState('');
    const [name, setName] = useState({ fname: '', lname: '' });
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [blood, setBlood] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [secondLang, setSecondLang] = useState('');
    const [experience, setExperience] = useState();
    const [address, setAddress] = useState({ line1: '', line2: '', city: '', state: '', pincode: '' });
    const [salaryDetails, setSalaryDetails] = useState({ basic: '', hra: '', conveyance: '', pa: '', pf: '', pt: '' })
    const [qualification, setQualification] = useState([{}]);
    const [ugDetails, setUgDetails] = useState({ title: '', collegeName: '', collegeLocation: '', yearPassed: '', percentage: '' })
    const [pgDetails, setPgDetails] = useState({ title: '', collegeName: '', collegeLocation: '', yearPassed: '', percentage: '' })
    const [phdDetails, setPhdDetails] = useState({ title: '', collegeName: '', collegeLocation: '', yearPassed: '', percentage: '' })
    const [UG, setUG] = useState(false);
    const [PG, setPG] = useState(false);
    const [PHD, setPHD] = useState(false);
    const [role, setRole] = useState("");
    const [primarySubject,setPrimarySubject] = useState("");
    const [designation, setDesignation] = useState("");
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };


    const onNext = () => {
        if (step === 0) {
            let flag = 1;
            if (!name.fname || !name.lname || !dob || !gender || !blood || !aadhaar || !email || !phone || !emp || !secondLang) {
                alert("Kindly Fill all the Details")
                flag = 0;
            }
            else if (!address.line1 || !address.city || !address.state || !address.pincode) {
                alert("Kindly Fill the Address")
                flag = 0;
            }
            if (flag === 1) {
                onChange(step + 1);
            }
        }
        else if (step === 1) {
            let flag = 1;

            if (!designation || !experience) {
                alert("Kindly Fill all Details")
                flag = 0;
            }
            if ((UG || PG || PHD) && (!ugDetails.collegeName || !ugDetails.collegeLocation || !ugDetails.yearPassed || !ugDetails.percentage)) {
                alert("Kindly Fill UG Details")
                flag = 0;
            }
            if ((PG || PHD) && (!pgDetails.collegeName || !pgDetails.collegeLocation || !pgDetails.yearPassed || !pgDetails.percentage)) {
                alert("Kindly Fill PG Details")
                flag = 0;
            }
            if (PHD && (!phdDetails.collegeName || !phdDetails.collegeLocation || !phdDetails.yearPassed || !phdDetails.percentage)) {
                alert("Kindly Fill PHD Details")
                flag = 0;
            }
            if (flag === 1) {
                onChange(step + 1);
                if (PHD)
                    setQualification([ugDetails, pgDetails, phdDetails])
                if (PG)
                    setQualification([ugDetails, pgDetails])
                if (UG)
                    setQualification([ugDetails])
            }
        }
        else if (step === 2) {
            
            let flag = 1;
            if(!salaryDetails.basic || !salaryDetails.conveyance || !salaryDetails.hra || !salaryDetails.pa || !salaryDetails.pf || !salaryDetails.pt){
                alert("Kindly Fill all Details")
                flag = 0;
            }
            if(flag===1){
                onChange(step + 1);
                const req = {
                    empID: emp,
                    firstName: name.fname,
                    lastName: name.lname,
                    dob,
                    gender,
                    bloodGroup: blood,
                    aadharNumber: aadhaar,
                    motherTongue: secondLang,
                    phoneNumber: phone,
                    email,
                    address,
                    qualification,
                    experience,
                    salaryDetails,
                    primarySubject,
                    designation
                }
                console.log(req)
                setRequest(req);
            }
        }
    }
    const onPrevious = () => onChange(step - 1);

    const dispatch = useDispatch();
    const navigator = useNavigate();

    const handleSubmit1 = () => {
        if(role==="teacher" && localStorage.getItem('token'))
        dispatch(AddTeachers(request, navigator));
        else if(role==="admin" && localStorage.getItem('token'))
        dispatch(AddAdmin(request,navigator));
        else if(localStorage.getItem('token'))
        dispatch(AddWorkers(request,navigator));
    }

    return (
        <div className='Main'>
            <div className="Home">
                <div style={{ padding: "20px 40px" }} class="container1 container rounded bg-white">
                    <div className='d-flex justify-content-between'>
                        <h2>Add Staff</h2>
                        {step === 3 && <button onClick={handleSubmit1} className='btn btn-primary'>Submit</button>}
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className="AddStudent-container">
                        <div style={{ minWidth: "600px" }}>
                            <Steps current={step}>
                                <Steps.Item title="Personal" />
                                <Steps.Item title="Education" />
                                <Steps.Item title="Salary" />
                                <Steps.Item title="Review" />
                            </Steps>
                            <br />
                            {step === 0 &&
                                <div className='row'>
                                    <div className='col-lg-8 justify-content-center table-responsive'>
                                        <Table className='AddStudent-Table-List'>
                                            <tbody>
                                                <tr>
                                                    <td>First Name</td>
                                                    <td><input value={name.fname} onChange={(e) => setName((prev) => ({ ...prev, fname: e.target.value }))} type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Last Name</td>
                                                    <td><input value={name.lname} onChange={(e) => setName((prev) => ({ ...prev, lname: e.target.value }))} type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Emp ID</td>
                                                    <td><input value={emp} onChange={(e) => setEmp(e.target.value)} type="text" /></td>
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
                                                    <td><input value={secondLang} onChange={(e) => setSecondLang(e.target.value)} type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Email ID</td>
                                                    <td><input value={email} onChange={(e) => setEmail(e.target.value)} type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Phone Number</td>
                                                    <td><input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Address Line-1</td>
                                                    <td><textarea value={address.line1} onChange={(e) => setAddress((prev) => ({ ...prev, line1: e.target.value }))} rows={4} cols={30} /></td>
                                                </tr>
                                                <tr>
                                                    <td>Address Line-2</td>
                                                    <td><textarea value={address.line2} onChange={(e) => setAddress((prev) => ({ ...prev, line2: e.target.value }))} rows={4} cols={30} /></td>
                                                </tr>
                                                <tr>
                                                    <td>City</td>
                                                    <td><input value={address.city} onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))} type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <td>State</td>
                                                    <td><input value={address.state} onChange={(e) => setAddress((prev) => ({ ...prev, state: e.target.value }))} type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Pincode</td>
                                                    <td><input value={address.pincode} onChange={(e) => setAddress((prev) => ({ ...prev, pincode: e.target.value }))} type="text" /></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            }
                            {step === 1 &&
                                <div className='row'>
                                    <div className='col-lg-10 justify-content-center table-responsive'>
                                        <Table className='AddStudent-Table-List'>
                                            <tbody>
                                                <tr>
                                                    <td style={{ textAlign: "center" }} colSpan={2} className='newstudent-tilte'>Designation Details</td>
                                                </tr>
                                                <tr>
                                                    <td>Role</td>
                                                    <td>
                                                        <select defaultValue="" value={role} onChange={(e) => setRole(e.target.value)}>
                                                            <option value="" disabled>Select Role</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="teacher">Teacher</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Designation</td>
                                                    <td><input value={designation} onChange={(e) => setDesignation(e.target.value)} type="text" /></td>
                                                </tr>
                                                {
                                                    role==="teacher" &&
                                                <tr>
                                                    <td>Primary Subject</td>
                                                    <td><input value={primarySubject} onChange={(e) => setPrimarySubject(e.target.value)} type="text" /></td>
                                                </tr>
                                                }
                                                <tr>
                                                    <td>How many years experience in this field ?</td>
                                                    <td><input value={experience} onChange={(e) => setExperience(e.target.value)} type="number" min="0" /></td>
                                                </tr>
                                                {
                                                    role!=="Other" && <>
                                                <tr>
                                                    <td style={{ textAlign: "center" }} colSpan={2} className='newstudent-tilte'>Education Details</td>
                                                </tr>
                                                <tr>
                                                    <td>Qualification</td>
                                                    <td className='radio'>
                                                        <input type="radio" name="qualification" onClick={() => { setUG(true); setPG(false); setPHD(false); }} checked={UG} />UG &emsp; 
                                                        <input type="radio" name="qualification" onClick={() => { setUG(false); setPG(true); setPHD(false); }} checked={PG} />PG &emsp; 
                                                        <input type="radio" name="qualification" onClick={() => { setUG(false); setPG(false); setPHD(true); }} checked={PHD} />PHD &emsp;
                                                        <span className='btn btn-primary btn-sm' onClick={()=>{ setUG(false); setPG(false); setPHD(false); }}>Clear</span>
                                                    </td>
                                                </tr>
                                                {(UG || PG || PHD) && <>
                                                    <tr>
                                                        <td style={{ textAlign: "center" }} colSpan={2} className='newstudent-tilte'>UG Details</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Degree/Branch</td>
                                                        <td><input value={ugDetails.title} onChange={(e) => setUgDetails((prev) => ({ ...prev, title: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>College Name</td>
                                                        <td><input value={ugDetails.collegeName} onChange={(e) => setUgDetails((prev) => ({ ...prev, collegeName: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>College Location<br />(City,State,Country)</td>
                                                        <td><input value={ugDetails.collegeLocation} onChange={(e) => setUgDetails((prev) => ({ ...prev, collegeLocation: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Year Passed out</td>
                                                        <td><input value={ugDetails.yearPassed} onChange={(e) => setUgDetails((prev) => ({ ...prev, yearPassed: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Percentage</td>
                                                        <td><input value={ugDetails.percentage} onChange={(e) => setUgDetails((prev) => ({ ...prev, percentage: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                </>
                                                }
                                                {(PG || PHD) && <>
                                                    <tr>
                                                        <td style={{ textAlign: "center" }} colSpan={2} className='newstudent-tilte'>PG Details</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Degree/Branch</td>
                                                        <td><input value={pgDetails.title} onChange={(e) => setPgDetails((prev) => ({ ...prev, title: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>College Name</td>
                                                        <td><input value={pgDetails.collegeName} onChange={(e) => setPgDetails((prev) => ({ ...prev, collegeName: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>College Location<br />(City,State,Country)</td>
                                                        <td><input value={pgDetails.collegeLocation} onChange={(e) => setPgDetails((prev) => ({ ...prev, collegeLocation: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Year Passed out</td>
                                                        <td><input value={pgDetails.yearPassed} onChange={(e) => setPgDetails((prev) => ({ ...prev, yearPassed: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Percentage</td>
                                                        <td><input value={pgDetails.percentage} onChange={(e) => setPgDetails((prev) => ({ ...prev, percentage: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                </>
                                                }
                                                {PHD && <>
                                                    <tr>
                                                        <td style={{ textAlign: "center" }} colSpan={2} className='newstudent-tilte'>PhD Details</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Degree/Branch</td>
                                                        <td><input value={phdDetails.title} onChange={(e) => setPhdDetails((prev) => ({ ...prev, title: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>College Name</td>
                                                        <td><input value={phdDetails.collegeName} onChange={(e) => setPhdDetails((prev) => ({ ...prev, collegeName: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>College Location<br />(City,State,Country)</td>
                                                        <td><input value={phdDetails.collegeLocation} onChange={(e) => setPhdDetails((prev) => ({ ...prev, collegeLocation: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Year Passed out</td>
                                                        <td><input value={phdDetails.yearPassed} onChange={(e) => setPhdDetails((prev) => ({ ...prev, yearPassed: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Percentage</td>
                                                        <td><input value={phdDetails.percentage} onChange={(e) => setPhdDetails((prev) => ({ ...prev, percentage: e.target.value }))} type="text" /></td>
                                                    </tr>
                                                </>
                                                }
                                                </>
                                            }
                                                
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            }
                            {step === 2 &&
                                <div className='row'>
                                    <div className='col-lg-8 justify-content-center table-responsive'>
                                        <Table className='AddStudent-Table-List'>
                                            <tbody>
                                                <tr>
                                                    <td style={{ textAlign: "center" }} colSpan={2} className='newstudent-tilte'>Salary Details</td>
                                                </tr>
                                                <tr>
                                                    <td>Basic&nbsp;(in &#8377;)</td>
                                                    <td><input value={salaryDetails.basic} onChange={(e) => setSalaryDetails((prev) => ({ ...prev, basic: e.target.value }))} type="text" /></td>
                                                </tr>
                                                <tr>
                                                    <td>HRA&nbsp;(in %)</td>
                                                    <td><input value={salaryDetails.hra} onChange={(e) => { if (e.target.value <= 100) setSalaryDetails((prev) => ({ ...prev, hra: e.target.value })); else alert("Value can't be more than 100") }} type="number" min="0" max="100" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Conveyance&nbsp;(in %)</td>
                                                    <td><input value={salaryDetails.conveyance} onChange={(e) => setSalaryDetails((prev) => ({ ...prev, conveyance: e.target.value }))} type="number" min="0" max="100" /></td>
                                                </tr>
                                                <tr>
                                                    <td>PA&nbsp;(in %)</td>
                                                    <td><input value={salaryDetails.pa} onChange={(e) => setSalaryDetails((prev) => ({ ...prev, pa: e.target.value }))} type="number" min="0" max="100" /></td>
                                                </tr>
                                                <tr>
                                                    <td>PF&nbsp;(in %)</td>
                                                    <td><input value={salaryDetails.pf} onChange={(e) => setSalaryDetails((prev) => ({ ...prev, pf: e.target.value }))} type="number" min="0" max="100" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Professional Tax&nbsp;(in %)</td>
                                                    <td><input value={salaryDetails.pt} onChange={(e) => setSalaryDetails((prev) => ({ ...prev, pt: e.target.value }))} type="number" min="0" max="100" /></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            }
                            {step === 3 &&
                                <div className='row'>
                                    <div className='col-lg-8 justify-content-center table-responsive'>
                                        <Table className='AddTeacher-Table-List-1'>
                                            <tbody>
                                                <tr>
                                                    <td colSpan={4} style={{ textAlign: "center", fontWeight: "bold" }}>Personal Details</td>
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
                                                    <td>EMP ID</td>
                                                    <td>{emp}</td>
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
                                                    <td>Address Line1</td>
                                                    <td>{address.line1}</td>
                                                    <td>City</td>
                                                    <td>{address.city}</td>
                                                </tr>
                                                <tr>
                                                    <td>Address Line2</td>
                                                    <td>{address.line2}</td>
                                                    <td>State</td>
                                                    <td>{address.state}</td>
                                                </tr>
                                                <tr>
                                                    <td>Pincode</td>
                                                    <td>{address.pincode}</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4} style={{ textAlign: "center", fontWeight: "bold" }} >Education Details</td>
                                                </tr>
                                                <tr>
                                                    <td>Qualification</td>
                                                    <td className='radio'>{UG && "UG"}{PG && "PG"}{PHD && "PHD"}{!UG && !PG && !PHD && "No Qualification"}</td>
                                                    <td>Designation</td>
                                                    <td className='radio'>{designation}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>How many years experience in this field ?</td>
                                                    <td colSpan={2} className='radio'>{experience}</td>
                                                </tr>
                                                {(UG || PG || PHD) && <>
                                                    <tr>
                                                        <td colSpan={4} style={{ fontWeight: "bold" }}>UG Details</td>
                                                    </tr>
                                                    <tr>
                                                        <td>College Name</td>
                                                        <td>{ugDetails.collegeName}</td>
                                                        <td>College Location</td>
                                                        <td>{ugDetails.collegeLocation}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Year Passed Out</td>
                                                        <td>{ugDetails.yearPassed}</td>
                                                        <td>Percentage</td>
                                                        <td>{ugDetails.percentage}</td>
                                                    </tr>
                                                </>}
                                                {(PG || PHD) && <>
                                                    <tr>
                                                        <td colSpan={4} style={{ fontWeight: "bold" }}>PG Details</td>
                                                    </tr>
                                                    <tr>
                                                        <td>College Name</td>
                                                        <td>{pgDetails.collegeName}</td>
                                                        <td>College Location</td>
                                                        <td>{pgDetails.collegeLocation}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Year Passed Out</td>
                                                        <td>{pgDetails.yearPassed}</td>
                                                        <td>Percentage</td>
                                                        <td>{pgDetails.percentage}</td>
                                                    </tr>
                                                </>}
                                                {(PHD) && <>
                                                    <tr>
                                                        <td colSpan={4} style={{ fontWeight: "bold" }}>PhD Details</td>
                                                    </tr>
                                                    <tr>
                                                        <td>College Name</td>
                                                        <td>{phdDetails.collegeName}</td>
                                                        <td>College Location</td>
                                                        <td>{phdDetails.collegeLocation}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Year Passed Out</td>
                                                        <td>{phdDetails.yearPassed}</td>
                                                        <td>Percentage</td>
                                                        <td>{phdDetails.percentage}</td>
                                                    </tr>
                                                </>}
                                                <tr>
                                                    <td colSpan={4} style={{ textAlign: "center", fontWeight: "bold" }} >Salary Details</td>
                                                </tr>
                                                <tr>
                                                    <td>Basic</td>
                                                    <td>{salaryDetails.basic}</td>
                                                    <td>HRA</td>
                                                    <td>{salaryDetails.hra}</td>
                                                </tr>
                                                <tr>
                                                    <td>Conveyance</td>
                                                    <td>{salaryDetails.conveyance}</td>
                                                    <td>PA</td>
                                                    <td>{salaryDetails.pa}</td>
                                                </tr>
                                                <tr>
                                                    <td>PF</td>
                                                    <td>{salaryDetails.pf}</td>
                                                    <td>Personal Tax</td>
                                                    <td>{salaryDetails.pt}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            }
                            <br />
                        </div>
                    </div>
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

    )
}

export default AddTeacher
