import React from 'react'
import Student from './student'
import Admin from './admin'
import Teacher from './teacher'
import Error from "../Error404"

const timetable = () => {
  return (
    <>
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="student" &&
        <Student />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="teacher" &&
        <Teacher />
    }
    {
    localStorage.getItem('type') && localStorage.getItem('type')==="admin" &&
        <Admin />
    }
    </>
  )
}

export default timetable
