import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import { Uploader } from 'rsuite';
import SideNavBar from '../../components/SideNavBar/SideNavBar'
import Table from 'react-bootstrap/esm/Table';



function NewAssessment() {
    const { id } = useParams();
    const [stardard, setStardard] = useState("");
    const [section, setSection] = useState("");
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div className='Assessment-tab-1'>
                        <h2>New Assessment</h2>
                        <button className='btn btn-primary'>Save</button>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <Table className='new-assessment-table'>
                        <tbody>
                            <tr>
                                <td style={{backgroundColor:"#0b5ed7"}} className='new-title'>
                                    Assessment Title
                                </td>
                                <td><input type="text"/></td>
                            </tr>
                            <tr>
                                <td style={{backgroundColor:"#0b5ed7"}} className='new-title'>
                                    Assessment Description
                                </td>
                                <td><textarea rows={4} cols={40}></textarea></td>
                            </tr>
                            <tr>
                                <td style={{backgroundColor:"#0b5ed7"}} className='new-title'>
                                    Class
                                </td>
                                <td>
                                <select className="selectPicker3" value={stardard} onChange={(e) => setStardard(e.target.value)}>
                                    <option value="" disabled>
                                        Select Stardard
                                    </option>
                                    <option value="VII">VII</option>
                                    <option value="VIII">VIII</option>
                                </select>
                                &emsp;&nbsp;
                                <select className="selectPicker3" value={section} onChange={(e) => setSection(e.target.value)}>
                                    <option value="" disabled>
                                        Select Section
                                    </option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                                </td>
                            </tr>
                            <tr>
                                <td style={{backgroundColor:"#0b5ed7"}} className='new-title'>
                                    Due Date
                                </td>
                                <td><input type="datetime-local" /></td>
                            </tr>
                            <tr>
                                <td style={{backgroundColor:"#0b5ed7"}} className='new-title'>
                                    Upload Question
                                </td>
                                <td>
                                    <Uploader action=""/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    
                </div>
            </div>
        </div>
    )
}

export default NewAssessment
