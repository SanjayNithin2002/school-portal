import React from 'react'
import Student from './student'
import Admin from './admin'

const Exam = ({status,onLoading}) => {
  return (
    <>
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="student" &&
        <Student status={status} onLoading={(status1)=>onLoading(status1)} />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="teacher" &&
        <Admin status={status} onLoading={(status1)=>onLoading(status1)} />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="admin" &&
        <Admin status={status} onLoading={(status1)=>onLoading(status1)} />
    }
    </>
  )
}

export default Exam
