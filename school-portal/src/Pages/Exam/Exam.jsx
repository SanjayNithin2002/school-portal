import React from 'react'
import Student from './student'
import Admin from './admin'
import Error from "../Error404"

const Assessments = () => {
  return (
    <>
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="student" &&
        <Student />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="teacher" &&
        <Error />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="admin" &&
        <Admin />
    }
    </>
  )
}

export default Assessments
