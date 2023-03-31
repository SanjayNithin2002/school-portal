import React from 'react'
import Table from 'react-bootstrap/Table'

import "./Student.css"
import SideNavBar from '../../components/SideNavBar/SideNavBar'

function StudentInfo() {

    const [search,setSearch] = React.useState(''); 

    const studentList = [{
        name:"Arvind M M",
        gender:"Male",
        Stardard:"XII",
        Section:"D"
    },{
        name:"Yukeshwaran",
        gender:"Male",
        Stardard:"XII",
        Section:"A"
    },{
        name:"Sanjay Nithin",
        gender:"Male",
        Stardard:"XII",
        Section:"B"
    },{
        name:"Chetan",
        gender:"Male",
        Stardard:"XII",
        Section:"C"
    }]

    return (
        <div className='Main'>
            <SideNavBar />
            <div className="Home">
                <div class="container rounded bg-white">
                    <h2>Student Info</h2>
                    <hr style={{ border: "1px solid gray" }} />
                    <div className='studentinfo-container'>
                        <div className='row' style={{alignItems:"center"}}>
                            <div className='col-lg-3'><h5>Search by Student Name&ensp;:&ensp;</h5></div>
                            <div className='col-lg-9'><input value={search} onChange={(e)=>setSearch(e.target.value)} type="search" className='selectPicker2'/></div>
                        </div>
                        <br/><br/>
                        <div className='row' style={{justifyContent:"center"}}>
                            <div className='col-lg-10'>
                                <Table striped className='tablestyle4'>
                                    <thead>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Stardard</th>
                                        <th>Section</th>
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
                                            studentList.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())).map((item,i)=>(
                                                <tr key={item}>
                                                    <td>{i+1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.gender}</td>
                                                    <td>{item.Stardard}</td>
                                                    <td>{item.Section}</td>
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

export default StudentInfo