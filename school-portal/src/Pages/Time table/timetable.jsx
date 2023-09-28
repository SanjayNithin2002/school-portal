import React from 'react'
import Student from './student'
import Admin from './admin'
import Teacher from './teacher'

const timetable = ({status,onLoading}) => {
  return (
    <>
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="student" &&
        <Student status={status} onLoading1={(status1)=>onLoading(status1)} />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="teacher" &&
        <Teacher status={status} onLoading1={(status1)=>onLoading(status1)} />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="admin" &&
        <Admin status={status} onLoading1={(status1)=>onLoading(status1)} />
    }
    </>
  )
}

export default timetable
