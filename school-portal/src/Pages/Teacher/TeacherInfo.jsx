import React from 'react'
import Table from 'react-bootstrap/Table'

import SideNavBar from '../../components/SideNavBar/SideNavBar'

function TeacherInfo() {

    const [search,setSearch] = React.useState(''); 

    const studentList = [{
        name:"Arvind M M",
        empid:"10001",
        designation:"Associate Teacher",
        subject:"Maths"
    },{
        name:"Yukeshwaran",
        empid:"10002",
        designation:"Associate Teacher",
        subject:"English"
    },{
        name:"Sanjay Nithin",
        empid:"10003",
        designation:"Associate Teacher",
        subject:"Science,Computer"
    },{
        name:"Chetan",
        empid:"10001",
        designation:"Associate Teacher",
        subject:"Social,Drawing"
    }]

    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Staff Info</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='studentinfo-container'>
                        <div className='row' style={{alignItems:"center"}}>
                            <div className='col-lg-3'><h5>Search by Staff Name/ID&ensp;:&ensp;</h5></div>
                            <div className='col-lg-9'><input value={search} onChange={(e)=>setSearch(e.target.value)} type="search" className='selectPicker2'/></div>
                        </div>
                        <br/><br/>
                        <div className='row' style={{justifyContent:"center"}}>
                            <div className='col-lg-10'>
                                <Table striped className='tablestyle4'>
                                    <thead>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Staff ID</th>
                                        <th>Designation</th>
                                        <th>Subjects Handling</th>
                                        <th>Action</th>
                                    </thead>
                                    <tbody>
                                        {
                                            search===''?
                                            <tr>
                                            <td align='center' colSpan={6}>
                                                No Data
                                            </td>
                                            </tr>:<>{
                                            studentList.filter((item)=>{return (item.name.toLowerCase().includes(search.toLowerCase()) || item.empid.toLowerCase().includes(search.toLowerCase()))}).map((item,i)=>(
                                                <tr key={item}>
                                                    <td>{i+1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.empid}</td>
                                                    <td>{item.designation}</td>
                                                    <td>{item.subject}</td>
                                                    <td><button className='btn btn-primary'>View</button></td>
                                                </tr>
                                            ))}
                                            </>
                                        }
                                        
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

export default TeacherInfo