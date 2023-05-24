import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { useDispatch,useSelector } from 'react-redux'

import "./Student.css"
import { requestStudents } from '../../actions/students'
import SideNavBar from '../../components/SideNavBar/SideNavBar'

function StudentInfo() {

    const [search,setSearch] = React.useState(''); 
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(requestStudents());
    },[dispatch])

    const allStudents = useSelector((state)=>state.allStudentsReducer)
    const standardList = [{label:"I",value:1},{label:"II",value:2},{label:"III",value:3},{label:"IV",value:4},{label:"V",value:5},{label:"VI",value:6},{label:"VII",value:7},{label:"VIII",value:8},{label:"IX",value:9},{label:"X",value:10},{label:"XI",value:11},{label:"XII",value:12}]
    

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
                                            allStudents.docs.filter((item)=>(item.firstName.toLowerCase()+" "+item.lastName.toLowerCase()).includes(search.toLowerCase())).map((item,i)=>(
                                                <tr key={item}>
                                                    <td>{i+1}</td>
                                                    <td>{item.firstName.toLowerCase()+" "+item.lastName.toLowerCase()}</td>
                                                    <td>{item.gender}</td>
                                                    <td>
                                                        {   
                                                        standardList.filter((standard)=>standard.value===item.standard).map((standard)=>(<>{standard.label}</>))}
                                                    </td>
                                                    <td>{item.section}</td>
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