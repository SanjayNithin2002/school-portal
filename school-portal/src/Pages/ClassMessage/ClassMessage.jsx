import React from 'react'
import Student from './Student'
import Teacher from './Teacher'
import Error404 from "../../Pages/Error404"
const ClassMessage = ({status,onLoading}) => {

  return (<>
  {
    localStorage.getItem('type') && localStorage.getItem('type')==="student" &&
        <Student status={status} onLoading={(status1)=>onLoading(status1)} />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="teacher" &&
        <Teacher status={status} onLoading={(status1)=>onLoading(status1)} />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="admin" &&
        <Error404/>
    }
    </>
  )
}

export default ClassMessage