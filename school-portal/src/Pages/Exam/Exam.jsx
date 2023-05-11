import React from 'react'
import Student from './student'
import Teacher from './teacher'

const Assessments = () => {
  return (
    <>
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="student" &&
        <Student/>
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="teacher" &&
        <Teacher type="teacher"/>
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="admin" &&
        <Teacher type="admin"/>
    }
    </>
  )
}

export default Assessments
