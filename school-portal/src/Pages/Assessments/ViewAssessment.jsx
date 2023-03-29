import React from 'react'
import { useParams } from 'react-router-dom'
import { Uploader } from 'rsuite';
import SideNavBar from '../../components/SideNavBar/SideNavBar'



function ViewAssessment() {
    const { id } = useParams();
    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <div className='Assessment-tab-1'>
                        <h2>Assessment - {id}</h2>
                        <h4>Physics</h4>
                    </div>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='row'>
                        <div className='col-lg-9'>
                            <div>Assessments Description</div>
                            <br/>
                            <div>
                                <Uploader />
                            </div>
                        </div>
                        <div className='col-lg-3' style={{ borderLeft: "1px solid gray" }}>
                            <table className='tablestyle2'>
                                <tr>
                                    <td>Posted By</td>
                                    <td>:</td>
                                    <td>Teacher Name</td>
                                </tr>
                                <tr>
                                    <td>Posted on</td>
                                    <td>:</td>
                                    <td>Timings</td>
                                </tr>
                                <tr>
                                    <td>Due Date</td>
                                    <td>:</td>
                                    <td>Timings</td>
                                </tr>
                                <tr>
                                    <td>Uploaded On</td>
                                    <td>:</td>
                                    <td>Not Uploaded</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewAssessment
